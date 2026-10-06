-- Side table for statute full-text search. Empty on purpose: a generated
-- column on legal_articles would rewrite the embedding heap.
-- Do not apply from this chat. Apply this, then the trigger, then the
-- backfill, and only then the keyword function that reads this table.

CREATE TABLE public.legal_article_fts (
  article_id uuid PRIMARY KEY
    REFERENCES public.legal_articles (id) ON DELETE CASCADE,
  tsv tsvector NOT NULL
);

CREATE INDEX legal_article_fts_tsv_idx
  ON public.legal_article_fts
  USING gin (tsv);

GRANT SELECT ON public.legal_article_fts TO service_role;
