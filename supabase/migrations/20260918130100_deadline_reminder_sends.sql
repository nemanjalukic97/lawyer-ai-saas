-- =============================================================================
-- BLOCK 2 of 2 — RUN ONLY AFTER BLOCK 1 HAS COMMITTED SUCCESSFULLY.
--
-- File: 20260918130000_deadline_type_add_values.sql  (must already have run)
-- This block: per-kind reminder tracking, new RPC, deploy-blast backfill.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.deadline_reminder_sends (
  deadline_id uuid NOT NULL REFERENCES public.deadlines(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('7d', '1d')),
  sent_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (deadline_id, kind)
);

COMMENT ON TABLE public.deadline_reminder_sends IS
  'One row per (deadline, reminder kind). Primary key is the double-send invariant.';

ALTER TABLE public.deadline_reminder_sends ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.deadline_reminder_sends FROM PUBLIC;
REVOKE ALL ON TABLE public.deadline_reminder_sends FROM anon;
REVOKE ALL ON TABLE public.deadline_reminder_sends FROM authenticated;
GRANT ALL ON TABLE public.deadline_reminder_sends TO service_role;

-- Deploy-blast prevention: anything already inside the 7-day window (due today
-- through +6 days, or overdue) must not receive a "7-day" email when this
-- ships. Exact due_date = current_date + 7 is intentionally NOT backfilled.
INSERT INTO public.deadline_reminder_sends (deadline_id, kind)
SELECT d.id, '7d'
FROM public.deadlines d
WHERE d.due_date < (CURRENT_DATE + 7)
ON CONFLICT (deadline_id, kind) DO NOTHING;

-- Preserve history from the old single-shot column.
INSERT INTO public.deadline_reminder_sends (deadline_id, kind, sent_at)
SELECT d.id, '1d', d.reminded_at
FROM public.deadlines d
WHERE d.reminded_at IS NOT NULL
ON CONFLICT (deadline_id, kind) DO NOTHING;

-- Return type changes (reminder_kind instead of reminder_days_before).
DROP FUNCTION IF EXISTS public.get_deadlines_due_for_reminder();

CREATE FUNCTION public.get_deadlines_due_for_reminder()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  law_firm_id uuid,
  client_id uuid,
  matter_id uuid,
  title text,
  deadline_type public.deadline_type,
  due_date date,
  reminder_kind text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    d.id,
    d.user_id,
    d.law_firm_id,
    d.client_id,
    d.matter_id,
    d.title,
    d.deadline_type,
    d.due_date,
    '7d'::text AS reminder_kind
  FROM public.deadlines d
  WHERE d.deleted_at IS NULL
    AND d.status = 'upcoming'
    AND d.due_date = (CURRENT_DATE + 7)
    AND NOT EXISTS (
      SELECT 1
      FROM public.deadline_reminder_sends s
      WHERE s.deadline_id = d.id
        AND s.kind = '7d'
    )
  UNION ALL
  SELECT
    d.id,
    d.user_id,
    d.law_firm_id,
    d.client_id,
    d.matter_id,
    d.title,
    d.deadline_type,
    d.due_date,
    '1d'::text AS reminder_kind
  FROM public.deadlines d
  WHERE d.deleted_at IS NULL
    AND d.status = 'upcoming'
    AND d.due_date = (CURRENT_DATE + 1)
    AND NOT EXISTS (
      SELECT 1
      FROM public.deadline_reminder_sends s
      WHERE s.deadline_id = d.id
        AND s.kind = '1d'
    );
$$;

REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM anon;
REVOKE ALL ON FUNCTION public.get_deadlines_due_for_reminder() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.get_deadlines_due_for_reminder() TO service_role;
