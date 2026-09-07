/**
 * Article-level ingest for the Serbian core statutes in
 * scripts/serbia-core-statutes.json.
 *
 * Splits PIS viewdoc text on "Члан N." headings. Does not embed or
 * write to the database unless --confirm is passed.
 *
 *   npx tsx scripts/ingest-serbia-core-statutes.ts
 *   npx tsx scripts/ingest-serbia-core-statutes.ts --confirm
 */
import { spawnSync } from "child_process"
import { readdir, readFile } from "fs/promises"
import path from "path"

import dotenv from "dotenv"

import {
  type LegalArticleInput,
  embed,
  sleep,
  stableIdForArticle,
} from "./ingest-legal-texts"

dotenv.config({ path: ".env.local" })

const REPO_ROOT = path.resolve(__dirname, "..")
const DEFAULT_JSON = "scripts/serbia-core-statutes.json"
const DOWNLOAD_DIR = "downloads/serbia-core-statutes"
const JURISDICTION = "serbia"

/** Leave headroom for law_name_local + article_num + English stub in embed(). */
const ARTICLE_BODY_MAX_CHARS = 22_000

/**
 * "Члан 1.", "Члан 1.*", "Члан 358а.", "Члан 304a" (Latin a) → groups (1, а?) .
 * Period and trailing asterisk are optional. Letter class stays one character
 * so we do not eat the first letter of "став". PIS sometimes emits Latin
 * suffixes; articleNumFromMatch maps them to Cyrillic.
 */
const CLAN_HEADING_RE =
  /^Члан\s+(\d+)([а-яђјљњћџa-zA-ZčćđšžČĆĐŠŽ])?\s*\.?\s*\*?$/gim

/** Single-letter Latin suffixes → Serbian Cyrillic. Identity for already-Cyrillic. */
const LATIN_TO_CYRILLIC_SUFFIX: Record<string, string> = {
  a: "а",
  b: "б",
  v: "в",
  g: "г",
  d: "д",
  e: "е",
  z: "з",
  i: "и",
  j: "ј",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
  h: "х",
  c: "ц",
  č: "ч",
  ć: "ћ",
  đ: "ђ",
  š: "ш",
  ž: "ж",
}

/** Grouped deletion markers: "Чл. 494. до 505.", "Чл. 3–9." */
const RANGE_HEADING_RE =
  /^Чл\.\s*\d+\s*\.?\s*(?:до|[–\-])\s*\d+\s*\.?\s*$/gim

/**
 * Consolidated texts append later amending acts after the main act. Their own
 * "Члан 23./24." must not overwrite the main act. Do not cut at the main act's
 * "Глава …" or "ПРЕЛАЗНЕ И ЗАВРШНЕ ОДРЕДБЕ" — those still belong to it.
 */
/**
 * JS \b is ASCII-only, so it does not fire between Cyrillic letters. Do not
 * put \b after a Cyrillic character. Cut at the "not incorporated" banner
 * when present so the last live article does not swallow it; otherwise at
 * the amending-act title the plan named.
 */
const AMENDING_ACT_TAIL_RE =
  /^(ОДРЕДБЕ КОЈЕ НИСУ УНЕТЕ|Закон о изменама и допунама Закона о)/im

const CROSS_REF_AFTER_HEADING_RE =
  /^(став|става|ст\.|овог закона)(?:\s|$|[.,;:0-9])/i

/**
 * Whole-article deletion notice, e.g. "Брисан је (види члан 16. Закона - …)".
 * Do not use this on the raw first line: "Брисан је ранији став N." is a
 * paragraph-level footnote inside a live article (see REDACTION_LINE_RE).
 */
const WHOLE_ARTICLE_DELETION_LINE_RE =
  /^(Брисан је|Престали су да важе)(?:\s|$|\()/

const FOOTNOTE_LINE_RE =
  /^\*{1,2}\s*Службени (гласник|лист).*$/gmu

const REDACTION_LINE_RE =
  /^(Брисан је ранији став|Престао је да важи ранији став).*$/gmu

type CoreStatute = {
  law_name_local: string
  law_name: string
  law_category: string
  source_url: string
}

type ClanPart = {
  articleNum: string
  body: string
}

type TailCut = {
  offset: number
  preview: string
}

function parseCli(): { confirm: boolean; jsonPath: string } {
  const args = process.argv.slice(2)
  let confirm = false
  let jsonPath = DEFAULT_JSON
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--confirm") confirm = true
    else if (arg === "--from-json" && args[i + 1]) jsonPath = args[++i]
    else if (arg.startsWith("--from-json=")) jsonPath = arg.slice("--from-json=".length)
  }
  return { confirm, jsonPath }
}

function canonicalUrl(url: string): string {
  return url.trim().replace(/\/+$/, "")
}

function englishStub(
  articleNum: string,
  lawName: string,
  lawCategory: string,
): string {
  return `Article ${articleNum} of the ${lawName} (${lawCategory} law, Serbia).`
}

function parseHeaderUrlAndBody(
  content: string,
): { url: string; body: string } | null {
  const text = content.replace(/^\ufeff/, "")
  const lines = text.split(/\r?\n/)
  const sepIdx = lines.findIndex((line) => line.trim() === "---")
  if (sepIdx < 0) return null
  let url = ""
  for (const line of lines.slice(0, sepIdx)) {
    const m = /^URL:\s*(.*)$/.exec(line)
    if (m) url = m[1].trim()
  }
  const body = lines.slice(sepIdx + 1).join("\n").trim()
  if (!url || !body) return null
  return { url: canonicalUrl(url), body }
}

function findAmendingActCut(body: string): {
  text: string
  cut: TailCut | null
} {
  const normalized = body.replace(/\r\n/g, "\n")
  AMENDING_ACT_TAIL_RE.lastIndex = 0
  const match = AMENDING_ACT_TAIL_RE.exec(normalized)
  if (!match || match.index === undefined) {
    return { text: normalized, cut: null }
  }
  const offset = match.index
  const start = Math.max(0, offset - 100)
  const end = Math.min(normalized.length, offset + 100)
  return {
    text: normalized.slice(0, offset).trimEnd(),
    cut: {
      offset,
      preview: normalized.slice(start, end).replace(/\s+/g, " "),
    },
  }
}

function normalizeSuffixLetter(letter: string): string {
  const lower = letter.toLowerCase()
  return LATIN_TO_CYRILLIC_SUFFIX[lower] ?? lower
}

function articleNumFromMatch(match: RegExpMatchArray): string {
  const num = match[1]
  const letter = match[2]
  return letter ? `${num}${normalizeSuffixLetter(letter)}` : num
}

/** Line-start "Члан 1. став 1. овог закона…" is a cross-reference, not a heading. */
function isCrossReferenceHeading(
  text: string,
  match: RegExpMatchArray,
): boolean {
  if (match.index === undefined) return true
  const rest = text.slice(match.index + match[0].length).replace(/^\s+/, "")
  return CROSS_REF_AFTER_HEADING_RE.test(rest)
}

function isFootnoteOrRedactionLine(t: string): boolean {
  if (!t) return false
  FOOTNOTE_LINE_RE.lastIndex = 0
  REDACTION_LINE_RE.lastIndex = 0
  return FOOTNOTE_LINE_RE.test(t) || REDACTION_LINE_RE.test(t)
}

function isTitleRedactionLine(t: string): boolean {
  return /^(Брисан је назив|Престао је да важи назив)/.test(t)
}

function isWholeArticleDeletionLine(t: string): boolean {
  if (isFootnoteOrRedactionLine(t)) return false
  return WHOLE_ARTICLE_DELETION_LINE_RE.test(t)
}

/**
 * PIS puts the next article's italic/section title in the deleted
 * article's chunk (before the following "Члан N." heading). Those
 * are not remaining staves of the deleted article.
 */
function isStructuralHeadingLine(t: string): boolean {
  if (/^ГЛАВА\b/.test(t) || /^ДЕО\b/.test(t) || /^ОДЕЉАК\b/.test(t)) {
    return true
  }
  if (/^\d+(\.\d+)*\.\s+\S/.test(t) && t.length <= 120) return true
  if (/^[IVXLCDMХІXI]+\.\s/u.test(t) && t.length <= 120) return true
  if (t.length <= 90 && !/[.!?…;:]/.test(t) && !/^\(\d+\)/.test(t)) {
    return true
  }
  return false
}

/**
 * Whole-article deletion only when nothing live remains after footnotes.
 * "Брисан је ранији став N." is stripped as a footnote; remaining
 * paragraphs keep the article. "Брисан је (види члан …)" plus the next
 * section title (or nothing) is a deletion.
 */
