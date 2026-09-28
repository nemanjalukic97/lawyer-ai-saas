-- Run only after scripts/rs-potrosaci-insert.sql has been verified.
-- The verification SELECT must show curated = 220 before this DELETE.
-- Expect 138 rows. A second run affects 0 rows.
-- Matches the bulk excerpts only: text is not distinct from text_local,
-- and effective_date is null. The 220 curated articles are not matched.

DELETE FROM legal_articles
WHERE jurisdiction = 'serbia'
  AND law_name_local = $law$ЗАКОН о заштити потрошача$law$
  AND text IS NOT DISTINCT FROM text_local
  AND effective_date IS NULL;
