/**
 * Article-level ingest for the RS round-1 adopted acts in
 * scripts/rs-core-statutes.json.
 *
 * Source: Narodna skupština RS adopted-act zips only. Binary .doc is converted
 * once to .docx (both files kept under downloads/rs-core-statutes/). Extract
 * with mammoth. Splits only on a line-start "Члан N.". Does not transliterate.
 * Породични закон is an unofficial consolidation (17/23 + 27/24 + U-4/24 +
 * 61/25); see scripts/consolidate-rs-porodicni.ts. Does not embed or write
 * unless --confirm is passed. --confirm re-embeds only rows whose text_local
 * changed.
 *
 *   npx tsx scripts/ingest-rs-core-statutes.ts
 *   npx tsx scripts/ingest-rs-core-statutes.ts --confirm
 *   npx tsx scripts/ingest-rs-core-statutes.ts --confirm --from="Закон о насљеђивању"
 *
 * Dropped this round — see scripts/rs-core-statutes-dropped.json:
 * - Закон о привредним друштвима 127/08. 19.8% named stale in the operative
 *   core (founding act, 1 KM capital, closed vs open JSC, squeeze-out).
 * Породични divergences: scripts/rs-porodicni-divergence.json.
 */
import { access, mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

import mammoth from "mammoth"
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
import { applyPorodicniConsolidation } from "./consolidate-rs-porodicni"

dotenv.config({ path: ".env.local" })

const REPO_ROOT = path.resolve(__dirname, "..")
const DEFAULT_JSON = "scripts/rs-core-statutes.json"
const DOWNLOAD_DIR = "downloads/rs-core-statutes"
const JURISDICTION = "bih_rs"
const ARTICLE_BODY_MAX_CHARS = 12_000

/**
 * Line-start "Члан 1.", "Члан 1.а", "Члан 1.*". $ keeps the heading on one
 * line, so "к) Члан 172. и 173. Закона о ванпарничном поступку" cannot cut.
 * No `i` flag: /[a-z]/i would treat Latin U/I/O as a suffix.
 */
export const CLAN_HEADING_RE =
  /^[ \t]*Члан\s+(\d+)([а-яђјљњћџa-zčćđšž])?\s*\.?\s*\*?$/gm

const CROSS_REF_AFTER_HEADING_RE =
  /^(став|става|ст\.|овог закона|и\s+\d+)/i

const STVARNA_PROBE_DOCX = "Zakon_o_stvarnim_pravima.docx"
const STVARNA_CROSS_REF =
  /к\)\s*Члан\s+172\.\s*и\s*173\.\s*Закона о Ванпарничном поступку/u

type CoreStatute = {
  law_name_local: string
  law_name: string
  law_category: string
  source_url: string
  source_page?: string
  doc_file?: string
  docx_file: string
  effective_date?: string
  unofficial_consolidation?: boolean
  english_stub?: string
}