function isDeletionOnlyBody(chunk: string, headingLen: number): boolean {
  const lines = chunk
    .slice(headingLen)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !isFootnoteOrRedactionLine(line) && !isTitleRedactionLine(line))

  if (lines.length === 0) return true

  const remainder = lines.filter((line) => !isWholeArticleDeletionLine(line))
  if (remainder.length === 0) return true

  const hadWholeArticleDeletion = remainder.length < lines.length
  if (hadWholeArticleDeletion) {
    return remainder.every(isStructuralHeadingLine)
  }
  return false
}

function stripFootnotes(body: string): string {
  const stripped = body
    .split("\n")
    .filter((line) => {
      const t = line.trim()
      if (!t) return true
      return !isFootnoteOrRedactionLine(t)
    })
    .join("\n")
  return stripped.replace(/\n{3,}/g, "\n\n").trim()
}

type SplitMark = {
  index: number
  length: number
  articleNum: string | null
}

function collectSplitMarks(text: string): SplitMark[] {
  const clanRe = new RegExp(CLAN_HEADING_RE.source, CLAN_HEADING_RE.flags)
  const rangeRe = new RegExp(RANGE_HEADING_RE.source, RANGE_HEADING_RE.flags)
  const marks: SplitMark[] = []

  for (const match of text.matchAll(clanRe)) {
    if (match.index === undefined) continue
    if (isCrossReferenceHeading(text, match)) continue
    const articleNum = articleNumFromMatch(match)
    if (!articleNum) continue
    marks.push({ index: match.index, length: match[0].length, articleNum })
  }
  for (const match of text.matchAll(rangeRe)) {
    if (match.index === undefined) continue
    marks.push({ index: match.index, length: match[0].length, articleNum: null })
  }

  marks.sort((a, b) => a.index - b.index || a.length - b.length)
  const deduped: SplitMark[] = []
  for (const mark of marks) {
    const prev = deduped[deduped.length - 1]
    if (prev && mark.index < prev.index + prev.length) continue
    deduped.push(mark)
  }
  return deduped
}

function splitByClan(body: string): ClanPart[] {
  const { text } = findAmendingActCut(body)
  const marks = collectSplitMarks(text)
  const parts: ClanPart[] = []
  for (let i = 0; i < marks.length; i++) {
    const mark = marks[i]
    if (!mark.articleNum) continue
    const end = i + 1 < marks.length ? marks[i + 1].index : text.length
    const chunk = text.slice(mark.index, end).trim()
    if (!chunk) continue
    if (isDeletionOnlyBody(chunk, mark.length)) continue
    const cleaned = stripFootnotes(chunk)
    if (!cleaned) continue
    parts.push({ articleNum: mark.articleNum, body: cleaned })
  }
  return parts
}

function splitOversizedBody(body: string, maxLen: number): string[] {
  if (body.length <= maxLen) return [body]
  const paragraphs = body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  const chunks: string[] = []
  let current = ""
  for (const para of paragraphs) {
    if (para.length > maxLen) {
      if (current) {
        chunks.push(current)
        current = ""
      }
      for (let i = 0; i < para.length; i += maxLen) {
        chunks.push(para.slice(i, i + maxLen))
      }
      continue
    }
    const candidate = current ? `${current}\n\n${para}` : para
    if (candidate.length <= maxLen) {
      current = candidate
    } else {
      if (current) chunks.push(current)
      current = para
    }
  }
  if (current) chunks.push(current)
  return chunks
}

function articlesFromStatute(
  statute: CoreStatute,
  body: string,
): LegalArticleInput[] {
  const rows: LegalArticleInput[] = []

  for (const part of splitByClan(body)) {
    const bodies = splitOversizedBody(part.body, ARTICLE_BODY_MAX_CHARS)
    const split = bodies.length > 1
    for (let i = 0; i < bodies.length; i++) {
      rows.push({
        jurisdiction: JURISDICTION,
        law_name: statute.law_name,
        law_name_local: statute.law_name_local,
        law_category: statute.law_category,
        article_num: part.articleNum,
        ...(split ? { paragraph_num: String(i + 1) } : {}),
        text: englishStub(part.articleNum, statute.law_name, statute.law_category),
        text_local: bodies[i],
        source_url: statute.source_url,
      })
    }
  }
  return rows
}

