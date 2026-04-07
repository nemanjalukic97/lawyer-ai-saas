/**
 * Full re-ingest cycle for legal_articles using Supabase JS client (service role).
 *
 * Steps:
 * 1) Delete all rows from legal_articles (filter neq sentinel id).
 * 2) Run `npm run ingest-legal`.
 * 3) Query counts equivalent to:
 *    A) total per category
 *    B) per jurisdiction per category
 *    C) grand total
 * 4) Confirm DB grand total matches ingest total (SAMPLE_ARTICLES length).
 */
import { execSync } from "child_process"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

type LegalRow = { jurisdiction: string; law_category: string }

function inc(map: Map<string, number>, key: string, by = 1) {
  map.set(key, (map.get(key) ?? 0) + by)
}

async function scanAllCategoriesAndJurisdictions() {
  const { supabaseAdmin } = await import("../lib/supabase/admin")

  const pageSize = 1000
  let offset = 0

  const byCategory = new Map<string, number>()
  const byJurCat = new Map<string, number>() // key: `${jurisdiction}\t${law_category}`

  let scanned = 0
  for (;;) {
    const { data: page, error } = await supabaseAdmin
      .from("legal_articles")
      .select("jurisdiction, law_category")
      .range(offset, offset + pageSize - 1)

    if (error) throw new Error(`Select legal_articles page: ${error.message}`)
    const batch = (page ?? []) as LegalRow[]

    scanned += batch.length
    for (const row of batch) {
      inc(byCategory, row.law_category)
      inc(byJurCat, `${row.jurisdiction}\t${row.law_category}`)
    }

    if (batch.length < pageSize) break
    offset += pageSize
  }

  const { count: headCount, error: countErr } = await supabaseAdmin
    .from("legal_articles")
    .select("*", { count: "exact", head: true })

  if (countErr) throw new Error(`Grand total (head count): ${countErr.message}`)

  return {
    byCategory,
    byJurCat,
    scannedTotal: scanned,
    headTotal: headCount ?? 0,
  }
}

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

  const { SAMPLE_ARTICLES } = await import("./ingest-legal-texts")
  const expectedIngestTotal = SAMPLE_ARTICLES.length

  const { byCategory, byJurCat, scannedTotal, headTotal } =
    await scanAllCategoriesAndJurisdictions()

  if (scannedTotal !== headTotal) {
    throw new Error(
      `Mismatch: scannedTotal ${scannedTotal} !== headTotal ${headTotal}`,
    )
  }

  // Query A — total per category
  // eslint-disable-next-line no-console
  console.log("\n=== Query A — total per category ===")
  const catRows = [...byCategory.entries()]
    .map(([law_category, total]) => ({ law_category, total }))
    .sort((a, b) => b.total - a.total || a.law_category.localeCompare(b.law_category))
  for (const r of catRows) {
    // eslint-disable-next-line no-console
    console.log(`${r.law_category}\t${r.total}`)
  }

  // Query B — per jurisdiction per category
  // eslint-disable-next-line no-console
  console.log("\n=== Query B — per jurisdiction per category ===")
  const jurCatRows = [...byJurCat.entries()]
    .map(([key, articles]) => {
      const [jurisdiction, law_category] = key.split("\t")
      return { jurisdiction, law_category, articles }
    })
    .sort(
      (a, b) =>
        a.jurisdiction.localeCompare(b.jurisdiction) ||
        a.law_category.localeCompare(b.law_category),
    )
  for (const r of jurCatRows) {
    // eslint-disable-next-line no-console
    console.log(`${r.jurisdiction}\t${r.law_category}\t${r.articles}`)
  }

  // Query C — total
  // eslint-disable-next-line no-console
  console.log("\n=== Query C — total ===")
  // eslint-disable-next-line no-console
  console.log(`grand_total\t${headTotal}`)

  // eslint-disable-next-line no-console
  console.log("\n=== Confirm totals ===")
  // eslint-disable-next-line no-console
  console.log(`npm run ingest-legal total (SAMPLE_ARTICLES)\t${expectedIngestTotal}`)
  // eslint-disable-next-line no-console
  console.log(`DB grand_total\t${headTotal}`)

  if (headTotal !== expectedIngestTotal) {
    throw new Error(
      `Mismatch: DB grand_total ${headTotal} !== ingest total ${expectedIngestTotal}`,
    )
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e)
  process.exit(1)
})

