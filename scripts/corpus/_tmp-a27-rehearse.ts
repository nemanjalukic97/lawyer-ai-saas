/**
 * Dry rehearsal with rules (a), (b), the corrected emptiness test, and the asterisk rule.
 * Rule (c) stays off. Writes scripts/out/serbia-article-file.jsonl only when the
 * located-minus-emitted list is at most 50 and every absence is a source-empty
 * heading or a citation refusal, and the figures balance.
 * Read-only against the database. --measure skips tokenization and does not write the file.
 */
import { appendFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs"
import { createHash } from "crypto"
import { availableParallelism } from "os"
import path from "path"
import { pathToFileURL } from "url"
import { Worker } from "worker_threads"
import dotenv from "dotenv"
import pg from "pg"
import { spanHasBody, type FinderFlags } from "./_tmp-serbia-phase3"

dotenv.config({ path: path.resolve(__dirname, "outreach/.env"), quiet: true })
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), quiet: true })
const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is missing from scripts/outreach/.env and .env.local")

const FLAGS: FinderFlags = { letterBefore: true, lowerSuffix: true, starAfter: true }
const MEASURE = process.argv.includes("--measure")
const PARTS = path.resolve(__dirname, "out/_a27-parts")
const FINAL = path.resolve(__dirname, "out/serbia-article-file.jsonl")
const ENERGY = "ПРОГРАМ остваривања Стратегије развоја енергетике Републике Србије до 2040. године са пројекцијама до 2050. године, за период од 2026. до 2028. године"
const ALLOWED_EXCEPTION = /^(?:unemitted_prefix |empty_heading |glued_heading_cut )\d+$/u

type Chunk = { id: string; article_num: string; text_local: string }
type Row = {
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  amending_act: string | null
  text_local: string
  source_chunk_id: string | null
}
type Job = {
  id: number
  law: string
  kept?: boolean
  reason?: string
  chunks?: number
  output_rows?: number
  rows_before?: number
  articles?: number
  max_tokens?: number
  rows_over_token_limit?: number
  boundary_failed?: number
  embed_tokens?: number
  citation_headings?: number
  conservation_stripped?: number
  conservation_rebuilt?: number
  exceptions?: string[]
  deduped?: number
  deduped_chars?: number
  empty_heading?: number
  empty_rows?: number
  empty_chars?: number
  empty_skipped?: string[]
  only_empty?: string[]
  star_rows?: number
  empty_star_rows?: number
  absorbed_rows?: number
  glued_heading_cuts?: number
  missing_source?: number
  paragraph_bad?: number
  text_mismatch?: number
  skip?: string
  error?: string
  gate_from?: string
  gate_to?: string
  prefix_chars?: number
  dup_articles?: string[]
  star_placement?: { occurrences: number; line_start: number; misplaced: number; misplaced_own: number; prefix: number; own: number }
  rows?: Row[]
  empty_host_rows?: number
  empty_texts?: Array<{ article: string; heading: number; text: string }>
  located_headings?: number
  located_articles?: number
  emitted_articles?: number
  absent_articles?: Array<{ article: string; reason: string; spans: string[] }>
  chemicals_articles?: string[]
  chemicals_article_1?: string
  chemicals_article_86?: string
  piece_census?: {
    changed: Array<{ article: string; heading: number; chars: number; before: number; after: number }>
    lost_all: Array<{ article: string; heading: number; chars: number; before: number; after: number }>
    before_rows: number
    after_rows: number
    absorb_before: number
    absorb_after: number
    absorb_changed: Array<{
      host_article: string
      host_heading: number
      star_articles: string[]
      host_before: number
      host_after: number
      joined_before: number
      joined_after: number
      absorbed_before: number
      absorbed_after: number
      delta: number
      chars: number
    }>
  }
}

function note(message: string): void {
  appendFileSync(path.resolve(__dirname, "out/_a27-rehearse-progress.txt"), `${new Date().toISOString()}\t${message}\n`, "utf8")
}

function textHash(text: string): string {
  const collapsed = text.replace(/[ \t\n\r\f\v]+/g, " ").replace(/^ +| +$/g, "")
  return createHash("md5").update(collapsed, "utf8").digest("hex")
}

