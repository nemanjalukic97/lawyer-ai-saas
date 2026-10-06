-- Drop the side table. An expression GIN index replaces it.
-- Nemanja runs this in the SQL editor. It is not run from the app.
--
-- Order: the trigger first, then its function, then the table.
-- DROP TABLE unlinks the heap, the toast, and legal_article_fts_tsv_idx.
-- It does not rewrite those bytes into WAL.
-- Measured just before this file was written: 98,000 rows, 345,358,336 bytes.

DROP TRIGGER IF EXISTS legal_article_fts_sync ON public.legal_articles;

DROP FUNCTION IF EXISTS public.legal_article_fts_sync();

DROP TABLE IF EXISTS public.legal_article_fts;
