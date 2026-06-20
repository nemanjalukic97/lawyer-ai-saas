import { readdir, readFile } from "fs/promises"
import path from "path"

import dotenv from "dotenv"

import {
  type LegalArticleInput,
  checkExisting,
  embed,
  sleep,
  stableIdForArticle,
} from "./ingest-legal-texts"

dotenv.config({ path: ".env.local" })

const REPO_ROOT = path.resolve(__dirname, "..")

type SourceDir = {
  dir: string
  jurisdiction: string
  recursive: boolean
}

const SOURCE_DIRS: SourceDir[] = [
  { dir: "downloads/serbia-laws", jurisdiction: "serbia", recursive: true },
  { dir: "downloads/croatia-laws", jurisdiction: "croatia", recursive: true },
  { dir: "downloads/slovenia-laws", jurisdiction: "slovenia", recursive: false },
  { dir: "downloads/paragraf-ba-bih", jurisdiction: "bih_fbih", recursive: false },
  { dir: "downloads/paragraf-ba-fbih", jurisdiction: "bih_fbih", recursive: false },
  { dir: "downloads/paragraf-ba-rs", jurisdiction: "bih_rs", recursive: false },
  { dir: "downloads/paragraf-ba-brcko", jurisdiction: "bih_brcko", recursive: false },
  { dir: "downloads/paragraf-me", jurisdiction: "montenegro", recursive: false },
  { dir: "downloads/legalist-ba-bih", jurisdiction: "bih_fbih", recursive: false },
  { dir: "downloads/legalist-ba-fbih", jurisdiction: "bih_fbih", recursive: false },
  { dir: "downloads/legalist-ba-rs", jurisdiction: "bih_rs", recursive: false },
]

type ParsedLawFile = {
  naziv: string
  url: string
  kategorija?: string
  godina?: string
  body: string
}

const LAW_NAME_TRANSLATIONS: Record<string, string> = {
  "zakon o radu": "Labor Law",
  "zakon o obligacionim odnosima": "Law on Obligations",
  "zakon o krivičnom postupku": "Criminal Procedure Code",
  "zakon o krivicnom postupku": "Criminal Procedure Code",
  "krivični zakon": "Criminal Code",
  "krivicni zakon": "Criminal Code",
  "zakon o parničnom postupku": "Civil Procedure Code",
  "zakon o parnicnom postupku": "Civil Procedure Code",
  "zakon o porodičnim odnosima": "Family Relations Act",
  "zakon o porodicnim odnosima": "Family Relations Act",
  "zakon o nasleđivanju": "Inheritance Act",
  "zakon o nasledjivanju": "Inheritance Act",
  "zakon o nasljeđivanju": "Inheritance Act",
  "zakon o nasljedivanju": "Inheritance Act",
  "zakon o privrednim društvima": "Companies Act",
  "zakon o privrednim drustvima": "Companies Act",
  "zakon o trgovačkim društvima": "Commercial Companies Act",
  "zakon o trgovackim drustvima": "Commercial Companies Act",
  "zakon o upravnom postupku": "Administrative Procedure Act",
  "zakon o prekršajima": "Misdemeanor Act",
  "zakon o preksajima": "Misdemeanor Act",
  "zakon o stvarnim pravima": "Property Rights Act",
  "zakon o imovinsko-pravnim odnosima": "Property Relations Act",
  "zakon o imovinsko pravnim odnosima": "Property Relations Act",
  "zakon o radu republike srpske": "Labor Law of Republika Srpska",
  "zakon o radu federacije bosne i hercegovine": "Labor Law of Federation of BiH",
  "zakon o radu brčko distrikta": "Labor Law of Brčko District",
  "zakon o radu brcko distrikta": "Labor Law of Brčko District",
  "zakon o radu crne gore": "Labor Law of Montenegro",
  "zakon o delovnih razmerjih": "Employment Relationships Act",
  "zakon o delovnih razmerjih republike slovenije": "Employment Relationships Act",
  "zakon o radu republike hrvatske": "Labor Act of Croatia",
  "obligacijski zakon": "Obligations Act",
  "kazneni zakon": "Criminal Code",
  "obiteljski zakon": "Family Act",
  "zakon o obveznim odnosima": "Obligations Act",
}

const CATEGORY_RULES: { keywords: string[]; category: string }[] = [
  { keywords: ["rad", "zapošljavanje", "zaposljavanje", "delovnih razmerj"], category: "labor" },
  { keywords: ["krivičn", "krivicn", "kazneni"], category: "criminal" },
  { keywords: ["porodi", "brak", "obitelj", "družin"], category: "family" },
  { keywords: ["obligacion", "ugovor", "obvezn", "obligacij"], category: "civil" },
  { keywords: ["privredno", "trgovačko", "trgovacko", "gospodarsk"], category: "commercial" },
  { keywords: ["upravno"], category: "administrative" },
  { keywords: ["nasljeđ", "nasljed", "nasleđ", "nasled"], category: "inheritance" },
  { keywords: ["prekršaj", "preksaj"], category: "misdemeanor" },
  { keywords: ["imovinn", "stvarno"], category: "property" },
]

