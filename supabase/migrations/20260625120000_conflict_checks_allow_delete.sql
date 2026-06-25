-- Allow users to delete conflict checks they can view (own or firm-shared).

DROP POLICY IF EXISTS "conflict_checks_delete_scope" ON public.conflict_checks;
CREATE POLICY "conflict_checks_delete_scope"
  ON public.conflict_checks
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );
