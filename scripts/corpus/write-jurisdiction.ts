/**
 * Delete, then insert, one jurisdiction at a time.
 * Does not vacuum and does not change indexes. The GIN indexes stay.
 * One pg.Client per process. The session advisory lock is taken on that
 * connection and every later query uses it. There is no pool.
 *   npx tsx scripts/corpus/write-jurisdiction.ts delete bih_brcko
 *   npx tsx scripts/corpus/write-jurisdiction.ts insert bih_brcko
 *   npx tsx scripts/corpus/write-jurisdiction.ts hold-lock bih_brcko 20
 * Credential: DATABASE_URL, from scripts/outreach/.env or .env.local. Never printed.
 * The unofficial Federation constitution is excluded from both steps.
 */
import { createInterface } from "readline"
import { createReadStream, openSync, readSync, writeSync, closeSync, fsyncSync } from "fs"
import { readFile } from "fs/promises"
import path from "path"
import dotenv from "dotenv"
import pg from "pg"

dotenv.config({ path: path.resolve(__dirname, "../outreach/.env"), quiet: true })
dotenv.config({ path: path.resolve(__dirname, "../../.env.local"), quiet: true })

const OUT = path.resolve(__dirname, "../out")
const SLICES = path.join(OUT, "bih-h4-delete-slices.sql")
function deleteProgressFile(jurisdiction: Jurisdiction): string {
  return path.join(OUT, `bih-h4-delete-progress-${jurisdiction}.txt`)
}
const EXCLUDED = "Ustav Federacije Bosne i Hercegovine – neslužbeni prečišćeni tekst (Uključeni amandmani I-CXXXI)"
const BATCH = 25
const SLICE_COUNT = 21
const DELETE_TOTAL = 19339

const START = { bih_fbih: 11964, bih_rs: 7417, bih_brcko: 1898 } as const
const AFTER_DELETE = { bih_fbih: 759, bih_rs: 1179, bih_brcko: 2 } as const

type Jurisdiction = "bih_fbih" | "bih_rs" | "bih_brcko"

const LOCK_NAMESPACE = 74821
const LOCK_KEYS: Record<string, number> = {
  bih_fbih: 1,
  bih_rs: 2,
  bih_brcko: 3,
  croatia: 4,
  slovenia: 5,
  montenegro: 6,
  serbia: 7,
}

const JOBS: Array<{
  jurisdiction: Jurisdiction
  insert: string
  vectors: string
  dump: string
  progress: string
  baseline: number
  insertRows: number
  skipRows: number
  fileRows: number
  post: number
}> = [
  {
    jurisdiction: "bih_fbih",
    insert: "fbih-insert-h4.jsonl",
    vectors: "fbih-embeddings-h4.jsonl.partial",
    dump: "fbih-predelete-dump-h4.jsonl",
    progress: "bih-h4-insert-progress-fbih.txt",
    baseline: 759,
    insertRows: 31195,
    skipRows: 134,
    fileRows: 31329,
    post: 31954,
  },
  {
    jurisdiction: "bih_rs",
    insert: "rs-insert-h4.jsonl",
    vectors: "rs-embeddings-h4.jsonl.partial",
    dump: "rs-predelete-dump-h4.jsonl",
    progress: "bih-h4-insert-progress-rs.txt",
    baseline: 1179,
    insertRows: 17531,
    skipRows: 0,
    fileRows: 17531,
    post: 18710,
  },
  {
    jurisdiction: "bih_brcko",
    insert: "brcko-insert-h4.jsonl",
    vectors: "brcko-embeddings-h4.jsonl.partial",
    dump: "brcko-predelete-dump-h4.jsonl",
    progress: "bih-h4-insert-progress-brcko.txt",
    baseline: 2,
    insertRows: 6129,
    skipRows: 0,
    fileRows: 6129,
    post: 6131,
  },
]

type Slice = {
  jurisdiction: Jurisdiction
  expect: number
  jurisdictionTotal: number
  running: number
  statement: string
  ids: string[]
}