type ClanPart = {
  articleNum: string
  body: string
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

function englishStub(articleNum: string, statute: CoreStatute): string {
  if (statute.english_stub) {
    return statute.english_stub.replaceAll("{n}", articleNum)
  }
  return `Article ${articleNum} of the ${statute.law_name} (${statute.law_category} law, Republika Srpska).`
}

function normalizeExtract(text: string): string {
  return text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function articleNumFromMatch(match: RegExpMatchArray): string {
  const num = match[1]
  const letter = match[2]
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

export function splitByClan(body: string): ClanPart[] {
  const normalized = normalizeExtract(body)
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
    if (candidate.length <= maxLen) current = candidate
    else {
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
        text: englishStub(part.articleNum, statute),
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

export function processRsStatuteText(
  statute: CoreStatute,
  body: string,
): { articles: LegalArticleInput[]; parts: ClanPart[]; peels: PeelRecord[] } {
  const prePeel = splitByClan(body)
  const attached = reattachTrailingHeadings(prePeel, statute.law_name_local)
  let parts = attached.parts
  if (statute.unofficial_consolidation) {
    if (statute.law_name_local !== "Породични закон") {
      throw new Error(
        `unofficial_consolidation is only implemented for Породични закон, got ${statute.law_name_local}`,
      )
    }
    parts = applyPorodicniConsolidation(attached.parts)
  }
  return {
    parts,
    peels: attached.peels,
    articles: articlesFromStatute(statute, parts),
  }
}

async function extractDocx(docxPath: string): Promise<string> {
  const result = await mammoth.extractRawText({ path: docxPath })
  if (result.messages.length > 0) {
    // eslint-disable-next-line no-console
    console.log(
      `  mammoth messages (${result.messages.length}): ` +
        result.messages
          .slice(0, 8)
          .map((m) => m.message)
          .join(" | "),
    )
  }
  return result.value
}

function printSplitHealth(
  lawName: string,
  peels: number,
  health: SplitHealth,
): void {
  const byRule = new Map<string, SplitHealth["held"]>()
  for (const row of health.held) {
    const list = byRule.get(row.rule) ?? []
    list.push(row)
    byRule.set(row.rule, list)
  }
  // eslint-disable-next-line no-console
  console.log(`\n--- ${lawName} ---`)
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
      console.log(`    чл. ${row.articleNum}\t${row.line.slice(0, 160)}`)
    }
  }
  // eslint-disable-next-line no-console
  console.log(`  empty leftovers: ${health.emptyLeftovers.length}`)
  for (const row of health.emptyLeftovers) {
    // eslint-disable-next-line no-console
    console.log(`    чл. ${row.articleNum}\t${row.preview}`)
  }
  // eslint-disable-next-line no-console
  console.log(`  stolen first-lines: ${health.stolenSentences.length}`)
  for (const row of health.stolenSentences) {
    // eslint-disable-next-line no-console
    console.log(`    чл. ${row.articleNum}\t${row.first.slice(0, 160)}`)
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
  const abs = path.isAbsolute(jsonRel) ? jsonRel : path.join(REPO_ROOT, jsonRel)
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
      !row.source_url ||
      !row.docx_file
    ) {
      throw new Error(`${jsonRel}: entry ${i} is missing required fields`)
    }
    return {
      ...row,
      source_url: canonicalUrl(row.source_url),
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
        `○ unchanged ${article.law_name_local} / Члан ${article.article_num}` +
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
        `✓ ${article.law_name_local} / Члан ${article.article_num}` +
          (article.paragraph_num ? ` §${article.paragraph_num}` : ""),
      )
    } catch (err) {
      failed += 1
      // eslint-disable-next-line no-console
      console.log(
        `Error: ${article.law_name_local} / Члан ${article.article_num}`,
        err,
      )
    }
  }
  // eslint-disable-next-line no-console
  console.log(`\nUpsert: ${succeeded} wrote, ${skipped} unchanged, ${failed} failed`)
}

async function probeStvarnaCrossRef(absDir: string): Promise<void> {
  const docxPath = path.join(absDir, STVARNA_PROBE_DOCX)
  try {
    await access(docxPath)
  } catch {
    // eslint-disable-next-line no-console
    console.log("\nStvarna splitter probe: docx not present, skipped")
    return
  }
  const text = await extractDocx(docxPath)
  const parts = splitByClan(text)
  const crossLines = normalizeExtract(text)
    .split("\n")
    .filter((line) => STVARNA_CROSS_REF.test(line))
  const splitOnCross = parts.filter((p) =>
    /^[ \t]*к\)\s*Члан/.test(p.body.split("\n")[0] ?? ""),
  )
  const host = parts.find((p) => STVARNA_CROSS_REF.test(p.body))
  // eslint-disable-next-line no-console
  console.log("\n=== SPLITTER PROBE (Zakon o stvarnim pravima, not ingested) ===")
  // eslint-disable-next-line no-console
  console.log(`  mammoth Члан headings: ${parts.length}, highest ${parts.at(-1)?.articleNum ?? "?"}`)
  // eslint-disable-next-line no-console
  console.log(`  cross-ref lines kept as body text: ${crossLines.length}`)
  for (const line of crossLines) {
    // eslint-disable-next-line no-console
    console.log(`    ${line.slice(0, 180)}`)
  }
  // eslint-disable-next-line no-console
  console.log(`  headings that are the cross-ref: ${splitOnCross.length}`)
  // eslint-disable-next-line no-console
  console.log(
    `  cross-ref lives inside Члан ${host?.articleNum ?? "NONE"}`,
  )
}

