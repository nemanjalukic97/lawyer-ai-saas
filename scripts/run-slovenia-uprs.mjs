/**
 * Process all Slovenia Upravno sodišče decisions from downloads/slovenia/uprs/
 * Run: node scripts/run-slovenia-uprs.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-slovenia-uprs-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "slovenia", "uprs")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "sl"))

const allCases = []
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
    allCases.push(c)
    batchCount++
    totalExtracted++
  }

  console.log(`✓ Batch [${batchNum}] complete: ${batchCount} cases`)
}

const chunks = []
for (let i = 0; i < allCases.length; i += MAX_PER_FILE) {
  chunks.push(allCases.slice(i, i + MAX_PER_FILE))
}

chunks.forEach((chunk, idx) => {
  const n = idx + 1
  const tsFile = `case-law-administrative-slovenia-uprs-${n}.ts`
  const exportName = `CASE_LAW_ADMINISTRATIVE_SLOVENIA_UPRS_${n}`
  const outPath = path.join(SCRIPTS_DIR, tsFile)
  writeCaseLawFile(
    outPath,
    exportName,
    chunk,
    `Slovenia Upravno sodišče — administrative (${chunk.length} cases, file ${idx + 1}/${chunks.length})`,
  )
  console.log(`  → ${tsFile}: ${chunk.length} cases`)
})

execSync("node scripts/rebuild-case-law-index.mjs", { cwd: ROOT, stdio: "inherit" })

console.log(`\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`)
