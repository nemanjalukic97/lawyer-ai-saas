/**
 * Article-level ingest for the FBiH round-1 adopted acts in
 * scripts/fbih-core-statutes.json.
 *
 * Source: Parlament FBiH adopted-act PDFs only. Splits on "Član N." (and
 * "Članak N." if a Croatian authentic text uses that word). Does not rewrite
 * Član → Članak. Does not apply amendments. Same-line tracking is glued in
 * pageItemsToLines using GEOMETRIC_GLUE_THRESHOLD after a per-document
 * valley check; bare 1–3 digit page labels are dropped. Does not embed or
 * write unless --confirm is passed. --confirm re-embeds only rows whose
 * text_local changed.
 *
 *   npx tsx scripts/ingest-fbih-core-statutes.ts
 *   npx tsx scripts/ingest-fbih-core-statutes.ts --confirm
 *   npx tsx scripts/ingest-fbih-core-statutes.ts --confirm --from="Zakon o stvarnim pravima"
 */
import { mkdir, readdir, readFile, writeFile } from "fs/promises"
import path from "path"

import dotenv from "dotenv"

import {
  type LegalArticleInput,
  embed,
  sleep,
  stableIdForArticle,
} from "./ingest-legal-texts"
import {
  formatNamedArticleBodies,
  formatPeelReport,
  parseFromLawArg,
  reattachTrailingHeadings,
  scanSplitHealth,
  sliceStatutesFrom,
  type PeelRecord,
  type SplitHealth,
} from "./core-statute-nadnaslov"

dotenv.config({ path: ".env.local" })

const REPO_ROOT = path.resolve(__dirname, "..")
const DEFAULT_JSON = "scripts/fbih-core-statutes.json"
const DOWNLOAD_DIR = "downloads/fbih-core-statutes"
const JURISDICTION = "bih_fbih"

const ARTICLE_BODY_MAX_CHARS = 12_000

/**
 * "Član 1.", "Član 1.a", "Članak 6." — whole line after unwrap.
 * No `i` flag: /[a-z]/i would treat U/I/O as a suffix.
 * Članak is accepted so a Croatian authentic text still cuts; the body keeps
 * whichever word the PDF used.
 */
export const CLAN_HEADING_RE =
  /^(Članak|Član)\s+(\d+)\.?([a-z])?\.?[ \t]*$/gm

const GLUED_CLAN_HEADING_RE =
  /(\S)[ \t]+((?:Članak|Član)\s+\d+\.?[a-z]?\.?)(?=\s|$)/g

const HEADING_THEN_BODY_RE =
  /^((?:Članak|Član)\s+\d+\.?[a-z]?\.?)[ \t]+(?=\S)/gm

const CROSS_REF_AFTER_HEADING_RE =
  /^(stavak|stavka|stav|st\.|ovoga Zakona|ovog zakona)\b/i

type CoreStatute = {
  law_name_local: string
  law_name: string
  law_category: string
  source_url: string
  effective_date?: string
}

type ClanPart = {
  articleNum: string
  body: string
}

type ExtractMeta = {
  pages: number
  chars: number
  canHits: string[]
  clanHeadings: number
  clanakHeadings: number
  headingRepairs: {
    canToClan: number
    spacedWord: number
    spacedNumber: number
  }
}

function parseCli(): {
  confirm: boolean
  jsonPath: string
  fromLaw: string | null
  articleNum: string | null
} {
  const args = process.argv.slice(2)
  let confirm = false
  let jsonPath = DEFAULT_JSON
  let articleNum: string | null = null
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!
    if (arg === "--confirm") confirm = true
    else if (arg === "--from-json" && args[i + 1]) jsonPath = args[++i]!
    else if (arg.startsWith("--from-json=")) jsonPath = arg.slice("--from-json=".length)
    else if (arg.startsWith("--article=")) articleNum = arg.slice("--article=".length)
    else if (arg === "--article" && args[i + 1]) articleNum = args[++i]!
  }
  return { confirm, jsonPath, fromLaw: parseFromLawArg(args), articleNum }
}

function canonicalUrl(url: string): string {
  return url.trim().replace(/\/+$/, "")
}

function englishStub(
  articleNum: string,
  lawName: string,
  lawCategory: string,
): string {
  return `Article ${articleNum} of the ${lawName} (${lawCategory} law, Federation of Bosnia and Herzegovina).`
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
    if (m) url = m[1]!.trim()
  }
  const body = lines.slice(sepIdx + 1).join("\n").trim()
  if (!url || !body) return null
  return { url: canonicalUrl(url), body }
}

