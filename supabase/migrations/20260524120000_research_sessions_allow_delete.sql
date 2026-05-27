-- Allow users to delete research sessions they can view (own or firm-shared).

DROP POLICY IF EXISTS "research_sessions_delete_scope" ON public.research_sessions;
CREATE POLICY "research_sessions_delete_scope"
  ON public.research_sessions
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );
