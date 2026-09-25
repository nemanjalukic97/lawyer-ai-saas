-- Legal search telemetry. One row per statute search.
-- Apply in the Supabase SQL editor. Do not apply from the app.
-- Authenticated users may insert and read their own rows. They may not
-- update or delete them: no UPDATE or DELETE policy is created, and RLS
-- denies those commands.

CREATE TABLE IF NOT EXISTS public.legal_search_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id uuid REFERENCES public.law_firms(id) ON DELETE SET NULL,
  query text NOT NULL,
  jurisdiction_filter text,
  category_filter text,
  mode text NOT NULL,
  results jsonb NOT NULL,
  CONSTRAINT legal_search_logs_mode_check
    CHECK (mode IN ('research', 'hint'))
);

COMMENT ON TABLE public.legal_search_logs IS
  'One compact row per statute search (research page or AI hint retrieval). Not user-deletable.';

CREATE INDEX IF NOT EXISTS idx_legal_search_logs_created_at
  ON public.legal_search_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_legal_search_logs_user_created_at
  ON public.legal_search_logs (user_id, created_at DESC);

ALTER TABLE public.legal_search_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "legal_search_logs_select_own" ON public.legal_search_logs;
CREATE POLICY "legal_search_logs_select_own"
  ON public.legal_search_logs
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "legal_search_logs_insert_scope" ON public.legal_search_logs;
CREATE POLICY "legal_search_logs_insert_scope"
  ON public.legal_search_logs
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

REVOKE ALL ON TABLE public.legal_search_logs FROM anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.legal_search_logs TO authenticated;