/**
 * Join vs space cut for consecutive non-space pdf.js items, as a fraction of
 * that item's font size. Calibrated on the FBiH Parliament adopted-act PDFs
 * (stvarna / nasljeđivanje): intra-word tracking clustered at ~0.00, real
 * word spaces at ≥ 0.23, empty valley 0.08–0.20. Must sit inside the valley
 * band. Never apply to a document whose own histogram does not leave that
 * band empty — see assertGeometricValley.
 */
export const GEOMETRIC_GLUE_THRESHOLD = 0.12
export const GEOMETRIC_VALLEY_LO = 0.08
export const GEOMETRIC_VALLEY_HI = 0.2

if (
  !(
    GEOMETRIC_VALLEY_LO < GEOMETRIC_GLUE_THRESHOLD &&
    GEOMETRIC_GLUE_THRESHOLD < GEOMETRIC_VALLEY_HI
  )
) {
  throw new Error(
    "GEOMETRIC_GLUE_THRESHOLD must sit strictly inside [GEOMETRIC_VALLEY_LO, GEOMETRIC_VALLEY_HI)",
  )
}

/** Bare PDF page labels. Stavci are "(1)", so they do not match. */
const PAGE_NUMBER_LINE_RE = /^[1-9]\d{0,2}$/

const PDF_LINE_Y_TOL = 3

type PdfTextItem = {
  str?: string
  transform?: number[]
  width?: number
}

type PlacedItem = {
  str: string
  x: number
  y: number
  width: number
  fontSize: number
  page: number
}

export type GeometricValleyHit = {
  page: number
  left: string
  right: string
  norm: number
  context: string
}

export type GeometricValleyAudit = {
  pdfPath: string
  pairCount: number
  intraCount: number
  spaceCount: number
  maxIntra: number | null
  minSpace: number | null
  valleyHits: GeometricValleyHit[]
}

function fontSizeOf(transform: number[]): number {
  return Math.hypot(transform[0] ?? 1, transform[1] ?? 0) || 1
}

function toPlacedItem(raw: PdfTextItem, page: number): PlacedItem | null {
  const str = raw.str ?? ""
  if (!str) return null
  const transform = raw.transform ?? [1, 0, 0, 1, 0, 0]
  return {
    str,
    x: transform[4] ?? 0,
    y: transform[5] ?? 0,
    width: raw.width ?? 0,
    fontSize: fontSizeOf(transform),
    page,
  }
}

function normalizedGap(left: PlacedItem, right: PlacedItem): number {
  return (right.x - (left.x + left.width)) / (left.fontSize || 1)
}

function groupItemsIntoLines(items: PlacedItem[]): PlacedItem[][] {
  const rows = [...items].sort((a, b) => b.y - a.y || a.x - b.x)
  const lines: PlacedItem[][] = []
  let current: PlacedItem[] = []
  let currentY: number | null = null
  const flush = () => {
    if (current.length) lines.push(current.sort((a, b) => a.x - b.x))
    current = []
  }
  for (const row of rows) {
    if (currentY != null && Math.abs(currentY - row.y) > PDF_LINE_Y_TOL) flush()
    currentY = row.y
    current.push(row)
  }
  flush()
  return lines
}

function consecutiveNonSpacePairs(line: PlacedItem[]): {
  left: PlacedItem
  right: PlacedItem
  norm: number
}[] {
  const words = line.filter((it) => it.str.trim() !== "")
  const pairs: { left: PlacedItem; right: PlacedItem; norm: number }[] = []
  for (let i = 0; i < words.length - 1; i++) {
    const left = words[i]!
    const right = words[i + 1]!
    pairs.push({ left, right, norm: normalizedGap(left, right) })
  }
  return pairs
}