function parseCliArgs(): { jurisdiction?: string; dryRun: boolean } {
  const args = process.argv.slice(2)
  let jurisdiction: string | undefined
  let dryRun = false

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--dry-run") {
      dryRun = true
    } else if (arg === "--jurisdiction" && args[i + 1]) {
      jurisdiction = args[++i]
    } else if (arg.startsWith("--jurisdiction=")) {
      jurisdiction = arg.slice("--jurisdiction=".length)
    }
  }

  return { jurisdiction, dryRun }
}

function normalizeLawNameKey(naziv: string): string {
  return naziv.trim().toLowerCase()
}

function translateLawName(naziv: string): string {
  const key = normalizeLawNameKey(naziv)
  return LAW_NAME_TRANSLATIONS[key] ?? naziv
}

function detectLawCategory(naziv: string, kategorijaHeader?: string): string {
  const haystack = [naziv, kategorijaHeader ?? ""].join(" ").toLowerCase()

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.category
    }
  }

  return "general"
}

function parseEffectiveDate(godina?: string): string | undefined {
  if (!godina) return undefined
  const m = /^(?:19|20)\d{2}$/.exec(godina.trim())
  if (!m) return undefined
  return `${m[0]}-01-01`
}

function parseLawFile(content: string): ParsedLawFile | null {
  const text = content.replace(/^\ufeff/, "")
  const lines = text.split(/\r?\n/)
  const sepIdx = lines.findIndex((line) => line.trim() === "---")

  if (sepIdx < 0) return null

  const headerLines = lines.slice(0, sepIdx)
  const body = lines.slice(sepIdx + 1).join("\n").trim()

  let naziv = ""
  let url = ""
  let kategorija: string | undefined
  let godina: string | undefined

  for (const line of headerLines) {
    const m = /^([^:]+):\s*(.*)$/.exec(line)
    if (!m) continue
    const key = m[1].trim()
    const value = m[2].trim()
    if (key === "Naziv") naziv = value
    else if (key === "URL") url = value
    else if (key === "Kategorija") kategorija = value
    else if (key === "Godina") godina = value
  }

  if (!naziv || !url || !body) return null

  return { naziv, url, kategorija, godina, body }
}

function chunkText(body: string, maxLen = 2000): string[] {
  const paragraphs = body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  if (paragraphs.length === 0) return []

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

function fileToArticles(
  parsed: ParsedLawFile,
  jurisdiction: string,
): LegalArticleInput[] {
  const chunks = chunkText(parsed.body)
  const lawCategory = detectLawCategory(parsed.naziv, parsed.kategorija)
  const lawName = translateLawName(parsed.naziv)
  const effectiveDate = parseEffectiveDate(parsed.godina)

  return chunks.map((chunk, i) => ({
    jurisdiction,
    law_name: lawName,
    law_name_local: parsed.naziv,
    law_category: lawCategory,
    article_num: String(i + 1),
    text: chunk,
    text_local: chunk,
    source_url: parsed.url,
    ...(effectiveDate ? { effective_date: effectiveDate } : {}),
  }))
}

async function collectTxtFiles(
  dirPath: string,
  recursive: boolean,
): Promise<string[]> {
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
      if (entry.isDirectory()) {
        if (recursive) await walk(full)
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".txt")) {
        results.push(full)
      }
    }
  }

  await walk(absDir)
  return results.sort()
}

type FileStats = {
  files: number
  chunks: number
  skipped: number
}

async function discoverAndParse(
  sources: SourceDir[],
): Promise<{ articles: LegalArticleInput[]; stats: Map<string, FileStats> }> {
  const articles: LegalArticleInput[] = []
  const stats = new Map<string, FileStats>()

  for (const source of sources) {
    const files = await collectTxtFiles(source.dir, source.recursive)
    const jStats = stats.get(source.jurisdiction) ?? {
      files: 0,
      chunks: 0,
      skipped: 0,
    }

    for (const filePath of files) {
      let content: string
      try {
        content = await readFile(filePath, "utf8")
      } catch {
        jStats.skipped += 1
        // eslint-disable-next-line no-console
        console.warn(`⚠ skip (read error): ${path.relative(REPO_ROOT, filePath)}`)
        continue
      }

      const parsed = parseLawFile(content)
      if (!parsed) {
        jStats.skipped += 1
        // eslint-disable-next-line no-console
        console.warn(`⚠ skip (invalid format): ${path.relative(REPO_ROOT, filePath)}`)
        continue
      }

      const fileArticles = fileToArticles(parsed, source.jurisdiction)
      if (fileArticles.length === 0) {
        jStats.skipped += 1
        // eslint-disable-next-line no-console
        console.warn(`⚠ skip (empty body): ${path.relative(REPO_ROOT, filePath)}`)
        continue
      }

      jStats.files += 1
      jStats.chunks += fileArticles.length
      articles.push(...fileArticles)
    }

    stats.set(source.jurisdiction, jStats)
  }

  return { articles, stats }
}

