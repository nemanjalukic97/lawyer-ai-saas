/**
 * Article-level ingest for the Croatian core statutes in
 * scripts/croatia-core-statutes.json.
 *
 * Splits Narodne novine text on "Članak N." headings. Does not embed or
 * write to the database unless --confirm is passed.
 *
 *   npx tsx scripts/ingest-croatia-core-statutes.ts
 *   npx tsx scripts/ingest-croatia-core-statutes.ts --confirm
 *   npx tsx scripts/ingest-croatia-core-statutes.ts --confirm --from="Zakon o radu"
 */
import { spawnSync } from "child_process"
import { readdir, readFile, writeFile } from "fs/promises"
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
const DEFAULT_JSON = "scripts/croatia-core-statutes.json"
const DOWNLOAD_DIR = "downloads/croatia-core-statutes"
const JURISDICTION = "croatia"

/** Leave headroom for law_name_local + article_num + English stub in embed().
 *  text-embedding-3-small caps at 8192 tokens (~2–3 chars/token for Croatian). */
const ARTICLE_BODY_MAX_CHARS = 12_000

/**
 * "Članak 358.", "Članak 358.a", "Članak 433a" → groups (358, a?) .
 * Suffix is lowercase and glued to the number (optional period between).
 * Do not use the `i` flag: /[a-z]/i treats "U"/"I"/"O" as a suffix, and
 * `\s*` used to cross the blank line ("Članak 4.\n\nU zasnivanju" → 4u).
 * The heading is the whole line so trailing whitespace cannot reach the body.
 */
export const CLANAK_HEADING_RE =
  /^Članak\s+(\d+)\.?([a-z])?\.?[ \t]*$/gm

/**
 * Pročišćeni tekst appends later amending acts after the main act. Their own
 * "Članak 2./3./4." (mostly vacatio legis) must not overwrite the main act.
 * Do not cut at the main act's "Glava … ZAVRŠNE ODREDBE" or "Dio … PRIJELAZNE
 * I ZAVRŠNE ODREDBE" — those still belong to the original statute.
 *
 * NN consolidations use these banners:
 *   ZAVRŠNA ODREDBA Zakona … / PRIJELAZNE I ZAVRŠNE ODREDBE Zakona …
 *     (ZVDSP)
 *   PRIJELAZNE I ZAVRŠNE ODREDBE Zakon o izmjenama …
 *     (ZKP 121/11; nominative "Zakon", not genitive "Zakona")
 *   Iz Zakona o preuzimanju/izmjenama …
 *     (ZPP 148/11)
 *   ZAKON O IZMJENAMA [I DOPUNAMA] ZAKONA O …
 *     (ZTD 152/11; the appended acts are titled in full, not "Iz Zakona o")
 *   DODATAK I. / DODATAK II. …
 *     (ZASP 111/21; numbered annexes restart Članak 1)
 */
const AMENDING_ACT_TAIL_RE =
  /^(?:(?:ZAVRŠNA ODREDBA|PRIJELAZNE I ZAVRŠNE ODREDBE)\s+Zakona?\b|Iz Zakona o\b|ZAKON O (?:IZMJENAMA I DOPUNAMA|IZMJENI I DOPUNI|IZMJENAMA|IZMJENI|DOPUNAMA|DOPUNI) ZAKONA\b|DODATAK\s+[IVXLCDM]+\.)/im

/** NN sometimes glues the nadnaslov onto the heading: "Određenje prekršaja Članak 1." */
const GLUED_CLANAK_HEADING_RE =
  /(\S)[ \t]+(Članak\s+\d+\.?[a-z]?\.?)[ \t]*$/gm

/** 1990-era consolidations number articles as "Član 1." rather than "Članak 1." */
const CLAN_HEADING_LINE_RE = /^Član(?!ak)(\s+\d+\.?[a-z]?\.?)[ \t]*$/gm

const CROSS_REF_AFTER_HEADING_RE =
  /^(stavak|stavka|st\.|ovoga Zakona)\b/i

/** NN 85/2010 leftover Promjena closing clauses, not standing constitutional text. */
const USTAV_LAST_STANDING_ARTICLE = 150
const USTAV_LAW_NAME_LOCAL = "Ustav Republike Hrvatske"

type CoreStatute = {
  law_name_local: string
  law_name: string
  law_category: string
  source_url: string
}

