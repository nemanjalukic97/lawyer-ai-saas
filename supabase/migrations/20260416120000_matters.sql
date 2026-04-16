-- Matters (case management) + optional linking across core tables
-- Adds: public.matters, enums, scoped matter numbers, RLS, and matter_id FKs.

-- 1) Enums (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'matter_type') THEN
    CREATE TYPE public.matter_type AS ENUM (
      'civil',
      'criminal',
      'family',
      'labor',
      'commercial',
      'administrative',
      'other'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'matter_status') THEN
    CREATE TYPE public.matter_status AS ENUM (
      'open',
      'closed',
      'on_hold',
      'archived'
    );
  END IF;
END$$;

-- 2) matters table
CREATE TABLE IF NOT EXISTS public.matters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  matter_number TEXT NOT NULL,
  matter_type public.matter_type NOT NULL DEFAULT 'other',
  jurisdiction public.jurisdiction NOT NULL,
  status public.matter_status NOT NULL DEFAULT 'open',
  description TEXT,
  opened_at DATE NOT NULL DEFAULT CURRENT_DATE,
  closed_at DATE,
  deleted_at TIMESTAMPTZ,
  deleted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.matters IS 'Matters (predmeti): primary organizational unit linking work (contracts, docs, deadlines, time, billing, predictions).';

-- Keep updated_at consistent with other tables (function defined in earlier migration)
DROP TRIGGER IF EXISTS trg_matters_updated_at ON public.matters;
CREATE TRIGGER trg_matters_updated_at
  BEFORE UPDATE ON public.matters
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- 3) Matter number generation (MAT-YYYY-SEQ) scoped to firm or solo user
CREATE OR REPLACE FUNCTION public.generate_matter_number(
  p_user_id uuid,
  p_law_firm_id uuid,
  p_opened_at date
) RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_year int;
  v_prefix text;
  v_max_seq int;
BEGIN
  v_year := EXTRACT(YEAR FROM COALESCE(p_opened_at, CURRENT_DATE));
  v_prefix := 'MAT-' || v_year::text || '-';

  IF p_law_firm_id IS NULL THEN
    SELECT COALESCE(MAX(
      NULLIF(
        SUBSTRING(m.matter_number FROM 'MAT-\\d{4}-(\\d+)$'),
        ''
      )::int
    ), 0)
    INTO v_max_seq
    FROM public.matters m
    WHERE m.user_id = p_user_id
      AND m.law_firm_id IS NULL
      AND m.matter_number LIKE (v_prefix || '%');
  ELSE
    SELECT COALESCE(MAX(
      NULLIF(
        SUBSTRING(m.matter_number FROM 'MAT-\\d{4}-(\\d+)$'),
        ''
      )::int
    ), 0)
    INTO v_max_seq
    FROM public.matters m
    WHERE m.law_firm_id = p_law_firm_id
      AND m.matter_number LIKE (v_prefix || '%');
  END IF;

  RETURN v_prefix || LPAD((v_max_seq + 1)::text, 3, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.set_matter_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.matter_number IS NULL OR BTRIM(NEW.matter_number) = '' THEN
    NEW.matter_number := public.generate_matter_number(
      NEW.user_id,
      NEW.law_firm_id,
      NEW.opened_at
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_matters_set_matter_number ON public.matters;
CREATE TRIGGER trg_matters_set_matter_number
  BEFORE INSERT ON public.matters
  FOR EACH ROW EXECUTE PROCEDURE public.set_matter_number();

-- 4) Indexes
CREATE INDEX IF NOT EXISTS idx_matters_user_status
  ON public.matters(user_id, status)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_matters_firm_status
  ON public.matters(law_firm_id, status)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_matters_client_id
  ON public.matters(client_id)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_matters_opened_at
  ON public.matters(opened_at DESC)
  WHERE deleted_at IS NULL;

-- Uniqueness for matter_number per scope
CREATE UNIQUE INDEX IF NOT EXISTS idx_matters_user_matter_number_unique
  ON public.matters(user_id, matter_number)
  WHERE law_firm_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_matters_firm_matter_number_unique
  ON public.matters(law_firm_id, matter_number)
  WHERE law_firm_id IS NOT NULL;

-- 5) Optional linking across core tables (nullable matter_id)
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.documents
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.time_entries
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.invoices
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.deadlines
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.case_predictions
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;
ALTER TABLE public.document_analyses
  ADD COLUMN IF NOT EXISTS matter_id UUID REFERENCES public.matters(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_contracts_matter_id
  ON public.contracts(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_documents_matter_id
  ON public.documents(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_time_entries_matter_id
  ON public.time_entries(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_invoices_matter_id
  ON public.invoices(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_deadlines_matter_id
  ON public.deadlines(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_case_predictions_matter_id
  ON public.case_predictions(matter_id)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_document_analyses_matter_id
  ON public.document_analyses(matter_id)
  WHERE deleted_at IS NULL;

-- 6) RLS for matters (firm + user scope)
ALTER TABLE public.matters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "matters_select_scope" ON public.matters;
CREATE POLICY "matters_select_scope"
  ON public.matters
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "matters_insert_scope" ON public.matters;
CREATE POLICY "matters_insert_scope"
  ON public.matters
  FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    AND (
      law_firm_id IS NULL
      OR law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "matters_update_scope" ON public.matters;
CREATE POLICY "matters_update_scope"
  ON public.matters
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
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

DROP POLICY IF EXISTS "matters_delete_scope" ON public.matters;
CREATE POLICY "matters_delete_scope"
  ON public.matters
  FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR (
      law_firm_id IS NOT NULL
      AND law_firm_id = public.user_law_firm_id()
    )
  );

