-- E-signatures: signature requests + contract signature tracking + safe public lookup by token
--
-- IMPORTANT (MANUAL STEP REQUIRED BEFORE DEPLOYING APP CODE)
-- ---------------------------------------------------------
-- Create a Supabase Storage bucket named: signed-contracts
-- - visibility: private (public = false)
-- - access: use signed URLs only
--
-- You can create it in Supabase Dashboard:
--   Storage -> Buckets -> New bucket -> name "signed-contracts" -> Public bucket OFF
--
-- This bucket must exist before any upload code runs.
--
-- ---------------------------------------------------------

-- 1) Enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'signature_request_status') THEN
    CREATE TYPE public.signature_request_status AS ENUM ('pending', 'signed', 'expired', 'cancelled');
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contract_signature_status') THEN
    CREATE TYPE public.contract_signature_status AS ENUM ('none', 'pending', 'signed', 'expired', 'cancelled');
  END IF;
END$$;

-- 2) signature_requests table
CREATE TABLE IF NOT EXISTS public.signature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Who created it + tenant scope
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,

  -- What is being signed
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,

  -- Signer
  signer_name TEXT NOT NULL,
  signer_email TEXT NOT NULL,
  message TEXT,

  -- Security + lifecycle
  token UUID NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  status public.signature_request_status NOT NULL DEFAULT 'pending',

  -- Audit trail (set on signing)
  signed_at TIMESTAMPTZ,
  signer_ip TEXT,
  signer_user_agent TEXT,

  -- Storage path to signed PDF (private bucket)
  signed_pdf_path TEXT
);

CREATE INDEX IF NOT EXISTS idx_signature_requests_contract_id
  ON public.signature_requests(contract_id);
CREATE INDEX IF NOT EXISTS idx_signature_requests_token
  ON public.signature_requests(token);
CREATE INDEX IF NOT EXISTS idx_signature_requests_status_expires_at
  ON public.signature_requests(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_signature_requests_firm_created_at
  ON public.signature_requests(law_firm_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_signature_requests_user_created_at
  ON public.signature_requests(user_id, created_at DESC);

COMMENT ON TABLE public.signature_requests IS 'E-signature requests for contracts (user + optional firm scope).';

-- 3) contracts table additions
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS signature_status public.contract_signature_status NOT NULL DEFAULT 'none';

ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS signed_pdf_path TEXT;

ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS signature_request_id UUID REFERENCES public.signature_requests(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_contracts_signature_status
  ON public.contracts(signature_status)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_contracts_firm_signature_status
  ON public.contracts(law_firm_id, signature_status)
  WHERE deleted_at IS NULL;

-- 4) RLS: signature_requests (authenticated scope only; public access via definer function)
ALTER TABLE public.signature_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "signature_requests_select_scope" ON public.signature_requests;
CREATE POLICY "signature_requests_select_scope"
  ON public.signature_requests
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "signature_requests_insert_scope" ON public.signature_requests;
CREATE POLICY "signature_requests_insert_scope"
  ON public.signature_requests
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

-- Allow cancel/resend metadata updates by owner/firm members only when pending.
-- (Signing updates are expected to be performed by service role in an API route.)
DROP POLICY IF EXISTS "signature_requests_update_scope" ON public.signature_requests;
CREATE POLICY "signature_requests_update_scope"
  ON public.signature_requests
  FOR UPDATE TO authenticated
  USING (
    status = 'pending'
    AND (
      user_id = auth.uid()
      OR (
        law_firm_id IS NOT NULL
        AND law_firm_id = public.user_law_firm_id()
      )
    )
  )
  WITH CHECK (
    (
      user_id = auth.uid()
      OR (
        law_firm_id IS NOT NULL
        AND law_firm_id = public.user_law_firm_id()
      )
    )
  );

DROP POLICY IF EXISTS "signature_requests_delete_scope" ON public.signature_requests;
CREATE POLICY "signature_requests_delete_scope"
  ON public.signature_requests
  FOR DELETE TO authenticated
  USING (false);

-- 5) Public lookup (token-scoped) via SECURITY DEFINER
-- Mirrors pattern used for intake forms (get_public_intake_form).
CREATE OR REPLACE FUNCTION public.get_signature_request_for_signing(p_token uuid)
RETURNS TABLE (
  signature_request_id uuid,
  contract_id uuid,
  contract_title text,
  contract_content text,
  sent_by_name text,
  signer_email text,
  signer_name text,
  status public.signature_request_status,
  expires_at timestamptz,
  signed_pdf_path text,
  signed_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    sr.id as signature_request_id,
    c.id as contract_id,
    c.title as contract_title,
    c.content as contract_content,
    up.full_name as sent_by_name,
    sr.signer_email,
    sr.signer_name,
    sr.status,
    sr.expires_at,
    sr.signed_pdf_path,
    sr.signed_at
  FROM public.signature_requests sr
  JOIN public.contracts c ON c.id = sr.contract_id
  JOIN public.user_profiles up ON up.id = sr.user_id
  WHERE sr.token = p_token;
$$;

GRANT EXECUTE ON FUNCTION public.get_signature_request_for_signing(uuid) TO anon, authenticated;

