/**
 * Variance and latency instrument for the 13 gate specs.
 * It is not a regression instrument: one process, one code version.
 * Research specs compare a call with itself. Prediction specs compare
 * two query formulations. A difference there is variance, not a code change.
 *
 *   npx tsx scripts/_gate-fix-a-narrative-query.ts
 *   npx tsx scripts/_gate-fix-a-narrative-query.ts --write-baseline
 *   npx tsx scripts/_gate-fix-a-narrative-query.ts --compare-baseline
 *
 * --write-baseline never runs unless that flag is passed, and
 * --compare-baseline never writes the file.
 *
 * Credentials: scripts/outreach/.env, then .env.local. Nothing is inlined.
 */
import { execSync } from "child_process"
import { readFile, writeFile } from "fs/promises"
import path from "path"
import dotenv from "dotenv"
import { extractPredictionKeyFacts } from "../lib/distillCaseInstitutes"

dotenv.config({ path: path.join("scripts", "outreach", ".env") })
dotenv.config({ path: ".env.local" })

const PHRASE_BUDGET_MS = 2500
const PARTIAL_BUDGET_MS = 1348
const BASELINE_PATH = path.join("scripts", "gate-baseline.json")
const SCORE_DELTA = 1e-6

const LATIN = "rok za tužbu radi utvrđivanja očinstva"
const LABOR_PRED = `
Predict the outcome for this labor case in Serbia:

Key Facts: Poslodavac je otkazao ugovor o radu zbog nepoštovanja radne discipline. Radnik tvrdi da nije dobio otkazni rok niti pisano obrazloženje. Traži vraćanje na rad i isplatu zarada za vrijeme nezakonitog otkaza.

Evidence Quality: medium
Amount in Dispute: Not specified
Additional Context: None provided
`.trim()
const EMPLOYMENT_CONTRACT = `
Draft an employment contract for Serbia.

Position: software developer. Employer: Acme d.o.o. Employee: test. Include notice period (otkazni rok) and salary.
`.trim()
const IVANA_HR = `
Predict the outcome for this civil case in Croatia:

Key Facts: Tužitelj i tuženik su suvlasnici nekretnine u jednakim dijelovima (1/2). Tužitelj traži razvrgnuće suvlasničke zajednice fizičkom diobom, tuženik se protivi. Nekretnina je obiteljska kuća s okućnicom upisana u zemljišnoj knjizi. Dokazi: zemljišnoknjižni izvadak i prijedlog diobe.

Evidence Quality: medium
Amount in Dispute: Not specified
Additional Context: None provided
`.trim()

type Kind = "research" | "prediction" | "generate"
type Variant = "B" | "A"
type Status = "valid" | "missing" | "channel_not_run"

type Spec = {
  id: string
  fullPrompt: string
  jurisdiction: string
  k: number
  kind: Kind
  category?: string
  categoryMode?: "filter" | "hint"
}

type TopRow = {
  id: string
  jurisdiction: string
  law_name_local: string
  article_num: string
  is_curated: boolean
  score: number
  rank: number
}

type Run = {
  variant: Variant
  channelNotRun: boolean
  stage1Done: boolean
  stage2Done: boolean
  stage1Ms: number | null
  stage2Ms: number | null
  top10: TopRow[]
}

type QueryResult = {
  id: string
  kind: Kind
  sameRetrieval: boolean
  status: Status
  runs: Run[]
  top10: TopRow[]
  unstable: boolean
}

