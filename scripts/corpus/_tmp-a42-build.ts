/**
 * Dedup the Serbia article file, number surviving parts, then set is_excerpt
 * from the last present-tense commencement. Writes the insert file only after
 * the file gates pass. Does not embed, does not touch the database, and does
 * not modify the source article file or the embedding partial.
 */
import { createReadStream, createWriteStream } from "fs"
import { writeFile } from "fs/promises"
import { createInterface } from "readline"
import { createHash } from "crypto"
import path from "path"

const ARTICLES = path.resolve(__dirname, "out/serbia-article-file.jsonl")
const INSERT = path.resolve(__dirname, "out/serbia-insert-final.jsonl")
const PLAN = path.resolve(__dirname, "out/_a42-plan.jsonl")
const REPORT = path.resolve(__dirname, "out/_a42-report.json")
const DROPPED = path.resolve(__dirname, "out/_a42-dropped.jsonl")

const NAMED: Array<{ id: string; law: string; article: string }> = [
  { id: "заштита природе 4", law: "ЗАКОН о заштити природе", article: "4" },
  { id: "пловидба 4", law: "ЗАКОН о пловидби и лукама на унутрашњим водама", article: "4" },
  { id: "ваздушни саобраћај 3", law: "ЗАКОН о ваздушном саобраћају", article: "3" },
  { id: "ваздушни саобраћај 258", law: "ЗАКОН о ваздушном саобраћају", article: "258" },
  { id: "ваздушни саобраћај 260", law: "ЗАКОН о ваздушном саобраћају", article: "260" },
  { id: "гас 2", law: "ЗАКОН о гасу", article: "2" },
  { id: "лекови 2", law: "ЗАКОН о лековима и медицинским средствима", article: "2" },
  { id: "буџетски систем 2", law: "ЗАКОН о буџетском систему", article: "2" },
  { id: "електронске комуникације 4", law: "ЗАКОН о електронским комуникацијама", article: "4" },
  { id: "безбедност саобраћаја 7", law: "ЗАКОН о безбедности саобраћаја на путевима", article: "7" },
  { id: "безбедност саобраћаја 331", law: "ЗАКОН о безбедности саобраћаја на путевима", article: "331" },
  { id: "безбедност саобраћаја 335", law: "ЗАКОН о безбедности саобраћаја на путевима", article: "335" },
  { id: "безбедност саобраћаја 338", law: "ЗАКОН о безбедности саобраћаја на путевима", article: "338" },
  { id: "сточарство 85", law: "Закон о сточарству", article: "85" },
  { id: "сточарство 90", law: "Закон о сточарству", article: "90" },
  { id: "управљање отпадом 5", law: "ЗАКОН о управљању отпадом", article: "5" },
  { id: "управљање отпадом 104", law: "ЗАКОН о управљању отпадом", article: "104" },
  { id: "девизно пословање 59", law: "ЗАКОН о девизном пословању", article: "59" },
  { id: "безбедност хране 73", law: "ЗАКОН о безбедности хране", article: "73" },
  { id: "семе 78", law: "ЗАКОН о семену и садном материјалу пољопривредног и украсног биља", article: "78" },
  { id: "информациона безбедност 2", law: "ЗАКОН о информационој безбедности", article: "2" },
]

type Row = {
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  amending_act: string | null
  text_local: string
  source_chunk_id: string | null
}

type Slot = {
  index: number
  para: string | null
  act: string | null
  chunk: string | null
  raw: number
  normLen: number
  hash: string
  text: string
}

function pgCollapse(text: string): string {
  return text.replace(/\s+/gu, " ").replace(/^ +| +$/g, "")
}

function textHash(collapsed: string): string {
  return createHash("md5").update(collapsed).digest("hex")
}

function paraOf(value: unknown): string | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return String(value)
  if (typeof value === "string") return value
  return null
}

function numbered(para: string | null): boolean {
  return para != null && para.trim() !== ""
}

