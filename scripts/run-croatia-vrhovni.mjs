/**
 * Process all Croatia Vrhovni sud decisions from downloads/croatia/vrhovni/
 * Run: node scripts/run-croatia-vrhovni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import {
  extractCaseFromFile,
  fileNamesForArea,
  writeCaseLawFile,
} from "./_gen-croatia-vrhovni-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const INPUT_DIR = path.join(ROOT, "downloads", "croatia", "vrhovni")
const SCRIPTS_DIR = path.join(ROOT, "scripts")
const BATCH_SIZE = 50
const MAX_PER_FILE = 200

const files = fs
  .readdirSync(INPUT_DIR)
  .filter((f) => f.endsWith(".txt"))
  .sort((a, b) => a.localeCompare(b, "hr"))

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
      `Croatia Vrhovni sud — ${area} (${chunk.length} cases, file ${idx + 1}/${chunks.length})`,
    )
    generated.push({ tsFile, exportName, area, count: chunk.length })
    console.log(`  → ${tsFile}: ${chunk.length} cases`)
  })
}

updateIndex(generated)

console.log(
  `\nTotal cases extracted: ${totalExtracted} | Total files processed: ${files.length}`,
)

function updateIndex(results) {
  const indexPath = path.join(SCRIPTS_DIR, "case-law-index.ts")
  let s = fs.readFileSync(indexPath, "utf8")

  for (const r of results) {
    s = s.replace(new RegExp(`import \\{ ${r.exportName} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${r.exportName},\\n`, "g"), "")
  }

  const imports = results
    .map(
      (r) =>
        `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`,
    )
    .join("\n")
  const spreads = results.map((r) => `  ...${r.exportName},`).join("\n")

  const anchorImport = "// croatia-vrhovni"
  const anchorSpread = "// croatia-vrhovni"
  const importBlock = `${anchorImport}\n${imports}\n`
  const spreadBlock = `${anchorSpread}\n${spreads}\n`

  if (s.includes(`${anchorImport}\nimport { CASE_LAW_CIVIL_CROATIA_1`)) {
    s = s.replace(
      /\/\/ croatia-vrhovni\n(?:import \{ CASE_LAW_CIVIL_CROATIA[^\n]+\n)+/,
      importBlock,
    )
    s = s.replace(
      /\/\/ croatia-vrhovni\n(?:\s+\.\.\.CASE_LAW_CIVIL_CROATIA[^\n]+\n|\s+\.\.\.CASE_LAW_CRIMINAL_CROATIA_VRHOVNI[^\n]+\n)+/,
      spreadBlock,
    )
  } else {
    s = s.replace(
      /(import \{ CASE_LAW_CIVIL_BIH_BRCKO_19 \}[^\n]+\n)/,
      `$1${importBlock}`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_CIVIL_BIH_BRCKO_19,\n)/,
      `$1${spreadBlock}`,
    )
  }

  fs.writeFileSync(indexPath, s, "utf8")
}
