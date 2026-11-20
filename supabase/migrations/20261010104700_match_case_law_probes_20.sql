-- match_case_law_multi is deliberately not in this migration. It queries
-- jurisdiction = ANY(filter_jurisdictions), which cannot use any of the seven
-- partial per-jurisdiction indexes, so with the global index gone it
-- sequential-scans. It is called from no TypeScript, and its fate is a
-- separate decision.

CREATE OR REPLACE FUNCTION public.match_case_law(query_embedding vector, filter_jurisdiction text, filter_legal_area text DEFAULT NULL::text, filter_court_level text DEFAULT NULL::text, match_count integer DEFAULT 6, similarity_threshold double precision DEFAULT 0.30)
 RETURNS TABLE(id uuid, jurisdiction text, court text, court_level text, case_number text, decision_date date, legal_area text, legal_question text, court_position text, reasoning text, keywords text[], related_articles text[], headnote text, outcome text, source_url text, similarity double precision)
 LANGUAGE plpgsql
 SET plan_cache_mode TO 'force_custom_plan'
AS $function$
BEGIN
  -- ivfflat.probes = 20 postavljen 2026-10-10 mjerenjem, ne izborom. Sedam parcijalnih
  -- indeksa po jurisdikcijama; recall prema tacnih deset najblizih: Hrvatska ocinstvo
  -- 10/10 na 20 i 8/10 na 10, Crna Gora ocinstvo 10/10 na 10, Crna Gora suvlasnistvo
  -- 10/10 na 2. 20 je najniza vrijednost sa 10/10 na sva tri. Dokaz su tri upita; upit
  -- kojem treba 30 nije iskljucen. Ne snizavati bez ponovnog mjerenja.
  -- Mora biti SET LOCAL u tijelu, ne funkcijski SET: funkcijski se validira u trenutku
  -- CREATE, a ivfflat.probes je custom GUC koji postoji samo kad je pgvector ucitan u
  -- backend, pa iz hladne sesije pada sa 42501 i migracija nije ponovljiva.
  -- force_custom_plan: filter_jurisdiction odlucuje koji parcijalni indeks vazi, pa bi
  -- genericki plan na sestom izvrsavanju uzeo pogresan. Izmjereno na keyword putanji:
  -- 14,5 s prema 473 ms.
  SET LOCAL ivfflat.probes = 20;

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
$function$;
