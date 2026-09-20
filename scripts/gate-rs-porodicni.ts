/**
 * Dry-run gate for the unofficial RS Porodični consolidation.
 * Does not write to the database.
 *
 *   npx tsx scripts/gate-rs-porodicni.ts
 */
import mammoth from "mammoth"
import path from "path"

import {
  reattachTrailingHeadings,
  formatNamedArticleBodies,
} from "./core-statute-nadnaslov"
import {
  applyPorodicniConsolidation,
  porodicniInventory,
} from "./consolidate-rs-porodicni"
import { splitByClan } from "./ingest-rs-core-statutes"

const REPO_ROOT = path.resolve(__dirname, "..")
const BASE_DOCX = path.join(
  REPO_ROOT,
  "downloads/rs-core-statutes/porodicni-ci/Porodicni zakon.docx",
)

const NAMED = [
  "74",
  "75",
  "86",
  "101",
  "102",
  "104",
  "109",
  "120",
  "141",
  "141а",
  "149",
  "150",
  "161",
  "162",
  "237",
  "267",
  "270",
  "283",
  "292",
  "299а",
  "315",
  "318",
  "332",
  "333",
  "334",
  "335",
  "342",
  "344",
  "346",
]

function countLiteral(haystack: string, needle: string): number {
  let n = 0
  let from = 0
  while (true) {
    const i = haystack.indexOf(needle, from)
    if (i === -1) break
    n++
    from = i + needle.length
  }
  return n
}

function stav1Window(body: string): string {
  const opener = /(?:^|\n)[ \t]*\(1\)(?!\d)/
  const match = opener.exec(body)
  if (!match || match.index === undefined) return ""
  const start = match[0].startsWith("\n") ? match.index + 1 : match.index
  const after =
    start + (match[0].startsWith("\n") ? match[0].length - 1 : match[0].length)
  const next = /(?:^|\n)[ \t]*\(\d+\)(?!\d)/m.exec(body.slice(after))
  const end =
    next && next.index !== undefined ? after + next.index : body.length
  return body.slice(start, end)
}

async function main(): Promise<void> {
  const extracted = await mammoth.extractRawText({ path: BASE_DOCX })
  const prePeel = splitByClan(extracted.value)
  const attached = reattachTrailingHeadings(prePeel, "Породични закон")
  const before = attached.parts
  const after = applyPorodicniConsolidation(before)
  const inv = porodicniInventory(after)

  const byBefore = new Map(before.map((p) => [p.articleNum, p.body]))
  const byAfter = new Map(after.map((p) => [p.articleNum, p.body]))

  console.log("BASE clan", before.length, "highest", before.at(-1)?.articleNum)
  console.log("AFTER clan", inv.count, "highest", inv.highest)
  console.log("LETTERED", inv.lettered.join(",") || "(none)")
  console.log("ADDED", inv.added.join(","))
  console.log("OMITTED_STRUCK", inv.omittedStruck.join(","))
  console.log("INVENTORY", inv.nums.join(","))

  const art101 = byAfter.get("101") ?? ""
  const art333 = byAfter.get("333") ?? ""
  const art342 = byAfter.get("342") ?? ""
  const deleted =
    ", осим у случају када су правоснажно расправљени прије ступања на снагу овог закона"

  console.log("\n===== POST-APPLY CHECKS =====")
  console.log(
    "101 st.1 «права» count",
    countLiteral(stav1Window(art101), "права"),
  )
  console.log(
    "101 has insert",
    art101.includes("права и одржавању личних односа са дјететом"),
  )
  console.log(
    "333 still has 341.",
    art333.includes("341.") ? "YES" : "NO",
  )
  console.log(
    "333 still has «342 ст.»",
    art333.includes("342 ст.") ? "YES" : "NO",
  )
  console.log("333 312. remains", art333.includes("312.") ? "YES" : "NO")
  console.log("333 has 302.", art333.includes("302.") ? "YES" : "NO")
  console.log("342 deleted-phrase count", countLiteral(art342, deleted))
  console.log("141 present", byAfter.has("141") ? "YES" : "NO")
  console.log("141а present", byAfter.has("141а") ? "YES" : "NO")
  console.log("299а present", byAfter.has("299а") ? "YES" : "NO")
  console.log(
    "149 st.2 no-age",
    (byAfter.get("149") ?? "").includes("без обзира на године живота")
      ? "YES"
      : "NO",
  )

  console.log("\n===== BEFORE (17/23, peeled) =====\n")
  console.log(formatNamedArticleBodies(before, NAMED.filter((n) => n !== "141а" && n !== "299а")))
  console.log("\n===== AFTER (consolidated) =====\n")
  console.log(formatNamedArticleBodies(after, NAMED))

  if (inv.count !== 350) {
    throw new Error(`Expected 350 articles, got ${inv.count}`)
  }
  if (byAfter.has("141")) throw new Error("141 should be omitted")
  if (!byAfter.has("141а") || !byAfter.has("299а")) {
    throw new Error("141а and 299а must exist")
  }
  if (countLiteral(stav1Window(art101), "права") !== 1) {
    throw new Error("101 st.1 «права» is not unique after apply")
  }
  if (countLiteral(art342, deleted) !== 0) {
    throw new Error("342 deletion did not remove the unique phrase")
  }
  if (art333.includes("312.") || !art333.includes("302.")) {
    throw new Error("333 st.1 312.→302. did not apply")
  }
  if (!art333.includes("341.") || !art333.includes("342 ст.")) {
    throw new Error("333 st.3 was altered; it must stay at 17/23")
  }
  console.log("\nGATE OK 350")
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
