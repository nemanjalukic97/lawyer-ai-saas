-- Invoice reminder selection + tracking columns
-- Used by the daily cron job to find invoices that should receive a reminder today.

ALTER TABLE public.invoices
  ADD COLUMN IF NOT EXISTS reminder_1_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_2_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reminder_3_sent_at TIMESTAMPTZ;

-- Optional index to speed up selection of sent invoices (idempotent).
CREATE INDEX IF NOT EXISTS idx_invoices_sent_status_sent_at
  ON public.invoices(status, sent_at)
  WHERE deleted_at IS NULL;

CREATE OR REPLACE FUNCTION public.get_invoices_due_for_reminder()
RETURNS TABLE (
  invoice_id uuid,
  user_id uuid,
  law_firm_id uuid,
  client_id uuid,
  invoice_number text,
  sent_at timestamptz,
  due_date date,
  total_amount numeric,
  currency text,
  payment_reference text,
  bank_account_id uuid,
  reminder_number integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    i.id AS invoice_id,
    i.user_id,
    i.law_firm_id,
    i.client_id,
    i.invoice_number,
    i.sent_at,
    i.due_date,
    i.total_amount,
    i.currency,
    i.payment_reference,
    i.bank_account_id,
    CASE
      WHEN (i.sent_at + interval '14 days') <= now() AND i.reminder_3_sent_at IS NULL THEN 3
      WHEN (i.sent_at + interval '7 days')  <= now() AND i.reminder_2_sent_at IS NULL THEN 2
      WHEN (i.sent_at + interval '3 days')  <= now() AND i.reminder_1_sent_at IS NULL THEN 1
      ELSE NULL
    END AS reminder_number
  FROM public.invoices i
  JOIN public.clients c ON c.id = i.client_id
  WHERE i.deleted_at IS NULL
    AND i.status = 'sent'
    AND i.sent_at IS NOT NULL
    AND c.deleted_at IS NULL
    AND c.email IS NOT NULL
    AND (
      ((i.sent_at + interval '3 days')  <= now() AND i.reminder_1_sent_at IS NULL)
      OR ((i.sent_at + interval '7 days')  <= now() AND i.reminder_2_sent_at IS NULL)
      OR ((i.sent_at + interval '14 days') <= now() AND i.reminder_3_sent_at IS NULL)
    );
$$;

GRANT EXECUTE ON FUNCTION public.get_invoices_due_for_reminder() TO authenticated;

