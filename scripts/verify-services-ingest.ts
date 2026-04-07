/**
 * One-off verification: wipe legal_articles, full ingest, DB counts, RAG smoke tests.
 * Requires .env.local: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY.
 */
import { execSync } from "child_process"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

async function main() {
  const { supabaseAdmin } = await import("../lib/supabase/admin")

  const { error: delErr } = await supabaseAdmin
    .from("legal_articles")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000")

  if (delErr) throw new Error(`Delete legal_articles: ${delErr.message}`)

  // eslint-disable-next-line no-console
  console.log("Deleted all rows from legal_articles (filter neq sentinel id).")

  execSync("npm run ingest-legal", {
    stdio: "inherit",
    cwd: process.cwd(),
    env: { ...process.env },
  })

  const { count: total, error: cErr } = await supabaseAdmin
    .from("legal_articles")
    .select("*", { count: "exact", head: true })

  if (cErr) throw new Error(`Count total: ${cErr.message}`)

  const pageSize = 1000
  const byJ = new Map<string, number>()
  let offset = 0
  let scanned = 0
  for (;;) {
    const { data: page, error: rErr } = await supabaseAdmin
      .from("legal_articles")
      .select("jurisdiction")
      .range(offset, offset + pageSize - 1)

    if (rErr) throw new Error(`Select jurisdictions: ${rErr.message}`)
    const batch = page ?? []
    scanned += batch.length
    for (const r of batch) {
      const j = (r as { jurisdiction: string }).jurisdiction
      byJ.set(j, (byJ.get(j) ?? 0) + 1)
    }
    if (batch.length < pageSize) break
    offset += pageSize
  }

  // eslint-disable-next-line no-console
  console.log("\n--- DB: COUNT BY jurisdiction ---")
  for (const j of [...byJ.keys()].sort((a, b) => a.localeCompare(b))) {
    // eslint-disable-next-line no-console
    console.log(`${j}\t${byJ.get(j)}`)
  }
  // eslint-disable-next-line no-console
  console.log("\n--- DB: TOTAL ---")
  // eslint-disable-next-line no-console
  console.log("total (head count)\t", total)
  // eslint-disable-next-line no-console
  console.log("total (paginated scan)\t", scanned)
  if (scanned !== total) {
    throw new Error(`Mismatch: paginated scan ${scanned} !== head count ${total}`)
  }

  const { SAMPLE_ARTICLES } = await import("./ingest-legal-texts")
  const expected = SAMPLE_ARTICLES.length
  // eslint-disable-next-line no-console
  console.log("\nIngest array length (SAMPLE_ARTICLES):", expected)
  if (total !== expected) {
    throw new Error(`Ingest total ${expected} !== database total ${total}`)
  }

  const { retrieveLegalContext } = await import("../lib/legalRag")

  const tests = [
    {
      query: "Work contract contractor obligations",
      jurisdiction: "serbia",
      k: 5,
    },
    {
      query: "Construction contract obligations",
      jurisdiction: "croatia",
      k: 5,
    },
    {
      query: "Transport contract carrier liability",
      jurisdiction: "slovenia",
      k: 5,
    },
  ]

  // eslint-disable-next-line no-console
  console.log("\n--- retrieveLegalContext (category: civil) ---\n")

  for (const t of tests) {
    const result = await retrieveLegalContext(t.query, t.jurisdiction, {
      category: "civil",
      k: t.k,
    })
    // eslint-disable-next-line no-console
    console.log(`Query: "${t.query}"`)
    // eslint-disable-next-line no-console
    console.log(
      `  jurisdiction=${t.jurisdiction} confidence=${result.confidence} chunks=${result.chunks.length} topSimilarity=${result.topSimilarity.toFixed(4)}`,
    )
    result.chunks.forEach((c, i) => {
      // eslint-disable-next-line no-console
      console.log(
        `    [${i + 1}] sim=${(c.similarity * 100).toFixed(2)}% | ${c.law_name_local} | art. ${c.article_num}`,
      )
    })
    // eslint-disable-next-line no-console
    console.log("")
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})
