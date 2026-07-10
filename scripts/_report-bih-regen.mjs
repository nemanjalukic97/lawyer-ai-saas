/**
 * Post-regen report: BiH case counts, legal_area distribution, spacing spot-check, dedup, index wiring.
 * Run: node scripts/_report-bih-regen.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const SCRIPTS = path.join(ROOT, "scripts")

const JURISDICTIONS = ["bih_fbih", "bih_rs", "bih_brcko"]

const BAD_SPACING =
  /BosneiHercegovine|dase\b|kojise\b|suduna\b|ODBIJAkao|Zakonaop[a-zčćžšđ]|PRESUDUODBIJA|nijeuskladusa/gi
const GOOD_SPACING =
  /Bosne i Hercegovine|da se|koji se|suda na|Zakona o postupku|Odbija se/gi

function listBihTsFiles() {
  return fs
    .readdirSync(SCRIPTS)
    .filter((f) => f.startsWith("case-law-") && f.includes("-bih-") && f.endsWith(".ts"))
}

function parseCasesFromFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8")
  const blocks = text.split(/\n  \{/g).length - 1
  const jurisdiction = text.match(/jurisdiction:\s*"([^"]+)"/)?.[1]
  const areas = [...text.matchAll(/legal_area:\s*"([^"]+)"/g)].map((m) => m[1])
  return { blocks, jurisdiction, areas, text }
}

const files = listBihTsFiles()
const byJurisdiction = new Map()
const byArea = new Map()
let total = 0
let badHits = 0
let goodHits = 0
const dedupKeys = new Map()

for (const f of files) {
  const { blocks, jurisdiction, areas, text } = parseCasesFromFile(path.join(SCRIPTS, f))
  total += blocks
  if (jurisdiction) {
    byJurisdiction.set(jurisdiction, (byJurisdiction.get(jurisdiction) ?? 0) + blocks)
  }
  for (const a of areas) {
    byArea.set(a, (byArea.get(a) ?? 0) + 1)
  }
  badHits += text.match(BAD_SPACING)?.length ?? 0
  goodHits += text.match(GOOD_SPACING)?.length ?? 0

  const courtRe = /court:\s*"([^"]+)"/g
  const caseRe = /case_number:\s*"([^"]+)"/g
  const dateRe = /decision_date:\s*"([^"]+)"/g
  const courts = [...text.matchAll(courtRe)].map((m) => m[1])
  const cases = [...text.matchAll(caseRe)].map((m) => m[1])
  const dates = [...text.matchAll(dateRe)].map((m) => m[1])
  for (let i = 0; i < cases.length; i++) {
    const j = jurisdiction ?? "?"
    const key = `${j}|${courts[i] ?? ""}|${cases[i]}|${dates[i] ?? ""}`
    if (!dedupKeys.has(key)) dedupKeys.set(key, [])
    dedupKeys.get(key).push(f)
  }
}

const dupes = [...dedupKeys.entries()].filter(([, files]) => files.length > 1)

console.log(`BiH TS files: ${files.length}`)
console.log(`Total case blocks: ${total}`)
console.log("\nPer jurisdiction:")
for (const j of JURISDICTIONS) {
  console.log(`  ${j}: ${byJurisdiction.get(j) ?? 0}`)
}
console.log("\nPer legal_area:")
for (const [a, c] of [...byArea.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${a}: ${c}`)
}
console.log(`\nLabor rows: ${byArea.get("labor") ?? 0}`)
console.log(`\nSpacing spot-check (regex hits in generated text):`)
console.log(`  bad patterns: ${badHits}`)
console.log(`  good patterns: ${goodHits}`)
console.log(`\nDedup by jurisdiction|court|case_number|decision_date: ${dupes.length} duplicate keys`)

const indexPath = path.join(SCRIPTS, "case-law-index.ts")
const indexText = fs.readFileSync(indexPath, "utf8")
const exportNames = files.map((f) => {
  const m = fs.readFileSync(path.join(SCRIPTS, f), "utf8").match(/export const ([A-Z_0-9]+)/)
  return m?.[1]
}).filter(Boolean)

const missingSpread = exportNames.filter(
  (en) => !new RegExp(`^[ \\t]*\\.\\.\\.${en},`, "m").test(indexText),
)
const missingImport = exportNames.filter(
  (en) => !indexText.includes(`import { ${en} }`),
)

console.log(`\nIndex wiring:`)
console.log(`  exports missing import: ${missingImport.length}`)
console.log(`  exports missing ALL_CASE_LAW spread: ${missingSpread.length}`)
if (missingSpread.length) {
  console.log(`  examples: ${missingSpread.slice(0, 10).join(", ")}`)
}
