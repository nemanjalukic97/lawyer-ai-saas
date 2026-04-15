-- Public intake: anon must be able to read active intake_forms rows for INSERT policy EXISTS checks.
DROP POLICY IF EXISTS "intake_forms_public_select_active" ON public.intake_forms;

CREATE POLICY "intake_forms_public_select_active"
  ON public.intake_forms
  FOR SELECT
  TO anon
  USING (is_active IS TRUE);

-- Allow anonymous inserts into intake_submissions
-- (the form is public, no auth required)
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anonymous can submit intake forms" ON public.intake_submissions;

DROP POLICY IF EXISTS "intake_submissions_insert_public" ON public.intake_submissions;

CREATE POLICY "Anonymous can submit intake forms"
  ON public.intake_submissions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.intake_forms
      WHERE public.intake_forms.id = form_id
        AND public.intake_forms.is_active = TRUE
    )
  );