function printStats(stats: Map<string, FileStats>, dryRun: boolean): void {
  let totalFiles = 0
  let totalChunks = 0
  let totalSkipped = 0

  const entries = [...stats.entries()].sort(([a], [b]) => a.localeCompare(b))
  for (const [jurisdiction, s] of entries) {
    if (s.files === 0 && s.skipped === 0) continue
    // eslint-disable-next-line no-console
    console.log(
      `${jurisdiction}: ${s.files} files → ${s.chunks} chunks` +
        (s.skipped > 0 ? ` (${s.skipped} skipped)` : ""),
    )
    totalFiles += s.files
    totalChunks += s.chunks
    totalSkipped += s.skipped
  }

  // eslint-disable-next-line no-console
  console.log(
    `\nTotal: ${totalFiles} files, ${totalChunks} chunks` +
      (totalSkipped > 0 ? `, ${totalSkipped} skipped` : "") +
      (dryRun ? " (dry-run, no ingest)" : ""),
  )
}

export async function ingestDownloadedLaws(options?: {
  jurisdiction?: string
  dryRun?: boolean
}) {
  const jurisdictionFilter = options?.jurisdiction
  const dryRun = options?.dryRun ?? false

  const sources = jurisdictionFilter
    ? SOURCE_DIRS.filter((s) => s.jurisdiction === jurisdictionFilter)
  : SOURCE_DIRS

  if (sources.length === 0) {
    throw new Error(
      `No source directories for jurisdiction "${jurisdictionFilter}". ` +
        `Valid: ${[...new Set(SOURCE_DIRS.map((s) => s.jurisdiction))].join(", ")}`,
    )
  }

  // eslint-disable-next-line no-console
  console.log(
    `📂 Scanning ${sources.length} source folder(s)` +
      (jurisdictionFilter ? ` (jurisdiction: ${jurisdictionFilter})` : "") +
      (dryRun ? " [dry-run]" : ""),
  )

  const { articles, stats } = await discoverAndParse(sources)

  if (articles.length === 0) {
    // eslint-disable-next-line no-console
    console.log(
      "\nNo .txt law files found. Run download scripts first, e.g.:\n" +
        "  python scripts/download-serbia-laws.py --max-laws 3",
    )
    printStats(stats, dryRun)
    return
  }

  printStats(stats, dryRun)

  if (dryRun) return

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var.")
  }

  const existingTotal = await checkExisting()
  // eslint-disable-next-line no-console
  console.log(`\nExisting total: ${existingTotal}`)

  const jurisdictionSet = new Set<string>()
  const succeededByJurisdiction = new Map<string, number>()
  let succeeded = 0

  for (const article of articles) {
    jurisdictionSet.add(article.jurisdiction)

    try {
      const embedding = await embed(article)
      const id = stableIdForArticle(article)

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

      const { supabaseAdmin } = await import("../lib/supabase/admin")
      const { error } = await supabaseAdmin
        .from("legal_articles")
        .upsert(payload, { onConflict: "id", ignoreDuplicates: true })

      if (error) throw error

      succeeded += 1
      succeededByJurisdiction.set(
        article.jurisdiction,
        (succeededByJurisdiction.get(article.jurisdiction) ?? 0) + 1,
      )
      // eslint-disable-next-line no-console
      console.log(
        `✓ ${article.jurisdiction} / ${article.law_name_local} / ${article.article_num}`,
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${article.jurisdiction} / ${article.law_name_local} / ${article.article_num}`,
        err,
      )
    }

    await sleep(200)
  }

  const jurisdictionOrder = [...succeededByJurisdiction.keys()].sort((a, b) =>
    a.localeCompare(b),
  )
  // eslint-disable-next-line no-console
  console.log("✅ Ingest summary (succeeded per jurisdiction):")
  for (const j of jurisdictionOrder) {
    // eslint-disable-next-line no-console
    console.log(`  ${j}: ${succeededByJurisdiction.get(j) ?? 0}`)
  }
  // eslint-disable-next-line no-console
  console.log(`✅ Total: ${succeeded} articles (${jurisdictionSet.size} jurisdictions)`)
}

async function main() {
  const { jurisdiction, dryRun } = parseCliArgs()
  await ingestDownloadedLaws({ jurisdiction, dryRun })
}

if (process.argv[1]?.includes("ingest-downloaded-laws")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}