type Source = {
  jurisdiction: string
  law_name_local: string
  law_name: string
  law_category: string
  source_url: string | null
  effective_date: string | null
  applies_before: string | null
  act_type: string | null
}

type Ready = {
  jurisdiction: Jurisdiction
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num: string | null
  text: string
  source_url: string | null
  effective_date: string | null
  applies_before: string | null
  act_type: string | null
  is_excerpt: boolean
  embedding: string
  amending_act: string | null
}

type ColumnInfo = {
  column_name: string
  udt_name: string
  is_nullable: string
  column_default: string | null
}

const SENT = [
  "jurisdiction",
  "law_name",
  "law_name_local",
  "law_category",
  "article_num",
  "paragraph_num",
  "text",
  "text_local",
  "source_url",
  "effective_date",
  "applies_before",
  "act_type",
  "is_excerpt",
  "embedding",
  "amending_act",
] as const

function redact(error: unknown): string {
  const parts: string[] = []
  if (error && typeof error === "object") {
    const row = error as { code?: string; constraint?: string; detail?: string; message?: string }
    if (row.code) parts.push(row.code)
    if (row.constraint) parts.push(row.constraint)
    if (row.detail) parts.push(row.detail)
    if (row.message) parts.push(row.message)
  }
  const message = parts.length > 0 ? parts.join(" | ") : error instanceof Error ? error.message : String(error)
  return message.replace(/postgres(?:ql)?:\/\/\S+/gi, "DATABASE_URL")
}

function client(): pg.Client {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error("DATABASE_URL is missing")
  return new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
}

