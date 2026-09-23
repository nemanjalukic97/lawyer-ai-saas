/**
 * One-off verification: wipe legal_articles, full ingest, DB counts, RAG smoke tests.
 * DISABLED 2026-09-21: no longer wipes the table or shells out to ingest-legal.
 * SAMPLE_ARTICLES are drafted placeholders, never statutory, removed from the DB.
 */
import { SAMPLE_STUBS_WRITE_FLAG } from "./ingest-legal-texts"

async function main() {
  throw new Error(
    `verify-services-ingest is disabled. It used to delete every legal_articles row and shell out to npm run ingest-legal (SAMPLE_ARTICLES: drafted placeholders, never statutory, removed from the database on 2026-09-21). It no longer wipes or re-ingests. Do not pass ${SAMPLE_STUBS_WRITE_FLAG} here — there is no remaining write path.`,
  )
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
