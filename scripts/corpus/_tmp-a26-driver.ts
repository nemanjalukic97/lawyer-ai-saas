/**
 * Writes scripts/out/serbia-article-file.jsonl only when the rehearsal figures match.
 * Read-only against the database. Does not touch the id files or the snapshot.
 */
import { appendFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs"
import { createInterface } from "readline"
import { createReadStream } from "fs"
import { availableParallelism } from "os"
import path from "path"
import { pathToFileURL } from "url"
import { Worker } from "worker_threads"
import pg from "pg"
import { runLaw, type Chunk, type LawResult, type OutRow } from "./_tmp-a26-run.ts"

const REPO = "C:/Users/neco9/OneDrive/Desktop/CursorModel/my-app"
const PARTS = path.join(process.env.TEMP ?? ".", "a26-parts")
const FINAL = path.join(REPO, "scripts/out/serbia-article-file.jsonl")
const USTAV = "УСТАВ РЕПУБЛИКЕ СРБИЈЕ"
const ENERGY =
  "ПРОГРАМ остваривања Стратегије развоја енергетике Републике Србије до 2040. године са пројекцијама до 2050. године, за период од 2026. до 2028. године"

function loadDatabaseUrl(): string {
  const raw = readFileSync(path.join(REPO, "scripts/outreach/.env"), "utf8")
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim()
    const eq = t.indexOf("=")
    if (eq > 0 && t.slice(0, eq).trim() === "DATABASE_URL") {
      return t.slice(eq + 1).trim().replace(/^["']|["']$/g, "")
    }
  }
  throw new Error("DATABASE_URL missing")
}

function loadIds(): string[] {
  return readFileSync(path.join(REPO, "scripts/out/serbia-phase2-snapshot-ids.txt"), "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

function note(message: string): void {
  process.stderr.write(`${message}\n`)
}

function constitutionShape(rows: OutRow[]): {
  rows: number
  article_nums: string[]
  distinct: string[]
  repeated: string[]
  missing: string[]
  unexpected: string[]
  lettered: string[]
  whole: boolean
  chars_out: number
} {
  const articleNums = rows.map((row) => row.article_num)
  const distinct: string[] = []
  const seen = new Map<string, number>()
  for (const num of articleNums) seen.set(num, (seen.get(num) ?? 0) + 1)
  for (const num of articleNums) if (!distinct.includes(num)) distinct.push(num)
  const repeated = [...seen.entries()].filter(([, n]) => n > 1).map(([num]) => num)
  const plain = new Set<number>()
  const lettered: string[] = []
  const unexpected: string[] = []
  for (const num of distinct) {
    const match = /^(\d+)(.*)$/.exec(num)
    if (!match) {
      unexpected.push(num)
      continue
    }
    const intN = Number(match[1])
    const suffix = match[2] ?? ""
    if (suffix === "") {
      if (intN >= 1 && intN <= 206) plain.add(intN)
      else unexpected.push(num)
    } else if (intN === 165) lettered.push(num)
    else unexpected.push(num)
  }
  const missing: string[] = []
  for (let n = 1; n <= 206; n += 1) if (!plain.has(n)) missing.push(String(n))
  const whole = missing.length === 0 && unexpected.length === 0 && lettered.length === 1 && repeated.length === 0
  return {
    rows: rows.length,
    article_nums: articleNums,
    distinct,
    repeated,
    missing,
    unexpected,
    lettered,
    whole,
    chars_out: rows.reduce((total, row) => total + row.text_local.length, 0),
  }
}

function startPool(size: number): {
  run: (index: number, law: string, chunks: Chunk[]) => Promise<{ index: number; result: LawResult }>
  close: () => Promise<void>
} {
  const workers = Array.from({ length: size }, () => new Worker(pathToFileURL(path.join(REPO, "scripts/_tmp-a26-worker.ts")), {
    execArgv: process.execArgv,
  }))
  const idle = [...workers]
  const waiting: Array<(worker: Worker) => void> = []
  const pending = new Map<number, { resolve: (row: { index: number; result: LawResult }) => void; worker: Worker }>()
  let seq = 1
  const release = (worker: Worker) => {
    const next = waiting.shift()
    if (next) next(worker)
    else idle.push(worker)
  }
  for (const worker of workers) {
    worker.on("message", (msg: { id: number; index: number; result: LawResult }) => {
      const slot = pending.get(msg.id)
      if (!slot) return
      pending.delete(msg.id)
      slot.resolve({ index: msg.index, result: msg.result })
      release(worker)
    })
    worker.on("error", (error) => {
      note(`worker error ${error.message}`)
      for (const [id, slot] of pending) {
        if (slot.worker !== worker) continue
        pending.delete(id)
        slot.resolve({
          index: -1,
          result: {
            law: "",
            kept: false,
            reason: "error",
            chunks: 0,
            error: error.message,
            output_rows: 0,
            articles: 0,
            max_tokens: 0,
            boundary_failed: 0,
            paragraph_bad: 0,
            text_mismatch: 0,
            conservation_stripped: 0,
            conservation_rebuilt: 0,
            exceptions: [],
            deduped: 0,
            six_groups_before: 0,
            joined_chars: 0,
            rows: [],
          },
        })
      }
    })
  }
  return {
    run(index, law, chunks) {
      const id = seq
      seq += 1
      return new Promise((resolve) => {
        const start = (worker: Worker) => {
          pending.set(id, { resolve, worker })
          worker.postMessage({ id, index, law, chunks })
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

async function main(): Promise<void> {
  const ids = loadIds()
  const client = new pg.Client({ connectionString: loadDatabaseUrl(), ssl: { rejectUnauthorized: false } })
  await client.connect()
  await client.query("BEGIN READ ONLY")
  await client.query("SET LOCAL statement_timeout = '0'")
  const ustavRows = await client.query<Chunk & { law_name_local: string }>(
    `SELECT id::text AS id, law_name_local, article_num, text_local
       FROM public.legal_articles
      WHERE id = ANY($1::uuid[])
        AND law_name_local = $2`,
    [ids, USTAV],
  )
  const probe = runLaw(USTAV, ustavRows.rows.map((row) => ({
    id: row.id,
    article_num: row.article_num,
    text_local: row.text_local ?? "",
  })))
  const shape = constitutionShape(probe.rows)
  note(`constitution probe rows ${shape.rows} whole ${shape.whole} joined ${probe.joined_chars} out ${shape.chars_out} lettered ${shape.lettered.join(",") || "none"} missing ${shape.missing.length} unexpected ${shape.unexpected.length} repeated ${shape.repeated.length}`)
  if (!shape.whole || probe.skip || probe.error || !probe.kept) {
    note("constitution gate failed; article file not written")
    process.stdout.write(`${JSON.stringify({
      wrote: false,
      constitution: {
        kept: probe.kept,
        reason: probe.reason,
        skip: probe.skip ?? null,
        error: probe.error ?? null,
        joined_chars: probe.joined_chars,
        ...shape,
        samples: sampleArticles(probe.rows),
      },
    })}\n`)
    await client.query("COMMIT")
    await client.end()
    process.exit(2)
  }

  rmSync(PARTS, { recursive: true, force: true })
  mkdirSync(PARTS, { recursive: true })
  await client.query(
    `DECLARE art NO SCROLL CURSOR FOR
       SELECT id::text AS id, law_name_local, article_num, text_local
         FROM public.legal_articles
        WHERE id = ANY($1::uuid[])
        ORDER BY law_name_local,
                 CASE WHEN article_num ~ '^[0-9]+$' THEN article_num::int END NULLS LAST,
                 article_num`,
    [ids],
  )
  const pool = startPool(Math.max(1, Math.min(4, availableParallelism() - 1)))
  let index = 0
  let current = ""
  let bucket: Chunk[] = []
  const jobs: Array<Promise<void>> = []
  let completed = 0
  let laws = 0
  let inputChunks = 0
  let outputRows = 0
  let articles = 0
  let maxTokens = 0
  let maxTokenLaw = ""
  let boundary = 0
  let conservationStripped = 0
  let conservationRebuilt = 0
  let deduped = 0
  let sixBefore = 0
  const problems: Array<{ law: string; detail: string }> = []
  const skips: Array<{ law: string; skip: string }> = []

  const take = (jobIndex: number, result: LawResult) => {
    if (result.error) problems.push({ law: result.law, detail: result.error })
    if (result.skip) skips.push({ law: result.law, skip: result.skip })
    if (result.kept && !result.skip && !result.error) {
      laws += 1
      inputChunks += result.chunks
      outputRows += result.output_rows
      articles += result.articles
      if ((result.max_tokens ?? 0) > maxTokens) {
        maxTokens = result.max_tokens
        maxTokenLaw = result.law
      }
      boundary += result.boundary_failed
      conservationStripped += result.conservation_stripped
      conservationRebuilt += result.conservation_rebuilt
      deduped += result.deduped
      sixBefore += result.six_groups_before
      if (result.boundary_failed !== 0) problems.push({ law: result.law, detail: `boundary_failed ${result.boundary_failed}` })
      if (result.paragraph_bad !== 0) problems.push({ law: result.law, detail: `paragraph_bad ${result.paragraph_bad}` })
      if (result.text_mismatch !== 0) problems.push({ law: result.law, detail: `text_mismatch ${result.text_mismatch}` })
      if (result.exceptions.length > 0) problems.push({ law: result.law, detail: result.exceptions.join(" | ") })
      if (result.conservation_stripped !== result.conservation_rebuilt) {
        problems.push({ law: result.law, detail: `conservation ${result.conservation_stripped} ${result.conservation_rebuilt}` })
      }
      const file = path.join(PARTS, `${String(jobIndex).padStart(5, "0")}.jsonl`)
      writeFileSync(file, result.rows.map((row) => JSON.stringify(row)).join("\n") + (result.rows.length ? "\n" : ""), "utf8")
    }
  }

  const launch = (law: string, chunks: Chunk[]) => {
    const jobIndex = index
    index += 1
    jobs.push(pool.run(jobIndex, law, chunks).then((msg) => {
      take(msg.index, msg.result)
      completed += 1
      if (completed % 50 === 0) note(`seen ${completed} kept ${laws} rows ${outputRows}`)
    }))
  }
  for (;;) {
    const batch = await client.query<Chunk & { law_name_local: string }>("FETCH 200 FROM art")
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
  await client.query("CLOSE art")
  await client.query("COMMIT")
  await client.end()
  await Promise.all(jobs)
  await pool.close()

  const expected = {
    laws: 2966,
    input_chunks: 52406,
    output_rows: 140100,
    articles: 72070,
    max_tokens: 6999,
    boundary_failed: 0,
    conservation_stripped: 93176446,
    conservation_rebuilt: 93176446,
    duplicate_keys: 0,
  }
  const actual = {
    laws,
    input_chunks: inputChunks,
    output_rows: outputRows,
    articles,
    max_tokens: maxTokens,
    max_token_law: maxTokenLaw,
    boundary_failed: boundary,
    conservation_stripped: conservationStripped,
    conservation_rebuilt: conservationRebuilt,
    deduped,
    six_groups_before: sixBefore,
    skips,
    problems,
  }
  const figuresMatch =
    laws === expected.laws &&
    inputChunks === expected.input_chunks &&
    outputRows === expected.output_rows &&
    articles === expected.articles &&
    maxTokens === expected.max_tokens &&
    boundary === expected.boundary_failed &&
    conservationStripped === expected.conservation_stripped &&
    conservationRebuilt === expected.conservation_rebuilt &&
    problems.length === 0 &&
    skips.length === 1 &&
    skips[0]?.law === ENERGY &&
    skips[0]?.skip === "no-headings-after-strip"
  if (!figuresMatch) {
    rmSync(PARTS, { recursive: true, force: true })
    process.stdout.write(`${JSON.stringify({ wrote: false, expected, actual }, null, 2)}\n`)
    process.exit(3)
  }

  const names = readdirSync(PARTS).filter((name) => name.endsWith(".jsonl")).sort()
  writeFileSync(FINAL, "", "utf8")
  let lines = 0
  for (const name of names) {
    const text = readFileSync(path.join(PARTS, name), "utf8")
    appendFileSync(FINAL, text, "utf8")
    if (text.length > 0) lines += text.split("\n").length - 1
  }
  rmSync(PARTS, { recursive: true, force: true })
  if (lines !== expected.output_rows) {
    rmSync(FINAL, { force: true })
    process.stdout.write(`${JSON.stringify({ wrote: false, detail: "line count", lines, expected: expected.output_rows }, null, 2)}\n`)
    process.exit(4)
  }
  const fromFile = await constitutionFromFile(FINAL)
  process.stdout.write(`${JSON.stringify({
    wrote: true,
    lines,
    expected,
    actual: {
      laws,
      input_chunks: inputChunks,
      output_rows: outputRows,
      articles,
      max_tokens: maxTokens,
      boundary_failed: boundary,
      conservation_stripped: conservationStripped,
      conservation_rebuilt: conservationRebuilt,
      duplicate_keys: 0,
      deduped,
      six_groups_before: sixBefore,
    },
    constitution_file: fromFile,
    constitution_joined_chars: probe.joined_chars,
  }, null, 2)}\n`)
}

async function constitutionFromFile(file: string): Promise<ReturnType<typeof constitutionShape> & { samples: Record<string, string[]> }> {
  const rows: OutRow[] = []
  const stream = createInterface({ input: createReadStream(file, { encoding: "utf8" }), crlfDelay: Infinity })
  for await (const line of stream) {
    if (!line) continue
    const row = JSON.parse(line) as OutRow
    if (row.law_name_local === USTAV) rows.push(row)
  }
  return { ...constitutionShape(rows), samples: sampleArticles(rows) }
}

function sampleArticles(rows: OutRow[]): Record<string, string[]> {
  const want = new Set(["1", "165", "165a", "204", "205", "206"])
  const out: Record<string, string[]> = {}
  for (const row of rows) {
    if (!want.has(row.article_num) && !/^165\p{L}/u.test(row.article_num)) continue
    const key = row.article_num
    const list = out[key] ?? []
    list.push(row.text_local.slice(0, 200))
    out[key] = list
  }
  return out
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "failed"}\n`)
  process.exit(1)
})
