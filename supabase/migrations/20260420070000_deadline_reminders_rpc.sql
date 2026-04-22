-- Deadline reminder selection RPC
-- Used by the daily cron job to find deadlines that should receive a reminder today.

CREATE OR REPLACE FUNCTION public.get_deadlines_due_for_reminder()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  law_firm_id uuid,
  client_id uuid,
  matter_id uuid,
  title text,
  deadline_type public.deadline_type,
  due_date date,
  reminder_days_before integer
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
    d.reminder_days_before
  FROM public.deadlines d
  WHERE d.deleted_at IS NULL
    AND d.status = 'upcoming'
    AND d.reminded_at IS NULL
    AND d.reminder_days_before IS NOT NULL
    AND d.reminder_days_before >= 0
    AND d.due_date = (current_date + d.reminder_days_before);
$$;

GRANT EXECUTE ON FUNCTION public.get_deadlines_due_for_reminder() TO authenticated;

