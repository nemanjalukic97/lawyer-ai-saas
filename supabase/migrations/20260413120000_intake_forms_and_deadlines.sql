-- Intake forms, submissions, and deadlines (Legantis dashboard)
-- Requires pgcrypto for gen_random_uuid (enabled by default on Supabase).

CREATE TYPE public.deadline_type AS ENUM (
  'court_hearing',
  'filing_deadline',
  'appeal_deadline',
  'statute_of_limitations',
  'contract_expiry',
  'client_meeting',
  'payment_due',
  'other'
);

CREATE TYPE public.deadline_status AS ENUM (
  'upcoming',
  'overdue',
  'completed',
  'cancelled'
);

CREATE TABLE public.intake_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Client Intake',
  description TEXT,
  fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.intake_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID NOT NULL REFERENCES public.intake_forms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'archived')),
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_intake_submissions_form ON public.intake_submissions(form_id);
CREATE INDEX idx_intake_submissions_user ON public.intake_submissions(user_id);

CREATE TABLE public.deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  deadline_type public.deadline_type NOT NULL DEFAULT 'other',
  due_date DATE NOT NULL,
  due_time TIME,
  status public.deadline_status NOT NULL DEFAULT 'upcoming',
  reminder_days_before INTEGER DEFAULT 3,
  reminded_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deadlines_user_due ON public.deadlines(user_id, due_date)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_deadlines_client ON public.deadlines(client_id)
  WHERE deleted_at IS NULL;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_intake_forms_updated_at ON public.intake_forms;
CREATE TRIGGER trg_intake_forms_updated_at
  BEFORE UPDATE ON public.intake_forms
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS trg_deadlines_updated_at ON public.deadlines;
CREATE TRIGGER trg_deadlines_updated_at
  BEFORE UPDATE ON public.deadlines
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Public lookup by slug (avoids exposing all active forms via broad SELECT policies)
CREATE OR REPLACE FUNCTION public.get_public_intake_form(p_slug text)
RETURNS SETOF public.intake_forms
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT *
  FROM public.intake_forms
  WHERE slug = p_slug
    AND is_active IS TRUE;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_intake_form(text) TO anon, authenticated;

ALTER TABLE public.intake_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deadlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "intake_forms_select_own"
  ON public.intake_forms FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "intake_forms_insert_own"
  ON public.intake_forms FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "intake_forms_update_own"
  ON public.intake_forms FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "intake_forms_delete_own"
  ON public.intake_forms FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "intake_submissions_select_own"
  ON public.intake_submissions FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "intake_submissions_update_own"
  ON public.intake_submissions FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "intake_submissions_insert_public"
  ON public.intake_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.intake_forms f
      WHERE f.id = form_id
        AND f.is_active IS TRUE
        AND f.user_id = intake_submissions.user_id
    )
  );

CREATE POLICY "deadlines_all_own"
  ON public.deadlines FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMENT ON TABLE public.intake_forms IS 'Shareable client intake forms';
COMMENT ON TABLE public.intake_submissions IS 'Submissions for intake forms; user_id is the lawyer who owns the form';
COMMENT ON TABLE public.deadlines IS 'Matter deadlines and calendar items';