type ClanakPart = {
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
    const arg = args[i]
    if (arg === "--confirm") confirm = true
    else if (arg === "--from-json" && args[i + 1]) jsonPath = args[++i]
    else if (arg.startsWith("--from-json=")) jsonPath = arg.slice("--from-json=".length)
    else if (arg.startsWith("--article=")) articleNum = arg.slice("--article=".length)
    else if (arg === "--article" && args[i + 1]) articleNum = args[++i]
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
  return `Article ${articleNum} of the ${lawName} (${lawCategory} law, Croatia).`
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

function mainActBody(body: string): string {
  let normalized = body.replace(/\r\n/g, "\n")
  GLUED_CLANAK_HEADING_RE.lastIndex = 0
  normalized = normalized.replace(GLUED_CLANAK_HEADING_RE, "$1\n$2")
  CLAN_HEADING_LINE_RE.lastIndex = 0
  normalized = normalized.replace(CLAN_HEADING_LINE_RE, "Članak$1")
  AMENDING_ACT_TAIL_RE.lastIndex = 0
  const cut = AMENDING_ACT_TAIL_RE.exec(normalized)
  if (!cut || cut.index === undefined) return normalized
  return normalized.slice(0, cut.index).trimEnd()
}

function articleNumFromMatch(match: RegExpMatchArray): string {
  const num = match[1]
  const letter = match[2]
  return letter ? `${num}${letter.toLowerCase()}` : num
}

/** Line-start "Članak 1. stavak 1. ovoga Zakona…" is a cross-reference, not a heading. */
function isCrossReferenceHeading(
  text: string,
  match: RegExpMatchArray,
): boolean {
  if (match.index === undefined) return true
  const rest = text.slice(match.index + match[0].length).replace(/^\s+/, "")
  return CROSS_REF_AFTER_HEADING_RE.test(rest)
}

function isStandingConstitutionArticle(articleNum: string): boolean {
  const n = parseInt(articleNum, 10)
  return Number.isFinite(n) && n <= USTAV_LAST_STANDING_ARTICLE
}

function dropSpentPromjenaArticles(
  lawNameLocal: string,
  parts: ClanakPart[],
): ClanakPart[] {
  if (lawNameLocal !== USTAV_LAW_NAME_LOCAL) return parts
  return parts.filter((part) => isStandingConstitutionArticle(part.articleNum))
}

function splitByClanak(body: string): ClanakPart[] {
  const normalized = mainActBody(body)
  const re = new RegExp(CLANAK_HEADING_RE.source, CLANAK_HEADING_RE.flags)
  const matches = [...normalized.matchAll(re)].filter(
    (match) => !isCrossReferenceHeading(normalized, match),
  )
  const parts: ClanakPart[] = []
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const articleNum = articleNumFromMatch(match)
    if (!articleNum || match.index === undefined) continue
    const start = match.index
    const end = i + 1 < matches.length ? matches[i + 1].index! : normalized.length
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
  parts: ClanakPart[],
): LegalArticleInput[] {
  const year = /\/eli\/sluzbeni\/(\d{4})\//.exec(statute.source_url)?.[1]
  const effectiveDate = year ? `${year}-01-01` : undefined
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
        ...(effectiveDate ? { effective_date: effectiveDate } : {}),
      })
    }
  }
  return rows
}

export function processCroatiaStatuteText(
  statute: CoreStatute,
  body: string,
): { articles: LegalArticleInput[]; parts: ClanakPart[] } {
  const attached = reattachTrailingHeadings(
    splitByClanak(body),
    statute.law_name_local,
  )
  const parts = dropSpentPromjenaArticles(
    statute.law_name_local,
    attached.parts,
  )
  return {
    parts,
    articles: articlesFromStatute(statute, parts),
  }
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
    `Downloading core statutes:\n  python scripts/download-croatia-laws.py --from-json ${jsonRel}`,
  )
  const result = spawnSync(
    "python",
    ["scripts/download-croatia-laws.py", "--from-json", jsonRel],
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
  console.log("\nČlanak split counts (before embed):")
  let totalClanak = 0
  let totalRows = 0
  for (const row of counts) {
    const extra =
      row.rows !== row.clanak ? ` → ${row.rows} rows (oversized split)` : ""
    // eslint-disable-next-line no-console
    console.log(`  ${row.law_name_local}: ${row.clanak} članka${extra}`)
    totalClanak += row.clanak
    totalRows += row.rows
  }
  // eslint-disable-next-line no-console
  console.log(`  Total: ${totalClanak} članka, ${totalRows} rows`)
}

