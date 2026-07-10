/**
 * One-off recovery for rows that timed out during PostgREST upsert (57014).
 * Uses direct pg with statement_timeout=0 — same pattern as apply-hybrid-indexes.mjs.
 *
 * Prerequisites: .env.local with OPENAI_API_KEY, DATABASE_URL (Supabase direct connection).
 * Input: scripts/case-law-ingest-failed.json (written by ingest-case-law.ts).
 *
 * Usage: npx tsx scripts/ingest-case-law-failed-pg.mjs
 */
import fs from "fs"
import dotenv from "dotenv"
import { Client } from "pg"

import { ALL_CASE_LAW } from "./case-law-index"
import {
  CASE_LAW_INGEST_FAILED_PATH,
  buildCaseLawUpsertPayload,
  embedCaseLaw,
  loadCaseLawIngestFailedRows,
  saveCaseLawIngestFailedRows,
  stableIdForCase,
} from "./ingest-case-law"

dotenv.config({ path: ".env.local" })

function vectorLiteral(embedding) {
  return `[${embedding.join(",")}]`
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required in .env.local")
  }
  if (!fs.existsSync(CASE_LAW_INGEST_FAILED_PATH)) {
  // eslint-disable-next-line no-console
    console.log(`No failed rows file at ${CASE_LAW_INGEST_FAILED_PATH}`)
    return
  }

  const failed = loadCaseLawIngestFailedRows()
  if (failed.size === 0) {
  // eslint-disable-next-line no-console
    console.log("Failed rows file is empty.")
    return
  }

  const byId = new Map(
    ALL_CASE_LAW.filter((r) => r?.jurisdiction && r.case_number).map((r) => [
      stableIdForCase(r),
      r,
    ]),
  )

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  // eslint-disable-next-line no-console
  console.log(`Connected. Recovering ${failed.size} row(s) with statement_timeout=0 …`)
  await client.query("SET statement_timeout = 0")

  let ok = 0
  let stillFailed = 0

  for (const record of failed.values()) {
    const row = byId.get(record.id)
    if (!row) {
      // eslint-disable-next-line no-console
      console.warn(`  ? skip ${record.case_number} — not found in ALL_CASE_LAW index`)
      stillFailed += 1
      continue
    }

    try {
      const embedding = await embedCaseLaw(row)
      const payload = buildCaseLawUpsertPayload(row, embedding)
      await client.query(
        `INSERT INTO public.case_law (
          id, jurisdiction, court, court_level, case_number, decision_date,
          legal_area, legal_question, court_position, reasoning,
          keywords, related_articles, headnote, outcome, source_url, embedding
        ) VALUES (
          $1, $2, $3, $4, $5, $6::date,
          $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16::vector
        )
        ON CONFLICT (id) DO UPDATE SET
          jurisdiction = EXCLUDED.jurisdiction,
          court = EXCLUDED.court,
          court_level = EXCLUDED.court_level,
          case_number = EXCLUDED.case_number,
          decision_date = EXCLUDED.decision_date,
          legal_area = EXCLUDED.legal_area,
          legal_question = EXCLUDED.legal_question,
          court_position = EXCLUDED.court_position,
          reasoning = EXCLUDED.reasoning,
          keywords = EXCLUDED.keywords,
          related_articles = EXCLUDED.related_articles,
          headnote = EXCLUDED.headnote,
          outcome = EXCLUDED.outcome,
          source_url = EXCLUDED.source_url,
          embedding = EXCLUDED.embedding,
          updated_at = NOW()`,
        [
          payload.id,
          payload.jurisdiction,
          payload.court,
          payload.court_level,
          payload.case_number,
          payload.decision_date,
          payload.legal_area,
          payload.legal_question,
          payload.court_position,
          payload.reasoning,
          payload.keywords,
          payload.related_articles,
          payload.headnote,
          payload.outcome,
          payload.source_url,
          vectorLiteral(embedding),
        ],
      )
      failed.delete(record.id)
      ok += 1
      // eslint-disable-next-line no-console
      console.log(`  ✓ ${row.jurisdiction} / ${row.case_number}`)
    } catch (err) {
      stillFailed += 1
      const message = err instanceof Error ? err.message : String(err)
      failed.set(record.id, {
        ...record,
        error_message: message,
        last_attempt_at: new Date().toISOString(),
      })
      // eslint-disable-next-line no-console
      console.error(`  ✗ ${row.jurisdiction} / ${row.case_number}: ${message}`)
    }
  }

  await client.end()
  saveCaseLawIngestFailedRows(failed)
  // eslint-disable-next-line no-console
  console.log(`\nDone: ${ok} recovered, ${stillFailed} still failing.`)
  if (failed.size > 0) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})