async function collectTxtFiles(dirPath: string): Promise<string[]> {
  const absDir = path.join(REPO_ROOT, dirPath)
  const results: string[] = []

  async function walk(current: string): Promise<void> {
    let entries
    try {
      entries = await readdir(current, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (entry.isFile() && entry.name.toLowerCase().endsWith(".txt")) {
        results.push(full)
      }
    }
  }

  await walk(absDir)
  return results
}

async function filesByUrl(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  for (const filePath of await collectTxtFiles(DOWNLOAD_DIR)) {
    let content: string
    try {
      content = await readFile(filePath, "utf8")
    } catch {
      continue
    }
    const parsed = parseHeaderUrlAndBody(content)
    if (!parsed) continue
    map.set(parsed.url, filePath)
  }
  return map
}

function runDownload(jsonRel: string): boolean {
  // eslint-disable-next-line no-console
  console.log(
    `Downloading core statutes:\n  python scripts/download-serbia-laws.py --from-json ${jsonRel}`,
  )
  const result = spawnSync(
    "python",
    ["scripts/download-serbia-laws.py", "--from-json", jsonRel],
    { cwd: REPO_ROOT, stdio: "inherit" },
  )
  return result.status === 0
}

async function loadStatutes(jsonRel: string): Promise<CoreStatute[]> {
  const abs = path.isAbsolute(jsonRel)
    ? jsonRel
    : path.join(REPO_ROOT, jsonRel)
  const raw = JSON.parse(await readFile(abs, "utf8")) as unknown
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(`Expected a non-empty JSON array in ${jsonRel}`)
  }
  return raw.map((item, i) => {
    const row = item as CoreStatute
    if (
      !row.law_name_local ||
      !row.law_name ||
      !row.law_category ||
      !row.source_url
    ) {
      throw new Error(`${jsonRel}: entry ${i} is missing required fields`)
    }
    return {
      law_name_local: row.law_name_local,
      law_name: row.law_name,
      law_category: row.law_category,
      source_url: canonicalUrl(row.source_url),
    }
  })
}

function printCounts(
  counts: { law_name_local: string; clanak: number; rows: number }[],
): void {
  // eslint-disable-next-line no-console
  console.log("\nЧлан split counts (before embed):")
  let totalClanak = 0
  let totalRows = 0
  for (const row of counts) {
    const extra =
      row.rows !== row.clanak ? ` → ${row.rows} rows (oversized split)` : ""
    // eslint-disable-next-line no-console
    console.log(`  ${row.law_name_local}: ${row.clanak} чланова${extra}`)
    totalClanak += row.clanak
    totalRows += row.rows
  }
  // eslint-disable-next-line no-console
  console.log(`  Total: ${totalClanak} чланова, ${totalRows} rows`)
}

function printTailCut(lawNameLocal: string, cut: TailCut | null): void {
  if (!cut) {
    // eslint-disable-next-line no-console
    console.log(`\nAmending-act tail cut (${lawNameLocal}): none`)
    return
  }
  // eslint-disable-next-line no-console
  console.log(
    `\nAmending-act tail cut (${lawNameLocal}): offset ${cut.offset}\n  around: ${cut.preview}`,
  )
}

function duplicateClanaka(
  parts: ClanPart[],
): { articleNum: string; bodies: string[] }[] {
  const byNum = new Map<string, string[]>()
  for (const part of parts) {
    const list = byNum.get(part.articleNum) ?? []
    list.push(part.body)
    byNum.set(part.articleNum, list)
  }
  return [...byNum.entries()]
    .filter(([, bodies]) => bodies.length > 1)
    .map(([articleNum, bodies]) => ({ articleNum, bodies }))
    .sort((a, b) => {
      const na = parseInt(a.articleNum, 10)
      const nb = parseInt(b.articleNum, 10)
      if (na !== nb) return na - nb
      return a.articleNum.localeCompare(b.articleNum)
    })
}