const SPECS: Spec[] = [
  { id: "latin_paternity", fullPrompt: LATIN, jurisdiction: "bih_rs", k: 8, kind: "research" },
  {
    id: "hint_otkazni_croatia",
    fullPrompt: "otkazni rok",
    jurisdiction: "croatia",
    k: 10,
    kind: "research",
    category: "labor",
    categoryMode: "filter",
  },
  {
    id: "hint_otkazni_serbia",
    fullPrompt: "otkazni rok",
    jurisdiction: "serbia",
    k: 10,
    kind: "research",
    category: "labor",
    categoryMode: "filter",
  },
  {
    id: "hint_labor_prediction",
    fullPrompt: LABOR_PRED,
    jurisdiction: "serbia",
    k: 8,
    kind: "prediction",
    category: "labor",
    categoryMode: "hint",
  },
  {
    id: "hint_employment_contract",
    fullPrompt: EMPLOYMENT_CONTRACT,
    jurisdiction: "serbia",
    k: 7,
    kind: "generate",
    category: "labor",
    categoryMode: "hint",
  },
  {
    id: "ivana_civil_suvlasnistvo",
    fullPrompt: IVANA_HR,
    jurisdiction: "croatia",
    k: 8,
    kind: "prediction",
    category: "civil",
    categoryMode: "hint",
  },
  { id: "fbih_nuzni", fullPrompt: "nasljeđivanje nužni dio", jurisdiction: "bih_fbih", k: 10, kind: "research" },
  {
    id: "fbih_dosjelost",
    fullPrompt: "sticanje prava vlasništva dosjelošću",
    jurisdiction: "bih_fbih",
    k: 10,
    kind: "research",
  },
  {
    id: "fbih_ostavinski",
    fullPrompt: "ostavinski postupak i prava nasljednika",
    jurisdiction: "bih_fbih",
    k: 10,
    kind: "research",
  },
  {
    id: "hr_zvdsp",
    fullPrompt: "zaštita povjerenja u zemljišne knjige stjecanje nekretnine",
    jurisdiction: "croatia",
    k: 10,
    kind: "research",
  },
  {
    id: "park_prvokup",
    fullPrompt:
      "Kupio sam kuću unutar nacionalnog parka, a prodavatelj prije prodaje nije ponudio nekretninu jedinici lokalne samouprave koja ima pravo prvokupa. Je li kupoprodajni ugovor ništetan?",
    jurisdiction: "croatia",
    k: 10,
    kind: "research",
  },
  {
    id: "rs_upravni_spor",
    fullPrompt: "rok za tužbu u upravnom sporu",
    jurisdiction: "bih_rs",
    k: 8,
    kind: "research",
  },
  {
    id: "rs_opsti_upravni",
    fullPrompt: "opšti upravni postupak rok za žalbu",
    jurisdiction: "bih_rs",
    k: 8,
    kind: "research",
  },
]

const MEASURED: Variant[] = ["B", "A", "B", "A", "B", "A"]

type BaselineFile = {
  gitSha: string
  date: string
  note: string
  queries: Record<string, { status: Status; top10: TopRow[] }>
}

function queryFor(spec: Spec, variant: Variant): string {
  if (variant === "A" && spec.kind === "prediction") {
    return extractPredictionKeyFacts(spec.fullPrompt)
  }
  return spec.fullPrompt
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)] ?? null
}

function idsOf(rows: TopRow[]): string {
  return rows.map((r) => r.id).join(",")
}

function nameOf(row: TopRow): string {
  return `${row.law_name_local} čl. ${row.article_num}`
}

function curatedSet(rows: TopRow[]): TopRow[] {
  return rows.filter((r) => r.is_curated)
}

function hasArticle(rows: TopRow[], law: RegExp, art: string): boolean {
  return rows.some((r) => law.test(r.law_name_local) && r.article_num === art)
}

function gitSha(): string {
  return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim()
}

function printQuery(result: QueryResult) {
  const by = (variant: Variant) => result.runs.filter((r) => r.variant === variant)
  const stageLine = (variant: Variant, key: "stage1Ms" | "stage2Ms") => {
    const values = by(variant).map((r) => r[key])
    const nums = values.filter((v): v is number => v != null)
    return { values, median: median(nums) }
  }
  const bCurated = curatedSet(by("B")[0]?.top10 ?? [])
  const aCurated = curatedSet(by("A")[0]?.top10 ?? [])
  const bIds = new Set(bCurated.map((r) => r.id))
  const aIds = new Set(aCurated.map((r) => r.id))
  const onlyB = bCurated.filter((r) => !aIds.has(r.id)).map(nameOf)
  const onlyA = aCurated.filter((r) => !bIds.has(r.id)).map(nameOf)
  console.log(
    JSON.stringify({
      id: result.id,
      status: result.status,
      sameRetrieval: result.sameRetrieval,
      unstable: result.unstable,
      stage1B: stageLine("B", "stage1Ms"),
      stage2B: stageLine("B", "stage2Ms"),
      stage1A: stageLine("A", "stage1Ms"),
      stage2A: stageLine("A", "stage2Ms"),
      curatedOnlyOnB: result.status === "valid" ? onlyB : null,
      curatedOnlyOnA: result.status === "valid" ? onlyA : null,
      top10: result.top10.map(nameOf),
    }),
  )
}

