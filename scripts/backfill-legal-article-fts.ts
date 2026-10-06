/**
 * Backfill public.legal_article_fts from legal_articles.text_local.
 * Do not run. The side table is being dropped; search moves to an
 * expression GIN index. A rerun rewrites stored rows and grows the table.
 * Does not touch embeddings. Uses keyset pages so a rerun continues.
 *
 * Expected row count: 229110. Measured 2026-10-06: every legal_articles row
 * has text_local, and there are 229,110 rows.
 *
 * Batch size is 2000. A read-only timing of to_tsvector('simple', text_local)
 * on 5,000 Serbian rows took 1.83 s, about 0.37 ms per row, with no index
 * write. 2,000 rows is under a second of that work and leaves room for the
 * GIN maintenance on each insert (maintenance_work_mem is 64 MB). The
 * 800-row cap is for embedding updates, which carry a 1536-dimension vector.
 * These rows do not.
 */
import path from "path"
import dotenv from "dotenv"
import pg from "pg"

dotenv.config({ path: path.join("scripts", "outreach", ".env") })
dotenv.config({ path: ".env.local" })

const EXPECTED_ROWS = 229110
const BATCH_SIZE = 2000

async function main() {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  await client.query("SELECT set_config('statement_timeout', '120s', false)")

  const live = await client.query(
    `SELECT count(*)::int AS n
     FROM public.legal_articles
     WHERE text_local IS NOT NULL`,
  )
  const liveCount = live.rows[0].n as number
  console.log(
    `expected ${EXPECTED_ROWS} live_with_text ${liveCount}`,
  )
  if (liveCount !== EXPECTED_ROWS) {
    console.log(
      `live count differs from the 2026-10-06 measurement; filling ${liveCount} rows`,
    )
  }

  let lastId = "00000000-0000-0000-0000-000000000000"
  let written = 0
  let batchNo = 0
  for (;;) {
    const started = Date.now()
    const batch = await client.query(
      `INSERT INTO public.legal_article_fts (article_id, tsv)
       SELECT id, to_tsvector('simple', text_local)
       FROM public.legal_articles
       WHERE text_local IS NOT NULL
         AND id > $1::uuid
       ORDER BY id
       LIMIT $2
       ON CONFLICT (article_id) DO UPDATE SET tsv = EXCLUDED.tsv
       RETURNING article_id`,
      [lastId, BATCH_SIZE],
    )
    if (batch.rows.length === 0) break
    batchNo += 1
    written += batch.rows.length
    lastId = batch.rows[batch.rows.length - 1].article_id as string
    console.log(
      `batch ${batchNo} rows ${batch.rows.length} total ${written}/${liveCount} ${Date.now() - started} ms`,
    )
  }

  const stored = await client.query(
    `SELECT count(*)::int AS n FROM public.legal_article_fts`,
  )
  console.log(
    `done written ${written} stored ${stored.rows[0].n} expected ${EXPECTED_ROWS} live ${liveCount}`,
  )
  if (stored.rows[0].n !== liveCount) {
    throw new Error(
      `stored ${stored.rows[0].n} does not equal live text rows ${liveCount}`,
    )
  }
  await client.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