export function auditGeometricValley(
  pdfPath: string,
  items: PlacedItem[],
): GeometricValleyAudit {
  const valleyHits: GeometricValleyHit[] = []
  const intra: number[] = []
  const space: number[] = []
  let pairCount = 0
  const byPage = new Map<number, PlacedItem[]>()
  for (const it of items) {
    const list = byPage.get(it.page) ?? []
    list.push(it)
    byPage.set(it.page, list)
  }
  for (const pageItems of byPage.values()) {
    for (const line of groupItemsIntoLines(pageItems)) {
      const pairs = consecutiveNonSpacePairs(line)
      pairCount += pairs.length
      const words = line.filter((it) => it.str.trim() !== "")
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i]!
        if (pair.norm < GEOMETRIC_VALLEY_LO) intra.push(pair.norm)
        else if (pair.norm >= GEOMETRIC_VALLEY_HI) space.push(pair.norm)
        else {
          const ctx = words
            .slice(Math.max(0, i - 1), i + 3)
            .map((w) => w.str)
            .join("")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 120)
          valleyHits.push({
            page: pair.left.page,
            left: pair.left.str,
            right: pair.right.str,
            norm: pair.norm,
            context: ctx,
          })
        }
      }
    }
  }
  return {
    pdfPath,
    pairCount,
    intraCount: intra.length,
    spaceCount: space.length,
    maxIntra: intra.length ? Math.max(...intra) : null,
    minSpace: space.length ? Math.min(...space) : null,
    valleyHits,
  }
}

export function assertGeometricValley(audit: GeometricValleyAudit): void {
  const name = path.basename(audit.pdfPath)
  if (audit.valleyHits.length > 0) {
    const sample = audit.valleyHits
      .slice(0, 20)
      .map(
        (h) =>
          `  p${h.page} n=${h.norm.toFixed(3)} ${JSON.stringify(h.left)} | ${JSON.stringify(h.right)}  ${h.context}`,
      )
      .join("\n")
    throw new Error(
      `GEOMETRIC GLUE REFUSED: ${name} has ${audit.valleyHits.length} non-space gap(s) inside the valley [${GEOMETRIC_VALLEY_LO}, ${GEOMETRIC_VALLEY_HI}). ` +
        `GEOMETRIC_GLUE_THRESHOLD=${GEOMETRIC_GLUE_THRESHOLD} is not calibrated for this document.\n${sample}`,
    )
  }
  if (audit.intraCount > 0 && audit.spaceCount === 0) {
    throw new Error(
      `GEOMETRIC GLUE REFUSED: ${name} has an intra-word cluster (n=${audit.intraCount}, max=${audit.maxIntra?.toFixed(3)}) but no word-space cluster. ` +
        `Refusing to apply GEOMETRIC_GLUE_THRESHOLD=${GEOMETRIC_GLUE_THRESHOLD}.`,
    )
  }
}

/**
 * Same-line join. Space-only items are skipped; the gap they occupy is the
 * join decision. Tracking (gap/fontSize < GEOMETRIC_GLUE_THRESHOLD) concatenates.
 * A real word space inserts a single space. Bare 1–3 digit lines are dropped.
 *
 * BACKLOG — line-wrap hyphen (same geometry layer, not applied):
 * A hyphen at the end of a line followed by a lowercase continuation is a PDF
 * wrap artefact (Član 241 "nasljeđiva-nju"). Real compounds such as
 * "svojinsko-pravni" must survive. Do not strip every hyphen; the tell is
 * wrap geometry (end of line), not the hyphen character.
 */
function pageItemsToLines(items: PlacedItem[]): string[] {
  const lines: string[] = []
  for (const lineItems of groupItemsIntoLines(items)) {
    const words = lineItems.filter((it) => it.str.trim() !== "")
    if (!words.length) continue
    const parts: string[] = []
    for (let i = 0; i < words.length; i++) {
      const item = words[i]!
      if (i === 0) {
        parts.push(item.str)
        continue
      }
      const prev = words[i - 1]!
      if (/[-–—]$/.test(prev.str) || /^[,.;:!?)]/.test(item.str)) {
        parts.push(item.str)
        continue
      }
      const glue =
        normalizedGap(prev, item) < GEOMETRIC_GLUE_THRESHOLD ? "" : " "
      parts.push(glue + item.str)
    }
    const line = parts.join("").replace(/[ \t]+/g, " ").trim()
    if (!line) continue
    if (PAGE_NUMBER_LINE_RE.test(line)) continue
    lines.push(line)
  }
  return lines
}

export async function extractPdfText(pdfPath: string): Promise<{
  text: string
  pages: number
  valley: GeometricValleyAudit
}> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs")
  const buf = await readFile(pdfPath)
  const data = new Uint8Array(buf)
  const standardFontDataUrl = new URL(
    "../node_modules/pdfjs-dist/standard_fonts/",
    import.meta.url,
  ).href
  const doc = await pdfjs.getDocument({
    data,
    disableWorker: true,
    standardFontDataUrl,
  }).promise
  const byPage: PlacedItem[][] = []
  const all: PlacedItem[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const tc = await page.getTextContent()
    const placed: PlacedItem[] = []
    for (const raw of tc.items as PdfTextItem[]) {
      const item = toPlacedItem(raw, i)
      if (item) placed.push(item)
    }
    byPage.push(placed)
    all.push(...placed)
  }
  const valley = auditGeometricValley(pdfPath, all)
  assertGeometricValley(valley)
  const pages = byPage.map((items) => pageItemsToLines(items).join("\n"))
  return { text: pages.join("\n"), pages: doc.numPages, valley }
}