function recheck(results: QueryResult[]) {
  console.log(
    "RECHECK This gate runs one code version. For a research spec, B and A are the same retrieval. A row present on one side and absent on the other is variance between identical calls, not a measurement of the comparator. The comparator is already in this process on both sides. This instrument cannot say what a second code version broke.",
  )
  const watch: Array<{ id: string; label: string; law: RegExp; art: string }> = [
    {
      id: "hr_zvdsp",
      label: "Zakon o vlasništvu i drugim stvarnim pravima čl. 349",
      law: /vlasništvu i drugim stvarnim/i,
      art: "349",
    },
    {
      id: "fbih_nuzni",
      label: "Zakon o nasljeđivanju čl. 30",
      law: /nasljeđivan/i,
      art: "30",
    },
    {
      id: "fbih_nuzni",
      label: "Zakon o stvarnim pravima čl. 238",
      law: /stvarnim pravima/i,
      art: "238",
    },
    {
      id: "fbih_nuzni",
      label: "Zakon o stvarnim pravima čl. 248",
      law: /stvarnim pravima/i,
      art: "248",
    },
    {
      id: "fbih_nuzni",
      label: "Zakon o stvarnim pravima čl. 233",
      law: /stvarnim pravima/i,
      art: "233",
    },
  ]
  for (const item of watch) {
    const result = results.find((r) => r.id === item.id)
    if (!result) continue
    const presence = result.runs.map((run, i) => ({
      i,
      variant: run.variant,
      present: hasArticle(run.top10, item.law, item.art),
    }))
    console.log(
      "WATCH",
      JSON.stringify({
        query: item.id,
        status: result.status,
        article: item.label,
        presentOnRuns: presence,
        note:
          result.kind === "research"
            ? "B and A are the same call. Presence differences are variance, not a code diff."
            : null,
      }),
    )
  }
}

function diffAgainst(baseline: BaselineFile, current: QueryResult[]) {
  console.log(
    JSON.stringify({
      baselineSha: baseline.gitSha,
      baselineDate: baseline.date,
      currentSha: gitSha(),
    }),
  )
  const excluded: string[] = []
  for (const result of current) {
    const stored = baseline.queries[result.id]
    const storedStatus = stored?.status
    if (
      !stored ||
      result.status === "missing" ||
      result.status === "channel_not_run" ||
      storedStatus === "missing" ||
      storedStatus === "channel_not_run"
    ) {
      excluded.push(
        `${result.id} current=${result.status} baseline=${storedStatus ?? "absent"}`,
      )
      continue
    }
    const before = stored.top10
    const after = result.top10
    const beforeById = new Map(before.map((r) => [r.id, r]))
    const afterById = new Map(after.map((r) => [r.id, r]))
    const gone = before.filter((r) => !afterById.has(r.id)).map(nameOf)
    const added = after.filter((r) => !beforeById.has(r.id)).map(nameOf)
    const moved = after
      .filter((r) => {
        const prev = beforeById.get(r.id)
        return prev != null && prev.rank !== r.rank
      })
      .map((r) => ({
        name: nameOf(r),
        from: beforeById.get(r.id)!.rank,
        to: r.rank,
      }))
    const scoreDeltas = after
      .filter((r) => {
        const prev = beforeById.get(r.id)
        return prev != null && Math.abs(prev.score - r.score) > SCORE_DELTA
      })
      .map((r) => ({
        name: nameOf(r),
        from: beforeById.get(r.id)!.score,
        to: r.score,
      }))
    console.log(
      "DIFF",
      JSON.stringify({ id: result.id, gone, added, moved, scoreDeltas }),
    )
  }
  console.log("EXCLUDED", JSON.stringify(excluded))
}

