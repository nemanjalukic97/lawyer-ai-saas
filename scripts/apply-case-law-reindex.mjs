/**
 * Post-bulk-ingest: rebuild case_law IVFFlat vector index + refresh planner stats.
 *
 * Run after large case_law ingests (e.g. Croatia ~56k → ~76k rows). Uses direct
 * Postgres connection — Supabase SQL editor often times out on REINDEX CONCURRENTLY.
 *
 *   DATABASE_URL="postgresql://..." node scripts/apply-case-law-reindex.mjs
 *
 * Index name confirmed in supabase/migrations/20260507120000_case_law.sql:
 *   case_law_embedding_idx ON public.case_law USING ivfflat (embedding vector_cosine_ops)
 *   WITH (lists = 100)
 *
 * IVFFlat lists=100: REINDEX CONCURRENTLY rebuilds the same definition (cannot change
 * lists here). Rule of thumb lists ≈ rows/1000; at ~76k rows that gives ~76 lists, so
 * 100 remains reasonable. Changing lists would require DROP + CREATE INDEX (migration).
 *
 * If REINDEX CONCURRENTLY is interrupted, Postgres may leave an invalid *_ccnew* index;
 * this script drops those before reindexing and is safe to re-run.
 */
import { Client } from "pg"

const EMBEDDING_INDEX = "public.case_law_embedding_idx"

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

const statements = [
  ["statement timeout off", `SET statement_timeout = 0`],
  ["maintenance_work_mem 128MB", `SET maintenance_work_mem = '128MB'`],
]

for (const [label, sql] of statements) {
  console.log(`\n→ ${label} ...`)
  const started = Date.now()
  await client.query(sql)
  console.log(`  done in ${Math.round((Date.now() - started) / 1000)}s`)
}

// Confirm target index exists and log its definition.
const { rows: indexDefs } = await client.query(
  `SELECT indexname, indexdef
     FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'case_law'
      AND indexname = 'case_law_embedding_idx'`,
)
if (indexDefs.length === 0) {
  console.error(
    `\nExpected index case_law_embedding_idx on public.case_law — not found. Aborting.`,
  )
  await client.end()
  process.exit(1)
}
console.log("\nTarget index:")
console.log(`  ${indexDefs[0].indexdef}`)

// Drop invalid transient indexes left by a failed/interrupted REINDEX CONCURRENTLY.
const { rows: staleCcnew } = await client.query(
  `SELECT c.oid::regclass AS index_name
     FROM pg_class c
     JOIN pg_index i ON i.indexrelid = c.oid
     JOIN pg_class t ON t.oid = i.indrelid
     JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND t.relname = 'case_law'
      AND c.relname LIKE '%\\_ccnew%' ESCAPE '\\'
      AND NOT i.indisvalid`,
)
if (staleCcnew.length > 0) {
  console.log(
    `\n→ cleanup invalid _ccnew indexes from interrupted REINDEX (${staleCcnew.length}) ...`,
  )
  for (const { index_name } of staleCcnew) {
    const started = Date.now()
    await client.query(`DROP INDEX CONCURRENTLY IF EXISTS ${index_name}`)
    console.log(`  dropped ${index_name} in ${Math.round((Date.now() - started) / 1000)}s`)
  }
} else {
  console.log("\n→ no invalid _ccnew indexes on case_law (cleanup skipped)")
}

console.log(
  `\n→ REINDEX INDEX CONCURRENTLY ${EMBEDDING_INDEX} (~76k rows × 1536-dim — may take several minutes) ...`,
)
{
  const started = Date.now()
  await client.query(`REINDEX INDEX CONCURRENTLY ${EMBEDDING_INDEX}`)
  console.log(`  done in ${Math.round((Date.now() - started) / 1000)}s`)
}

console.log("\n→ ANALYZE public.case_law ...")
{
  const started = Date.now()
  await client.query(`ANALYZE public.case_law`)
  console.log(`  done in ${Math.round((Date.now() - started) / 1000)}s`)
}

const { rows } = await client.query(
  `SELECT indexrelid::regclass AS index_name, indisvalid
     FROM pg_index
    WHERE indexrelid::regclass::text LIKE '%case_law%'`,
)
console.log("\nIndex validity check (all must be indisvalid = true):")
console.table(rows)

const invalid = rows.filter((r) => !r.indisvalid)
await client.end()

if (invalid.length > 0) {
  console.error(`\n${invalid.length} invalid index(es) remain — investigate before relying on search.`)
  process.exit(1)
}

console.log("All done.")
