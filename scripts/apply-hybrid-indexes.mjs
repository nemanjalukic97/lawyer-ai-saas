/**
 * Build hybrid search indexes via direct Postgres (CONCURRENTLY).
 *
 * Supabase SQL editor / MCP apply_migration often time out on large GIN builds.
 * This script sets statement_timeout=0 and maintenance_work_mem=128MB, cleans
 * invalid *_ccnew leftovers, then creates indexes CONCURRENTLY.
 *
 * PowerShell (from repo root):
 *
 *   node --env-file=.env.local scripts/apply-hybrid-indexes.mjs
 *
 * Order of operations (this script):
 *   1. SET statement_timeout = 0
 *   2. SET maintenance_work_mem = '128MB'
 *   3. Drop invalid public.*_ccnew* indexes on legal_articles / case_law
 *   4. legal_articles_text_local_trgm_idx (if missing)
 *   5. Seven per-jurisdiction case_law keyword partial GINs (no reasoning)
 *   6. DROP old global case_law_keyword_trgm_idx (superseded)
 *   7. Validity check (all indisvalid = true)
 *
 * Apply the RPC first (migration 20260710160000) via MCP/CLI if not already:
 *   search_case_law_keyword — required by lib/legalRag.ts keyword path.
 */
import { Client } from "pg"

const KEYWORD_EXPR = `(coalesce(legal_question, '') || ' ' ||
          coalesce(court_position, '') || ' ' ||
          coalesce(headnote, ''))`

const CASE_LAW_JURISDICTIONS = [
  "serbia",
  "croatia",
  "slovenia",
  "montenegro",
  "bih_rs",
  "bih_fbih",
  "bih_brcko",
]

/** @type {Array<[string, string]>} */
const statements = [
  ["statement timeout off", `SET statement_timeout = 0`],
  ["maintenance_work_mem 128MB", `SET maintenance_work_mem = '128MB'`],
  [
    "legal_articles trigram index (large corpora — be patient)",
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS legal_articles_text_local_trgm_idx
       ON public.legal_articles USING gin (text_local gin_trgm_ops)
       WHERE text_local IS NOT NULL`,
  ],
]

for (const j of CASE_LAW_JURISDICTIONS) {
  const name = `case_law_keyword_trgm_${j}_idx`
  statements.push([
    `case_law keyword partial GIN (${j})`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS ${name}
       ON public.case_law USING gin (
         ${KEYWORD_EXPR} gin_trgm_ops
       )
       WHERE jurisdiction = '${j}'`,
  ])
}

statements.push([
  "drop superseded global case_law_keyword_trgm_idx",
  `DROP INDEX CONCURRENTLY IF EXISTS public.case_law_keyword_trgm_idx`,
])

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.")
  process.exit(1)
}

await client.connect()
console.log("Connected.")

// Drop invalid transient indexes left by interrupted CREATE/REINDEX CONCURRENTLY.
const { rows: staleCcnew } = await client.query(
  `SELECT c.oid::regclass AS index_name
     FROM pg_class c
     JOIN pg_index i ON i.indexrelid = c.oid
     JOIN pg_class t ON t.oid = i.indrelid
     JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname IN ('case_law', 'legal_articles')
      AND c.relname LIKE '%\\_ccnew%' ESCAPE '\\'
      AND NOT i.indisvalid`,
)
if (staleCcnew.length > 0) {
  console.log(
    `\n→ cleanup invalid _ccnew indexes (${staleCcnew.length}) ...`,
  )
  for (const { index_name } of staleCcnew) {
    const started = Date.now()
    await client.query(`DROP INDEX CONCURRENTLY IF EXISTS ${index_name}`)
    console.log(
      `  dropped ${index_name} in ${Math.round((Date.now() - started) / 1000)}s`,
    )
  }
} else {
  console.log("\n→ no invalid _ccnew indexes (cleanup skipped)")
}

for (const [label, sql] of statements) {
  console.log(`\n→ ${label} ...`)
  const started = Date.now()
  await client.query(sql)
  console.log(`  done in ${Math.round((Date.now() - started) / 1000)}s`)
}

const { rows } = await client.query(
  `SELECT c.relname AS index_name, i.indisvalid
     FROM pg_index i
     JOIN pg_class c ON c.oid = i.indexrelid
     JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND (
        c.relname LIKE '%trgm%'
        OR c.relname LIKE 'case_law_keyword%'
      )
    ORDER BY c.relname`,
)
console.log("\nIndex validity check (all must be indisvalid = true):")
console.table(rows)

const invalid = rows.filter((r) => !r.indisvalid)
const expectedPartials = CASE_LAW_JURISDICTIONS.map(
  (j) => `case_law_keyword_trgm_${j}_idx`,
)
const present = new Set(rows.map((r) => r.index_name))
const missing = expectedPartials.filter((n) => !present.has(n))

await client.end()

if (missing.length > 0) {
  console.error(`\nMissing expected indexes: ${missing.join(", ")}`)
  process.exit(1)
}
if (invalid.length > 0) {
  console.error(
    `\n${invalid.length} invalid index(es) remain — investigate before relying on search.`,
  )
  process.exit(1)
}

console.log("\nAll done.")