function writeLine(line: string): Promise<void> {
  const text = line.endsWith("\n") ? line : `${line}\n`
  return new Promise((resolve, reject) => {
    process.stdout.write(text, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

function fsyncExisting(file: string | null): void {
  if (!file) return
  let fd: number | null = null
  try {
    fd = openSync(file, "r+")
    fsyncSync(fd)
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code !== "ENOENT") throw error
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

let exiting = false

async function finish(db: pg.Client | null, code: number, line: string, progressFile: string | null = null): Promise<never> {
  if (exiting) return new Promise<never>(() => {})
  exiting = true
  try {
    fsyncExisting(progressFile)
    if (line) await writeLine(line)
    if (db) await db.end().catch(() => undefined)
  } catch (error) {
    process.stderr.write(`${redact(error)}\n`)
  }
  process.exit(code)
}

async function acquireLock(db: pg.Client, jurisdiction: string): Promise<boolean> {
  const key = LOCK_KEYS[jurisdiction]
  if (key === undefined) throw new Error(`no advisory lock key for ${jurisdiction}`)
  const result = await db.query<{ locked: boolean }>(
    `SELECT pg_try_advisory_lock($1::int, $2::int) AS locked`,
    [LOCK_NAMESPACE, key],
  )
  return result.rows[0]!.locked
}

function readProgress(file: string): number | null {
  try {
    const fd = openSync(file, "r")
    const buf = Buffer.alloc(64)
    const n = readSync(fd, buf, 0, 64, 0)
    closeSync(fd)
    const text = buf.toString("utf8", 0, n).trim()
    if (!/^\d+$/.test(text)) throw new Error(`${path.basename(file)} does not hold a row index`)
    return Number(text)
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === "ENOENT") return null
    throw error
  }
}

function flushProgress(file: string, value: number): void {
  const fd = openSync(file, "w")
  writeSync(fd, Buffer.from(`${value}\n`, "utf8"))
  fsyncSync(fd)
  closeSync(fd)
}

function transient(error: unknown): boolean {
  const code = error && typeof error === "object" ? (error as { code?: string }).code : undefined
  return code === "57014" || code === "40001" || code === "40P01" || code === "08006" || code === "08001" || code === "57P01" || code === "ECONNRESET" || code === "ETIMEDOUT"
}

function uniqueViolation(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && (error as { code?: string }).code === "23505")
}

function asText(value: unknown): string | null {
  if (value === null || value === undefined) return null
  return typeof value === "string" ? value : String(value)
}

function paraOf(value: unknown): string | null {
  if (value === null || value === undefined) return null
  const text = String(value)
  return text.length === 0 ? null : text
}

function stripEmbedding(line: string): string {
  const key = '"embedding":'
  const at = line.lastIndexOf(key)
  if (at < 0) return line
  const start = at + key.length
  if (line.startsWith("null", start)) return line
  if (line[start] === '"') {
    const end = line.indexOf('"', start + 1)
    if (end < 0) throw new Error("unterminated embedding string in the dump")
    return `${line.slice(0, start)}null${line.slice(end + 1)}`
  }
  if (line[start] === "[") {
    const end = line.indexOf("]", start)
    if (end < 0) throw new Error("unterminated embedding array in the dump")
    return `${line.slice(0, start)}null${line.slice(end + 1)}`
  }
  throw new Error("dump embedding is not null, a string, or an array")
}

function splitVector(line: string): { meta: Record<string, unknown>; embedding: string; width: number } {
  const marker = ',"embedding":'
  const at = line.lastIndexOf(marker)
  if (at < 0) throw new Error("vector line has no embedding")
  const embedding = line.slice(at + marker.length).replace(/}\s*$/, "")
  if (!embedding.startsWith("[") || !embedding.endsWith("]")) throw new Error("vector embedding is not a raw array")
  let commas = 0
  for (let i = 1; i < embedding.length - 1; i += 1) if (embedding.charCodeAt(i) === 44) commas += 1
  const width = embedding.length === 2 ? 0 : commas + 1
  const meta = JSON.parse(`${line.slice(0, at)}}`) as Record<string, unknown>
  return { meta, embedding, width }
}

function parseSlices(sql: string): Slice[] {
  const slices: Slice[] = []
  let pending: Omit<Slice, "statement" | "ids"> | null = null
  for (const raw of sql.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith("--")) {
      const match = line.match(/^-- (bih_fbih|bih_rs|bih_brcko) slice \d+ of \d+: expect (\d+), jurisdiction total (\d+), running total (\d+)$/)
      pending = match
        ? {
            jurisdiction: match[1] as Jurisdiction,
            expect: Number(match[2]),
            jurisdictionTotal: Number(match[3]),
            running: Number(match[4]),
          }
        : null
      continue
    }
    if (!pending) throw new Error("delete statement without a slice comment")
    if (!line.startsWith("WITH d AS (DELETE FROM public.legal_articles WHERE ")) throw new Error("unexpected delete statement")
    const ids = [...line.matchAll(/'([0-9a-f-]{36})'::uuid/gi)].map((match) => match[1]!.toLowerCase())
    if (ids.length !== pending.expect) throw new Error(`uuid count ${ids.length} != expect ${pending.expect}`)
    const listStart = line.indexOf("law_name_local IN (")
    const listEnd = line.indexOf(") AND id IN (", listStart)
    if (listStart < 0 || listEnd < 0) throw new Error("law list markers missing")
    if (line.slice(listStart, listEnd).includes(EXCLUDED)) throw new Error("excluded law is in a delete list")
    if (!line.includes(`law_name_local IS DISTINCT FROM '${EXCLUDED}'`)) throw new Error("excluded-law predicate missing")
    slices.push({ ...pending, statement: line, ids })
    pending = null
  }
  if (slices.length !== SLICE_COUNT) throw new Error(`slice count ${slices.length}`)
  const sum = slices.reduce((total, slice) => total + slice.expect, 0)
  if (sum !== DELETE_TOTAL) throw new Error(`slice sum ${sum}`)
  const runningOk = slices.every((slice, index) => slice.running === slices.slice(0, index + 1).reduce((total, item) => total + item.expect, 0))
  if (!runningOk) throw new Error("running totals do not add up")
  return slices
}

function castFor(info: ColumnInfo): string {
  if (info.udt_name === "halfvec" || info.udt_name === "vector") return `::${info.udt_name}`
  if (info.udt_name === "bool") return "::boolean"
  if (info.udt_name === "date") return "::date"
  if (info.udt_name === "timestamp") return "::timestamp"
  if (info.udt_name === "timestamptz") return "::timestamptz"
  if (info.udt_name === "text" || info.udt_name === "varchar") return "::text"
  throw new Error(`no insert cast for ${info.column_name} (${info.udt_name})`)
}

async function liveCounts(db: pg.Client): Promise<Record<Jurisdiction | "constitution", number>> {
  const result = await db.query<Record<Jurisdiction | "constitution", number | string>>(
    `SELECT
       count(*) FILTER (WHERE jurisdiction = 'bih_fbih')::int AS bih_fbih,
       count(*) FILTER (WHERE jurisdiction = 'bih_rs')::int AS bih_rs,
       count(*) FILTER (WHERE jurisdiction = 'bih_brcko')::int AS bih_brcko,
       count(*) FILTER (WHERE jurisdiction = 'bih_fbih' AND law_name_local = $1)::int AS constitution
     FROM public.legal_articles
     WHERE jurisdiction IN ('bih_fbih', 'bih_rs', 'bih_brcko')`,
    [EXCLUDED],
  )
  const row = result.rows[0]!
  return {
    bih_fbih: Number(row.bih_fbih),
    bih_rs: Number(row.bih_rs),
    bih_brcko: Number(row.bih_brcko),
    constitution: Number(row.constitution),
  }
}

async function countIds(db: pg.Client, ids: string[]): Promise<number> {
  let found = 0
  for (let start = 0; start < ids.length; start += 1000) {
    const result = await db.query<{ n: number }>(
      `SELECT count(*)::int AS n FROM public.legal_articles WHERE id = ANY($1::uuid[])`,
      [ids.slice(start, start + 1000)],
    )
    found += result.rows[0]!.n
  }
  return found
}

async function deleteRows(jurisdiction: Jurisdiction): Promise<void> {
  const db = client()
  let progressFile: string | null = null
  try {
    await db.connect()
    if (!(await acquireLock(db, jurisdiction))) {
      await finish(db, 2, `LOCK REFUSED ${jurisdiction} already locked\n`)
    }
    const job = JOBS.find((item) => item.jurisdiction === jurisdiction)!
    progressFile = deleteProgressFile(jurisdiction)
    if (readProgress(path.join(OUT, job.progress)) !== null) {
      await finish(db, 2, `insert progress exists for ${jurisdiction}; delete will not run\n`, progressFile)
    }
    const slices = parseSlices(await readFile(SLICES, "utf8")).filter((slice) => slice.jurisdiction === jurisdiction)
    const completed = readProgress(progressFile) ?? 0
    if (completed < 0 || completed > slices.length) throw new Error(`delete progress ${completed} is outside 0..${slices.length}`)
    const started = Date.now()
    const live = await liveCounts(db)
    const removed = slices.slice(0, completed).reduce((total, slice) => total + slice.expect, 0)
    const expected = START[jurisdiction] - removed
    if (live[jurisdiction] !== expected) {
      await finish(db, 2, `DELETE STOP ${jurisdiction} ${live[jurisdiction]} expected ${expected} at completed slices ${completed}\n`, progressFile)
    }
    if (live.constitution !== 51) {
      await finish(db, 2, `DELETE STOP excluded law has ${live.constitution} rows, expected 51\n`, progressFile)
    }
    const others = { ...live }
    for (let index = completed; index < slices.length; index += 1) {
      const slice = slices[index]!
      let lastError: unknown
      let count: number | null = null
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        await db.query("BEGIN")
        try {
          const result = await db.query<Record<string, string>>(slice.statement)
          count = Number(Object.values(result.rows[0] ?? {})[0])
          if (count !== slice.expect) {
            await db.query("ROLLBACK")
            await finish(db, 2, `DELETE STOP ${jurisdiction} slice ${index + 1} removed ${count}, expected ${slice.expect}. Rolled back. Progress file ${path.basename(progressFile)} says ${index}.\n`, progressFile)
          }
          await db.query("COMMIT")
          lastError = undefined
          break
        } catch (error) {
          await db.query("ROLLBACK").catch(() => undefined)
          lastError = error
          if (!transient(error) || attempt === 3) break
          process.stdout.write(`${jurisdiction} slice ${index + 1} retry ${attempt} ${redact(error)}\n`)
        }
      }
      if (count === null) {
        await finish(db, 2, `DELETE STOP ${jurisdiction} slice ${index + 1} ${redact(lastError)}. Progress file ${path.basename(progressFile)} says ${index}.\n`, progressFile)
      }
      flushProgress(progressFile, index + 1)
      process.stdout.write(`${jurisdiction} slice ${index + 1} removed ${count} expected ${slice.expect} jurisdiction total ${slice.jurisdictionTotal}\n`)
    }
    const after = await liveCounts(db)
    const removedIds = slices.flatMap((slice) => slice.ids)
    const stillThere = await countIds(db, removedIds)
    const othersSame = (Object.keys(START) as Jurisdiction[]).every((name) => name === jurisdiction || after[name] === others[name])
    const ok = after[jurisdiction] === AFTER_DELETE[jurisdiction]
      && after.constitution === 51
      && stillThere === 0
      && othersSame
    const summary = `${JSON.stringify({ ...after, delete_ids_still_present: stillThere, wall_ms: Date.now() - started })}\n${ok ? "DELETE PASS\n" : "DELETE FAIL\n"}`
    const detail = ok ? "" : `DELETE STOP ${jurisdiction} ${after[jurisdiction]} expected ${AFTER_DELETE[jurisdiction]}, ids still present ${stillThere}, constitution ${after.constitution}. Progress file ${path.basename(progressFile)} says ${readProgress(progressFile)}.\n`
    await finish(db, ok ? 0 : 2, `${summary}${detail}`, progressFile)
  } catch (error) {
    await finish(db, 1, `${redact(error)}\n`, progressFile)
  }
}

