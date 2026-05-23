/**
 * Process all Montenegro Vrhovni sud decisions from downloads/montenegro/vrhovni/
 * Run: node scripts/run-montenegro-vrhovni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  writeCaseLawFile,
} from "./_gen-montenegro-vrhovni-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "montenegro", "vrhovni")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200

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

  console.log(`✓ Batch [${batchNum}] complete: ${batchCount} cases`)
}

const generated = []

for (const [area, cases] of Object.entries(byArea).sort()) {
  const chunks = []
  for (let i = 0; i < cases.length; i += MAX_PER_FILE) {
    chunks.push(cases.slice(i, i + MAX_PER_FILE))
  }
  chunks.forEach((chunk, idx) => {
    const n = idx + 1
    const tsFile = `case-law-${area}-montenegro-${n}.ts`
    const exportName = `CASE_LAW_${area.toUpperCase()}_MONTENEGRO_${n}`
    const outPath = path.join(SCRIPTS_DIR, tsFile)
    writeCaseLawFile(
      outPath,
      exportName,
      chunk,
      `Montenegro Vrhovni sud — ${area} (${chunk.length} cases, file ${n}/${chunks.length})`,
    )
    generated.push({ tsFile, exportName, area, count: chunk.length })
    console.log(`  → ${tsFile}: ${chunk.length} cases`)
  })
}

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

  const anchorImport = "import {APPEND_MONTENEGRO"
  const anchorSpread = "SPREADAPPEND_MONTENEGRO"

  if (!s.includes("// montenegro-vrhovni")) {
    s = s.replace(
      /(import \{ CASE_LAW_CIVIL_BIH_BRCKO_19 \}[^\n]+\n)/,
      `$1// montenegro-vrhovni\n${anchorImport}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_CIVIL_BIH_BRCKO_19,\n)/,
      `$1// montenegro-vrhovni\n${anchorSpread}\n`,
    )
  }

  s = s.replace(anchorImport, imports)
  s = s.replace(anchorSpread, spreads)

  fs.writeFileSync(indexPath, s, "utf8")
}
