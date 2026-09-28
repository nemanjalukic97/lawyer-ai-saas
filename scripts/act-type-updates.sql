-- Owner-run. One batch per execution. Re-run until updated returns 0.
-- Run scripts/act-type-migration.sql first if act_type does not exist yet.
-- The column is already on legal_articles; this statement only fills NULLs.
--
-- Batch size 4000. A read-only SELECT of this SET expression classified all
-- 229,110 rows in 218.5 s (2026-09-28), 0.95 ms/row. 4000 rows is about
-- 3.8 s of classification, leaving headroom for the write under the 8.1 s
-- cancel. 229,110 NULL rows → 58 runs (the last run is smaller). Re-running
-- is safe: a row with a value is no longer NULL.
--
-- SET is the approved title rule: the raw first word, then a non-normative
-- instrument, then the act stem in the first six words. zakonik is tried
-- before zakon. Latin letters are folded to Cyrillic only inside a token
-- that already contains Cyrillic. The first six words are also joined with
-- the spaces removed, so ZAKONBOSNE and ZAKONIKREPUBLIKE match. zakonodavni
-- does not match zakon.
--
-- Classification is computed from the row being updated. FROM is only the
-- batch of ids. The CASE is the same expression that, as a SELECT against
-- the current corpus (229110 rows), returned the counts below. Do not
-- change them. Run the verification SELECT after updated returns 0.

