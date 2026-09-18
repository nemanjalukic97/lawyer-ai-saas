-- Onboarding funnel events: login → first research search.
-- Apply in the Supabase SQL editor. Do not store query text here;
-- rag_query_logs already holds it and this table must stay cheap.

CREATE TABLE IF NOT EXISTS public.onboarding_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event       text NOT NULL,
  path        text,
  metadata    jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.onboarding_events IS
  'Funnel telemetry from login to first search. Never store query text; that belongs in rag_query_logs.';

CREATE INDEX IF NOT EXISTS idx_onboarding_events_user_created_at
  ON public.onboarding_events (user_id, created_at);

CREATE INDEX IF NOT EXISTS idx_onboarding_events_event_created_at
  ON public.onboarding_events (event, created_at);

ALTER TABLE public.onboarding_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "onboarding_events_insert_own" ON public.onboarding_events;
CREATE POLICY "onboarding_events_insert_own"
  ON public.onboarding_events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "onboarding_events_select_own" ON public.onboarding_events;
CREATE POLICY "onboarding_events_select_own"
  ON public.onboarding_events
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
