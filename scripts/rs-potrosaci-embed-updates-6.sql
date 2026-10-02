-- Owner-run. Part 6 of 6. Verification only. No writes.
-- Run after parts 1–5. Safe to re-run.

SELECT
  count(*) AS rows,
  count(*) FILTER (WHERE text IS DISTINCT FROM COALESCE(text_local, '')) AS curated,
  count(*) FILTER (WHERE embedding IS NOT NULL) AS has_embedding
FROM legal_articles
WHERE jurisdiction = 'serbia'
  AND law_name_local = 'ЗАКОН о заштити потрошача';
-- Expect rows 220, curated 220, has_embedding 220.
