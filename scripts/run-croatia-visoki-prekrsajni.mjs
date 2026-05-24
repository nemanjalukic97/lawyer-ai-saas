/**
 * Process all Croatia Visoki prekršajni sud decisions.
 * Run: node scripts/run-croatia-visoki-prekrsajni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-croatia-visoki-prekrsajni-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "croatia", "visoki-prekrsajni")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "hr"))

const allCases = []
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
  }

  console.log(`✓ Batch [${batchNum}] complete: ${batchCount} cases`)
}

const chunks = []
for (let i = 0; i < allCases.length; i += MAX_PER_FILE) {
  chunks.push(allCases.slice(i, i + MAX_PER_FILE))
}

const generated = []

chunks.forEach((chunk, idx) => {
  const n = idx + 1
  const tsFile = `case-law-procedural-croatia-${n}.ts`
  const exportName = `CASE_LAW_PROCEDURAL_CROATIA_${n}`
  const outPath = path.join(SCRIPTS_DIR, tsFile)
  writeCaseLawFile(
    outPath,
    exportName,
    chunk,
    `Croatia Visoki prekršajni sud — procedural (${chunk.length} cases, file ${n}/${chunks.length})`,
  )
  generated.push({ tsFile, exportName, count: chunk.length })
  console.log(`  → ${tsFile}: ${chunk.length} cases`)
})

updateIndex(generated)

console.log(`\nTotal cases extracted: ${allCases.length} | Total files processed: ${files.length}`)

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

  const anchorImport = "// croatia-visoki-prekrsajni-imports"
  const anchorSpread = "// croatia-visoki-prekrsajni-spreads"

  if (!s.includes(anchorImport)) {
    s = s.replace(
      /(import \{ CASE_LAW_COMMERCIAL_MONTENEGRO_11 \}[^\n]+\n)/,
      `$1${anchorImport}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_COMMERCIAL_MONTENEGRO_11,\n)/,
      `$1${anchorSpread}\n`,
    )
  }

  s = s.replace(anchorImport, imports)
  s = s.replace(anchorSpread, spreads)

  fs.writeFileSync(indexPath, s, "utf8")
}
