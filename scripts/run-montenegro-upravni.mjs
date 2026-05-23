/**
 * Process all Montenegro Upravni sud decisions from downloads/montenegro/upravni/
 * Run: node scripts/run-montenegro-upravni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-montenegro-upravni-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "montenegro", "upravni")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200
/** Existing case-law-administrative-montenegro-1..2 hold Vrhovni sud; Upravni starts at 3. */
const FILE_NUM_OFFSET = 2

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "sr"))

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

const generated = []
const chunks = []
for (let i = 0; i < allCases.length; i += MAX_PER_FILE) {
  chunks.push(allCases.slice(i, i + MAX_PER_FILE))
}

chunks.forEach((chunk, idx) => {
  const n = idx + 1 + FILE_NUM_OFFSET
  const tsFile = `case-law-administrative-montenegro-${n}.ts`
  const exportName = `CASE_LAW_ADMINISTRATIVE_MONTENEGRO_${n}`
  const outPath = path.join(SCRIPTS_DIR, tsFile)
  writeCaseLawFile(
    outPath,
    exportName,
    chunk,
    `Montenegro Upravni sud — administrative (${chunk.length} cases, file ${idx + 1}/${chunks.length})`,
  )
  generated.push({ tsFile, exportName, count: chunk.length })
  console.log(`  → ${tsFile}: ${chunk.length} cases`)
})

updateIndex(generated)

console.log(`\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`)

function updateIndex(results) {
  const indexPath = path.join(SCRIPTS_DIR, "case-law-index.ts")
  let s = fs.readFileSync(indexPath, "utf8")

  for (const r of results) {
    s = s.replace(new RegExp(`import \\{ ${r.exportName} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${r.exportName},\\n`, "g"), "")
  }

  const imports = results
    .map((r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`)
    .join("\n")
  const spreads = results.map((r) => `  ...${r.exportName},`).join("\n")

  const anchorImport = "import {APPEND_MONTENEGRO_UPRAVNI"
  const anchorSpread = "SPREADAPPEND_MONTENEGRO_UPRAVNI"

  if (!s.includes("// montenegro-upravni")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_MONTENEGRO_2 \}[^\n]+\n)/,
      `$1// montenegro-upravni\n${anchorImport}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_MONTENEGRO_2,\n)/,
      `$1// montenegro-upravni\n${anchorSpread}\n`,
    )
  }

  s = s.replace(anchorImport, imports)
  s = s.replace(anchorSpread, spreads)

  fs.writeFileSync(indexPath, s, "utf8")
}