async function loadSources(job: (typeof JOBS)[number]): Promise<Map<string, Source>> {
  const sources = new Map<string, Source>()
  {
    const reader = createInterface({
      input: createReadStream(path.join(OUT, job.dump), { encoding: "utf8" }),
      crlfDelay: Infinity,
    })
    for await (const line of reader) {
      if (!line) continue
      const row = JSON.parse(stripEmbedding(line)) as Record<string, unknown>
      const id = asText(row.id)
      const law = asText(row.law_name_local)
      if (!id || !law) throw new Error("dump row missing id or law")
      if (sources.has(id)) throw new Error("duplicate dump id")
      sources.set(id, {
        jurisdiction: asText(row.jurisdiction) ?? "",
        law_name_local: law,
        law_name: asText(row.law_name) ?? "",
        law_category: asText(row.law_category) ?? "",
        source_url: asText(row.source_url),
        effective_date: asText(row.effective_date),
        applies_before: asText(row.applies_before),
        act_type: asText(row.act_type),
      })
    }
  }
  return sources
}

async function insertRows(jurisdiction: Jurisdiction): Promise<void> {
  const db = client()
  let progressFile: string | null = null
  try {
    await db.connect()
    if (!(await acquireLock(db, jurisdiction))) {
      await finish(db, 2, `LOCK REFUSED ${jurisdiction} already locked\n`)
    }
    const job = JOBS.find((item) => item.jurisdiction === jurisdiction)!
    progressFile = path.join(OUT, job.progress)
    const slices = parseSlices(await readFile(SLICES, "utf8")).filter((slice) => slice.jurisdiction === jurisdiction)
    const deleteProgress = deleteProgressFile(jurisdiction)
    const recorded = readProgress(deleteProgress)
    if (recorded !== slices.length) {
      await finish(db, 2, `${jurisdiction} delete progress is ${recorded ?? "missing"}, expected ${slices.length}; insert will not run\n`, progressFile)
    }
    const started = Date.now()
    const stillThere = await countIds(db, slices.flatMap((slice) => slice.ids))
    if (stillThere !== 0) {
      await finish(db, 2, `INSERT STOP ${jurisdiction} ${stillThere} delete ids are still present. Progress file ${path.basename(deleteProgress)} says ${recorded}.\n`, progressFile)
    }
    const before = await liveCounts(db)
    if (before.constitution !== 51) {
      await finish(db, 2, `INSERT STOP excluded law has ${before.constitution} rows, expected 51\n`, progressFile)
    }
    const columns = await db.query<ColumnInfo>(
      `SELECT column_name, udt_name, is_nullable, column_default
         FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'legal_articles'
        ORDER BY ordinal_position`,
    )
    const byName = new Map(columns.rows.map((column) => [column.column_name, column]))
    for (const column of columns.rows) {
      const required = column.is_nullable === "NO" && column.column_default === null
      if (required && !SENT.includes(column.column_name as (typeof SENT)[number])) {
        throw new Error(`required column ${column.column_name} is not in the insert`)
      }
    }
    const casts = SENT.map((name) => castFor(byName.get(name)!))
    const sources = await loadSources(job)
    const outcome = await insertJob(db, job, sources, casts)
    if (!outcome) await finish(db, 2, `INSERT STOP ${jurisdiction}\n`, progressFile)
    const after = await liveCounts(db)
    const othersSame = (Object.keys(START) as Jurisdiction[]).every((name) => name === jurisdiction || after[name] === before[name])
    const ok = after[jurisdiction] === job.post && after.constitution === 51 && othersSame
    const summary = `${JSON.stringify({ ...after, wall_ms: Date.now() - started })}\n${ok ? "INSERT PASS\n" : "INSERT FAIL\n"}`
    const detail = ok ? "" : `INSERT STOP ${jurisdiction} ${after[jurisdiction]} expected ${job.post}, constitution ${after.constitution}. Progress file ${job.progress} says ${readProgress(progressFile)}.\n`
    await finish(db, ok ? 0 : 2, `${summary}${detail}`, progressFile)
  } catch (error) {
    await finish(db, 1, `${redact(error)}\n`, progressFile)
  }
}