function startPool(size: number) {
  const workers = Array.from({ length: size }, () => new Worker(pathToFileURL(path.resolve(__dirname, "_tmp-a17d-assert-worker.ts")), {
    execArgv: process.execArgv,
  }))
  const idle = [...workers]
  const waiting: Array<(worker: Worker) => void> = []
  const pending = new Map<number, { resolve: (row: Job) => void; worker: Worker }>()
  let seq = 1
  const release = (worker: Worker) => {
    const next = waiting.shift()
    if (next) next(worker)
    else idle.push(worker)
  }
  for (const worker of workers) {
    worker.on("message", (msg: Job) => {
      const slot = pending.get(msg.id)
      if (!slot) return
      pending.delete(msg.id)
      slot.resolve(msg)
      release(worker)
    })
    worker.on("error", (error) => {
      note(`worker error ${error.message}`)
      for (const [id, slot] of pending) {
        if (slot.worker === worker) {
          pending.delete(id)
          slot.resolve({ id, law: "", error: error.message })
        }
      }
    })
  }
  return {
    run(index: number, law: string, chunks: Chunk[]) {
      const id = seq
      seq += 1
      return new Promise<Job>((resolve) => {
        const start = (worker: Worker) => {
          pending.set(id, { resolve, worker })
          worker.postMessage({ id, index, law, chunks, finderFlags: FLAGS, detail: true, emitRows: !MEASURE, skipTokens: MEASURE, skipDivide: MEASURE, pieceCensus: !MEASURE })
        }
        const worker = idle.pop()
        if (worker) start(worker)
        else waiting.push(start)
      })
    },
    async close() {
      await Promise.all(workers.map((worker) => worker.terminate()))
    },
  }
}

function absenceAllowed(reason: string): boolean {
  const parts = reason.split("+")
  return parts.length > 0 && parts.every((part) => part === "empty_heading" || part === "citation")
}

function assertHeadingBody(): void {
  const cases: Array<[string, number, boolean]> = [
    ["Члан 4.\n\n", "Члан 4.".length, false],
    ["Члан 6. *\n\n", "Члан 6.".length, false],
    ["Члан 8 *\n\n\n", "Члан 8".length, false],
    ["Члан 13.\n\n", "Члан 13.".length, false],
    ["Члан 19.\n\n", "Члан 19.".length, false],
    ["Члан 1. Овим законом уређује се", "Члан 1.".length, true],
    ["Члан 13.Даном ступања", "Члан 13.".length, true],
    ["Члан 2.* Агенција води", "Члан 2.*".length, true],
  ]
  for (const [text, token, body] of cases) {
    if (spanHasBody(text, 0, token) !== body) throw new Error(`heading body self-check failed: ${JSON.stringify(text)}`)
  }
  const titled = "II. ПОСЕБАН ДЕО\n\nЧлан 8.\n\nУкупни расходи"
  if (!spanHasBody(titled, "II. ПОСЕБАН ДЕО\n\n".length, "Члан 8.".length)) {
    throw new Error("heading body self-check failed: rubric plus body")
  }
}

type PieceSpan = { law: string; article: string; heading: number; chars: number; before: number; after: number }
type AbsorbSpan = {
  law: string
  host_article: string
  host_heading: number
  star_articles: string[]
  host_before: number
  host_after: number
  joined_before: number
  joined_after: number
  absorbed_before: number
  absorbed_after: number
  delta: number
  chars: number
}

function absenceKey(row: { law: string; article: string; reason: string }): string {
  return `${row.law}\u0000${row.article}\u0000${row.reason}`
}

