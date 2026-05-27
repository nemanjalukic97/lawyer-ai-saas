/**
 * Process Montenegro Viši sud u Podgorici decisions from downloads/montenegro/visi-podgorica/
 * Run: node scripts/run-montenegro-visi-podgorica.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-montenegro-visi-podgorica-lib.mjs"
import { spawnSync } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "montenegro", "visi-podgorica")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 100
const MAX_PER_FILE = 200

function removeOldOutputs() {
  const names = fs.readdirSync(SCRIPTS_DIR)
  for (const f of names) {
    if (/^case-law-[a-z]+-montenegro-visi-podgorica-\d+\.ts$/.test(f)) {
      fs.unlinkSync(path.join(SCRIPTS_DIR, f))
    }
  }
}

removeOldOutputs()

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "sr"))

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

  // eslint-disable-next-line no-console
  console.log(`✓ Batch [${batchNum}] complete: ${batchCount} cases`)
}

const generated = []

for (const [area, cases] of Object.entries(byArea).sort()) {
  const chunks = []
  for (let j = 0; j < cases.length; j += MAX_PER_FILE) {
    chunks.push(cases.slice(j, j + MAX_PER_FILE))
  }
  chunks.forEach((chunk, idx) => {
    const n = idx + 1
    const tsFile = `case-law-${area}-montenegro-visi-podgorica-${n}.ts`
    const exportName = `CASE_LAW_${area.toUpperCase()}_MONTENEGRO_VISI_PODGORICA_${n}`
    const outPath = path.join(SCRIPTS_DIR, tsFile)
    writeCaseLawFile(
      outPath,
      exportName,
      chunk,
      `Montenegro Viši sud u Podgorici — ${area} (${chunk.length} cases, file ${n}/${chunks.length})`,
    )
    generated.push({ tsFile, exportName, area, count: chunk.length })
    // eslint-disable-next-line no-console
    console.log(`  → ${tsFile}: ${chunk.length} cases`)
  })
}

const rebuild = spawnSync(process.execPath, [path.join(SCRIPTS_DIR, "rebuild-case-law-index.mjs")], {
  cwd: ROOT,
  stdio: "inherit",
})
if (rebuild.status !== 0) {
  process.exit(rebuild.status ?? 1)
}

// eslint-disable-next-line no-console
console.log(
  `\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`,
)
