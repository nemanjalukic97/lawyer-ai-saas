-- Legal Research: saved research sessions (firm-shared scope) + RLS + indexes

CREATE TABLE IF NOT EXISTS public.research_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Who saved it + tenant scope
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,

  -- Query + filters
  query TEXT NOT NULL,
  jurisdiction_filter TEXT,
  category_filter TEXT,

  -- Stored UI-ready results
  results JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_research_sessions_firm_created_at
  ON public.research_sessions(law_firm_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_research_sessions_user_created_at
  ON public.research_sessions(user_id, created_at DESC);

COMMENT ON TABLE public.research_sessions IS 'Saved legal research sessions (user + optional firm scope).';

-- RLS
ALTER TABLE public.research_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "research_sessions_select_scope" ON public.research_sessions;
CREATE POLICY "research_sessions_select_scope"
  ON public.research_sessions
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "research_sessions_insert_scope" ON public.research_sessions;
CREATE POLICY "research_sessions_insert_scope"
  ON public.research_sessions
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

-- Keep sessions immutable (same pattern as conflict_checks)
DROP POLICY IF EXISTS "research_sessions_update_scope" ON public.research_sessions;
CREATE POLICY "research_sessions_update_scope"
  ON public.research_sessions
  FOR UPDATE TO authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "research_sessions_delete_scope" ON public.research_sessions;
CREATE POLICY "research_sessions_delete_scope"
  ON public.research_sessions
  FOR DELETE TO authenticated
  USING (false);

