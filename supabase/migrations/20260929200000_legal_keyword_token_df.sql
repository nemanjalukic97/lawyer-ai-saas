-- Persisted document frequency for keyword IDF weights.
-- Key: (jurisdiction, needle). `needle` is the canonical sorted list of
-- scoring forms for one content token (variants ∪ stems), joined with
-- U+001F — not a single surface alone, so the stored df matches the
-- exact ILIKE ANY count the scorer uses.
-- Do not apply from the agent. Owner applies in the SQL editor / CLI.
-- Service role reads and upserts from lib/legalRag.ts. No anon/authenticated
-- access — this is not a user-facing table.

CREATE TABLE IF NOT EXISTS public.legal_keyword_token_df (
  jurisdiction text NOT NULL,
  needle text NOT NULL,
  df integer NOT NULL CHECK (df >= 0),
  computed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (jurisdiction, needle)
);

COMMENT ON TABLE public.legal_keyword_token_df IS
  'Cached ILIKE document frequency per jurisdiction and keyword scoring-needle set for IDF weights.';

COMMENT ON COLUMN public.legal_keyword_token_df.needle IS
  'Canonical key: sorted unique scoring needles (variants ∪ stems) joined by U+001F.';

CREATE INDEX IF NOT EXISTS legal_keyword_token_df_computed_at_idx
  ON public.legal_keyword_token_df (computed_at);

ALTER TABLE public.legal_keyword_token_df ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.legal_keyword_token_df FROM PUBLIC;
REVOKE ALL ON TABLE public.legal_keyword_token_df FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.legal_keyword_token_df TO service_role;

-- After corpus ingest for a jurisdiction, refresh manually (df only grows
-- or shrinks with the corpus; the app does not invalidate automatically):
--
--   DELETE FROM public.legal_keyword_token_df WHERE jurisdiction = 'serbia';
--
-- Or clear everything:
--
--   TRUNCATE public.legal_keyword_token_df;
