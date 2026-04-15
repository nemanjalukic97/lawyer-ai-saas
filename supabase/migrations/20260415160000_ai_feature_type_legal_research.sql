-- Extend ai_feature_type enum for Legal Research usage tracking
-- Note: Postgres enums require separate migration steps.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'ai_feature_type'
      AND e.enumlabel = 'legal_research'
  ) THEN
    ALTER TYPE public.ai_feature_type ADD VALUE 'legal_research';
  END IF;
END $$;

