/**
 * Process all Croatia Visoki kazneni sud decisions from downloads/croatia/visoki-kazneni/
 * Run: node scripts/run-croatia-visoki-kazneni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-croatia-vks-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "croatia", "visoki-kazneni")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "hr"))

const allCases = []
const seenNorm = new Set()
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
    if (seenNorm.has(c._norm)) continue
    seenNorm.add(c._norm)
    const { _norm, ...entry } = c
    allCases.push(entry)
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
  const n = idx + 1
  const tsFile = `case-law-criminal-croatia-${n}.ts`
  const exportName = `CASE_LAW_CRIMINAL_CROATIA_${n}`
  const outPath = path.join(SCRIPTS_DIR, tsFile)
  writeCaseLawFile(
    outPath,
    exportName,
    chunk,
    `Croatia Visoki kazneni sud — criminal (${chunk.length} cases, file ${n}/${chunks.length})`,
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

  const importBlock = `// croatia-vks\n${imports}\n`
  const spreadBlock = `// croatia-vks\n${spreads}\n`

  if (s.includes("// croatia-vks\nimport { CASE_LAW_CRIMINAL_CROATIA_1 }")) {
    s = s.replace(/\/\/ croatia-vks\n(?:import \{ CASE_LAW_CRIMINAL_CROATIA_\d+ \}[^\n]+\n)+/, importBlock)
    s = s.replace(
      /\/\/ croatia-vks\n(?:\s+\.\.\.CASE_LAW_CRIMINAL_CROATIA_\d+,\n)+/,
      spreadBlock,
    )
  } else if (s.includes("// croatia-vks")) {
    s = s.replace(/\/\/ croatia-vks\n/, importBlock)
    s = s.replace(/\/\/ croatia-vks\n/, spreadBlock)
  } else {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_MONTENEGRO_1 \}[^\n]+\n)/,
      `$1${importBlock}`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_CRIMINAL_MONTENEGRO_1,\n)/,
      `$1${spreadBlock}`,
    )
  }

  fs.writeFileSync(indexPath, s, "utf8")
}
