-- Bank account settings + invoice sending/paid tracking
-- Requires pgcrypto for gen_random_uuid (enabled by default on Supabase).

-- 1) Bank accounts (firm-scoped or user-scoped)
CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  iban TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  swift_bic TEXT,
  currency TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_user ON public.bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_firm ON public.bank_accounts(law_firm_id);

-- Only one default per scope
CREATE UNIQUE INDEX IF NOT EXISTS uniq_bank_accounts_default_user
  ON public.bank_accounts(user_id)
  WHERE is_default IS TRUE AND law_firm_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_bank_accounts_default_firm
  ON public.bank_accounts(law_firm_id)
  WHERE is_default IS TRUE AND law_firm_id IS NOT NULL;

DROP TRIGGER IF EXISTS trg_bank_accounts_updated_at ON public.bank_accounts;
CREATE TRIGGER trg_bank_accounts_updated_at
  BEFORE UPDATE ON public.bank_accounts
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

COMMENT ON TABLE public.bank_accounts IS 'Saved bank transfer details (user or firm scope)';

-- 2) Invoices: sent/paid metadata and bank reference
ALTER TABLE public.invoices
  ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_reference TEXT,
  ADD COLUMN IF NOT EXISTS bank_account_id UUID REFERENCES public.bank_accounts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_invoices_status_user ON public.invoices(user_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_status_firm ON public.invoices(law_firm_id, status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);

-- 3) Clients: preferred language for localized invoice emails/PDF
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS preferred_language TEXT;

-- 4) RLS
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

-- bank_accounts policies
DROP POLICY IF EXISTS "bank_accounts_select_scope" ON public.bank_accounts;
CREATE POLICY "bank_accounts_select_scope"
  ON public.bank_accounts
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "bank_accounts_insert_scope" ON public.bank_accounts;
CREATE POLICY "bank_accounts_insert_scope"
  ON public.bank_accounts
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "bank_accounts_update_scope" ON public.bank_accounts;
CREATE POLICY "bank_accounts_update_scope"
  ON public.bank_accounts
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "bank_accounts_delete_scope" ON public.bank_accounts;
CREATE POLICY "bank_accounts_delete_scope"
  ON public.bank_accounts
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

-- invoices policies (if invoices already have RLS/policies elsewhere, these are idempotent)
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "invoices_select_scope" ON public.invoices;
CREATE POLICY "invoices_select_scope"
  ON public.invoices
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "invoices_insert_scope" ON public.invoices;
CREATE POLICY "invoices_insert_scope"
  ON public.invoices
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "invoices_update_scope" ON public.invoices;
CREATE POLICY "invoices_update_scope"
  ON public.invoices
  FOR UPDATE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "invoices_delete_scope" ON public.invoices;
CREATE POLICY "invoices_delete_scope"
  ON public.invoices
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

