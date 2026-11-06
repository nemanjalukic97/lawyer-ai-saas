/**
 * Serbia phase 6. Read-only. No insert, delete, dump, embedding call, or index.
 * Gate: the numbered-capital heading guard. Then, only if that gate passes,
 * the homoglyph census already collected is kept and the dry run starts.
 * Credentials stay in the env files.
 */
import { appendFileSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import dotenv from "dotenv"
import pg from "pg"
import { findHeadings, processLaw } from "./_tmp-serbia-phase3"

dotenv.config({ path: path.resolve(__dirname, "outreach/.env"), quiet: true })
dotenv.config({ path: path.resolve(__dirname, "../.env.local"), quiet: true })
const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is missing from scripts/outreach/.env and .env.local")

const LINE_START = /^Члан[ \t]+[0-9]/u
const ANY_CLAN = /(?<!\p{L})Члан[ \t]+[0-9]/gu
const WORD = /[\p{L}]+/gu
const NUMBERED_CAPS_TAIL = /(?:^|[\s.])(?:[IVXLCDM]{1,8}|[0-9]{1,3})\.\s+[\p{Lu}ЂЈЉЊЋЏ][\p{Lu}ЂЈЉЊЋЏ\s]{2,}$/u
const COLLISION = new Set(["КРИВИЧНИ ЗАКОНИК", "ЗАКОН о стечају"])
const GAP = new Set([
  "Закон о Акционом плану хармонизације економских система држава чланица државне заједнице Србија и Црна Гора ради спречавања и уклањања препрека слободном протоку људи, робе, услуга и капитала",
  "ПОСЕБАН КОЛЕКТИВНИ УГОВОР за грађевинарство и индустрију грађевинског материјала Србије",
])
const SPACE_WORDS = ["службени", "гласник", "закон", "закона", "члан", "става", "став", "види", "брисан", "правилник", "уредба", "одлука"]
const KEY_WORDS = new Set(SPACE_WORDS)
const TITLE_WORDS = new Set(["закон", "закона", "правилник", "уредба", "одлука"])
const OLD_TWINS: Record<string, string> = {
  A: "А", a: "а", B: "В", b: "в", C: "С", c: "с", E: "Е", e: "е",
  H: "Н", h: "н", K: "К", k: "к", M: "М", m: "м", O: "О", o: "о",
  P: "Р", p: "р", T: "Т", t: "т", X: "Х", x: "х",
}
const TRUE_TWINS: Record<string, string> = {
  a: "а", A: "А", c: "с", C: "С", e: "е", E: "Е",
  i: "і", I: "І", j: "ј", J: "Ј", o: "о", O: "О",
  p: "р", P: "Р", s: "ѕ", S: "Ѕ", x: "х", X: "Х", y: "у",
  B: "В", H: "Н", K: "К", M: "М", T: "Т",
}
const spaceSpecs = SPACE_WORDS.map((word) => {
  const alts: string[] = []
  for (let i = 1; i < word.length; i += 1) alts.push(`${word.slice(0, i)} ${word.slice(i)}`)
  return { word, re: new RegExp(`(?<!\\p{L})(?:${alts.join("|")})(?!\\p{L})`, "gu") }
})

type Chunk = { article_num: string; text_local: string }
type Repair = { law: string; kind: "space" | "homoglyph"; form: string; sample: string }

function isLatin(ch: string): boolean {
  return /\p{Script=Latin}/u.test(ch)
}
function isCyrillic(ch: string): boolean {
  return /\p{Script=Cyrillic}/u.test(ch)
}
function foldOld(word: string): string {
  let out = ""
  for (const ch of word) out += OLD_TWINS[ch] ?? ch
  return out.toLocaleLowerCase("sr")
}
function foldTrue(word: string): string {
  let out = ""
  for (const ch of word) out += TRUE_TWINS[ch] ?? ch
  return out
}
function numberedCaps(before: string): boolean {
  const trimmed = before.replace(/[ \t\u00a0]+$/u, "")
  if (trimmed.length === 0) return false
  const last = [...trimmed].at(-1) ?? ""
  if (".!?;:".includes(last)) return false
  return NUMBERED_CAPS_TAIL.test(trimmed.slice(-48))
}
function contiguousOf(chunks: Chunk[]): boolean {
  const nums = chunks.map((row) => (/^[1-9][0-9]*$/.test(row.article_num) ? Number(row.article_num) : null))
  if (!nums.every((n) => n != null)) return false
  const present = new Set(nums as number[])
  if (present.size !== chunks.length || present.size === 0) return false
  const minN = Math.min(...present)
  const maxN = Math.max(...present)
  if (minN !== 1 || maxN !== chunks.length) return false
  for (let n = minN; n <= maxN; n += 1) if (!present.has(n)) return false
  return true
}
function keeps(at: number | null, chars: number): boolean {
  return at != null && chars - at > at
}
function dominates(at: number | null, chars: number): boolean {
  return at != null && at > chars - at
}

export function applyRepairs(law: string, text: string): { text: string; repairs: Repair[] } {
  const parts = text.split("\n")
  const repairs: Repair[] = []
  const nextParts = parts.map((part) => {
    const raw = part.replace(/\r$/, "")
    const cr = part.endsWith("\r") || (part.length > raw.length)
    const folded = raw.toLocaleLowerCase("sr")
    if (folded.length !== raw.length) return part
    const edits: Array<{ at: number; length: number; next: string; kind: "space" | "homoglyph"; form: string }> = []
    for (const spec of spaceSpecs) {
      spec.re.lastIndex = 0
      for (const match of folded.matchAll(spec.re)) {
        const at = match.index ?? 0
        const form = match[0] ?? ""
        const after = folded.slice(at + form.length)
        const before = folded.slice(0, at)
        const followedByNumber = spec.word === "члан" && /^[\s.*]*[0-9]/u.test(after)
        const atEdge = !/\p{L}/u.test(before) || /[.!?;:]\s*$/u.test(before)
        const isHeading = followedByNumber && atEdge
        const isLaw = TITLE_WORDS.has(spec.word) && !/\p{L}/u.test(before)
        if (!isHeading && !isLaw) continue
        const original = raw.slice(at, at + form.length)
        edits.push({ at, length: form.length, next: original.replace(" ", ""), kind: "space", form })
      }
    }
    WORD.lastIndex = 0
    for (const match of raw.matchAll(WORD)) {
      const word = match[0] ?? ""
      let latin = false
      let cyr = false
      for (const ch of word) {
        if (isLatin(ch)) latin = true
        else if (isCyrillic(ch)) cyr = true
      }
      if (!latin || !cyr || !KEY_WORDS.has(foldOld(word))) continue
      let next = ""
      for (const ch of word) next += OLD_TWINS[ch] ?? ch
      if (next === word) continue
      edits.push({ at: match.index ?? 0, length: word.length, next, kind: "homoglyph", form: `${word}→${foldOld(word)}` })
    }
    edits.sort((a, b) => b.at - a.at)
    let line = raw
    let cursor = line.length
    for (const edit of edits) {
      if (edit.at + edit.length > cursor) continue
      const sample = raw.slice(Math.max(0, edit.at - 16), Math.min(raw.length, edit.at + edit.length + 20))
      repairs.push({ law, kind: edit.kind, form: edit.form, sample })
      line = line.slice(0, edit.at) + edit.next + line.slice(edit.at + edit.length)
      cursor = edit.at
    }
    return cr ? `${line}\r` : line
  })
  return { text: nextParts.join("\n"), repairs }
}

function assertDetector() {
  const sample = "I. ОСНОВНЕ ОДРЕДБЕ Члан 1 Наставља"
  const hits = findHeadings(sample)
  if (hits.length !== 1 || hits[0]?.articleNum !== "1" || hits[0]?.index !== sample.indexOf("Члан")) {
    throw new Error("numbered-caps detector check failed")
  }
  if (findHeadings("Готово. Члан 4 даље").length !== 0) throw new Error("sentence-end was accepted")
  if (findHeadings("став 2 Члан 3").length !== 0) throw new Error("digit prefix was accepted")
  if (findHeadings("Члан 8.Предмети")[0]?.articleNum !== "8") throw new Error("glued period check failed")
  const repaired = applyRepairs("probe", "Ч лан 1\nЧлaн 2")
  if (repaired.text !== "Члан 1\nЧлан 2" || repaired.repairs.length !== 2) {
    throw new Error(`repair check failed ${JSON.stringify(repaired)}`)
  }
}

async function main() {
  assertDetector()
  const ids = readFileSync(path.resolve(__dirname, "out", "serbia-phase2-snapshot-ids.txt"), "utf8").split(/\n/).filter(Boolean)
  const progressPath = path.resolve(__dirname, "out", "_serbia-phase6-progress.txt")
  writeFileSync(progressPath, "", "utf8")
  const note = (message: string) => appendFileSync(progressPath, `${new Date().toISOString()}\t${message}\n`, "utf8")

  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })
  await client.connect()
  await client.query("BEGIN READ ONLY")
  await client.query("SET LOCAL statement_timeout = '0'")
  const indexRow = await client.query<{ indexdef: string; serbia_rows: string }>(
    `SELECT pg_get_indexdef(c.oid) AS indexdef,
            (SELECT count(*)::text FROM public.legal_articles WHERE jurisdiction = 'serbia') AS serbia_rows
       FROM pg_class c
       JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public' AND c.relname = 'legal_articles_ivfflat_serbia_half_idx'`,
  )
  await client.query(
    `DECLARE phase6 NO SCROLL CURSOR FOR
       SELECT law_name_local, article_num, text_local
         FROM public.legal_articles
        WHERE id = ANY($1::uuid[])
        ORDER BY law_name_local,
                 CASE WHEN article_num ~ '^[0-9]+$' THEN article_num::int END NULLS LAST,
                 article_num`,
    [ids],
  )
  note(`cursor ${ids.length}`)

  const pure = new Set<string>()
  const missing = new Map<string, { count: number; example: string }>()
  let mixedTotal = 0
  let clean = 0
  let dirty = 0
  let keyword = 0
  const capsLaws: Array<{ law: string; chunks: number; caps: number; line_start: number; first_caps: number | null; chars: number }> = []
  const intoKept: Array<{ law: string; chunks: number; contiguous: boolean; old_preamble: number | null; new_preamble: number | null; chars: number }> = []
  const outKept: typeof intoKept = []
  const out208: typeof intoKept = []
  const out2105: Array<{ law: string; chunks: number }> = []
  const reasons = new Map<string, { laws: number; chunks: number }>()
  let lawsSeen = 0
  let chunksSeen = 0
  let oldKeptLaws = 0
  let newKeptLaws = 0

  function addReason(reason: string, chunks: number) {
    const slot = reasons.get(reason) ?? { laws: 0, chunks: 0 }
    slot.laws += 1
    slot.chunks += chunks
    reasons.set(reason, slot)
  }

  function finish(law: string, chunks: Chunk[]) {
    const ordered = [...chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
    const joined = ordered.map((row) => row.text_local ?? "").join("")
    const chars = joined.length
    const contiguous = contiguousOf(ordered)
    let lineStart = 0
    let inline = 0
    let caps = 0
    let firstLine: number | null = null
    let firstCaps: number | null = null
    let offset = 0
    const parts = joined.split("\n")
    for (let i = 0; i < parts.length; i += 1) {
      const line = (parts[i] ?? "").replace(/\r$/, "")
      if (LINE_START.test(line)) {
        lineStart += 1
        if (firstLine == null) firstLine = offset
      }
      ANY_CLAN.lastIndex = 0
      for (const match of line.matchAll(ANY_CLAN)) {
        const at = match.index ?? 0
        if (at === 0) continue
        inline += 1
        if (numberedCaps(line.slice(0, at))) {
          caps += 1
          if (firstCaps == null) firstCaps = offset + at
        }
      }
      WORD.lastIndex = 0
      for (const match of line.matchAll(WORD)) {
        const word = match[0] ?? ""
        let cyr = false
        let latin = false
        let other = false
        for (const ch of word) {
          if (isCyrillic(ch)) cyr = true
          else if (TRUE_TWINS[ch]) latin = true
          else if (/\p{L}/u.test(ch)) {
            other = true
            if (isLatin(ch)) latin = true
          }
        }
        if (!latin && cyr) pure.add(word.toLocaleLowerCase("sr"))
        if (latin && cyr) {
          mixedTotal += 1
          if (KEY_WORDS.has(foldOld(word))) keyword += 1
          if (other) dirty += 1
          else {
            clean += 1
            const folded = foldTrue(word).toLocaleLowerCase("sr")
            const slot = missing.get(folded) ?? { count: 0, example: word }
            slot.count += 1
            missing.set(folded, slot)
          }
        }
      }
      offset += (parts[i] ?? "").length + (i + 1 < parts.length ? 1 : 0)
    }
    const headings = findHeadings(joined)
    const firstNew = headings[0]?.index ?? null
    const hard = COLLISION.has(law) || GAP.has(law)
    const oldKept = keeps(firstLine, chars) && contiguous && !hard
    const newKept = keeps(firstNew, chars) && contiguous && !hard
    if (oldKept) oldKeptLaws += 1
    if (newKept) newKeptLaws += 1
    const row = { law, chunks: chunks.length, contiguous, old_preamble: firstLine, new_preamble: firstNew, chars }
    if (newKept && !oldKept) intoKept.push(row)
    if (oldKept && !newKept) outKept.push(row)
    if (dominates(firstLine, chars) && !dominates(firstNew, chars)) out208.push(row)
    if (lineStart === 0 && inline === 0 && firstNew != null) out2105.push({ law, chunks: chunks.length })
    if (caps > 0) capsLaws.push({ law, chunks: chunks.length, caps, line_start: lineStart, first_caps: firstCaps, chars })
    let reason = "kept"
    if (COLLISION.has(law)) reason = "collision"
    else if (GAP.has(law)) reason = "numbering-gap"
    else if (newKept) reason = "kept"
    else if (firstNew == null && lineStart === 0 && inline === 0) reason = "no-heading"
    else if (firstNew == null) reason = "inline-outside-guard"
    else if (dominates(firstNew, chars)) reason = "preamble"
    else reason = "not-contiguous"
    addReason(reason, chunks.length)
    lawsSeen += 1
    chunksSeen += chunks.length
    if (lawsSeen % 400 === 0) note(`gate ${lawsSeen}`)
  }

  let current = ""
  let bucket: Chunk[] = []
  for (;;) {
    const batch = await client.query<{ law_name_local: string; article_num: string; text_local: string }>("FETCH 300 FROM phase6")
    if (batch.rows.length === 0) break
    for (const row of batch.rows) {
      if (row.law_name_local !== current) {
        if (bucket.length) finish(current, bucket)
        current = row.law_name_local
        bucket = []
      }
      bucket.push({ article_num: row.article_num, text_local: row.text_local ?? "" })
    }
  }
  if (bucket.length) finish(current, bucket)
  await client.query("CLOSE phase6")
  await client.query("COMMIT")
  note("gate committed")

  let riskOccurrences = 0
  const riskForms: Array<{ form: string; count: number; example: string }> = []
  for (const [form, slot] of missing) {
    if (pure.has(form)) continue
    riskOccurrences += slot.count
    riskForms.push({ form, count: slot.count, example: slot.example })
  }
  riskForms.sort((a, b) => b.count - a.count || a.form.localeCompare(b.form, "sr"))
  const gateOk =
    intoKept.length === 1 &&
    intoKept[0]?.law === "Закон о хемикалијама" &&
    outKept.length === 0 &&
    out2105.length === 0 &&
    out208.length === 1 &&
    out208[0]?.law === "Закон о хемикалијама"
  const gate = {
    gate_ok: gateOk,
    old_kept_laws: oldKeptLaws,
    new_kept_laws: newKeptLaws,
    into_kept: intoKept,
    out_of_kept: outKept,
    out_of_208: out208,
    out_of_2105: out2105,
    caps_laws: capsLaws,
    reasons: Object.fromEntries(reasons),
    homoglyph: {
      mixed: mixedTotal,
      clean,
      dirty,
      keyword,
      risk_occurrences: riskOccurrences,
      risk_distinct: riskForms.length,
      risk_top20: riskForms.slice(0, 20),
    },
    serbia_rows: indexRow.rows[0]?.serbia_rows ?? "",
    serbia_index: indexRow.rows[0]?.indexdef ?? "",
    laws: lawsSeen,
    chunks: chunksSeen,
  }
  writeFileSync(path.resolve(__dirname, "out", "_serbia-phase6-gate.json"), JSON.stringify(gate, null, 2), "utf8")
  note(`gate_ok ${gateOk} into ${intoKept.length} out208 ${out208.length} out2105 ${out2105.length} kept ${oldKeptLaws}->${newKeptLaws}`)
  process.stdout.write(`GATE ${gateOk} kept ${oldKeptLaws}->${newKeptLaws} capsLaws ${capsLaws.length} mixed ${mixedTotal} clean ${clean} dirty ${dirty} keyword ${keyword} risk ${riskOccurrences}\n`)
  if (!gateOk) {
    await client.end()
    process.stdout.write(`GATE FAIL into ${intoKept.length} outKept ${outKept.length} out208 ${out208.length} out2105 ${out2105.length}\n`)
    process.exit(2)
  }

  await client.query("BEGIN READ ONLY")
  await client.query("SET LOCAL statement_timeout = '0'")
  await client.query(
    `DECLARE phase6b NO SCROLL CURSOR FOR
       SELECT law_name_local, article_num, text_local
         FROM public.legal_articles
        WHERE id = ANY($1::uuid[])
        ORDER BY law_name_local,
                 CASE WHEN article_num ~ '^[0-9]+$' THEN article_num::int END NULLS LAST,
                 article_num`,
    [ids],
  )
  note("dry run cursor")

  const done: Array<Record<string, unknown>> = []
  const failures: Array<{ law: string; error: string }> = []
  const repairLog: Repair[] = []
  const mismatches: Array<{ law: string; exceptions: string[] }> = []
  let deletedChars = 0
  let processedChunks = 0
  let seen = 0

  function runLaw(law: string, chunks: Chunk[]) {
    const ordered = [...chunks].sort((a, b) => Number(a.article_num) - Number(b.article_num))
    const joined = ordered.map((row) => row.text_local ?? "").join("")
    const headings = findHeadings(joined)
    const first = headings[0]?.index ?? null
    const hard = COLLISION.has(law) || GAP.has(law)
    if (!(keeps(first, joined.length) && contiguousOf(ordered) && !hard)) return
    const repaired = applyRepairs(law, joined)
    repairLog.push(...repaired.repairs)
    const fake = ordered.map((chunk, index) => ({
      article_num: chunk.article_num,
      text_local: index === 0 ? repaired.text : "",
    }))
    deletedChars += joined.length
    processedChunks += ordered.length
    try {
      const result = processLaw(law, fake)
      if (result.skip) {
        failures.push({ law, error: `skip:${result.skip}` })
        return
      }
      const row = result as Record<string, unknown>
      delete row.strips
      delete row.produced
      done.push({ law, ...row })
      const exceptions = (row.exceptions as string[]) ?? []
      if (exceptions.length > 0) mismatches.push({ law, exceptions })
    } catch (error) {
      failures.push({ law, error: error instanceof Error ? error.message : String(error) })
    }
  }

  current = ""
  bucket = []
  for (;;) {
    const batch = await client.query<{ law_name_local: string; article_num: string; text_local: string }>("FETCH 200 FROM phase6b")
    if (batch.rows.length === 0) break
    for (const row of batch.rows) {
      if (row.law_name_local !== current) {
        if (bucket.length) {
          runLaw(current, bucket)
          seen += 1
          if (seen % 25 === 0) note(`dry ${seen} rows ${done.reduce((sum, item) => sum + Number(item.output_rows ?? 0), 0)}`)
        }
        current = row.law_name_local
        bucket = []
      }
      bucket.push({ article_num: row.article_num, text_local: row.text_local ?? "" })
    }
  }
  if (bucket.length) runLaw(current, bucket)
  await client.query("CLOSE phase6b")
  await client.query("COMMIT")
  await client.end()
  note("dry committed")

  const sum = (key: string) => done.reduce((total, row) => total + Number(row[key] ?? 0), 0)
  const rules = new Map<string, number>()
  for (const row of done) {
    for (const [key, count] of Object.entries((row.split_rules as Record<string, number>) ?? {})) {
      rules.set(key, (rules.get(key) ?? 0) + count)
    }
  }
  const outputRows = sum("output_rows")
  const outputChars = sum("output_chars")
  const ruleSum = [...rules.values()].reduce((total, n) => total + n, 0)
  const fixed = 7647.79
  const textRate = 1.3876
  const ginRate = 1.8841
  const growth = outputRows * fixed + outputChars * textRate * 2 + outputChars * ginRate
  const removed = processedChunks * fixed + deletedChars * textRate * 2 + deletedChars * ginRate
  const today = 7_410_453_651
  const trigger = 16_200_000_000
  const embedTokens = sum("embed_tokens")
  const chemicals = done.find((row) => row.law === "Закон о хемикалијама")
  const spaceN = repairLog.filter((row) => row.kind === "space").length
  const homoN = repairLog.filter((row) => row.kind === "homoglyph").length
  const summary = {
    gate,
    dry_run: {
      laws: done.length,
      input_chunks: sum("chunks"),
      processed_chunks_check: processedChunks,
      output_rows: outputRows,
      articles: sum("articles"),
      title_rows: sum("title_rows"),
      chapter_rows: sum("chapter_rows"),
      articles_no_title: sum("articles_no_title"),
      articles_over_two_pieces: sum("articles_over_two_pieces"),
      max_tokens: done.reduce((max, row) => Math.max(max, Number(row.max_tokens ?? 0)), 0),
      rows_over_7000: sum("rows_over_token_limit"),
      boundary_failed: sum("boundary_failed"),
      paragraph_bad: sum("paragraph_bad"),
      text_mismatch: sum("text_mismatch"),
      split_rules: Object.fromEntries(rules),
      split_rules_sum: ruleSum,
      rules_equal_rows: ruleSum === outputRows,
      conservation_mismatches: mismatches,
      failures,
    },
    chemicals: chemicals
      ? {
          chunks: chemicals.chunks,
          articles: chemicals.articles,
          output_rows: chemicals.output_rows,
          headings: chemicals.headings,
        }
      : null,
    repairs_applied: { space: spaceN, homoglyph: homoN, total: repairLog.length },
    excluded: {
      bulk_chunks: chunksSeen,
      processed: processedChunks,
      left: chunksSeen - processedChunks,
      reasons: Object.fromEntries(reasons),
    },
    cost: {
      embed_tokens: embedTokens,
      usd_per_million: 0.02,
      usd: Number(((embedTokens * 0.02) / 1_000_000).toFixed(4)),
    },
    disk: {
      fixed_per_row: fixed,
      text_per_char: textRate,
      gin_per_char: ginRate,
      output_rows: outputRows,
      output_chars: outputChars,
      growth_bytes: Math.round(growth),
      removed_bytes: Math.round(removed),
      today,
      after_add: Math.round(today + growth),
      after_net: Math.round(today + growth - removed),
      trigger,
      headroom_net: Math.round(trigger - (today + growth - removed)),
    },
  }
  writeFileSync(path.resolve(__dirname, "out", "_serbia-phase6-summary.json"), JSON.stringify(summary, null, 2), "utf8")
  writeFileSync(
    path.resolve(__dirname, "out", "serbia-phase6-repair-exceptions.jsonl"),
    repairLog.map((row) => JSON.stringify(row)).join("\n") + (repairLog.length ? "\n" : ""),
    "utf8",
  )
  note("wrote summary")
  process.stdout.write(
    `laws ${done.length} chunks ${sum("chunks")} rows ${outputRows} articles ${sum("articles")} chemicals ${chemicals?.articles ?? "missing"} failures ${failures.length} mismatches ${mismatches.length} repairs ${repairLog.length}\n`,
  )
}

if (path.resolve(process.argv[1] ?? "") === __filename) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`)
    process.exit(1)
  })
}