async function main(): Promise<void> {
  const { confirm, jsonPath, fromLaw, articleNum } = parseCli()
  const statutes = sliceStatutesFrom(await loadStatutes(jsonPath), fromLaw)
  const absDir = path.join(REPO_ROOT, DOWNLOAD_DIR)
  await mkdir(absDir, { recursive: true })

  const counts: {
    law_name_local: string
    clan: number
    highest: string
    rows: number
    zip: string
  }[] = []
  const dupReports: {
    law_name_local: string
    dups: { articleNum: string; bodies: string[] }[]
  }[] = []
  const articles: LegalArticleInput[] = []
  const peels: PeelRecord[] = []
  const bodyChecks: { file: string; text: string }[] = []

  for (const statute of statutes) {
    const docxPath = path.join(absDir, statute.docx_file)
    await access(docxPath)
    if (statute.doc_file) {
      await access(path.join(absDir, statute.doc_file))
    }
    // eslint-disable-next-line no-console
    console.log(`\nExtract ${statute.docx_file}`)
    // eslint-disable-next-line no-console
    console.log(`  zip: ${statute.source_url}`)
    const extracted = await extractDocx(docxPath)
    const prePeel = splitByClan(extracted)
    const attached = reattachTrailingHeadings(prePeel, statute.law_name_local)
    printSplitHealth(
      statute.law_name_local,
      attached.peels.length,
      scanSplitHealth(prePeel, attached.parts),
    )
    const processed = processRsStatuteText(statute, extracted)
    const mid = pickMidArticle(processed.parts)
    const stem = statute.docx_file
      .replace(/\.[^.]+$/, "")
      .replace(/[\\/]+/g, "-")
      .replace(/\s+/g, "-")
    const checkFile = `scripts/_check-rs-${stem}-1-mid.txt`
    bodyChecks.push({
      file: checkFile,
      text: formatNamedArticleBodies(processed.parts, ["1", mid]),
    })
    const fileArticles = processed.articles
    peels.push(...processed.peels)
    const highest = processed.parts.reduce((h, p) => {
      const n = parseInt(p.articleNum, 10)
      const hn = parseInt(h, 10)
      return Number.isFinite(n) && n >= hn ? p.articleNum : h
    }, "0")
    counts.push({
      law_name_local: statute.law_name_local,
      clan: processed.parts.length,
      highest,
      rows: fileArticles.length,
      zip: statute.source_url,
    })
    dupReports.push({
      law_name_local: statute.law_name_local,
      dups: duplicateClanova(processed.parts),
    })
    articles.push(...fileArticles)
  }

  // eslint-disable-next-line no-console
  console.log("\nЧлан split counts (before embed):")
  for (const row of counts) {
    const extra =
      row.rows !== row.clan ? ` → ${row.rows} rows (oversized split)` : ""
    // eslint-disable-next-line no-console
    console.log(
      `  ${row.law_name_local}: ${row.clan} чланова, highest ${row.highest}${extra}`,
    )
    // eslint-disable-next-line no-console
    console.log(`    ${row.zip}`)
  }

  const withDups = dupReports.filter((r) => r.dups.length > 0)
  if (withDups.length === 0) {
    // eslint-disable-next-line no-console
    console.log("\nNo duplicate article_num values.")
  } else {
    // eslint-disable-next-line no-console
    console.log("\nDuplicate article_num:")
    for (const report of withDups) {
      for (const dup of report.dups) {
        // eslint-disable-next-line no-console
        console.log(`  ${report.law_name_local} Члан ${dup.articleNum} × ${dup.bodies.length}`)
      }
    }
  }

  const report = formatPeelReport(peels)
  await writeFile(path.join(REPO_ROOT, "scripts/_peel-rs.txt"), report.full, "utf8")
  await writeFile(
    path.join(REPO_ROOT, "scripts/_peel-rs-flagged.txt"),
    report.flagged,
    "utf8",
  )
  for (const check of bodyChecks) {
    await writeFile(path.join(REPO_ROOT, check.file), check.text + "\n", "utf8")
    // eslint-disable-next-line no-console
    console.log(`\n=== BODY CHECK ${check.file} ===\n`)
    // eslint-disable-next-line no-console
    console.log(check.text)
  }
  // eslint-disable-next-line no-console
  console.log(
    `\nNadnaslov peels: ${report.total} lines (${report.flaggedCount} flagged)`,
  )
  if (report.flagged) {
    // eslint-disable-next-line no-console
    console.log("\n=== FLAGGED PEELS ===\n")
    // eslint-disable-next-line no-console
    console.log(report.flagged)
  }

  await probeStvarnaCrossRef(absDir)

  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log(
      "\nStopped before embedding. Re-run with --confirm to overwrite (re-embeds only changed text_local).\n" +
        "  npx tsx scripts/ingest-rs-core-statutes.ts --confirm --from=\"Закон о насљеђивању\"",
    )
    return
  }

  const allowed = new Set(statutes.map((s) => s.law_name_local))
  if (articleNum) {
    if (!fromLaw) throw new Error("--article requires --from=<law_name_local>")
    const retry = articles.filter(
      (a) => a.law_name_local === fromLaw && a.article_num === articleNum,
    )
    if (retry.length === 0) throw new Error(`No article ${articleNum} in ${fromLaw}`)
    await upsertArticles(retry)
    return
  }
  await upsertArticles(articles.filter((a) => allowed.has(a.law_name_local)))
}

if (process.argv[1]?.includes("ingest-rs-core-statutes")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