async function insertJob(db: pg.Client, job: (typeof JOBS)[number], sources: Map<string, Source>, casts: string[]): Promise<boolean> {
  const progressFile = path.join(OUT, job.progress)
  const last = readProgress(progressFile)
  const start = last === null ? 0 : last + 1
  if (start < 0 || start > job.fileRows) throw new Error(`${job.jurisdiction} progress ${last} is outside the file`)
  const insertReader = createInterface({
    input: createReadStream(path.join(OUT, job.insert), { encoding: "utf8" }),
    crlfDelay: Infinity,
  })
  const vectorReader = createInterface({
    input: createReadStream(path.join(OUT, job.vectors), { encoding: "utf8" }),
    crlfDelay: Infinity,
  })
  const vectorIter = vectorReader[Symbol.asyncIterator]()
  let index = 0
  let prior = 0
  let priorSkip = 0
  let skipped = 0
  let inserted = 0
  let batch: Ready[] = []
  let batchStart = start
  let lastRow = -1
  let batches = 0
  let batchMs = 0
  const wallStart = Date.now()
  const closeReaders = (): void => {
    insertReader.close()
    vectorReader.close()
  }
  try {
    for await (const line of insertReader) {
      if (!line) continue
      let vectorLine = await vectorIter.next()
      while (!vectorLine.done && !vectorLine.value) vectorLine = await vectorIter.next()
      if (vectorLine.done || !vectorLine.value) throw new Error(`${job.jurisdiction} vector file ended early`)
      const row = JSON.parse(line) as Record<string, unknown>
      const split = splitVector(vectorLine.value)
      if (split.meta.index !== index) throw new Error(`${job.jurisdiction} vector index ${String(split.meta.index)} != ${index}`)
      if (split.meta.model !== "text-embedding-3-small") throw new Error(`${job.jurisdiction} vector model at ${index}`)
      if (split.width !== 1536) throw new Error(`${job.jurisdiction} vector width ${split.width} at ${index}`)
      const law = asText(row.law_name_local)
      const article = asText(row.article_num)
      const chunk = asText(row.source_chunk_id)
      if (law === null || article === null || chunk === null) throw new Error(`${job.jurisdiction} row ${index} is missing identity`)
      const same = split.meta.law_name_local === law
        && String(split.meta.article_num) === article
        && paraOf(split.meta.paragraph_num) === paraOf(row.paragraph_num)
        && (asText(split.meta.amending_act) ?? null) === (asText(row.amending_act) ?? null)
        && split.meta.source_chunk_id === chunk
      if (!same) throw new Error(`${job.jurisdiction} identity mismatch at ${index}`)
      const excluded = law === EXCLUDED
      if (index < start) {
        if (excluded) priorSkip += 1
        else prior += 1
        index += 1
        continue
      }
      if (excluded) {
        skipped += 1
        index += 1
        continue
      }
      const source = sources.get(chunk)
      const text = asText(row.text_local)
      if (!source || source.jurisdiction !== job.jurisdiction || source.law_name_local !== law) {
        throw new Error(`${job.jurisdiction} unresolved source chunk at ${index}`)
      }
      if (!source.law_name || !source.law_category || text === null || typeof row.is_excerpt !== "boolean") {
        throw new Error(`${job.jurisdiction} row ${index} is missing a required value`)
      }
      if (batch.length === 0) batchStart = index
      lastRow = index
      batch.push({
        jurisdiction: job.jurisdiction,
        law_name: source.law_name,
        law_name_local: law,
        law_category: source.law_category,
        article_num: article,
        paragraph_num: paraOf(row.paragraph_num),
        text,
        source_url: source.source_url,
        effective_date: source.effective_date,
        applies_before: source.applies_before,
        act_type: source.act_type,
        is_excerpt: row.is_excerpt,
        embedding: split.embedding,
        amending_act: asText(row.amending_act),
      })
      if (batch.length === BATCH) {
        const batchStarted = Date.now()
        const ok = await writeBatch(db, batch, casts, job, prior + inserted, batchStart, lastRow)
        if (!ok) return false
        batches += 1
        batchMs += Date.now() - batchStarted
        inserted += batch.length
        batch = []
      }
      index += 1
    }
    const extra = await vectorIter.next()
    if (!extra.done && extra.value) throw new Error(`${job.jurisdiction} vector file is longer than the insert file`)
    if (batch.length > 0) {
      const batchStarted = Date.now()
      const ok = await writeBatch(db, batch, casts, job, prior + inserted, batchStart, lastRow)
      if (!ok) return false
      batches += 1
      batchMs += Date.now() - batchStarted
      inserted += batch.length
    }
    if (prior + priorSkip !== start) throw new Error(`${job.jurisdiction} resume index does not cover ${start} rows`)
    if (prior + inserted !== job.insertRows) throw new Error(`${job.jurisdiction} inserted ${prior + inserted}, expected ${job.insertRows}`)
    if (priorSkip + skipped !== job.skipRows) throw new Error(`${job.jurisdiction} skipped ${priorSkip + skipped}, expected ${job.skipRows}`)
    const mean = batches === 0 ? 0 : Math.round(batchMs / batches)
    process.stdout.write(`${job.jurisdiction} inserted ${inserted} skipped ${skipped} prior ${prior} batches ${batches} wall_ms ${Date.now() - wallStart} mean_batch_ms ${mean}\n`)
    return true
  } finally {
    closeReaders()
  }
}

