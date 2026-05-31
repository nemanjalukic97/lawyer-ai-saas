/**
 * Process all Slovenia Višja sodišča decisions from downloads/slovenia/visja/
 * Run: node scripts/run-slovenia-visja.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  fileNamesForArea,
  writeCaseLawFile,
} from "./_gen-slovenia-visja-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "slovenia", "visja")
const SCRIPTS_DIR = path.join(__dirname)
const BATCH_SIZE = 100
const MAX_PER_FILE = 200

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "sl"))

const byArea = {}
let totalExtracted = 0
let batchNum = 0

for (let i = 0; i < files.length; i += BATCH_SIZE) {
  batchNum++
  const batch = files.slice(i, i + BATCH_SIZE)
  let batchCount = 0

  for (const fn of batch) {
    const raw = fs.readFileSync(path.join(INPUT_DIR, fn), "utf8")
    const c = extractCaseFromFile(fn, raw)
    if (!c) continue
    if (!byArea[c.legal_area]) byArea[c.legal_area] = []
    byArea[c.legal_area].push(c)
    batchCount++
    totalExtracted++
  }

  console.log(`✓ Batch [${batchNum}] complete: ${batchCount} cases`)
}

const generated = []

for (const [area, cases] of Object.entries(byArea).sort()) {
  const chunks = []
  for (let i = 0; i < cases.length; i += MAX_PER_FILE) {
    chunks.push(cases.slice(i, i + MAX_PER_FILE))
  }
  chunks.forEach((chunk, idx) => {
    const { tsFile, exportName } = fileNamesForArea(area, idx)
    const outPath = path.join(SCRIPTS_DIR, tsFile)
    writeCaseLawFile(
      outPath,
      exportName,
      chunk,
      `Slovenia Višja sodišča — ${area} (${chunk.length} cases, file ${idx + 1}/${chunks.length})`,
    )
    generated.push({ tsFile, exportName, area, count: chunk.length })
    console.log(`  → ${tsFile}: ${chunk.length} cases`)
  })
}

console.log(
  `\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`,
)
console.log(`Generated ${generated.length} TypeScript module(s).`)
