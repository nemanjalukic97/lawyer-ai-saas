import { Client } from "pg"

const statements = [
  ["statement timeout off", `SET statement_timeout = 0`],
  [
    "legal_articles trigram index (77k rows, takes a few minutes — be patient)",
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS legal_articles_text_local_trgm_idx
       ON public.legal_articles USING gin (text_local gin_trgm_ops)
       WHERE text_local IS NOT NULL`,
  ],
  [
    "case_law trigram index (56k rows, also slow)",
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS case_law_keyword_trgm_idx
       ON public.case_law USING gin (
         (coalesce(legal_question, '') || ' ' ||
          coalesce(court_position, '') || ' ' ||
          coalesce(reasoning, '') || ' ' ||
          coalesce(headnote, '')) gin_trgm_ops
       )`,
  ],
]

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

await client.connect()
console.log("Connected.")

for (const [label, sql] of statements) {
  console.log(`\n→ ${label} ...`)
  const started = Date.now()
  await client.query(sql)
  console.log(`  done in ${Math.round((Date.now() - started) / 1000)}s`)
}

const { rows } = await client.query(
  `SELECT indexrelid::regclass AS index_name, indisvalid
     FROM pg_index
    WHERE indexrelid::regclass::text LIKE '%trgm%'`,
)
console.log("\nIndex validity check (all must be indisvalid = true):")
console.table(rows)

await client.end()
console.log("All done.")