async function main() {
  const arg = process.argv[2] ?? ""
  if (arg !== "" && arg !== "--write-baseline" && arg !== "--compare-baseline") {
    throw new Error(
      `Unknown argument ${arg}. Use no flag, --write-baseline, or --compare-baseline.`,
    )
  }
  const writeBaseline = arg === "--write-baseline"
  const compareBaseline = arg === "--compare-baseline"
  if (writeBaseline && compareBaseline) {
    throw new Error("Refusing to write a baseline during a comparison.")
  }

  const { retrieveLegalContext } = await import("../lib/legalRag")
  const { isScrapedExcerpt } = await import("../lib/ragThresholds")

  async function oneCall(spec: Spec, variant: Variant): Promise<Run> {
    const retrieved = await retrieveLegalContext(
      queryFor(spec, variant),
      spec.jurisdiction,
      {
        category: spec.category,
        categoryMode: spec.categoryMode,
        k: spec.k,
      },
    )
    const timing = retrieved.timing
    const skip = timing?.keywordSkipReason ?? null
    const channelNotRun = skip === "keyword_skipped_hint"
    const stage1Ms = timing?.keywordStage1Ms ?? null
    const stage2Ms = timing?.keywordStage2Ms ?? null
    const stage1Done =
      !channelNotRun &&
      timing?.keywordPhraseCircuitBreaker !== true &&
      (stage1Ms == null || stage1Ms <= PHRASE_BUDGET_MS)
    const stage2Done =
      !channelNotRun &&
      timing?.keywordTimedOut !== true &&
      skip !== "keyword_budget_exceeded" &&
      skip !== "keyword_search_error" &&
      (stage2Ms == null || stage2Ms <= PARTIAL_BUDGET_MS)
    const top10 = retrieved.chunks.slice(0, 10).map((chunk, index) => ({
      id: chunk.id,
      jurisdiction: chunk.jurisdiction,
      law_name_local: chunk.law_name_local,
      article_num: chunk.article_num,
      is_curated: !isScrapedExcerpt(chunk.text, chunk.text_local),
      score: Number(chunk.similarity.toFixed(6)),
      rank: index + 1,
    }))
    return {
      variant,
      channelNotRun,
      stage1Done,
      stage2Done,
      stage1Ms,
      stage2Ms,
      top10,
    }
  }

  const results: QueryResult[] = []
  for (const spec of SPECS) {
    await oneCall(spec, "B")
    await oneCall(spec, "A")
    const runs: Run[] = []
    for (const variant of MEASURED) {
      runs.push(await oneCall(spec, variant))
    }
    const channelNotRun = runs.every((r) => r.channelNotRun)
    const completed = runs.every((r) => r.stage1Done && r.stage2Done)
    const status: Status = channelNotRun
      ? "channel_not_run"
      : completed
        ? "valid"
        : "missing"
    const sequences = runs.map((r) => idsOf(r.top10))
    const unstable = new Set(sequences).size > 1
    const sameRetrieval = queryFor(spec, "B") === queryFor(spec, "A")
    const top10 = (sameRetrieval ? runs[0] : runs.find((r) => r.variant === "B") ?? runs[0])!
      .top10
    const result: QueryResult = {
      id: spec.id,
      kind: spec.kind,
      sameRetrieval,
      status,
      runs,
      top10,
      unstable,
    }
    results.push(result)
    printQuery(result)
  }

  recheck(results)

  const missing = results.filter((r) => r.status === "missing").map((r) => r.id)
  const unstableValid = results
    .filter((r) => r.status === "valid" && r.unstable)
    .map((r) => r.id)

  if (compareBaseline) {
    const raw = await readFile(BASELINE_PATH, "utf8")
    diffAgainst(JSON.parse(raw) as BaselineFile, results)
    return
  }

  if (!writeBaseline) return

  if (missing.length > 0 || unstableValid.length > 0) {
    console.error(
      "Refusing to write baseline.",
      missing.length ? `missing: ${missing.join(", ")}` : "",
      unstableValid.length
        ? `top 10 disagreed across runs: ${unstableValid.join(", ")}`
        : "",
    )
    process.exitCode = 1
    return
  }

  const file: BaselineFile = {
    gitSha: gitSha(),
    date: new Date().toISOString(),
    note: "Variance-and-latency snapshot of one code version. Not a comparison of two versions. channel_not_run queries are stored and excluded from --compare-baseline.",
    queries: Object.fromEntries(
      results.map((r) => [r.id, { status: r.status, top10: r.top10 }]),
    ),
  }
  await writeFile(BASELINE_PATH, JSON.stringify(file, null, 2) + "\n")
  console.log("WROTE", BASELINE_PATH, file.gitSha, file.date)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    // supabase-js keeps the process alive after the report is printed.
    setTimeout(() => process.exit(process.exitCode ?? 0), 50)
  })