WITH batch AS (
  SELECT id FROM legal_articles WHERE act_type IS NULL LIMIT 4000
),
upd AS (
UPDATE legal_articles AS la
SET act_type = (
  SELECT CASE
      WHEN raw_first IN ('zakon', 'закон', 'zakono') THEN 'zakon'
      WHEN raw_first IN ('правилник', 'pravilniko', 'pravilnik') THEN 'pravilnik'
      WHEN raw_first IN ('уредбу', 'уредба', 'uredba', 'uredbao', 'уредбa') THEN 'uredba'
      WHEN raw_first LIKE 'odluk%' OR raw_first LIKE 'одлук%' THEN 'odluka'
      WHEN raw_first IN ('стратегију', 'програм', 'стратегија', 'акциони', 'program') THEN 'strateski'
      WHEN raw_first = 'упутство' THEN 'uputstvo'
      WHEN raw_first IN ('законик', 'zakoniko') THEN 'zakonik'
      WHEN raw_first IN ('наредба', 'наредбу') THEN 'naredba'
      WHEN raw_first IN ('кодекс', 'kodeks') THEN 'kodeks'
      WHEN raw_first IN ('статут', 'statut', 'statutbrčko', 'statutcentralnog') THEN 'statut'
      WHEN raw_first LIKE 'ustav%' OR raw_first LIKE 'устав%' THEN 'ustav'
      WHEN raw_first IN ('пословник', 'правила', 'pravilaposlovanja') THEN 'pravila'
      WHEN coalesce(words[1], '') IN (
        'zakljucak', 'zakljucakvlade', 'resenje', 'rjesenje', 'smernice', 'deklaracija',
        'rezolucija', 'izvestaj', 'indeksi', 'vodic', 'spisak', 'sporazum', 'sporazuma',
        'sporazumo', 'lista', 'listu', 'liste'
      ) OR coalesce(words[1], '') LIKE 'zakljucak%' THEN 'nenormativno'
      ELSE coalesce(
        (
          SELECT v.act
          FROM (VALUES
            (regexp_instr(spaced, 'zakonik($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin|(?:om|a|u|e)($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin))'), 7, 'zakonik'),
            (regexp_instr(spaced, 'pravilnik($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 9, 'pravilnik'),
            (regexp_instr(spaced, 'strategij($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 8, 'strateski'),
            (regexp_instr(spaced, 'program($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'strateski'),
            (regexp_instr(spaced, 'akcion($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'strateski'),
            (regexp_instr(spaced, 'uputstv($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'uputstvo'),
            (regexp_instr(spaced, 'poslovnik($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 9, 'pravila'),
            (regexp_instr(spaced, 'pravila($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'pravila'),
            (regexp_instr(spaced, 'uredb($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'uredba'),
            (regexp_instr(spaced, 'odluk($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'odluka'),
            (regexp_instr(spaced, 'naredb($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'naredba'),
            (regexp_instr(spaced, 'kodeks($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'kodeks'),
            (regexp_instr(spaced, 'statut($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'statut'),
            (regexp_instr(spaced, 'zakon($|[^a-z]|o($|[^a-z])|bosne|federacij|republik|brcko|crne|srbij|hercegovin|(?:om|a|u|e|i)($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin))'), 5, 'zakon'),
            (regexp_instr(spaced, 'ustav($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'ustav')
          ) AS v(pos, len, act)
          WHERE v.pos > 0
          ORDER BY v.pos, v.len DESC
          LIMIT 1
        ),
        (
          SELECT v.act
          FROM (VALUES
            (regexp_instr(glued, 'zakonik($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin|(?:om|a|u|e)($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin))'), 7, 'zakonik'),
            (regexp_instr(glued, 'pravilnik($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 9, 'pravilnik'),
            (regexp_instr(glued, 'strategij($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 8, 'strateski'),
            (regexp_instr(glued, 'program($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'strateski'),
            (regexp_instr(glued, 'akcion($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'strateski'),
            (regexp_instr(glued, 'uputstv($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'uputstvo'),
            (regexp_instr(glued, 'poslovnik($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 9, 'pravila'),
            (regexp_instr(glued, 'pravila($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 7, 'pravila'),
            (regexp_instr(glued, 'uredb($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'uredba'),
            (regexp_instr(glued, 'odluk($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'odluka'),
            (regexp_instr(glued, 'naredb($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'naredba'),
            (regexp_instr(glued, 'kodeks($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'kodeks'),
            (regexp_instr(glued, 'statut($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 6, 'statut'),
            (regexp_instr(glued, 'zakon($|[^a-z]|o($|[^a-z])|bosne|federacij|republik|brcko|crne|srbij|hercegovin|(?:om|a|u|e|i)($|[^a-z]|bosne|federacij|republik|brcko|crne|srbij|hercegovin))'), 5, 'zakon'),
            (regexp_instr(glued, 'ustav($|[^a-z]|(?:om|a|u|e|i|oj)($|[^a-z]))'), 5, 'ustav')
          ) AS v(pos, len, act)
          WHERE v.pos > 0
          ORDER BY v.pos, v.len DESC
          LIMIT 1
        ),
        'neodredjeno'
      )
    END
  FROM (
    SELECT
      lower(regexp_replace(
        split_part(
          regexp_replace(coalesce(la.law_name_local, ''), '^[[:space:]"''„“«‚‘»]+', ''),
          ' ',
          1
        ),
        '[.,:;–—-]+$',
        ''
      )) AS raw_first,
      (
        SELECT coalesce(array_agg(folded ORDER BY ord), ARRAY[]::text[])
        FROM (
          SELECT ord,
            translate(
              replace(replace(replace(replace(replace(
                CASE
                  WHEN lower(m[1]) ~ '[а-яђјљњћџ]'
                    THEN translate(lower(m[1]), 'aeocpxykmthb', 'аеосрхукмтнв')
                  ELSE lower(m[1])
                END,
              'ђ', 'dj'), 'љ', 'lj'), 'њ', 'nj'), 'џ', 'dz'), 'đ', 'dj'),
              'абвгдежзијклмнопрстћуфхцчшčćšž',
              'abvgdezzijklmnoprstcufhccsccsz'
            ) AS folded
          FROM regexp_matches(
            coalesce(la.law_name_local, ''),
            '[0-9A-Za-zČčĆćŠšŽžĐđЀ-ӿ]+',
            'g'
          ) WITH ORDINALITY AS r(m, ord)
        ) tok
      ) AS words
  ) prep
  CROSS JOIN LATERAL (
    SELECT
      array_to_string(prep.words[1:6], ' ') AS spaced,
      array_to_string(prep.words[1:6], '') AS glued
  ) t
)
FROM batch b
WHERE la.id = b.id
RETURNING 1
)
SELECT count(*) AS updated FROM upd;

-- After updated = 0:
SELECT
  count(*) FILTER (WHERE act_type = 'zakon') AS zakon,
  count(*) FILTER (WHERE act_type = 'pravilnik') AS pravilnik,
  count(*) FILTER (WHERE act_type = 'uredba') AS uredba,
  count(*) FILTER (WHERE act_type = 'odluka') AS odluka,
  count(*) FILTER (WHERE act_type = 'strateski') AS strateski,
  count(*) FILTER (WHERE act_type = 'zakonik') AS zakonik,
  count(*) FILTER (WHERE act_type = 'neodredjeno') AS neodredjeno,
  count(*) FILTER (WHERE act_type = 'nenormativno') AS nenormativno,
  count(*) FILTER (WHERE act_type = 'uputstvo') AS uputstvo,
  count(*) FILTER (WHERE act_type = 'statut') AS statut,
  count(*) FILTER (WHERE act_type = 'pravila') AS pravila,
  count(*) FILTER (WHERE act_type = 'ustav') AS ustav,
  count(*) FILTER (WHERE act_type = 'kodeks') AS kodeks,
  count(*) FILTER (WHERE act_type = 'naredba') AS naredba,
  count(*) FILTER (WHERE act_type IS NULL) AS null_rows
FROM legal_articles;