function printDuplicateClanaka(
  reports: { law_name_local: string; dups: { articleNum: string; bodies: string[] }[] }[],
): void {
  const withDups = reports.filter((r) => r.dups.length > 0)
  if (withDups.length === 0) {
    // eslint-disable-next-line no-console
    console.log("\nNo duplicate article_num values.")
    return
  }
  // eslint-disable-next-line no-console
  console.log(
    "\nDuplicate article_num (same stableId; later row overwrites earlier):",
  )
  for (const report of withDups) {
    const extra = report.dups.reduce((n, d) => n + d.bodies.length - 1, 0)
    // eslint-disable-next-line no-console
    console.log(
      `\n  ${report.law_name_local}: ${report.dups.length} duplicated number(s), ${extra} extra heading(s)`,
    )
    for (const dup of report.dups) {
      // eslint-disable-next-line no-console
      console.log(`    Члан ${dup.articleNum} × ${dup.bodies.length}`)
      for (const body of dup.bodies) {
        const preview = body.replace(/\s+/g, " ").trim().slice(0, 80)
        // eslint-disable-next-line no-console
        console.log(`      - ${preview}`)
      }
    }
  }
}

async function upsertArticles(articles: LegalArticleInput[]): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var.")
  }

  const { supabaseAdmin } = await import("../lib/supabase/admin")
  let succeeded = 0
  let failed = 0

  for (const article of articles) {
    try {
      const embedding = await embed(article)
      const payload = {
        id: stableIdForArticle(article),
        jurisdiction: article.jurisdiction,
        law_name: article.law_name,
        law_name_local: article.law_name_local,
        law_category: article.law_category,
        article_num: article.article_num,
        paragraph_num: article.paragraph_num ?? null,
        text: article.text,
        text_local: article.text_local ?? null,
        embedding,
        source_url: article.source_url ?? null,
        effective_date: article.effective_date ?? null,
      }
      const { error } = await supabaseAdmin.from("legal_articles").upsert(payload, {
        onConflict: "id",
      })
      if (error) throw error
      succeeded += 1
      // eslint-disable-next-line no-console
      console.log(
        `✓ ${article.law_name_local} / Члан ${article.article_num}` +
          (article.paragraph_num ? ` §${article.paragraph_num}` : ""),
      )
    } catch (err) {
      failed += 1
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${article.law_name_local} / Члан ${article.article_num}`,
        err,
      )
    }
    await sleep(200)
  }

  // eslint-disable-next-line no-console
  console.log(`✅ Ingested ${succeeded} rows (${failed} failed)`)
}

async function main() {
  const { confirm, jsonPath } = parseCli()
  const statutes = await loadStatutes(jsonPath)

  let byUrl = await filesByUrl()
  const missing = statutes.filter((s) => !byUrl.has(s.source_url))
  if (missing.length > 0) {
    const ok = runDownload(jsonPath)
    if (!ok) {
      throw new Error(
        "Download failed. Run: python scripts/download-serbia-laws.py --from-json scripts/serbia-core-statutes.json",
      )
    }
    byUrl = await filesByUrl()
  }

  const stillMissing = statutes.filter((s) => !byUrl.has(s.source_url))
  if (stillMissing.length > 0) {
    throw new Error(
      `Missing downloaded files for: ${stillMissing.map((s) => s.law_name_local).join(", ")}`,
    )
  }

  const counts: { law_name_local: string; clanak: number; rows: number }[] = []
  const dupReports: {
    law_name_local: string
    dups: { articleNum: string; bodies: string[] }[]
  }[] = []
  const articles: LegalArticleInput[] = []

  for (const statute of statutes) {
    const filePath = byUrl.get(statute.source_url)!
    const content = await readFile(filePath, "utf8")
    const parsed = parseHeaderUrlAndBody(content)
    if (!parsed) {
      throw new Error(`Invalid law file format: ${filePath}`)
    }
    const { cut } = findAmendingActCut(parsed.body)
    printTailCut(statute.law_name_local, cut)
    const clanParts = splitByClan(parsed.body)
    const fileArticles = articlesFromStatute(statute, parsed.body)
    counts.push({
      law_name_local: statute.law_name_local,
      clanak: clanParts.length,
      rows: fileArticles.length,
    })
    dupReports.push({
      law_name_local: statute.law_name_local,
      dups: duplicateClanaka(clanParts),
    })
    articles.push(...fileArticles)
  }

  printCounts(counts)
  printDuplicateClanaka(dupReports)

  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log(
      "\nStopped before embedding. Re-run with --confirm to embed and upsert:\n" +
        "  npx tsx scripts/ingest-serbia-core-statutes.ts --confirm",
    )
    return
  }

  await upsertArticles(articles)
}

if (process.argv[1]?.includes("ingest-serbia-core-statutes")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