/** A part ordinal exists only where an article has two or more numbered pieces. */
function assertNoSingletonNumberedPart(rows: Array<{ law: string; article: string; para: string | null }>): number {
  let law = ""
  let article = ""
  let numberedRows = 0
  let singles = 0
  const close = () => {
    if (law && numberedRows === 1) singles += 1
  }
  for (const row of rows) {
    if (row.law !== law || row.article !== article) {
      close()
      law = row.law
      article = row.article
      numberedRows = 0
    }
    if (numbered(row.para)) numberedRows += 1
  }
  close()
  return singles
}

async function main(): Promise<void> {
  const byArticle = new Map<string, Slot[]>()
  const order: string[] = []
  let sourceRows = 0
  let sourceChars = 0
  const rl = createInterface({ input: createReadStream(ARTICLES, { encoding: "utf8" }), crlfDelay: Infinity })
  for await (const line of rl) {
    if (!line) continue
    const row = JSON.parse(line) as Row
    const collapsed = pgCollapse(row.text_local)
    const key = `${row.law_name_local}\u0000${row.article_num}`
    if (!byArticle.has(key)) {
      byArticle.set(key, [])
      order.push(key)
    }
    byArticle.get(key)!.push({
      index: sourceRows,
      para: paraOf(row.paragraph_num),
      act: row.amending_act,
      chunk: row.source_chunk_id,
      raw: row.text_local.length,
      normLen: collapsed.length,
      hash: textHash(collapsed),
      text: row.text_local,
    })
    sourceChars += row.text_local.length
    sourceRows += 1
  }
  if (sourceRows !== 134_118) throw new Error(`source rows ${sourceRows}`)
  if (sourceChars !== 91_360_819) throw new Error(`source chars ${sourceChars}`)

  type Drop = Slot & { law: string; article: string; reason: "exact" | "prefix"; keptPara: string | null; keptChunk: string | null }
  const drops: Drop[] = []
  const groups: Array<{ law: string; article: string; kept: Slot; dropped: Slot[]; normLen: number; hash: string }> = []
  let exactGroups = 0
  let exactDropped = 0
  let nullGroups = 0
  let nullDropped = 0
  let prefixDropped = 0
  const decision = new Array<string>(sourceRows)
  const newPara = new Array<string | null>(sourceRows)

  for (const key of order) {
    const [law, article] = key.split("\u0000")
    const parts = byArticle.get(key)!
    const seen = new Map<string, Slot>()
    const survivors: Slot[] = []
    for (const part of parts) {
      const first = seen.get(part.hash)
      if (first) {
        drops.push({ ...part, law: law!, article: article!, reason: "exact", keptPara: first.para, keptChunk: first.chunk })
        decision[part.index] = "D"
        exactDropped += 1
        continue
      }
      seen.set(part.hash, part)
      survivors.push(part)
    }
    for (const [hash, kept] of seen) {
      const members = parts.filter((part) => part.hash === hash)
      if (members.length < 2) continue
      exactGroups += 1
      const dropped = members.slice(1)
      groups.push({ law: law!, article: article!, kept, dropped, normLen: kept.normLen, hash })
      const nullGroup = members.every((part) => !numbered(part.para))
      if (nullGroup) {
        nullGroups += 1
        nullDropped += dropped.length
      }
    }
    const long = survivors.filter((part) => part.normLen >= 2000)
    const prefix = new Set<number>()
    for (const short of long) {
      const shortNorm = pgCollapse(short.text)
      for (const other of long) {
        if (other.index === short.index) continue
        if (other.normLen <= short.normLen) continue
        if (pgCollapse(other.text).startsWith(shortNorm)) {
          prefix.add(short.index)
          break
        }
      }
    }
    const keptSurvivors = survivors.filter((part) => !prefix.has(part.index))
    for (const part of survivors) {
      if (!prefix.has(part.index)) continue
      const host = long.find((other) => other.index !== part.index && other.normLen > part.normLen && pgCollapse(other.text).startsWith(pgCollapse(part.text)))
      drops.push({
        ...part,
        law: law!,
        article: article!,
        reason: "prefix",
        keptPara: host?.para ?? null,
        keptChunk: host?.chunk ?? null,
      })
      decision[part.index] = "D"
      prefixDropped += 1
    }
    const numberedKept = keptSurvivors.filter((part) => numbered(part.para))
    const numberParts = numberedKept.length > 1
    let partOrdinal = 0
    for (const part of keptSurvivors) {
      const next = numberParts && numbered(part.para) ? String(++partOrdinal) : null
      newPara[part.index] = next
      const previous = numbered(part.para) ? part.para : null
      decision[part.index] = previous !== next ? "R" : "C"
    }
  }

  const survivorOrder: number[] = []
  for (let i = 0; i < sourceRows; i += 1) if (decision[i] !== "D") survivorOrder.push(i)

  type Out = {
    index: number
    law: string
    article: string
    para: string | null
    act: string | null
    chunk: string | null
    text: string
    hash: string
    normLen: number
    excerpt: boolean
  }
  const output: Out[] = []
  let cursor = 0
  const rl2 = createInterface({ input: createReadStream(ARTICLES, { encoding: "utf8" }), crlfDelay: Infinity })
  for await (const line of rl2) {
    if (!line) continue
    if (decision[cursor] !== "D") {
      const row = JSON.parse(line) as Row
      output.push({
        index: cursor,
        law: row.law_name_local,
        article: row.article_num,
        para: newPara[cursor] ?? null,
        act: row.amending_act,
        chunk: row.source_chunk_id,
        text: row.text_local,
        hash: textHash(pgCollapse(row.text_local)),
        normLen: pgCollapse(row.text_local).length,
        excerpt: false,
      })
    }
    cursor += 1
  }

  let lawStart = 0
  let boundaryLaws = 0
  let noBoundaryLaws = 0
  const lawNames: string[] = []
  while (lawStart < output.length) {
    let lawEnd = lawStart + 1
    while (lawEnd < output.length && output[lawEnd]!.law === output[lawStart]!.law) lawEnd += 1
    lawNames.push(output[lawStart]!.law)
    let last = -1
    for (let i = lawStart; i < lawEnd; i += 1) {
      if (output[i]!.text.includes("ступа на снагу")) last = i
    }
    if (last < 0) noBoundaryLaws += 1
    else {
      boundaryLaws += 1
      for (let i = last + 1; i < lawEnd; i += 1) output[i]!.excerpt = true
    }
    lawStart = lawEnd
  }

  let excerptRows = 0
  let citedRows = 0
  let excerptChars = 0
  let citedChars = 0
  let excerptShort = 0
  let emptyText = 0
  let missingChunk = 0
  let missingFlag = 0
  let chars = 0
  const hashSeen = new Map<string, number>()
  let hashDupes = 0
  const ua = new Map<string, number>()
  let uaDupes = 0
  const ut = new Map<string, number>()
  let utDupes = 0
  let orderBreaks = 0
  const seenLaws = new Set<string>()
  let previousLaw = ""
  const trueByLaw = new Map<string, { rows: number; chars: number; article: string }>()
  const foreign = new Map<string, Map<string, { rows: number; chars: number }>>()
  for (let i = 0; i < output.length; i += 1) {
    const row = output[i]!
    chars += row.text.length
    if (!row.text.trim()) emptyText += 1
    if (!row.chunk) missingChunk += 1
    if (typeof row.excerpt !== "boolean") missingFlag += 1
    if (row.excerpt) {
      excerptRows += 1
      excerptChars += row.text.length
      if (row.normLen < 100) excerptShort += 1
    } else {
      citedRows += 1
      citedChars += row.text.length
    }
    const articleKey = `${row.law}\u0000${row.article}`
    if (hashSeen.has(`${articleKey}\u0000${row.hash}`)) hashDupes += 1
    else hashSeen.set(`${articleKey}\u0000${row.hash}`, 1)
    if (row.para != null && row.para.trim() !== "") {
      const uaKey = `${articleKey}\u0000${row.para}`
      if (ua.has(uaKey)) uaDupes += 1
      else ua.set(uaKey, 1)
    }
    const utKey = `${articleKey}\u0000${row.para ?? "\u0000"}\u0000${row.hash}`
    if (ut.has(utKey)) utDupes += 1
    else ut.set(utKey, 1)
    if (row.law !== previousLaw) {
      if (seenLaws.has(row.law)) orderBreaks += 1
      seenLaws.add(row.law)
      previousLaw = row.law
    }
  }
  const singletonParts = assertNoSingletonNumberedPart(output)

  lawStart = 0
  while (lawStart < output.length) {
    let lawEnd = lawStart + 1
    while (lawEnd < output.length && output[lawEnd]!.law === output[lawStart]!.law) lawEnd += 1
    let last = -1
    for (let i = lawStart; i < lawEnd; i += 1) if (output[i]!.text.includes("ступа на снагу")) last = i
    if (last >= 0 && last + 1 < lawEnd) {
      const boundaryArticle = output[last]!.article
      const slot = trueByLaw.get(output[lawStart]!.law) ?? { rows: 0, chars: 0, article: boundaryArticle }
      const others = foreign.get(output[lawStart]!.law) ?? new Map<string, { rows: number; chars: number }>()
      for (let i = last + 1; i < lawEnd; i += 1) {
        slot.rows += 1
        slot.chars += output[i]!.text.length
        if (output[i]!.article !== boundaryArticle) {
          const item = others.get(output[i]!.article) ?? { rows: 0, chars: 0 }
          item.rows += 1
          item.chars += output[i]!.text.length
          others.set(output[i]!.article, item)
        }
      }
      trueByLaw.set(output[lawStart]!.law, slot)
      if (others.size > 0) foreign.set(output[lawStart]!.law, others)
    }
    lawStart = lawEnd
  }

  const exceptions: Array<{ id: string; law: string; article: string; para: string; head: string }> = []
  for (const item of NAMED) {
    for (const row of output) {
      if (row.law !== item.law || row.article !== item.article) continue
      if (row.excerpt) {
        exceptions.push({
          id: item.id,
          law: row.law,
          article: row.article,
          para: row.para,
          head: pgCollapse(row.text).slice(0, 150),
        })
      }
    }
  }

  const gatesOk =
    uaDupes === 0 &&
    utDupes === 0 &&
    emptyText === 0 &&
    missingChunk === 0 &&
    orderBreaks === 0 &&
    missingFlag === 0 &&
    seenLaws.size === 2_966 &&
    hashDupes === 0 &&
    singletonParts === 0 &&
    exceptions.length === 0 &&
    output.length === survivorOrder.length

  groups.sort((a, b) => b.dropped.length - a.dropped.length || b.normLen - a.normLen || a.law.localeCompare(b.law, "sr"))
  const top = groups.slice(0, 30).map((group) => ({
    law: group.law,
    article: group.article,
    kept_part: group.kept.para,
    kept_chunk: group.kept.chunk,
    dropped_parts: group.dropped.map((part) => part.para),
    dropped_chunks: group.dropped.map((part) => part.chunk),
    dropped: group.dropped.length,
    norm_len: group.normLen,
  }))
  const topTrue = [...trueByLaw.entries()]
    .map(([law, slot]) => ({ law, boundary_article: slot.article, rows: slot.rows, chars: slot.chars }))
    .sort((a, b) => b.rows - a.rows || b.chars - a.chars)
    .slice(0, 25)
  const foreignList = [...foreign.entries()].map(([law, articles]) => ({
    law,
    articles: [...articles.entries()].map(([article, slot]) => ({ article, rows: slot.rows, chars: slot.chars })),
    rows: [...articles.values()].reduce((sum, slot) => sum + slot.rows, 0),
    chars: [...articles.values()].reduce((sum, slot) => sum + slot.chars, 0),
  })).sort((a, b) => b.chars - a.chars)

  const wanted = drops.filter((drop) =>
    (drop.law === "Закон о шумама" && drop.article === "97") ||
    (drop.law === "ЗАКЉУЧАК" && drop.article === "29") ||
    (drop.reason === "exact" && !numbered(drop.para)),
  )

  let reembedRows = 0
  let copyRows = 0
  for (const row of output) {
    if (decision[row.index] === "R") reembedRows += 1
    else copyRows += 1
  }

  const report = {
    source_rows: sourceRows,
    source_chars: sourceChars,
    exact_groups: exactGroups,
    exact_dropped: exactDropped,
    null_groups: nullGroups,
    null_dropped: nullDropped,
    prefix_dropped: prefixDropped,
    rows_dropped: exactDropped + prefixDropped,
    rows_kept: output.length,
    top_groups: top,
    excerpt_rows: excerptRows,
    excerpt_chars: excerptChars,
    cited_rows: citedRows,
    cited_chars: citedChars,
    excerpt_under_100: excerptShort,
    boundary_laws: boundaryLaws,
    no_boundary_laws: noBoundaryLaws,
    laws: seenLaws.size,
    top_true: topTrue,
    foreign_laws: foreignList.length,
    foreign: foreignList,
    exceptions,
    unique_article: uaDupes,
    unique_article_text: utDupes,
    empty_text: emptyText,
    missing_chunks: missingChunk,
    order_breaks: orderBreaks,
    missing_excerpt: missingFlag,
    chars,
    hash_dupes: hashDupes,
    singleton_numbered_articles: singletonParts,
    gates_ok: gatesOk,
    reembed_rows: reembedRows,
    copy_rows: copyRows,
    forest_drops: wanted.filter((drop) => drop.law === "Закон о шумама").length,
    conclusion_drops: wanted.filter((drop) => drop.law === "ЗАКЉУЧАК").length,
    null_drops: wanted.filter((drop) => drop.reason === "exact" && !numbered(drop.para)).length,
  }
  await writeFile(REPORT, JSON.stringify(report, null, 2), "utf8")
  await writeFile(DROPPED, wanted.map((drop) => JSON.stringify({
    reason: drop.reason,
    law: drop.law,
    article: drop.article,
    paragraph_num: drop.para,
    amending_act: drop.act,
    source_chunk_id: drop.chunk,
    kept_part: drop.keptPara,
    kept_chunk: drop.keptChunk,
    norm_len: drop.normLen,
    text_local: drop.text,
  })).join("\n") + (wanted.length ? "\n" : ""), "utf8")

  if (!gatesOk) {
    process.stdout.write(`${JSON.stringify({ published: false, ...report, top_groups: undefined, top_true: undefined, foreign: undefined })}\n`)
    process.exitCode = 2
    return
  }

  const insert = createWriteStream(INSERT, { encoding: "utf8" })
  const plan = createWriteStream(PLAN, { encoding: "utf8" })
  for (const row of output) {
    const line = JSON.stringify({
      law_name_local: row.law,
      article_num: row.article,
      paragraph_num: row.para,
      amending_act: row.act,
      text_local: row.text,
      source_chunk_id: row.chunk,
      is_excerpt: row.excerpt,
    })
    if (!insert.write(`${line}\n`)) await new Promise<void>((resolve) => insert.once("drain", () => resolve()))
    const kind = decision[row.index]
    if (!plan.write(`${row.index}\t${kind}\t${row.para}\n`)) await new Promise<void>((resolve) => plan.once("drain", () => resolve()))
  }
  await new Promise<void>((resolve, reject) => {
    insert.end(() => resolve())
    insert.on("error", reject)
  })
  await new Promise<void>((resolve, reject) => {
    plan.end(() => resolve())
    plan.on("error", reject)
  })
  process.stdout.write(`${JSON.stringify({
    published: true,
    rows_dropped: report.rows_dropped,
    exact_groups: exactGroups,
    exact_dropped: exactDropped,
    null_groups: nullGroups,
    null_dropped: nullDropped,
    prefix_dropped: prefixDropped,
    rows_kept: output.length,
    excerpt_rows: excerptRows,
    cited_rows: citedRows,
    excerpt_chars: excerptChars,
    cited_chars: citedChars,
    unique_article: uaDupes,
    unique_article_text: utDupes,
    hash_dupes: hashDupes,
    reembed_rows: reembedRows,
    copy_rows: copyRows,
    exceptions: exceptions.length,
    foreign_laws: foreignList.length,
    chars,
  })}\n`)
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`)
  process.exit(1)
})
