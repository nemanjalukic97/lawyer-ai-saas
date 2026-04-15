-- E-signatures: basic rate limiting / abuse monitoring for public signing endpoint

CREATE TABLE IF NOT EXISTS public.signature_request_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  token UUID NOT NULL,
  ip TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_signature_request_attempts_token_created_at
  ON public.signature_request_attempts(token, created_at DESC);

ALTER TABLE public.signature_request_attempts ENABLE ROW LEVEL SECURITY;

-- Service role only (API uses SUPABASE_SERVICE_ROLE_KEY)
DROP POLICY IF EXISTS "signature_request_attempts_service_only" ON public.signature_request_attempts;
CREATE POLICY "signature_request_attempts_service_only"
  ON public.signature_request_attempts
  FOR ALL
  USING (false)
  WITH CHECK (false);