async function main(): Promise<void> {
  assertHeadingBody()
  const priorAbsent = (JSON.parse(readFileSync(path.resolve(__dirname, "out/_a27-rehearse-summary.json"), "utf8")) as {
    absent?: Array<{ law: string; article: string; reason: string }>
  }).absent ?? []
  const ids = readFileSync(path.resolve(__dirname, "out/serbia-phase2-snapshot-ids.txt"), "utf8").split(/\r?\n/).map((line) => line.trim()).filter((line) => line.length > 0)
  rmSync(PARTS, { recursive: true, force: true })
  mkdirSync(PARTS, { recursive: true })
  writeFileSync(path.resolve(__dirname, "out/_a27-rehearse-progress.txt"), "", "utf8")
  note(`credential DATABASE_URL ids ${ids.length} flags letterBefore lowerSuffix starAfter emptyHeading`)
  const pool = startPool(Math.max(1, Math.min(4, availableParallelism() - 1)))
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
  await client.connect()
  await client.query("BEGIN READ ONLY")
  await client.query("SET LOCAL statement_timeout = '0'")
  await client.query(
    `DECLARE a27 NO SCROLL CURSOR FOR
       SELECT id::text AS id, law_name_local, article_num, text_local
         FROM public.legal_articles
        WHERE id = ANY($1::uuid[])
        ORDER BY law_name_local,
                 CASE WHEN article_num ~ '^[0-9]+$' THEN article_num::int END NULLS LAST,
                 article_num`,
    [ids],
  )
  const reasons = new Map<string, { laws: number; chunks: number }>()
  const jobs: Array<Promise<void>> = []
  const keptAt = new Map<number, string>()
  const failures: string[] = []
  const badExceptions: string[] = []
  const identityBreaks: string[] = []
  const gateMoves: Array<{ law: string; from: string; to: string }> = []
  const skips: Array<{ law: string; skip: string; chunks: number }> = []
  const emptyList: string[] = []
  const emptySpans: Array<{ law: string; article: string; text: string }> = []
  const absent: Array<{ law: string; article: string; reason: string; spans: string[] }> = []
  const onlyEmpty: string[] = []
  const zeroRowLaws: Array<{ law: string; located_headings: number; located_articles: number; empty_heading: number; empty_skipped: string[] }> = []
  let locatedHeadings = 0
  let locatedArticles = 0
  let emittedArticles = 0
  let chemicals: { articles: string[]; article_1: string; article_86: string } | null = null
  let seen = 0
  let keptLaws = 0
  let inputChunks = 0
  let rowsBefore = 0
  let rowsAfter = 0
  let articles = 0
  let maxTokens = 0
  let rowsOver = 0
  let boundary = 0
  let glued = 0
  let embedTokens = 0
  let citationHeadings = 0
  let strippedChars = 0
  let rebuiltChars = 0
  let emptyHeadings = 0
  let emptyRows = 0
  let emptyChars = 0
  let emptyStarRows = 0
  let emptyHostRows = 0
  let starRows = 0
  let absorbedRows = 0
  let pieceBeforeRows = 0
  let pieceAfterRows = 0
  let absorbBeforeRows = 0
  let absorbAfterRows = 0
  let censusLaws = 0
  const pieceChanged: PieceSpan[] = []
  const pieceLost: PieceSpan[] = []
  const absorbChanged: AbsorbSpan[] = []
  let prefixChars = 0
  let prefixLaws = 0
  let deduped = 0
  let dedupedChars = 0
  let missingSource = 0
  let paragraphBad = 0
  let textMismatch = 0
  let dupArticles = 0
  let dupLaws = 0
  const placement = { occurrences: 0, line_start: 0, misplaced: 0, misplaced_own: 0, prefix: 0, own: 0 }

  const take = (index: number, job: Job) => {
    seen += 1
    const chunks = job.chunks ?? 0
    const reason = job.reason ?? (job.error ? "error" : "unknown")
    const slot = reasons.get(reason) ?? { laws: 0, chunks: 0 }
    slot.laws += 1
    slot.chunks += chunks
    reasons.set(reason, slot)
    if (job.error) failures.push(`${job.law}: ${job.error}`)
    if (job.gate_from && job.gate_to && job.gate_from !== job.gate_to) gateMoves.push({ law: job.law, from: job.gate_from, to: job.gate_to })
    if (job.skip) skips.push({ law: job.law, skip: job.skip, chunks })
    if (job.kept && !job.skip && !job.error) {
      keptLaws += 1
      inputChunks += chunks
      rowsBefore += job.rows_before ?? 0
      rowsAfter += job.output_rows ?? 0
      articles += job.articles ?? 0
      maxTokens = Math.max(maxTokens, job.max_tokens ?? 0)
      rowsOver += job.rows_over_token_limit ?? 0
      boundary += job.boundary_failed ?? 0
      glued += job.glued_heading_cuts ?? 0
      embedTokens += job.embed_tokens ?? 0
      citationHeadings += job.citation_headings ?? 0
      strippedChars += job.conservation_stripped ?? 0
      rebuiltChars += job.conservation_rebuilt ?? 0
      emptyHeadings += job.empty_heading ?? 0
      emptyRows += job.empty_rows ?? 0
      emptyChars += job.empty_chars ?? 0
      emptyStarRows += job.empty_star_rows ?? 0
      emptyHostRows += job.empty_host_rows ?? 0
      starRows += job.star_rows ?? 0
      absorbedRows += job.absorbed_rows ?? 0
      if (job.piece_census) {
        censusLaws += 1
        pieceBeforeRows += job.piece_census.before_rows
        pieceAfterRows += job.piece_census.after_rows
        absorbBeforeRows += job.piece_census.absorb_before
        absorbAfterRows += job.piece_census.absorb_after
        for (const span of job.piece_census.changed) {
          pieceChanged.push({ law: job.law, article: span.article, heading: span.heading, chars: span.chars, before: span.before, after: span.after })
        }
        for (const span of job.piece_census.lost_all) {
          pieceLost.push({ law: job.law, article: span.article, heading: span.heading, chars: span.chars, before: span.before, after: span.after })
        }
        for (const region of job.piece_census.absorb_changed) absorbChanged.push({ law: job.law, ...region })
      }
      prefixChars += job.prefix_chars ?? 0
      if ((job.prefix_chars ?? 0) > 0) prefixLaws += 1
      deduped += job.deduped ?? 0
      dedupedChars += job.deduped_chars ?? 0
      missingSource += job.missing_source ?? 0
      paragraphBad += job.paragraph_bad ?? 0
      textMismatch += job.text_mismatch ?? 0
      if ((job.dup_articles ?? []).length > 0) {
        dupLaws += 1
        dupArticles += job.dup_articles?.length ?? 0
      }
      for (const line of job.empty_skipped ?? []) emptyList.push(line)
      for (const span of job.empty_texts ?? []) emptySpans.push({ law: job.law, article: span.article, text: span.text })
      for (const row of job.absent_articles ?? []) absent.push({ law: job.law, article: row.article, reason: row.reason, spans: row.spans })
      locatedHeadings += job.located_headings ?? 0
      locatedArticles += job.located_articles ?? 0
      emittedArticles += job.emitted_articles ?? 0
      if (job.chemicals_articles) {
        chemicals = {
          articles: job.chemicals_articles,
          article_1: job.chemicals_article_1 ?? "",
          article_86: job.chemicals_article_86 ?? "",
        }
      }
      for (const article of job.only_empty ?? []) onlyEmpty.push(`${job.law} article ${article}`)
      if ((job.output_rows ?? 0) === 0) {
        zeroRowLaws.push({
          law: job.law,
          located_headings: job.located_headings ?? 0,
          located_articles: job.located_articles ?? 0,
          empty_heading: job.empty_heading ?? 0,
          empty_skipped: job.empty_skipped ?? [],
        })
      }
      const place = job.star_placement
      if (place) {
        placement.occurrences += place.occurrences
        placement.line_start += place.line_start
        placement.misplaced += place.misplaced
        placement.misplaced_own += place.misplaced_own
        placement.prefix += place.prefix
        placement.own += place.own
      }
      const rebuilt = job.conservation_rebuilt ?? 0
      const empty = job.empty_chars ?? 0
      const prefix = job.prefix_chars ?? 0
      const stripped = job.conservation_stripped ?? 0
      if (rebuilt + empty + prefix !== stripped) identityBreaks.push(`${job.law} rebuilt ${rebuilt} empty ${empty} prefix ${prefix} stripped ${stripped}`)
      for (const item of job.exceptions ?? []) if (!ALLOWED_EXCEPTION.test(item)) badExceptions.push(`${job.law}: ${item}`)
      const file = path.join(PARTS, `${String(index).padStart(5, "0")}.jsonl`)
      const lines = (job.rows ?? []).map((row) => JSON.stringify(row))
      if (lines.length > 0) {
        writeFileSync(file, `${lines.join("\n")}\n`, "utf8")
        keptAt.set(index, job.law)
      }
    }
    if (seen % 50 === 0) note(`laws ${seen} kept ${keptLaws} rows ${rowsAfter}`)
  }

  let index = 0
  let current = ""
  let bucket: Chunk[] = []
  const launch = (law: string, chunks: Chunk[]) => {
    const jobIndex = index
    index += 1
    jobs.push(pool.run(jobIndex, law, chunks).then((job) => take(jobIndex, job)))
  }
  for (;;) {
    const batch = await client.query<{ id: string; law_name_local: string; article_num: string; text_local: string }>("FETCH 200 FROM a27")
    if (batch.rows.length === 0) break
    for (const row of batch.rows) {
      if (row.law_name_local !== current) {
        if (bucket.length) launch(current, bucket)
        current = row.law_name_local
        bucket = []
      }
      bucket.push({ id: row.id, article_num: row.article_num, text_local: row.text_local ?? "" })
    }
  }
  if (bucket.length) launch(current, bucket)
  await client.query("CLOSE a27")
  await client.query("COMMIT")
  await client.end()
  await Promise.all(jobs)
  await pool.close()

  const pieceDiff = pieceChanged.reduce((total, span) => total + (span.before - span.after), 0)
  const gained = pieceChanged.filter((span) => span.after > span.before)
  const lostDist = { one: 0, two: 0, three: 0, four: 0, more: 0 }
  for (const span of pieceChanged) {
    const lost = span.before - span.after
    if (lost === 1) lostDist.one += 1
    else if (lost === 2) lostDist.two += 1
    else if (lost === 3) lostDist.three += 1
    else if (lost === 4) lostDist.four += 1
    else if (lost > 4) lostDist.more += 1
  }
  const topLost = [...pieceChanged].sort((a, b) => (b.before - b.after) - (a.before - a.after) || b.chars - a.chars).slice(0, 20)
  const absorbDelta = absorbChanged.reduce((total, region) => total + region.delta, 0)
  const mergedFromBaseline = pieceDiff + absorbDelta
  const sameAbsent = priorAbsent.map(absenceKey).sort().join("\n") === absent.map(absenceKey).sort().join("\n")
  const oldBefore = 140467
  const standaloneEmpty = emptyRows - emptyStarRows - emptyHostRows
  const accounted = oldBefore - standaloneEmpty + starRows + absorbedRows - mergedFromBaseline
  const arithmeticGap = rowsBefore - accounted
  const mergedReport = {
    piece_diff: pieceDiff,
    piece_before_rows: pieceBeforeRows,
    piece_after_rows: pieceAfterRows,
    lost: lostDist,
    gained: gained.length,
    gained_spans: gained,
    lost_all: pieceLost,
    top_lost: topLost,
    absorb_before: absorbBeforeRows,
    absorb_after: absorbAfterRows,
    absorb_delta: absorbDelta,
    absorb_regions: absorbChanged,
    merged_from_baseline: mergedFromBaseline,
    changed_spans: pieceChanged.length,
    spans: pieceChanged,
  }
  writeFileSync(path.resolve(__dirname, "out/_a31-merged.json"), JSON.stringify(mergedReport, null, 2), "utf8")
  const exclusionLaws = {
    "no-heading": reasons.get("no-heading")?.laws ?? 0,
    preamble: reasons.get("preamble")?.laws ?? 0,
    "inline-outside-guard": reasons.get("inline-outside-guard")?.laws ?? 0,
    "numbering-gap": reasons.get("numbering-gap")?.laws ?? 0,
    collision: reasons.get("collision")?.laws ?? 0,
  }
  const energy = skips.filter((row) => row.law === ENERGY && row.skip === "no-headings-after-strip")
  const problems = [
    ...failures,
    ...badExceptions,
    ...identityBreaks,
    ...(gateMoves.length ? [`gate moves ${gateMoves.length}`] : []),
    ...(keptLaws !== 2966 ? [`kept laws ${keptLaws}`] : []),
    ...(inputChunks !== 52406 ? [`input chunks ${inputChunks}`] : []),
    ...(boundary !== 0 ? [`unnamed boundary ${boundary}`] : []),
    ...(paragraphBad !== 0 ? [`paragraph_bad ${paragraphBad}`] : []),
    ...(textMismatch !== 0 ? [`text_mismatch ${textMismatch}`] : []),
    ...(missingSource !== 0 ? [`missing source ids ${missingSource}`] : []),
    ...(pieceDiff !== 6309 ? [`merged pieces ${pieceDiff} expected 6309`] : []),
    ...(pieceBeforeRows !== 140432 ? [`doubled piece rows ${pieceBeforeRows}`] : []),
    ...(pieceAfterRows !== rowsBefore ? [`census after ${pieceAfterRows} rows ${rowsBefore}`] : []),
    ...(absorbBeforeRows !== -316 ? [`absorbed before ${absorbBeforeRows}`] : []),
    ...(absorbAfterRows !== absorbedRows ? [`absorbed census ${absorbAfterRows} formula ${absorbedRows}`] : []),
    ...(absorbDelta !== 16 ? [`absorbed delta ${absorbDelta}`] : []),
    ...(pieceDiff !== pieceBeforeRows - pieceAfterRows ? [`piece coverage ${pieceDiff} vs ${pieceBeforeRows - pieceAfterRows}`] : []),
    ...(absorbDelta !== absorbAfterRows - absorbBeforeRows ? [`absorb coverage ${absorbDelta} vs ${absorbAfterRows - absorbBeforeRows}`] : []),
    ...(mergedFromBaseline !== 6325 ? [`merged baseline ${mergedFromBaseline}`] : []),
    ...(pieceLost.length ? [`spans that lost every row ${pieceLost.length}`] : []),
    ...(censusLaws !== keptLaws ? [`census laws ${censusLaws} kept ${keptLaws}`] : []),
    ...(!sameAbsent ? [`absent list changed`] : []),
    ...(rowsBefore !== 134123 ? [`rows before ${rowsBefore}`] : []),
    ...(rowsAfter !== 134118 ? [`rows after ${rowsAfter}`] : []),
    ...(rebuiltChars !== 91406744 ? [`rebuilt chars ${rebuiltChars}`] : []),
    ...(deduped !== 5 || dedupedChars !== 45925 ? [`drop rows ${deduped} chars ${dedupedChars}`] : []),
    ...(starRows !== 294 ? [`star rows ${starRows}`] : []),
    ...(standaloneEmpty !== 13 ? [`standalone empty ${standaloneEmpty}`] : []),
    ...(arithmeticGap !== 0 ? [`row arithmetic gap ${arithmeticGap}`] : []),
    ...(strippedChars !== 93176446 ? [`stripped chars ${strippedChars}`] : []),
    ...(exclusionLaws["no-heading"] !== 2105 ? [`no-heading ${exclusionLaws["no-heading"]}`] : []),
    ...(exclusionLaws.preamble !== 207 ? [`preamble ${exclusionLaws.preamble}`] : []),
    ...(exclusionLaws["inline-outside-guard"] !== 23 ? [`inline ${exclusionLaws["inline-outside-guard"]}`] : []),
    ...(exclusionLaws["numbering-gap"] !== 2 ? [`gap ${exclusionLaws["numbering-gap"]}`] : []),
    ...(exclusionLaws.collision !== 2 ? [`collision ${exclusionLaws.collision}`] : []),
    ...(energy.length !== 1 || energy[0]?.chunks !== 220 ? [`energy ${energy.map((row) => row.chunks).join(",")}`] : []),
    ...(rowsOver !== 0 ? [`rows over 7000 ${rowsOver}`] : []),
    ...(articles !== 72678 ? [`articles ${articles}`] : []),
    ...(emptyHeadings !== 13 ? [`empty headings ${emptyHeadings}`] : []),
    ...(emptyChars !== 131 ? [`empty chars ${emptyChars}`] : []),
    ...(prefixChars !== 1769571 ? [`prefix chars ${prefixChars}`] : []),
    ...(prefixLaws !== 2953 ? [`prefix laws ${prefixLaws}`] : []),
    ...(glued !== 135 ? [`glued ${glued}`] : []),
    ...(absent.length !== 13 ? [`located-minus-emitted ${absent.length}`] : []),
    ...(absent.length > 50 ? [`located-minus-emitted ${absent.length}`] : []),
    ...(absent.some((row) => !absenceAllowed(row.reason)) ? [`absent reason ${[...new Set(absent.map((row) => row.reason))].join(",")}`] : []),
  ]
  const summary = {
    credential: "DATABASE_URL",
    flags: FLAGS,
    kept_laws: keptLaws,
    input_chunks: inputChunks,
    rows_before: rowsBefore,
    rows_after: rowsAfter,
    articles,
    max_tokens: maxTokens,
    rows_over_7000: rowsOver,
    boundary_failed: boundary,
    glued_heading_cuts: glued,
    conservation_stripped: strippedChars,
    conservation_rebuilt: rebuiltChars,
    empty_headings: emptyHeadings,
    empty_rows: emptyRows,
    empty_chars: emptyChars,
    empty_star_rows: emptyStarRows,
    empty_host_rows: emptyHostRows,
    standalone_empty_rows: standaloneEmpty,
    star_rows: starRows,
    absorbed_rows: absorbedRows,
    arithmetic: {
      old_before: oldBefore,
      minus_empty_rows: standaloneEmpty,
      plus_star_rows: starRows,
      plus_absorbed: absorbedRows,
      minus_merged_pieces: mergedFromBaseline,
      piece_diff: pieceDiff,
      absorb_delta: absorbDelta,
      accounted,
      new_before: rowsBefore,
      gap: arithmeticGap,
    },
    merged: {
      piece_diff: pieceDiff,
      lost: lostDist,
      gained: gained.length,
      gained_spans: gained,
      lost_all: pieceLost,
      top_lost: topLost,
      absorb_before: absorbBeforeRows,
      absorb_after: absorbAfterRows,
      absorb_delta: absorbDelta,
      absorb_regions: absorbChanged,
      merged_from_baseline: mergedFromBaseline,
    },
    prefix_laws: prefixLaws,
    prefix_chars: prefixChars,
    deduped,
    deduped_chars: dedupedChars,
    duplicate_articles: dupArticles,
    duplicate_laws: dupLaws,
    embed_tokens: embedTokens,
    usd: (embedTokens * 0.02) / 1_000_000,
    citation_headings: citationHeadings,
    exclusions: Object.fromEntries(reasons),
    energy_chunks: energy[0]?.chunks ?? 0,
    gate_moves: gateMoves,
    skips,
    star_placement: placement,
    located_headings: locatedHeadings,
    located_articles: locatedArticles,
    emitted_articles: emittedArticles,
    located_minus_emitted: absent.length,
    buckets: {
      emitted: rebuiltChars,
      empty_heading: emptyChars,
      unemitted_prefix: prefixChars,
      total: rebuiltChars + emptyChars + prefixChars,
      stripped: strippedChars,
    },
    chemicals,
    problems,
    empty_list: emptyList,
    empty_spans: emptySpans,
    absent,
    only_empty: onlyEmpty,
    zero_row_laws: zeroRowLaws,
  }
  writeFileSync(path.resolve(__dirname, "out/_a27-rehearse-summary.json"), JSON.stringify(summary, null, 2), "utf8")
  if (MEASURE) {
    writeFileSync(path.resolve(__dirname, "out/_a28-empty.json"), JSON.stringify({
      empty_headings: emptyHeadings,
      empty_spans: emptySpans,
      located_headings: locatedHeadings,
      located_articles: locatedArticles,
      emitted_articles: emittedArticles,
      absent,
      chemicals,
      star_placement: placement,
      problems,
      zero_row_laws: zeroRowLaws,
    }, null, 2), "utf8")
    note(`measure empty ${emptyHeadings} absent ${absent.length}`)
    process.stdout.write(`${JSON.stringify({ measure: true, empty_headings: emptyHeadings, absent: absent.length, located_articles: locatedArticles, emitted_articles: emittedArticles, chemicals: chemicals?.articles ?? [], problems })}\n`)
    return
  }
  if (problems.length > 0) {
    rmSync(PARTS, { recursive: true, force: true })
    note(`failed ${problems.length}`)
    process.stdout.write(`${JSON.stringify({ wrote: false, problems, arithmetic: summary.arithmetic, merged: summary.merged, rows_after: rowsAfter, boundary, glued, embed_tokens: embedTokens, max_tokens: maxTokens }, null, 2)}\n`)
    process.exit(2)
  }

  const names = readdirSync(PARTS).filter((name) => name.endsWith(".jsonl")).sort()
  writeFileSync(FINAL, "", "utf8")
  let lines = 0
  let fileChars = 0
  let emptyText = 0
  let missingId = 0
  const seenKey = new Set<string>()
  let repeated = 0
  let lawsInFile = 0
  let paragraphLines = 0
  let previousLaw = ""
  const lawBreaks: string[] = []
  for (const name of names) {
    const text = readFileSync(path.join(PARTS, name), "utf8")
    if (!text) continue
    const fileIndex = Number(name.slice(0, 5))
    appendFileSync(FINAL, text, "utf8")
    for (const line of text.split("\n")) {
      if (!line) continue
      lines += 1
      const row = JSON.parse(line) as Row
      if (!row.text_local.trim()) emptyText += 1
      if (row.paragraph_num) paragraphLines += 1
      if (!row.source_chunk_id) missingId += 1
      fileChars += row.text_local.length
      const key = `${row.law_name_local}\u0000${row.article_num}\u0000${row.paragraph_num ?? ""}\u0000${row.amending_act ?? ""}\u0000${textHash(row.text_local)}`
      if (seenKey.has(key)) repeated += 1
      else seenKey.add(key)
      if (row.law_name_local !== previousLaw) {
        if (keptAt.get(fileIndex) !== row.law_name_local) lawBreaks.push(`${fileIndex} ${keptAt.get(fileIndex)} vs ${row.law_name_local}`)
        lawsInFile += 1
        previousLaw = row.law_name_local
      }
    }
  }
  rmSync(PARTS, { recursive: true, force: true })
  const fileProblems = [
    ...(lines !== rowsAfter ? [`lines ${lines} rows ${rowsAfter}`] : []),
    ...(emptyText !== 0 ? [`empty text ${emptyText}`] : []),
    ...(repeated !== 0 ? [`repeated keys ${repeated}`] : []),
    ...(missingId !== 0 ? [`missing ids ${missingId}`] : []),
    ...(lawBreaks.length ? [`order breaks ${lawBreaks.length}`] : []),
    ...(lawsInFile !== 2966 ? [`laws in file ${lawsInFile}`] : []),
    ...(lawsInFile !== keptAt.size ? [`laws in file ${lawsInFile} kept ${keptAt.size}`] : []),
    // File characters are the emitted text minus the six-column drop.
    ...(fileChars !== rebuiltChars - dedupedChars ? [`file chars ${fileChars} emitted ${rebuiltChars} dropped copies ${dedupedChars}`] : []),
    ...(lines !== 134118 ? [`lines ${lines}`] : []),
    ...(fileChars !== 91360819 ? [`confirmed chars ${fileChars}`] : []),
  ]
  const fileReport = {
    wrote: fileProblems.length === 0,
    lines,
    empty_text: emptyText,
    repeated_keys: repeated,
    missing_source_ids: missingId,
    order_breaks: lawBreaks.slice(0, 10),
    laws_in_file: lawsInFile,
    paragraph_lines: paragraphLines,
    file_chars: fileChars,
    emitted_chars: rebuiltChars,
    dropped_duplicate_chars: dedupedChars,
    zero_row_laws: zeroRowLaws,
    file_problems: fileProblems,
  }
  writeFileSync(path.resolve(__dirname, "out/_a27-file-check.json"), JSON.stringify(fileReport, null, 2), "utf8")
  if (fileProblems.length > 0) {
    rmSync(FINAL, { force: true })
    note("file check failed; article file removed")
    process.stdout.write(`${JSON.stringify(fileReport, null, 2)}\n`)
    process.exit(3)
  }
  note(`wrote ${lines} lines`)
  process.stdout.write(`${JSON.stringify({
    wrote: true,
    lines,
    rows_before: rowsBefore,
    rows_after: rowsAfter,
    articles,
    max_tokens: maxTokens,
    boundary,
    glued,
    stripped: strippedChars,
    rebuilt: rebuiltChars,
    empty_chars: emptyChars,
    prefix_laws: prefixLaws,
    prefix_chars: prefixChars,
    embed_tokens: embedTokens,
    usd: summary.usd,
    arithmetic: summary.arithmetic,
    file_chars: fileChars,
    laws_in_file: lawsInFile,
    paragraph_lines: paragraphLines,
    zero_row_laws: zeroRowLaws,
    duplicate_articles: dupArticles,
    duplicate_laws: dupLaws,
    star_placement: placement,
  })}\n`)
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.stack : "failed"}\n`)
  process.exit(1)
})
