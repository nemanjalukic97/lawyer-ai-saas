-- Widen case_predictions.case_type so the predictions UI can store
-- property / inheritance / procedural (today the enum is only
-- civil, commercial, labor, family, criminal, administrative, misdemeanor).
--
-- APPLY IN THE SUPABASE SQL EDITOR as three separate statements.
-- ADD VALUE cannot run inside a block that also uses the new labels, and
-- some dashboard pastes wrap the whole script in a transaction — paste
-- one ALTER at a time if the editor errors.
--
-- Safe to re-run: IF NOT EXISTS.

ALTER TYPE case_type ADD VALUE IF NOT EXISTS 'property';
ALTER TYPE case_type ADD VALUE IF NOT EXISTS 'inheritance';
ALTER TYPE case_type ADD VALUE IF NOT EXISTS 'procedural';
