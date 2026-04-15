-- Allow draft invoices without a linked CRM client (e.g. from time entries with no client_id).
ALTER TABLE public.invoices
  ALTER COLUMN client_id DROP NOT NULL;