function duplicateClanaka(
  parts: ClanakPart[],
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

function printSplitHealth(
  lawNameLocal: string,
  peels: number,
  health: SplitHealth,
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
      console.log(`    Članak ${dup.articleNum} × ${dup.bodies.length}`)
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
        `✓ ${article.law_name_local} / Članak ${article.article_num}` +
          (article.paragraph_num ? ` §${article.paragraph_num}` : ""),
      )
    } catch (err) {
      failed += 1
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${article.law_name_local} / Članak ${article.article_num}`,
        err,
      )
    }
    await sleep(200)
  }

  // eslint-disable-next-line no-console
  console.log(`✅ Ingested ${succeeded} rows (${failed} failed)`)
}

async function main() {
  const { confirm, jsonPath, fromLaw, articleNum } = parseCli()
  const statutes = sliceStatutesFrom(await loadStatutes(jsonPath), fromLaw)

  let byUrl = await filesByUrl()
  const missing = statutes.filter((s) => !byUrl.has(s.source_url))
  if (missing.length > 0) {
    const ok = runDownload(jsonPath)
    if (!ok) {
      throw new Error(
        "Download failed. Run: python scripts/download-croatia-laws.py --from-json scripts/croatia-core-statutes.json",
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
  const peels: PeelRecord[] = []
  const bodyChecks: { file: string; text: string }[] = []

  for (const statute of statutes) {
    const filePath = byUrl.get(statute.source_url)!
    const content = await readFile(filePath, "utf8")
    const parsed = parseHeaderUrlAndBody(content)
    if (!parsed) {
      throw new Error(`Invalid law file format: ${filePath}`)
    }
    const prePeel = splitByClanak(parsed.body)
    const attached = reattachTrailingHeadings(
      prePeel,
      statute.law_name_local,
    )
    attached.parts = dropSpentPromjenaArticles(
      statute.law_name_local,
      attached.parts,
    )
    if (statute.law_name_local === USTAV_LAW_NAME_LOCAL) {
      attached.peels = attached.peels.filter((peel) =>
        isStandingConstitutionArticle(peel.toArticle),
      )
    }
    printSplitHealth(
      statute.law_name_local,
      attached.peels.length,
      scanSplitHealth(prePeel, attached.parts),
    )
    if (statute.law_name_local === USTAV_LAW_NAME_LOCAL) {
      bodyChecks.push({
        file: "scripts/_check-ustav-34-150.txt",
        text: formatNamedArticleBodies(attached.parts, [
          "1",
          "34",
          "150",
          "151",
          "152",
        ]),
      })
    }
    if (statute.law_name_local === "Zakon o vlasništvu i drugim stvarnim pravima") {
      bodyChecks.push({
        file: "scripts/_check-zvdsp-50-51.txt",
        text: formatNamedArticleBodies(attached.parts, ["50", "51"]),
      })
    }
    if (statute.law_name_local === "Kazneni zakon") {
      bodyChecks.push({
        file: "scripts/_check-kz-322-347.txt",
        text: formatNamedArticleBodies(attached.parts, ["322", "347"]),
      })
    }
    if (statute.law_name_local === "Zakon o zaštiti prirode") {
      bodyChecks.push({
        file: "scripts/_check-zzp-127-165-166.txt",
        text: formatNamedArticleBodies(attached.parts, ["127", "165", "166"]),
      })
    }
    const fileArticles = articlesFromStatute(statute, attached.parts)
    peels.push(...attached.peels)
    counts.push({
      law_name_local: statute.law_name_local,
      clanak: attached.parts.length,
      rows: fileArticles.length,
    })
    dupReports.push({
      law_name_local: statute.law_name_local,
      dups: duplicateClanaka(attached.parts),
    })
    articles.push(...fileArticles)
  }

  printCounts(counts)
  printDuplicateClanaka(dupReports)

  const report = formatPeelReport(peels)
  const fullPath = path.join(REPO_ROOT, "scripts/_peel-croatia.txt")
  const flaggedPath = path.join(REPO_ROOT, "scripts/_peel-croatia-flagged.txt")
  await writeFile(fullPath, report.full, "utf8")
  await writeFile(flaggedPath, report.flagged, "utf8")
  for (const check of bodyChecks) {
    const checkPath = path.join(REPO_ROOT, check.file)
    await writeFile(checkPath, check.text + "\n", "utf8")
    // eslint-disable-next-line no-console
    console.log(`\n=== BODY CHECK ${check.file} ===\n`)
    // eslint-disable-next-line no-console
    console.log(check.text)
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
      "\nStopped before embedding. Re-run with --confirm to embed and upsert:\n" +
        "  npx tsx scripts/ingest-croatia-core-statutes.ts --confirm",
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

if (process.argv[1]?.includes("ingest-croatia-core-statutes")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