/**
 * Named PDF text-layer repairs, heading lines only. The FBiH Parliament PDFs
 * letter-space some headings: "Čan 2.", "Č lan 20.", "Čl an 132.",
 * "Čla n 73.", "Čla nak 31.", "Član ak 74.", "Član 12 4.", "Članak 3 05.".
 */
function repairPdfHeadings(body: string): {
  text: string
  canToClan: number
  spacedWord: number
  spacedNumber: number
} {
  let canToClan = 0
  let spacedWord = 0
  let spacedNumber = 0
  let text = body.replace(/\r\n/g, "\n")
  text = text.replace(/^Čan\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    canToClan += 1
    return `Član ${rest}`
  })
  text = text.replace(/^Č lan\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    spacedWord += 1
    return `Član ${rest}`
  })
  text = text.replace(/^Čl an\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    spacedWord += 1
    return `Član ${rest}`
  })
  text = text.replace(/^Čla nak\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    spacedWord += 1
    return `Članak ${rest}`
  })
  text = text.replace(/^Član ak\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    spacedWord += 1
    return `Članak ${rest}`
  })
  text = text.replace(/^Čla n\s+(\d+\.?[a-z]?\.?)\s*$/gm, (_m, rest: string) => {
    spacedWord += 1
    return `Član ${rest}`
  })
  text = text.replace(
    /^(Članak|Član)\s+(\d{1,3})\s+(\d{1,2})\.?\s*$/gm,
    (_m, word: string, a: string, b: string) => {
      spacedNumber += 1
      return `${word} ${a}${b}.`
    },
  )
  return { text, canToClan, spacedWord, spacedNumber }
}

function unwrapClanHeadings(body: string): string {
  const repaired = repairPdfHeadings(body)
  let normalized = repaired.text
  GLUED_CLAN_HEADING_RE.lastIndex = 0
  normalized = normalized.replace(GLUED_CLAN_HEADING_RE, "$1\n$2")
  HEADING_THEN_BODY_RE.lastIndex = 0
  normalized = normalized.replace(HEADING_THEN_BODY_RE, "$1\n")
  return normalized
}

function articleNumFromMatch(match: RegExpMatchArray): string {
  const num = match[2]
  const letter = match[3]
  return letter ? `${num}${letter.toLowerCase()}` : num!
}

function isCrossReferenceHeading(
  text: string,
  match: RegExpMatchArray,
): boolean {
  if (match.index === undefined) return true
  const rest = text.slice(match.index + match[0].length).replace(/^\s+/, "")
  return CROSS_REF_AFTER_HEADING_RE.test(rest)
}

function splitByClan(body: string): ClanPart[] {
  const normalized = unwrapClanHeadings(body)
  const re = new RegExp(CLAN_HEADING_RE.source, CLAN_HEADING_RE.flags)
  const matches = [...normalized.matchAll(re)].filter(
    (match) => !isCrossReferenceHeading(normalized, match),
  )
  const parts: ClanPart[] = []
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]!
    const articleNum = articleNumFromMatch(match)
    if (!articleNum || match.index === undefined) continue
    const start = match.index
    const end = i + 1 < matches.length ? matches[i + 1]!.index! : normalized.length
    const chunk = normalized.slice(start, end).trim()
    if (!chunk) continue
    parts.push({ articleNum, body: chunk })
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
  parts: ClanPart[],
): LegalArticleInput[] {
  const rows: LegalArticleInput[] = []
  for (const part of parts) {
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
        ...(statute.effective_date
          ? { effective_date: statute.effective_date }
          : {}),
      })
    }
  }
  return rows
}

export function processFbihStatuteText(
  statute: CoreStatute,
  body: string,
): { articles: LegalArticleInput[]; parts: ClanPart[] } {
  const attached = reattachTrailingHeadings(
    splitByClan(body),
    statute.law_name_local,
  )
  return {
    parts: attached.parts,
    articles: articlesFromStatute(statute, attached.parts),
  }
}

