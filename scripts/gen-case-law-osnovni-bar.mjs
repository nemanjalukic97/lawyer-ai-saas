/**
 * Generate case-law-*-montenegro-osnovni-bar-*.ts from downloads/montenegro/osnovni-bar/*.txt
 * Run: node scripts/gen-case-law-osnovni-bar.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { extractLegalQuestion } from "./_gen-extract-legal-question.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const srcDir = path.join(root, "downloads", "montenegro", "osnovni-bar")
const scriptsDir = __dirname

const MONTHS = {
  januar: 1,
  januara: 1,
  februar: 2,
  februara: 2,
  mart: 3,
  marta: 3,
  april: 4,
  aprila: 4,
  maj: 5,
  maja: 5,
  jun: 6,
  juna: 6,
  jul: 7,
  jula: 7,
  avgust: 8,
  avgusta: 8,
  august: 8,
  augusta: 8,
  septembar: 9,
  septembra: 9,
  oktobar: 10,
  oktobra: 10,
  novembar: 11,
  novembra: 11,
  decembar: 12,
  decembra: 12,
}

function pad2(n) {
  return String(n).padStart(2, "0")
}

function normalizeDecisionDate(y, m, d) {
  let year = y
  let month = m
  let day = d
  if (day === 0 || day == null) day = 1
  if (month === 0 || month == null) month = 1
  if (!year) return null
  return `${year}-${pad2(month)}-${pad2(day)}`
}

function parseDecisionDate(text) {
  const t = text.slice(0, 12000)

  const iso = /dana\s+(\d{1,2})\.(\d{1,2})\.(\d{4})\s*\.?\s*godine/gi
  let m
  let best = null
  while ((m = iso.exec(t))) {
    const y = parseInt(m[3], 10)
    const mo = parseInt(m[2], 10)
    const d = parseInt(m[1], 10)
    const norm = normalizeDecisionDate(y, mo, d)
    if (norm) best = norm
  }
  if (best) return best

  const named = /(\d{1,2})\.\s*([a-zA-ZčćšđžČĆŠĐŽ]+)\s+(\d{4})/g
  while ((m = named.exec(t))) {
    const d = parseInt(m[1], 10)
    const mon = MONTHS[m[2].toLowerCase()]
    const y = parseInt(m[3], 10)
    if (mon && y) {
      const norm = normalizeDecisionDate(y, mon, d)
      if (norm) best = norm
    }
  }
  if (best) return best

  const yearOnly = /\b(20\d{2})\s*\.?\s*godine\b/i.exec(t)
  if (yearOnly) return `${yearOnly[1]}-01-01`

  const y4 = /\b(20\d{2})\b/.exec(t)
  if (y4) return `${y4[1]}-01-01`

  return null
}

function legalAreaFromFilename(base) {
  const prefix = base.split("-")[0] || ""
  const p = prefix.toLowerCase()

  if (p === "kr" || p === "kž" || p === "krs") return "criminal"
  if (p === "pdp" || p === "pžr") return "labor"
  if (p === "u" || p === "už") return "administrative"
  if (p === "ii") return "procedural"
  if (p === "ps" || p === "pž-kom" || p.startsWith("pž-kom")) return "commercial"
  if (p === "gž" || p === "rev") return "civil"
  if (p === "p") return "civil"
  if (p === "k" || p === "kv" || p === "km" || p === "mal" || p === "kuo") return "criminal"
  if (p === "ip") return "enforcement"
  if (p === "o" || p === "r") return "inheritance"
  if (p === "rs") return "family"
  if (p === "pso") return "procedural"
  return "civil"
}

function extractCaseNumber(text, baseName) {
  const lines = text.split(/\r?\n/).slice(0, 15)
  for (const line of lines) {
    const s = line.trim()
    const m =
      /^([A-Za-zčćšđžČĆŠĐŽ.]+(?:\s+br\.?)?\s*[\d./\-]+)/i.exec(s) ||
      /^([A-Za-z.]+\.br\.\s*[\d./]+)/i.exec(s) ||
      /^([A-Za-z]+\s+br\.\s*[\d./]+)/i.exec(s)
    if (m && m[1].length >= 4 && m[1].length < 80) {
      return m[1].replace(/\s+/g, " ").trim()
    }
  }
  const parts = baseName.split("-")
  if (parts.length >= 3) {
    const kind = parts[0]
    const num = parts[1]
    const year = parts[2]
    return `${kind}.br. ${num}/${year.slice(-2)}`
  }
  return baseName
}

function splitBodyIzreka(text) {
  let obIdx = text.search(/\bO\s*b\s*r\s*a\s*z\s*l\s*o\s*ž\s*e\s*n\s*j\s*e\b/i)
  if (obIdx === -1) obIdx = text.search(/\bObrazloženje\b/i)
  if (obIdx === -1) obIdx = text.search(/\bO\s*b\s*r\s*a\s*z\s*l\s*o\s*ž\s*e\s*n\s*j\s*e\s+n\s+j\s*e\b/i)
  if (obIdx > 400) {
    const start = Math.max(0, obIdx - 2800)
    const izreka = text.slice(start, obIdx).trim()
    return { body: text, izreka: izreka || text.slice(0, 2000) }
  }
  return { body: text, izreka: text.slice(0, 2200) }
}

function collapse(s) {
  return s.replace(/\s+/g, " ").trim()
}

function courtPositionFrom(text) {
  const { izreka } = splitBodyIzreka(text)
  const head = collapse(text.slice(0, 10000))
  if (head.length > 9000) return head.slice(0, 9000) + "…"
  return head
}

function extractRelatedArticles(text) {
  const re = /čl\.?\s*\d[\d.]*(?:\s*st\.?\s*\d+)?/gi
  const seen = new Set()
  const out = []
  let m
  while ((m = re.exec(text)) && out.length < 15) {
    const x = m[0].replace(/\s+/g, " ").trim()
    if (!seen.has(x.toLowerCase())) {
      seen.add(x.toLowerCase())
      out.push(x)
    }
  }
  return out.length ? out : undefined
}

function inferOutcome(text, legalArea) {
  const iz = splitBodyIzreka(text).izreka
  const u = (iz + "\n" + text.slice(0, 4000)).toUpperCase()

  if (/ODBACUJE SE|ODBAČEN|POVUČENA|POVLAČI TUŽBU|POVLACI TUZBU/i.test(text)) return "procedural"
  if (/OSLOBAĐA SE|OSLOBAĐA|NIJE KRIV|NEMOĆAN ZA PRIJEM KAZNE/i.test(text)) return "defendant_won"

  if (legalArea === "criminal") {
    if (/KRIV JE|OSUĐUJE|OGLAŠAVA SE KRIVIM|PRAVOSNAŽNO OSUĐIVAN/i.test(text)) return "plaintiff_won"
    return undefined
  }

  if (/USVAJA SE.*TUŽB|TUŽBENI ZAHTJEV SE USVAJA|USVOJENA JE TUŽBA/i.test(u)) return "plaintiff_won"
  if (/ODB(IJ)?A SE.*TUŽB|TUŽBENI ZAHTJEV SE ODBIJ|ODBIJEN JE TUŽBENI/i.test(u)) return "defendant_won"
  if (/DJELIMIČNO|DJELIMICNO/i.test(u)) return "partially"
  if (/UKIDA SE|UKINUTA|PONOVO ODLUČUJE|VRATI NA PONOVNO/i.test(u)) return "remanded"
  return undefined
}

function dbIdFromFilename(name) {
  const base = name.replace(/\.txt$/i, "")
  const parts = base.split("-")
  const last = parts[parts.length - 1]
  return /^\d+$/.test(last) ? last : null
}

function formatCasesArray(chunk) {
  return JSON.stringify(chunk, null, 2)
}

const LEGAL_AREA_ORDER = [
  "administrative",
  "civil",
  "commercial",
  "constitutional",
  "criminal",
  "enforcement",
  "family",
  "inheritance",
  "labor",
  "procedural",
]

function areaToExportPrefix(area) {
  return area.toUpperCase().replace(/-/g, "_")
}

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".txt")).sort()

const byArea = {}
for (const a of LEGAL_AREA_ORDER) byArea[a] = []

let processed = 0
let skippedShort = 0
const BATCH = 100
let batchNum = 0
let filesInBatch = 0
let casesInBatch = 0

for (let i = 0; i < files.length; i++) {
  const fn = files[i]
  const fullPath = path.join(srcDir, fn)
  const raw = fs.readFileSync(fullPath, "utf8")
  processed++
  filesInBatch++

  if (raw.trim().length < 100) {
    skippedShort++
  } else {

  const baseName = fn.replace(/\.txt$/i, "")
  const dbid = dbIdFromFilename(baseName)
  if (!dbid) {
    skippedShort++
  } else {

  const legal_area = legalAreaFromFilename(baseName)
  const case_number = extractCaseNumber(raw, baseName)
  let decision_date = parseDecisionDate(raw)
  if (!decision_date) decision_date = "2025-01-01"

  const { body, izreka } = splitBodyIzreka(raw)
  const legal_question = extractLegalQuestion({ body, izreka })
  const court_position = courtPositionFrom(raw)
  const headnote = collapse(court_position).slice(0, 280)
  const related_articles = extractRelatedArticles(raw)
  const outcome = inferOutcome(raw, legal_area)
  const prefix = case_number.split(/[\s./]/)[0] || legal_area

  const entry = {
    jurisdiction: "montenegro",
    court: "Osnovni sud u Baru",
    court_level: "basic",
    case_number,
    decision_date,
    legal_area,
    legal_question,
    court_position,
    reasoning: `Osnovni sud u Baru odlučuje u predmetu ${case_number}, primjenjujući mjerodavno materijalno i procesno pravo Crne Gore.`,
    keywords: [legal_area, "Osnovni sud u Baru", prefix.replace(/\.$/, "")],
    ...(related_articles ? { related_articles } : {}),
    headnote,
    ...(outcome ? { outcome } : {}),
    source_url: `https://sudovi.me/vrhs/odluka/${dbid}`,
  }

  byArea[legal_area].push(entry)
  casesInBatch++
  }
  }

  if (filesInBatch >= BATCH || i === files.length - 1) {
    batchNum++
    console.log(`✓ Batch ${batchNum} complete: ${casesInBatch} cases`)
    filesInBatch = 0
    casesInBatch = 0
  }
}

/** Write chunked files per legal area */
let totalCases = 0

for (const area of LEGAL_AREA_ORDER) {
  const arr = byArea[area]
  if (!arr.length) continue

  const chunkSize = 200
  const prefix = areaToExportPrefix(area)
  for (let c = 0, part = 1; c < arr.length; c += chunkSize, part++) {
    const chunk = arr.slice(c, c + chunkSize)
    totalCases += chunk.length
    const exportName = `CASE_LAW_${prefix}_MONTENEGRO_OSNOVNI_BAR_${part}`
    const fileStem = `case-law-${area}-montenegro-osnovni-bar-${part}`
    const filePath = path.join(scriptsDir, `${fileStem}.ts`)

    const body = `// scripts/${fileStem}.ts
// Osnovni sud u Baru — ${area} (${chunk.length} cases, file ${part})
// Generated by scripts/gen-case-law-osnovni-bar.mjs

import type { CaseLawInput } from "./ingest-case-law"

export const ${exportName}: CaseLawInput[] = ${formatCasesArray(chunk)}
`
    fs.writeFileSync(filePath, body, "utf8")
  }
}

console.log("")
console.log(`Total cases extracted: ${totalCases}`)
console.log(`Total files processed: ${processed} (skipped short/invalid: ${skippedShort})`)
