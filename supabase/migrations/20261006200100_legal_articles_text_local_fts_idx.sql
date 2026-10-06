-- Full-corpus expression GIN. Run only after 20261006200000 has dropped
-- legal_article_fts, and only as its own statement: CREATE INDEX
-- CONCURRENTLY cannot run inside a transaction block.
--
-- Before this statement, as its own paste:
--   SET statement_timeout = '0';
-- The SQL editor's default timeout will cancel the build.
--
-- to_tsvector(regconfig, text) is IMMUTABLE. to_tsvector(text) is STABLE
-- and cannot be indexed. The keyword function uses this same expression.
--
-- Abort the build if free space would fall under 2 GB. On an 18 GB volume
-- with 7.1 GB free the projected trough is about 5 GB (index ~185 MB,
-- sort spill under 2 GB, WAL ~200 MB).

CREATE INDEX CONCURRENTLY legal_articles_text_local_fts_idx
  ON public.legal_articles
  USING gin (to_tsvector('simple'::regconfig, text_local))
  WHERE text_local IS NOT NULL;
