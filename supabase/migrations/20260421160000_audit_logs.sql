-- Audit logs (activity trail)
-- Adds audit_logs table + minimal RLS so clients can insert/read their own rows.

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE SET NULL,

  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,

  description TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created_at
  ON public.audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity
  ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action
  ON public.audit_logs(action);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Read: users can only read their own rows
DROP POLICY IF EXISTS "audit_logs_select_own" ON public.audit_logs;
CREATE POLICY "audit_logs_select_own"
  ON public.audit_logs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Insert: users can only insert rows for themselves
DROP POLICY IF EXISTS "audit_logs_insert_own" ON public.audit_logs;
CREATE POLICY "audit_logs_insert_own"
  ON public.audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Immutable by default
DROP POLICY IF EXISTS "audit_logs_update_none" ON public.audit_logs;
CREATE POLICY "audit_logs_update_none"
  ON public.audit_logs
  FOR UPDATE TO authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "audit_logs_delete_none" ON public.audit_logs;
CREATE POLICY "audit_logs_delete_none"
  ON public.audit_logs
  FOR DELETE TO authenticated
  USING (false);