async function writeBatch(
  db: pg.Client,
  batch: Ready[],
  casts: string[],
  job: (typeof JOBS)[number],
  already: number,
  first: number,
  last: number,
): Promise<boolean> {
  const values: unknown[] = []
  const tuples: string[] = []
  for (const row of batch) {
    const fields = [
      row.jurisdiction,
      row.law_name,
      row.law_name_local,
      row.law_category,
      row.article_num,
      row.paragraph_num,
      row.text,
      row.text,
      row.source_url,
      row.effective_date,
      row.applies_before,
      row.act_type,
      row.is_excerpt,
      row.embedding,
      row.amending_act,
    ]
    const placeholders = fields.map((value, field) => {
      values.push(value)
      return `$${values.length}${casts[field]}`
    })
    tuples.push(`(${placeholders.join(",")})`)
  }
  const sql = `INSERT INTO public.legal_articles (
      jurisdiction, law_name, law_name_local, law_category, article_num, paragraph_num,
      text, text_local, source_url, effective_date, applies_before, act_type,
      is_excerpt, embedding, amending_act
    ) VALUES ${tuples.join(",")} RETURNING id`
  let lastError: unknown
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    await db.query("BEGIN")
    try {
      const inserted = await db.query(sql, values)
      const progressFile = path.join(OUT, job.progress)
      if (inserted.rowCount !== batch.length) {
        await db.query("ROLLBACK")
        await finish(db, 2, `INSERT STOP ${job.jurisdiction} batch ${first}-${last} returned ${inserted.rowCount}\n`, progressFile)
      }
      const live = await liveCounts(db)
      const expected = job.baseline + already + batch.length
      if (live[job.jurisdiction] !== expected || live.constitution !== 51) {
        await db.query("ROLLBACK")
        await finish(db, 2, `INSERT STOP ${job.jurisdiction} count ${live[job.jurisdiction]} expected ${expected}. Rolled back.\n`, progressFile)
      }
      await db.query("COMMIT")
      flushProgress(path.join(OUT, job.progress), last)
      const batchNumber = Math.floor((already + batch.length) / BATCH)
      if (batchNumber % 100 === 0 || already + batch.length === job.insertRows) {
        process.stdout.write(`${job.jurisdiction} batch rows ${first}-${last} committed ${already + batch.length}\n`)
      }
      return true
    } catch (error) {
      await db.query("ROLLBACK").catch(() => undefined)
      lastError = error
      if (uniqueViolation(error)) {
        const keys = batch.map((row) => `${row.law_name_local} | ${row.article_num} | ${row.paragraph_num ?? "null"} | ${row.amending_act ?? "null"}`).join("\n")
        await finish(db, 2, `INSERT STOP unique violation ${job.jurisdiction} rows ${first}-${last}\n${redact(error)}\n${keys}\n`, path.join(OUT, job.progress))
      }
      if (!transient(error) || attempt === 3) break
      process.stdout.write(`${job.jurisdiction} batch ${first}-${last} retry ${attempt} ${redact(error)}\n`)
    }
  }
  await finish(db, 2, `INSERT STOP ${job.jurisdiction} rows ${first}-${last}\n${redact(lastError)}\n`, path.join(OUT, job.progress))
}

