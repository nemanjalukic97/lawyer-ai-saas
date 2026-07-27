-- Wave 1 security: stop anon intake enumeration, redact spent signing RPC
-- payloads, lock reminder RPCs to service_role, and re-bind anon intake inserts
-- to the form owner.
--
-- Performance: policy/function DDL only — no table scans, no index rebuilds.
-- Safe on large datasets; no CONCURRENTLY needed.

-- ---------------------------------------------------------------------------
-- 1) Intake forms: drop broad anon SELECT (enumeration). Public page already
--    uses get_public_intake_form(slug) SECURITY DEFINER — keep that path.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "intake_forms_public_select_active" ON public.intake_forms;

-- ---------------------------------------------------------------------------
-- 2) Signing RPC: full contract only while pending AND not past expires_at.
--    Spent / expired links return status (+ ids for API bookkeeping) with
--    NULL contract_content and related document/PII fields.
-- ---------------------------------------------------------------------------
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
    sr.id AS signature_request_id,
    c.id AS contract_id,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN c.title
      ELSE NULL
    END AS contract_title,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN c.content
      ELSE NULL
    END AS contract_content,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN up.full_name
      ELSE NULL
    END AS sent_by_name,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN sr.signer_email
      ELSE NULL
    END AS signer_email,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN sr.signer_name
      ELSE NULL
    END AS signer_name,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at <= now() THEN 'expired'::public.signature_request_status
      ELSE sr.status
    END AS status,
    sr.expires_at,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN sr.signed_pdf_path
      ELSE NULL
    END AS signed_pdf_path,
    CASE
      WHEN sr.status = 'pending' AND sr.expires_at > now() THEN sr.signed_at
      ELSE NULL
    END AS signed_at
  FROM public.signature_requests sr
  JOIN public.contracts c ON c.id = sr.contract_id
  JOIN public.user_profiles up ON up.id = sr.user_id
  WHERE sr.token = p_token;
$$;

-- Keep public execute for the token-scoped signing page (payload is now redacted).
GRANT EXECUTE ON FUNCTION public.get_signature_request_for_signing(uuid) TO anon, authenticated;

-- ---------------------------------------------------------------------------
-- 3) Reminder RPCs: cron uses supabaseAdmin (service_role). Revoke PUBLIC /
--    anon / authenticated so PostgREST callers cannot dump due reminders.
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM anon;
REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.get_deadlines_due_for_reminder() TO service_role;

REVOKE ALL ON FUNCTION public.get_invoices_due_for_reminder() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_invoices_due_for_reminder() FROM anon;
REVOKE ALL ON FUNCTION public.get_invoices_due_for_reminder() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.get_invoices_due_for_reminder() TO service_role;

-- ---------------------------------------------------------------------------
-- 4) Intake submissions: re-bind user_id to form owner without requiring anon
--    SELECT on intake_forms (which would reintroduce enumeration). Helper is
--    SECURITY DEFINER so the EXISTS check bypasses RLS on intake_forms.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.intake_submission_owner_matches_form(
  p_form_id uuid,
  p_user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.intake_forms f
    WHERE f.id = p_form_id
      AND f.is_active IS TRUE
      AND f.user_id = p_user_id
  );
$$;

REVOKE ALL ON FUNCTION public.intake_submission_owner_matches_form(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.intake_submission_owner_matches_form(uuid, uuid)
  TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Anonymous can submit intake forms" ON public.intake_submissions;
DROP POLICY IF EXISTS "intake_submissions_insert_public" ON public.intake_submissions;
DROP POLICY IF EXISTS "anon_insert_intake_submissions" ON public.intake_submissions;

CREATE POLICY "intake_submissions_insert_public"
  ON public.intake_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    public.intake_submission_owner_matches_form(form_id, user_id)
  );

COMMENT ON FUNCTION public.intake_submission_owner_matches_form(uuid, uuid) IS
  'SECURITY DEFINER helper for intake insert RLS: form must be active and user_id must equal form owner.';