function filenameForUrl(url: string): string {
  const raw = decodeURIComponent(url.split("/").pop() || "act.pdf")
  return raw.replace(/[<>:"/\\|?*]/g, "_")
}

async function downloadPdf(url: string, dest: string): Promise<void> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  })
  if (!res.ok) {
    throw new Error(`GET ${url} → ${res.status}`)
  }
  const type = res.headers.get("content-type") ?? ""
  if (!type.includes("pdf") && !type.includes("octet-stream")) {
    throw new Error(`GET ${url} → content-type ${type}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000 || buf.subarray(0, 5).toString("latin1") !== "%PDF-") {
    throw new Error(`GET ${url} → not a PDF (${buf.length} bytes)`)
  }
  await writeFile(dest, buf)
}

function extractMeta(body: string, pages: number): ExtractMeta {
  const canHits = [...body.matchAll(/Čan\s+\d+/g)].map((m) => m[0]!)
  const repairs = repairPdfHeadings(body)
  const unwrapped = unwrapClanHeadings(body)
  const clanHeadings = (unwrapped.match(/^Član\s+\d+/gm) ?? []).length
  const clanakHeadings = (unwrapped.match(/^Članak\s+\d+/gm) ?? []).length
  return {
    pages,
    chars: body.length,
    canHits,
    clanHeadings,
    clanakHeadings,
    headingRepairs: {
      canToClan: repairs.canToClan,
      spacedWord: repairs.spacedWord,
      spacedNumber: repairs.spacedNumber,
    },
  }
}

function languageNotes(body: string): string[] {
  const notes: string[] = []
  const count = (re: RegExp) => (body.match(re) ?? []).length
  notes.push(`gospodarsk* ${count(/gospodar/gi)}`)
  notes.push(`privredn* ${count(/privredn/gi)}`)
  notes.push(`tvrtk* ${count(/\btvrtk/gi)}`)
  notes.push(`firma/firme ${count(/\bfirm[aeiou]/gi)}`)
  notes.push(`tko ${count(/\btko\b/gi)}`)
  notes.push(`koji/koja (not diagnostic)`)
  notes.push(`što ${count(/\bšto\b/gi)}`)
  notes.push(`šta ${count(/\bšta\b/gi)}`)
  notes.push(`općin* ${count(/općin/gi)}`)
  notes.push(`opštin* ${count(/opštin/gi)}`)
  notes.push(`točk* ${count(/točk/gi)}`)
  notes.push(`tačk* ${count(/tačk/gi)}`)
  notes.push(`plać* ${count(/plać/gi)}`)
  notes.push(`plat[ae] ${count(/\bplat[ae]\b/gi)}`)
  notes.push(`dioničk* ${count(/dioničk/gi)}`)
  notes.push(`akcionar* ${count(/akcionar/gi)}`)
  notes.push(`nadzorni odbor ${count(/nadzorni odbor/gi)}`)
  notes.push(`nadzorni savjet ${count(/nadzorni savjet/gi)}`)
  notes.push(`sjednic* ${count(/sjednic/gi)}`)
  notes.push(`sjedniš* ${count(/sjedniš/gi)}`)
  notes.push(`član društva ${count(/član(?:a|u|ovi|ova)? društva/gi)}`)
  notes.push(`Član headings ${count(/^Član\s+\d+/gm)}`)
  notes.push(`Članak headings ${count(/^Članak\s+\d+/gm)}`)
  return notes
}

async function ensureExtracted(
  statute: CoreStatute,
  absDir: string,
): Promise<{ txtPath: string; meta: ExtractMeta }> {
  const pdfName = filenameForUrl(statute.source_url)
  const pdfPath = path.join(absDir, pdfName)
  const txtPath = pdfPath.replace(/\.pdf$/i, ".txt")
  try {
    await readFile(pdfPath)
  } catch {
    // eslint-disable-next-line no-console
    console.log(`Downloading\n  ${statute.source_url}`)
    await downloadPdf(statute.source_url, pdfPath)
  }
  const { text, pages, valley } = await extractPdfText(pdfPath)
  if (text.replace(/\s+/g, "").length < 500) {
    throw new Error(
      `No usable text layer in ${pdfName} (${pages} pages, ${text.length} chars)`,
    )
  }
  // eslint-disable-next-line no-console
  console.log(
    `  geometric valley ${pdfName}: intra ${valley.intraCount} (max ${valley.maxIntra?.toFixed(3) ?? "—"}) ` +
      `space ${valley.spaceCount} (min ${valley.minSpace?.toFixed(3) ?? "—"}) ` +
      `valley-band hits ${valley.valleyHits.length}  threshold ${GEOMETRIC_GLUE_THRESHOLD}`,
  )
  const header = `URL: ${canonicalUrl(statute.source_url)}\n---\n`
  await writeFile(txtPath, header + text, "utf8")
  return { txtPath, meta: extractMeta(text, pages) }
}

function printSplitHealth(
  lawNameLocal: string,
  peels: number,
  health: SplitHealth,
  meta: ExtractMeta,
): void {
  const byRule = new Map<string, SplitHealth["held"]>()
  for (const hit of health.held) {
    const list = byRule.get(hit.rule) ?? []
    list.push(hit)
    byRule.set(hit.rule, list)
  }
  // eslint-disable-next-line no-console
  console.log(`\n--- ${lawNameLocal} ---`)
  // eslint-disable-next-line no-console
  console.log(
    `  pdfjs: ${meta.pages} pages, ${meta.chars} chars, Član-line ${meta.clanHeadings}, Članak-line ${meta.clanakHeadings}`,
  )
  // eslint-disable-next-line no-console
  console.log(
    `  heading repairs: Čan→Član ${meta.headingRepairs.canToClan}, spaced word ${meta.headingRepairs.spacedWord}, spaced number ${meta.headingRepairs.spacedNumber}` +
      (meta.canHits.length
        ? `; raw Čan hits: ${[...new Set(meta.canHits)].slice(0, 12).join(", ")}`
        : ""),
  )
  // eslint-disable-next-line no-console
  console.log(`  nadnaslov peels: ${peels}`)
  // eslint-disable-next-line no-console
  console.log(
    `  suffix articles: ${health.suffixArticles.length}` +
      (health.suffixArticles.length
        ? ` (${health.suffixArticles.slice(0, 20).join(", ")}${health.suffixArticles.length > 20 ? ", …" : ""})`
        : ""),
  )
  for (const rule of [
    "wrap",
    "gazette",
    "deletion-list",
    "asterisk",
    "paren-period",
  ] as const) {
    const rows = byRule.get(rule) ?? []
    // eslint-disable-next-line no-console
    console.log(`  ${rule} holds: ${rows.length}`)
    for (const row of rows.slice(0, 8)) {
      // eslint-disable-next-line no-console
      console.log(`    čl. ${row.articleNum}\t${row.line.slice(0, 160)}`)
    }
    if (rows.length > 8) {
      // eslint-disable-next-line no-console
      console.log(`    … ${rows.length - 8} more`)
    }
  }
  // eslint-disable-next-line no-console
  console.log(`  empty leftovers: ${health.emptyLeftovers.length}`)
  for (const row of health.emptyLeftovers) {
    // eslint-disable-next-line no-console
    console.log(`    čl. ${row.articleNum}\t${row.preview}`)
  }
  // eslint-disable-next-line no-console
  console.log(`  stolen first-lines: ${health.stolenSentences.length}`)
  for (const row of health.stolenSentences) {
    // eslint-disable-next-line no-console
    console.log(`    čl. ${row.articleNum}\t${row.first.slice(0, 160)}`)
  }
}

function duplicateClanova(
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

function printCounts(
  counts: {
    law_name_local: string
    clan: number
    highest: string
    rows: number
  }[],
): void {
  // eslint-disable-next-line no-console
  console.log("\nČlan split counts (before embed):")
  let totalClan = 0
  let totalRows = 0
  for (const row of counts) {
    const extra =
      row.rows !== row.clan ? ` → ${row.rows} rows (oversized split)` : ""
    // eslint-disable-next-line no-console
    console.log(
      `  ${row.law_name_local}: ${row.clan} članova, highest ${row.highest}${extra}`,
    )
    totalClan += row.clan
    totalRows += row.rows
  }
  // eslint-disable-next-line no-console
  console.log(`  Total: ${totalClan} članova, ${totalRows} rows`)
}

function printDuplicateClanova(
  reports: {
    law_name_local: string
    dups: { articleNum: string; bodies: string[] }[]
  }[],
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
      console.log(`    Član ${dup.articleNum} × ${dup.bodies.length}`)
      for (const body of dup.bodies) {
        const preview = body.replace(/\s+/g, " ").trim().slice(0, 80)
        // eslint-disable-next-line no-console
        console.log(`      - ${preview}`)
      }
    }
  }
}

function pickMidArticle(parts: ClanPart[]): string {
  if (parts.length === 0) return "1"
  const nums = parts
    .map((p) => parseInt(p.articleNum, 10))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b)
  const target = nums[Math.floor(nums.length / 2)] ?? 1
  const withStav = parts.find(
    (p) =>
      parseInt(p.articleNum, 10) >= target &&
      /^\(1\)/m.test(p.body) &&
      p.body.length > 200,
  )
  return withStav?.articleNum ?? String(target)
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
      ...(row.effective_date ? { effective_date: row.effective_date } : {}),
    }
  })
}

async function loadExistingTextLocal(
  articles: LegalArticleInput[],
): Promise<Map<string, string | null>> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const ids = articles.map((a) => stableIdForArticle(a))
  const existing = new Map<string, string | null>()
  const chunkSize = 100
  for (let i = 0; i < ids.length; i += chunkSize) {
    const batch = ids.slice(i, i + chunkSize)
    const { data, error } = await supabaseAdmin
      .from("legal_articles")
      .select("id, text_local")
      .in("id", batch)
    if (error) throw error
    for (const row of data ?? []) {
      const rec = row as { id?: string; text_local?: string | null }
      if (rec.id) existing.set(rec.id, rec.text_local ?? null)
    }
  }
  return existing
}

async function upsertArticles(articles: LegalArticleInput[]): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var.")
  }
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const existingText = await loadExistingTextLocal(articles)
  let succeeded = 0
  let skipped = 0
  let failed = 0
  for (const article of articles) {
    const id = stableIdForArticle(article)
    const prev = existingText.get(id)
    if (prev !== undefined && prev === (article.text_local ?? null)) {
      skipped += 1
      // eslint-disable-next-line no-console
      console.log(
        `○ unchanged ${article.law_name_local} / Član ${article.article_num}` +
          (article.paragraph_num ? ` §${article.paragraph_num}` : ""),
      )
      continue
    }
    try {
      const embedding = await embed(article)
      const payload = {
        id,
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
      let lastError: unknown
      for (let attempt = 1; attempt <= 3; attempt++) {
        const { error } = await supabaseAdmin.from("legal_articles").upsert(payload, {
          onConflict: "id",
        })
        if (!error) {
          lastError = null
          break
        }
        lastError = error
        const timeout =
          (error as { code?: string }).code === "57014" ||
          /statement timeout/i.test(String((error as { message?: string }).message))
        if (!timeout || attempt === 3) throw error
        await sleep(1000 * attempt)
      }
      if (lastError) throw lastError
      succeeded += 1
      // eslint-disable-next-line no-console
      console.log(
        `✓ ${article.law_name_local} / Član ${article.article_num}` +
          (article.paragraph_num ? ` §${article.paragraph_num}` : ""),
      )
    } catch (err) {
      failed += 1
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${article.law_name_local} / Član ${article.article_num}`,
        err,
      )
    }
    await sleep(200)
  }
  // eslint-disable-next-line no-console
  console.log(
    `✅ Ingested ${succeeded} rows (${skipped} unchanged skip-embed, ${failed} failed)`,
  )
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