function isJurisdiction(value: string | undefined): value is Jurisdiction {
  return value === "bih_fbih" || value === "bih_rs" || value === "bih_brcko"
}

async function holdLock(jurisdiction: string, seconds: number): Promise<void> {
  const db = client()
  try {
    await db.connect()
    if (!(await acquireLock(db, jurisdiction))) {
      await finish(db, 2, `LOCK REFUSED ${jurisdiction} already locked\n`)
    }
    await writeLine(`LOCKED ${jurisdiction}\n`)
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
    await finish(db, 0, "")
  } catch (error) {
    await finish(db, 1, `${redact(error)}\n`)
  }
}

async function main(): Promise<void> {
  const command = process.argv[2]
  const jurisdiction = process.argv[3]
  const usage = "usage: npx tsx scripts/corpus/write-jurisdiction.ts delete|insert <jurisdiction> | hold-lock <jurisdiction> <seconds>\n"
  try {
    if (command === "hold-lock") {
      const seconds = Number(process.argv[4])
      if (!jurisdiction || !(jurisdiction in LOCK_KEYS) || !Number.isInteger(seconds) || seconds < 0) {
        await finish(null, 1, usage)
      }
      await holdLock(jurisdiction, seconds)
      return
    }
    if ((command === "delete" || command === "insert") && isJurisdiction(jurisdiction)) {
      if (command === "delete") await deleteRows(jurisdiction)
      else await insertRows(jurisdiction)
      return
    }
    await finish(null, 1, usage)
  } catch (error) {
    await finish(null, 1, `${redact(error)}\n`)
  }
}

const entry = process.argv[1] ? path.resolve(process.argv[1]) : ""
if (entry === __filename) {
  main().catch((error: unknown) => {
    void finish(null, 1, `${redact(error)}\n`)
  })
}
