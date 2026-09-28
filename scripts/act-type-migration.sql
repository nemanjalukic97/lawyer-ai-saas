-- Owner-run. Adds act_type. Does not backfill; that is scripts/act-type-updates.sql.
-- A second run is a no-op.
--
-- No index. Keyword search reaches a row through text_local ILIKE, which
-- uses the trigram index, and vector search uses the HNSW index. Both
-- then keep jurisdiction = the selected one. act_type would be a filter
-- on rows already found that way. Dropping a minority of types (or keeping
-- almost every row) is not a lookup the btree can serve: (jurisdiction,
-- act_type) supports equality on a type, and the category index exists
-- because a positive law_category filter keeps a few percent of the corpus.
-- This column is not that filter.

ALTER TABLE legal_articles
  ADD COLUMN IF NOT EXISTS act_type TEXT;
