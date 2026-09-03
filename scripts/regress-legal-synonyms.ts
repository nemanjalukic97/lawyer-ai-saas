/**
 * Synonym regression: run with LEGAL_SYNONYMS_DISABLED=1 for baseline,
 * then without for after. Usage:
 *   npx tsx scripts/regress-legal-synonyms.ts --phase before
 *   npx tsx scripts/regress-legal-synonyms.ts --phase after
 *   npx tsx scripts/regress-legal-synonyms.ts --phase compare
 */
import { writeFile, readFile, mkdir } from "fs/promises"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const OUT_DIR = path.join(process.cwd(), "tmp-synonym-regress")

type Case = { query: string; jurisdiction: string; tag: string }

const CASES: Case[] = [
  // Must not regress
  { query: "nužna obrana", jurisdiction: "croatia", tag: "stable" },
  {
    query: "raskid ugovora zbog neispunjenja",
    jurisdiction: "croatia",
    tag: "stable",
  },
  {
    query: "nasljedni red zakonskog nasljeđivanja",
    jurisdiction: "croatia",
    tag: "stable",
  },
  {
    query: "otkaz zbog skrivljenog ponašanja radnika",
    jurisdiction: "croatia",
    tag: "stable",
  },
  {
    query: "uzdržavanje djeteta nakon razvoda",
    jurisdiction: "croatia",
    tag: "stable",
  },
  // Target fixes
  { query: "zastara potraživanja", jurisdiction: "croatia", tag: "fix" },
  {
    query: "razvrgnuće suvlasničke zajednice",
    jurisdiction: "croatia",
    tag: "fix",
  },
  { query: "dioba suvlasništva", jurisdiction: "croatia", tag: "fix" },
  { query: "ugovor o delu", jurisdiction: "croatia", tag: "fix" },
  { query: "obaveza", jurisdiction: "croatia", tag: "fix" },
  // Cross-jurisdiction
  { query: "zastara potraživanja", jurisdiction: "serbia", tag: "cross" },
]

type TopHit = {
  law: string
  article: string
  similarity: number
  channel: string | null | undefined
}

type CaseResult = {
  query: string
  jurisdiction: string
  tag: string
  top: TopHit | null
  top3: TopHit[]
  patternTotal: number
  exactPatterns: string[]
  stemPatterns: string[]
  synonymPhrases: string[]
}

function phaseFromArgv(): "before" | "after" | "compare" {
  const i = process.argv.indexOf("--phase")
  const v = i >= 0 ? process.argv[i + 1] : "after"
  if (v === "before" || v === "after" || v === "compare") return v
  throw new Error(`Unknown --phase ${v}`)
}

function fmtTop(h: TopHit | null): string {
  if (!h) return "(none)"
  return `${h.law} čl.${h.article} (${(h.similarity * 100).toFixed(1)}% ${h.channel ?? "vector"})`
}

async function runPhase(phase: "before" | "after"): Promise<void> {
  if (phase === "before") {
    process.env.LEGAL_SYNONYMS_DISABLED = "1"
  } else {
    delete process.env.LEGAL_SYNONYMS_DISABLED
  }

  // Fresh imports so env is read at call time (buildKeywordIlikePatterns reads env each call)
  const { matchLegalArticles } = await import("../lib/legalRag")
  const { buildKeywordIlikePatterns, stemWord } = await import(
    "../lib/keywordVariants"
  )
  const { expandQueryWithLegalSynonyms } = await import("../lib/legalSynonyms")

  const results: CaseResult[] = []

  for (const c of CASES) {
    const patterns = buildKeywordIlikePatterns(c.query)
    const synonymPhrases =
      phase === "before"
        ? []
        : expandQueryWithLegalSynonyms(c.query, undefined, stemWord)

    const { chunks } = await matchLegalArticles({
      query: c.query,
      jurisdiction: c.jurisdiction,
      matchCount: 6,
      retryIfEmpty: true,
    })

    const top3: TopHit[] = chunks.slice(0, 3).map((ch) => ({
      law: ch.law_name_local || ch.law_name,
      article: ch.article_num,
      similarity: ch.similarity,
      channel: ch.matchChannel,
    }))

    results.push({
      query: c.query,
      jurisdiction: c.jurisdiction,
      tag: c.tag,
      top: top3[0] ?? null,
      top3,
      patternTotal: patterns.exactPatterns.length + patterns.stemPatterns.length,
      exactPatterns: patterns.exactPatterns,
      stemPatterns: patterns.stemPatterns,
      synonymPhrases,
    })

    // eslint-disable-next-line no-console
    console.log(
      `[${phase}] [${c.jurisdiction}] "${c.query}" → ${fmtTop(top3[0] ?? null)} | patterns=${patterns.exactPatterns.length + patterns.stemPatterns.length}`,
    )
  }

  await mkdir(OUT_DIR, { recursive: true })
  const outPath = path.join(OUT_DIR, `${phase}.json`)
  await writeFile(outPath, JSON.stringify(results, null, 2), "utf8")
  // eslint-disable-next-line no-console
  console.log(`Wrote ${outPath}`)
}

async function compare(): Promise<void> {
  const before = JSON.parse(
    await readFile(path.join(OUT_DIR, "before.json"), "utf8"),
  ) as CaseResult[]
  const after = JSON.parse(
    await readFile(path.join(OUT_DIR, "after.json"), "utf8"),
  ) as CaseResult[]

  // eslint-disable-next-line no-console
  console.log("\n| query | jurisdiction | top before | top after | conf before | conf after |")
  // eslint-disable-next-line no-console
  console.log("|---|---|---|---|---|---|")

  for (let i = 0; i < before.length; i++) {
    const b = before[i]
    const a = after[i]
    const sameTop =
      b.top && a.top
        ? b.top.law === a.top.law && b.top.article === a.top.article
        : b.top == null && a.top == null
    const mark = b.tag === "stable" ? (sameTop ? "OK" : "REGRESS") : ""
    // eslint-disable-next-line no-console
    console.log(
      `| ${b.query} | ${b.jurisdiction} | ${fmtTop(b.top)} | ${fmtTop(a.top)} | ${b.top ? (b.top.similarity * 100).toFixed(1) + "%" : "-"} | ${a.top ? (a.top.similarity * 100).toFixed(1) + "%" : "-"} | ${mark}`,
    )
  }

  const zastara = after.find(
    (r) => r.query === "zastara potraživanja" && r.jurisdiction === "croatia",
  )
  if (zastara) {
    // eslint-disable-next-line no-console
    console.log("\nPattern count for Croatia \"zastara potraživanja\":", zastara.patternTotal)
    // eslint-disable-next-line no-console
    console.log("exact:", zastara.exactPatterns)
    // eslint-disable-next-line no-console
    console.log("stem:", zastara.stemPatterns)
    // eslint-disable-next-line no-console
    console.log("synonym phrases:", zastara.synonymPhrases)
  }
}

async function main() {
  const phase = phaseFromArgv()
  if (phase === "compare") {
    await compare()
    return
  }
  await runPhase(phase)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
