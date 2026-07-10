/**
 * Read-only research latency matrix against production data.
 * Measures embed / vector RPC / keyword / merge+rerank / total per cell.
 *
 * Usage: node --env-file=.env.local --import tsx scripts/bench-research-latency.mjs
 */
import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"
import { buildKeywordIlikePatterns } from "../lib/keywordVariants.ts"

const QUERIES = [
  "otkaz ugovora o radu",
  "naknada štete zbog povrede",
  "ugovor o prodaji nekretnine",
]

const JURISDICTIONS = ["serbia", "croatia", "bih_rs", "slovenia"]
const SCOPES = ["statutes", "case_law"]
const MATCH_COUNT = 10
const KEYWORD_TIMEOUT_MS = 8000

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function allIlikePatterns(query) {
  const p = buildKeywordIlikePatterns(query)
  return [...p.exactPatterns, ...p.stemPatterns]
}

async function embed(text) {
  const t0 = Date.now()
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  })
  return { embedding: res.data[0].embedding, embedMs: Date.now() - t0 }
}

async function withTimeout(promise, ms, label) {
  let timer
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timeout after ${ms}ms`)),
          ms,
        )
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

async function keywordStatutes(query, jurisdiction) {
  const patterns = allIlikePatterns(query)
  if (patterns.length === 0) return { ms: 0, timedOut: false, rows: 0 }
  const orFilter = patterns.map((p) => `text_local.ilike.${p}`).join(",")
  const t0 = Date.now()
  try {
    const { data, error } = await withTimeout(
      supabase
        .from("legal_articles")
        .select(
          "id, jurisdiction, law_name, law_name_local, law_category, article_num, paragraph_num, text, text_local, source_url",
        )
        .eq("jurisdiction", jurisdiction)
        .or(orFilter)
        .limit(30),
      KEYWORD_TIMEOUT_MS,
      "keyword legal search",
    )
    if (error) throw new Error(error.message)
    return {
      ms: Date.now() - t0,
      timedOut: false,
      rows: data?.length ?? 0,
    }
  } catch (err) {
    return {
      ms: Date.now() - t0,
      timedOut: /timeout/i.test(String(err.message ?? err)),
      rows: 0,
      error: String(err.message ?? err),
    }
  }
}

async function keywordCaseLaw(query, jurisdiction) {
  // Same pattern set as lib/legalRag searchCaseLawByKeywordInner (exact + stem).
  const patterns = allIlikePatterns(query)
  if (patterns.length === 0) return { ms: 0, timedOut: false, rows: 0 }
  const t0 = Date.now()
  try {
    const { data, error } = await withTimeout(
      supabase.rpc("search_case_law_keyword", {
        p_jurisdiction: jurisdiction,
        p_patterns: patterns,
        p_limit: Math.max(MATCH_COUNT * 3, 15),
        p_legal_area: null,
      }),
      KEYWORD_TIMEOUT_MS,
      "keyword case law search",
    )
    if (error) throw new Error(error.message)
    return {
      ms: Date.now() - t0,
      timedOut: false,
      rows: data?.length ?? 0,
    }
  } catch (err) {
    return {
      ms: Date.now() - t0,
      timedOut: /timeout/i.test(String(err.message ?? err)),
      rows: 0,
      error: String(err.message ?? err),
    }
  }
}

async function vectorStatutes(embedding, jurisdiction) {
  const t0 = Date.now()
  const { data, error } = await supabase.rpc("match_legal_articles", {
    query_embedding: embedding,
    filter_jurisdiction: jurisdiction,
    match_count: MATCH_COUNT,
    similarity_threshold: 0.25,
  })
  if (error) throw new Error(error.message)
  return { ms: Date.now() - t0, rows: data?.length ?? 0 }
}

async function vectorCaseLaw(embedding, jurisdiction) {
  const t0 = Date.now()
  const { data, error } = await supabase.rpc("match_case_law", {
    query_embedding: embedding,
    filter_jurisdiction: jurisdiction,
    match_count: MATCH_COUNT,
    similarity_threshold: 0.25,
  })
  if (error) throw new Error(error.message)
  return { ms: Date.now() - t0, rows: data?.length ?? 0 }
}

const rows = []

console.log("Research latency matrix (read-only)\n")
console.log(
  [
    "query".padEnd(32),
    "juris".padEnd(10),
    "scope".padEnd(10),
    "embed".padStart(7),
    "vector".padStart(8),
    "keyword".padStart(9),
    "kwTO".padStart(5),
    "merge".padStart(7),
    "total".padStart(8),
    "hits",
  ].join(" | "),
)
console.log("-".repeat(120))

for (const query of QUERIES) {
  const { embedding, embedMs } = await embed(query)

  for (const jurisdiction of JURISDICTIONS) {
    for (const scope of SCOPES) {
      const totalStarted = Date.now()
      const keywordPromise =
        scope === "statutes"
          ? keywordStatutes(query, jurisdiction)
          : keywordCaseLaw(query, jurisdiction)

      let vector
      try {
        vector =
          scope === "statutes"
            ? await vectorStatutes(embedding, jurisdiction)
            : await vectorCaseLaw(embedding, jurisdiction)
      } catch (err) {
        vector = { ms: -1, rows: 0, error: String(err.message ?? err) }
      }

      const keyword = await keywordPromise
      const mergeStarted = Date.now()
      // merge/rerank is in-memory and negligible; measure placeholder cost
      const mergeMs = Date.now() - mergeStarted
      const wallMs = Date.now() - totalStarted
      // Parallel channels: total ≈ embed + max(vector, keyword) + merge
      const totalMs = embedMs + Math.max(vector.ms, keyword.ms) + mergeMs

      const row = {
        query,
        jurisdiction,
        scope,
        embedMs,
        vectorMs: vector.ms,
        keywordMs: keyword.ms,
        keywordTimedOut: keyword.timedOut,
        mergeMs,
        wallMs,
        totalMs,
        vectorHits: vector.rows,
        keywordHits: keyword.rows,
        error: vector.error || keyword.error || null,
      }
      rows.push(row)

      console.log(
        [
          query.slice(0, 32).padEnd(32),
          jurisdiction.padEnd(10),
          scope.padEnd(10),
          String(embedMs).padStart(7),
          String(vector.ms).padStart(8),
          String(keyword.ms).padStart(9),
          (keyword.timedOut ? "Y" : "n").padStart(5),
          String(mergeMs).padStart(7),
          String(totalMs).padStart(8),
          `v${vector.rows}/k${keyword.rows}`,
        ].join(" | "),
      )
      if (row.error) console.log(`  ! ${row.error}`)
    }
  }
}

const outPath = new URL("../_bench-research-latency.json", import.meta.url)
await import("node:fs/promises").then((fs) =>
  fs.writeFile(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2)),
)
console.log(`\nWrote ${outPath.pathname}`)

const slowKw = rows
  .filter((r) => r.keywordMs >= 6000 || r.keywordTimedOut)
  .sort((a, b) => b.keywordMs - a.keywordMs)
console.log("\nKeyword near/over 8s budget:")
for (const r of slowKw) {
  console.log(
    `  ${r.jurisdiction}/${r.scope} "${r.query}" → ${r.keywordMs}ms timedOut=${r.keywordTimedOut}`,
  )
}
