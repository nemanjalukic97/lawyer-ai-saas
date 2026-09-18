-- =============================================================================
-- BLOCK 1 of 2 — RUN THIS SCRIPT ALONE, THEN STOP.
--
-- Do not paste Block 2 into the same Supabase SQL-editor run.
-- The editor wraps the whole script in one transaction. ALTER TYPE ... ADD
-- VALUE cannot share that transaction with any statement that uses the new
-- labels. We have been bitten by this (same class of failure as CONCURRENTLY).
--
-- Order: this file first; wait for success; then
--   20260918140100_deadline_reminder_sends.sql
-- =============================================================================

ALTER TYPE public.deadline_type ADD VALUE IF NOT EXISTS 'claim';
ALTER TYPE public.deadline_type ADD VALUE IF NOT EXISTS 'objection';
ALTER TYPE public.deadline_type ADD VALUE IF NOT EXISTS 'court_advance';
