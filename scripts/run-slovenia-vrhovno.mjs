/**
 * Process all Slovenia Vrhovno sodišče decisions from downloads/slovenia/vrhovno/
 * Run: node scripts/run-slovenia-vrhovno.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import {
  extractCaseFromFile,
  fileNamesForArea,
  writeCaseLawFile,
} from "./_gen-slovenia-vrhovno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "slovenia", "vrhovno")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 100
const MAX_PER_FILE = 200

const LEGAL_AREA_ORDER = [
  "administrative",
  "civil",
  "commercial",
  "criminal",
  "labor",
  "procedural",
]

/** Remove prior vrhovno output shards (not visja/uprs/vdss). */
for (const f of fs.readdirSync(SCRIPTS_DIR)) {
  if (
    /^case-law-(?:administrative|civil|commercial|criminal|labor|procedural)-slovenia-\d+\.ts$/.test(
      f,
    )
  ) {
    fs.unlinkSync(path.join(SCRIPTS_DIR, f))
  }
}

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "sl"))

const byArea = Object.fromEntries(LEGAL_AREA_ORDER.map((a) => [a, []]))
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

for (const area of LEGAL_AREA_ORDER) {
  const cases = byArea[area]
  if (!cases?.length) continue

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
      `Slovenia Vrhovno sodišče — ${area} (${chunk.length} cases, file ${idx + 1}/${chunks.length})`,
    )
    console.log(`  → ${tsFile}: ${chunk.length} cases`)
  })
}

execSync("node scripts/rebuild-case-law-index.mjs", { cwd: ROOT, stdio: "inherit" })

console.log(
  `\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`,
)
