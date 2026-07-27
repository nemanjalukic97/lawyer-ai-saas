-- Wave 2 security: lock case_law writes to service_role; add intake submit
-- rate-limit attempts table (mirrors signature_request_attempts).
--
-- Performance: policy DDL + small attempts table/index only — no full-table
-- scans or index rebuilds on case_law. Safe on large datasets.

-- ---------------------------------------------------------------------------
-- 1) case_law: INSERT/UPDATE were USING/WITH CHECK (true) for all roles.
--    Restrict to service_role. Ingest scripts use SUPABASE_SERVICE_ROLE_KEY
--    (supabaseAdmin), which also bypasses RLS — unaffected either way.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Service role insert case_law" ON public.case_law;
CREATE POLICY "Service role insert case_law"
  ON public.case_law
  FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role update case_law" ON public.case_law;
CREATE POLICY "Service role update case_law"
  ON public.case_law
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Public corpus read stays intentional.
-- (SELECT policy "Public read access to case_law" unchanged.)

-- ---------------------------------------------------------------------------
-- 2) Intake submit attempts (rate limiting for /api/intake/submit)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.intake_submit_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  form_id UUID NOT NULL,
  ip TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_intake_submit_attempts_form_ip_created_at
  ON public.intake_submit_attempts (form_id, ip, created_at DESC);

ALTER TABLE public.intake_submit_attempts ENABLE ROW LEVEL SECURITY;

-- Service role only (API uses SUPABASE_SERVICE_ROLE_KEY; deny all via RLS)
DROP POLICY IF EXISTS "intake_submit_attempts_service_only" ON public.intake_submit_attempts;
CREATE POLICY "intake_submit_attempts_service_only"
  ON public.intake_submit_attempts
  FOR ALL
  USING (false)
  WITH CHECK (false);

COMMENT ON TABLE public.intake_submit_attempts IS
  'Abuse monitoring for public intake submit; written only via service role API.';
