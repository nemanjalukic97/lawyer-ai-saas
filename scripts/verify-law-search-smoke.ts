/**
 * Smoke test: legal article vector search after post-ingest fixes.
 * Usage: npx tsx scripts/verify-law-search-smoke.ts
 */
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const TESTS = [
  { query: "otkazni rok", jurisdiction: "serbia" },
  { query: "uslovi za otkaz ugovora o radu", jurisdiction: "serbia" },
  { query: "Construction contract obligations", jurisdiction: "croatia" },
] as const

async function main() {
  const { matchLegalArticles } = await import("../lib/legalRag")

  // eslint-disable-next-line no-console
  console.log("Testing law vector search (skipping full-table count on large corpus)...\n")

  let failed = 0

  for (const t of TESTS) {
    const started = Date.now()
    try {
      const { chunks, usedThreshold, retried } = await matchLegalArticles({
        query: t.query,
        jurisdiction: t.jurisdiction,
        matchCount: 10,
        similarityThreshold: 0.25,
        retryIfEmpty: true,
      })
      const ms = Date.now() - started
      // eslint-disable-next-line no-console
      console.log(
        `[${t.jurisdiction}] "${t.query}" → ${chunks.length} chunks in ${ms}ms` +
          ` (threshold=${usedThreshold}, retried=${retried})`,
      )
      for (const c of chunks.slice(0, 3)) {
        // eslint-disable-next-line no-console
        console.log(
          `  - ${(c.similarity * 100).toFixed(1)}% | ${c.law_name_local} | čl. ${c.article_num}`,
        )
      }
      if (chunks.length === 0) failed += 1
    } catch (err) {
      failed += 1
      const message = err instanceof Error ? err.message : String(err)
      // eslint-disable-next-line no-console
      console.error(`[${t.jurisdiction}] "${t.query}" FAILED: ${message}`)
    }
    // eslint-disable-next-line no-console
    console.log("")
  }

  if (failed > 0) {
    process.exitCode = 1
    throw new Error(`${failed} test(s) returned no law chunks`)
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
