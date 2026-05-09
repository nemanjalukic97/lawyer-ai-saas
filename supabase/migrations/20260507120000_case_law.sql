-- ============================================================
-- MIGRATION: case_law
-- Sudska praksa za sve jurisdikcije Legantis platforme
-- Srbija, Hrvatska, BiH FBiH, BiH RS, BiH Brčko, Crna Gora, Slovenija
-- ============================================================

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.case_law (
  id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  jurisdiction      TEXT        NOT NULL CHECK (jurisdiction IN (
                                  'serbia', 'croatia', 'bih_fbih', 'bih_rs',
                                  'bih_brcko', 'bih_state', 'montenegro', 'slovenia'
                                )),
  court             TEXT        NOT NULL,
  court_level       TEXT        NOT NULL CHECK (court_level IN (
                                  'supreme', 'appellate', 'high',
                                  'basic', 'constitutional', 'administrative'
                                )),
  case_number       TEXT        NOT NULL,
  decision_date     DATE,
  legal_area        TEXT        NOT NULL CHECK (legal_area IN (
                                  'labor', 'civil', 'commercial', 'family',
                                  'criminal', 'administrative', 'constitutional',
                                  'procedural', 'enforcement', 'inheritance'
                                )),
  legal_question    TEXT        NOT NULL,
  court_position    TEXT        NOT NULL,
  reasoning         TEXT        NOT NULL,
  keywords          TEXT[],
  related_articles  TEXT[],
  headnote          TEXT,
  outcome           TEXT CHECK (outcome IN (
                      'plaintiff_won', 'defendant_won', 'partially',
                      'procedural', 'remanded'
                    )),
  embedding         vector(1536),
  source_url        TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS case_law_embedding_idx
  ON public.case_law
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS case_law_jurisdiction_idx
  ON public.case_law (jurisdiction);

CREATE INDEX IF NOT EXISTS case_law_jurisdiction_area_idx
  ON public.case_law (jurisdiction, legal_area);

CREATE INDEX IF NOT EXISTS case_law_court_idx
  ON public.case_law (court);

CREATE INDEX IF NOT EXISTS case_law_case_number_idx
  ON public.case_law (case_number);

CREATE INDEX IF NOT EXISTS case_law_decision_date_idx
  ON public.case_law (decision_date DESC);

CREATE INDEX IF NOT EXISTS case_law_keywords_idx
  ON public.case_law USING GIN (keywords);

CREATE INDEX IF NOT EXISTS case_law_related_articles_idx
  ON public.case_law USING GIN (related_articles);

CREATE OR REPLACE FUNCTION public.update_case_law_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS case_law_updated_at_trigger ON public.case_law;
CREATE TRIGGER case_law_updated_at_trigger
  BEFORE UPDATE ON public.case_law
  FOR EACH ROW
  EXECUTE FUNCTION public.update_case_law_updated_at();

CREATE OR REPLACE FUNCTION public.match_case_law(
  query_embedding       vector(1536),
  filter_jurisdiction   TEXT,
  filter_legal_area     TEXT    DEFAULT NULL,
  filter_court_level    TEXT    DEFAULT NULL,
  match_count           INT     DEFAULT 6,
  similarity_threshold  FLOAT   DEFAULT 0.30
)
RETURNS TABLE (
  id                UUID,
  jurisdiction      TEXT,
  court             TEXT,
  court_level       TEXT,
  case_number       TEXT,
  decision_date     DATE,
  legal_area        TEXT,
  legal_question    TEXT,
  court_position    TEXT,
  reasoning         TEXT,
  keywords          TEXT[],
  related_articles  TEXT[],
  headnote          TEXT,
  outcome           TEXT,
  source_url        TEXT,
  similarity        FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cl.id,
    cl.jurisdiction,
    cl.court,
    cl.court_level,
    cl.case_number,
    cl.decision_date,
    cl.legal_area,
    cl.legal_question,
    cl.court_position,
    cl.reasoning,
    cl.keywords,
    cl.related_articles,
    cl.headnote,
    cl.outcome,
    cl.source_url,
    1 - (cl.embedding <=> query_embedding) AS similarity
  FROM public.case_law cl
  WHERE
    cl.jurisdiction = filter_jurisdiction
    AND (filter_legal_area  IS NULL OR cl.legal_area  = filter_legal_area)
    AND (filter_court_level IS NULL OR cl.court_level = filter_court_level)
    AND cl.embedding IS NOT NULL
    AND 1 - (cl.embedding <=> query_embedding) >= similarity_threshold
  ORDER BY cl.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.match_case_law_multi(
  query_embedding       vector(1536),
  filter_jurisdictions  TEXT[],
  filter_legal_area     TEXT    DEFAULT NULL,
  match_count           INT     DEFAULT 10,
  similarity_threshold  FLOAT   DEFAULT 0.30
)
RETURNS TABLE (
  id                UUID,
  jurisdiction      TEXT,
  court             TEXT,
  court_level       TEXT,
  case_number       TEXT,
  decision_date     DATE,
  legal_area        TEXT,
  legal_question    TEXT,
  court_position    TEXT,
  headnote          TEXT,
  outcome           TEXT,
  source_url        TEXT,
  similarity        FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cl.id,
    cl.jurisdiction,
    cl.court,
    cl.court_level,
    cl.case_number,
    cl.decision_date,
    cl.legal_area,
    cl.legal_question,
    cl.court_position,
    cl.headnote,
    cl.outcome,
    cl.source_url,
    1 - (cl.embedding <=> query_embedding) AS similarity
  FROM public.case_law cl
  WHERE
    cl.jurisdiction = ANY(filter_jurisdictions)
    AND (filter_legal_area IS NULL OR cl.legal_area = filter_legal_area)
    AND cl.embedding IS NOT NULL
    AND 1 - (cl.embedding <=> query_embedding) >= similarity_threshold
  ORDER BY cl.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

ALTER TABLE public.case_law ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access to case_law" ON public.case_law;
CREATE POLICY "Public read access to case_law"
  ON public.case_law FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role insert case_law" ON public.case_law;
CREATE POLICY "Service role insert case_law"
  ON public.case_law FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service role update case_law" ON public.case_law;
CREATE POLICY "Service role update case_law"
  ON public.case_law FOR UPDATE USING (true);

CREATE OR REPLACE VIEW public.case_law_stats AS
SELECT
  jurisdiction,
  legal_area,
  court_level,
  COUNT(*)                                          AS total_cases,
  COUNT(*) FILTER (WHERE embedding IS NOT NULL)    AS embedded_cases,
  COUNT(*) FILTER (WHERE embedding IS NULL)        AS pending_embedding,
  MIN(decision_date)                               AS oldest_decision,
  MAX(decision_date)                               AS newest_decision,
  MAX(created_at)                                  AS last_ingested
FROM public.case_law
GROUP BY jurisdiction, legal_area, court_level
ORDER BY jurisdiction, legal_area, court_level;

COMMENT ON TABLE public.case_law IS
  'Sudska praksa za sve jurisdikcije Legantis platforme.';