async function main(): Promise<void> {
  const { confirm, jsonPath, fromLaw, articleNum } = parseCli()
  const statutes = sliceStatutesFrom(await loadStatutes(jsonPath), fromLaw)
  const absDir = path.join(REPO_ROOT, DOWNLOAD_DIR)
  await mkdir(absDir, { recursive: true })

  const extractMetas = new Map<string, ExtractMeta>()
  for (const statute of statutes) {
    const { meta } = await ensureExtracted(statute, absDir)
    extractMetas.set(statute.source_url, meta)
  }

  const byUrl = await filesByUrl()
  const stillMissing = statutes.filter((s) => !byUrl.has(s.source_url))
  if (stillMissing.length > 0) {
    throw new Error(
      `Missing extracted files for: ${stillMissing.map((s) => s.law_name_local).join(", ")}`,
    )
  }

  const counts: {
    law_name_local: string
    clan: number
    highest: string
    rows: number
  }[] = []
  const dupReports: {
    law_name_local: string
    dups: { articleNum: string; bodies: string[] }[]
  }[] = []
  const articles: LegalArticleInput[] = []
  const peels: PeelRecord[] = []
  const bodyChecks: { file: string; text: string; extra?: string }[] = []

  for (const statute of statutes) {
    const filePath = byUrl.get(statute.source_url)!
    const content = await readFile(filePath, "utf8")
    const parsed = parseHeaderUrlAndBody(content)
    if (!parsed) throw new Error(`Invalid law file format: ${filePath}`)
    const prePeel = splitByClan(parsed.body)
    const attached = reattachTrailingHeadings(
      prePeel,
      statute.law_name_local,
    )
    const meta = extractMetas.get(statute.source_url)!
    printSplitHealth(
      statute.law_name_local,
      attached.peels.length,
      scanSplitHealth(prePeel, attached.parts),
      meta,
    )
    const mid = pickMidArticle(attached.parts)
    const checkFile =
      statute.law_category === "property"
        ? "scripts/_check-fbih-stvarna-1-mid.txt"
        : statute.law_category === "inheritance"
          ? "scripts/_check-fbih-nasljedivanje-1-mid.txt"
          : "scripts/_check-fbih-zopd-1-mid.txt"
    const extra =
      statute.law_category === "commercial"
        ? `\nLanguage counts:\n  ${languageNotes(parsed.body).join("\n  ")}`
        : ""
    bodyChecks.push({
      file: checkFile,
      extra,
      text: formatNamedArticleBodies(attached.parts, ["1", mid]),
    })
    const fileArticles = articlesFromStatute(statute, attached.parts)
    peels.push(...attached.peels)
    const highest = attached.parts.reduce((h, p) => {
      const n = parseInt(p.articleNum, 10)
      const hn = parseInt(h, 10)
      return Number.isFinite(n) && n >= hn ? p.articleNum : h
    }, "0")
    counts.push({
      law_name_local: statute.law_name_local,
      clan: attached.parts.length,
      highest,
      rows: fileArticles.length,
    })
    dupReports.push({
      law_name_local: statute.law_name_local,
      dups: duplicateClanova(attached.parts),
    })
    articles.push(...fileArticles)
  }

  printCounts(counts)
  printDuplicateClanova(dupReports)

  const report = formatPeelReport(peels)
  const fullPath = path.join(REPO_ROOT, "scripts/_peel-fbih.txt")
  const flaggedPath = path.join(REPO_ROOT, "scripts/_peel-fbih-flagged.txt")
  await writeFile(fullPath, report.full, "utf8")
  await writeFile(flaggedPath, report.flagged, "utf8")
  for (const check of bodyChecks) {
    const checkPath = path.join(REPO_ROOT, check.file)
    await writeFile(checkPath, check.text + (check.extra ?? "") + "\n", "utf8")
    // eslint-disable-next-line no-console
    console.log(`\n=== BODY CHECK ${check.file} ===\n`)
    // eslint-disable-next-line no-console
    console.log(check.text)
    if (check.extra) {
      // eslint-disable-next-line no-console
      console.log(check.extra)
    }
  }
  // eslint-disable-next-line no-console
  console.log(
    `\nNadnaslov peels: ${report.total} lines (${report.flaggedCount} flagged)`,
  )
  // eslint-disable-next-line no-console
  console.log(`  full:    ${fullPath}`)
  // eslint-disable-next-line no-console
  console.log(`  flagged: ${flaggedPath}`)
  if (report.flagged) {
    // eslint-disable-next-line no-console
    console.log("\n=== FLAGGED PEELS ===\n")
    // eslint-disable-next-line no-console
    console.log(report.flagged)
  }

  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log(
      "\nStopped before embedding. Re-run with --confirm to overwrite (re-embeds only changed text_local).\n" +
        "  npx tsx scripts/ingest-fbih-core-statutes.ts --confirm --from=\"Zakon o stvarnim pravima\"",
    )
    return
  }

  const allowed = new Set(statutes.map((s) => s.law_name_local))
  if (articleNum) {
    if (!fromLaw) {
      throw new Error("--article requires --from=<law_name_local>")
    }
    const retry = articles.filter(
      (a) => a.law_name_local === fromLaw && a.article_num === articleNum,
    )
    if (retry.length === 0) {
      throw new Error(`No article ${articleNum} in ${fromLaw}`)
    }
    // eslint-disable-next-line no-console
    console.log(`\nRetrying ${fromLaw} čl. ${articleNum} (${retry.length} row(s))`)
    await upsertArticles(retry)
    return
  }
  if (fromLaw) {
    // eslint-disable-next-line no-console
    console.log(`\nResuming from: ${fromLaw} (${statutes.length} law(s) remaining)`)
  }
  await upsertArticles(articles.filter((a) => allowed.has(a.law_name_local)))
}

if (process.argv[1]?.includes("ingest-fbih-core-statutes")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
