/**
 * Process BiH Brčko Distrikt Suđenje u razumnom roku categories
 * from downloads/bih-brcko/sudjenje-u-razumnom-roku/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import {
  createBrckoSudjenjeGenerator,
  safePdfStem,
} from "./_gen-bih-brcko-sudjenje-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const SUDJENJE = path.join(ROOT, "downloads", "bih-brcko", "sudjenje-u-razumnom-roku")

const CATEGORIES = [
  {
    n: 1,
    folder: "zahtjev-za-zastitu-prava-na-sudjenje-u-razumnom-roku",
    tsFile: "case-law-procedural-bih-brcko-1.ts",
    exportName: "CASE_LAW_PROCEDURAL_BIH_BRCKO_1",
    legal_area: "procedural",
    title: "zahtjev za zaštitu prava na suđenje u razumnom roku",
    label: "suđenje u razumnom roku",
    defaultQ:
      "Da li je osnovan zahtjev za zaštitu prava na suđenje u razumnom roku pred Apelacionim sudom Brčko Distrikta BiH?",
  },
]

function listPdfs(dir) {
  const out = []
  function walk(d) {
    if (!fs.existsSync(d)) return
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.toLowerCase().endsWith(".pdf")) out.push(p)
    }
  }
  walk(dir)
  return out.sort((a, b) => path.basename(a).localeCompare(path.basename(b), "sr"))
}

async function extractPdf(pdfPath, outPath) {
  if (!fs.existsSync(pdfPath)) return { ok: false, chars: 0, error: "missing" }
  try {
    const buf = fs.readFileSync(pdfPath)
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), disableWorker: true }).promise
    let full = ""
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const tc = await page.getTextContent()
      full += tc.items.map((x) => x.str).join(" ") + "\n"
    }
    fs.writeFileSync(outPath, full, "utf8")
    return { ok: true, chars: full.length }
  } catch (e) {
    return { ok: false, chars: 0, error: String(e.message || e) }
  }
}

function dedupeSkipSet(txtFiles, normCase) {
  const skip = new Set()
  const seen = new Set()
  for (const f of [...txtFiles].sort()) {
    const stem = normCase(f)
    if (seen.has(stem)) skip.add(f)
    else seen.add(stem)
  }
  return skip
}

async function processCategory(cat) {
  const folderPath = path.join(SUDJENJE, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-brcko-sudjenje", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createBrckoSudjenjeGenerator(cat)
  const fallbackStems = []
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const result = await extractPdf(pdfPath, outPath)
    if (!result.ok || result.chars < 200) fallbackStems.push(stem)
  }

  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip, fallbackStems)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const relFolder = `downloads/bih-brcko/sudjenje-u-razumnom-roku/${cat.folder}`
  const header = `// scripts/${cat.tsFile}
// BiH Brčko Suđenje u razumnom roku — ${cat.title}.
// Auto-generated from ${relFolder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

import type { CaseLawInput } from "./ingest-case-law"

export const ${cat.exportName}: CaseLawInput[] = [
`
  fs.writeFileSync(tsPath, header + blocks.join(",\n") + "\n]\n", "utf8")
  console.log(`✓ Category ${cat.n} complete: ${blocks.length} cases from ${pdfs.length} PDFs`)
  return { ...cat, cases: blocks.length, pdfs: pdfs.length, skipped: false }
}

function updateIndex(results) {
  const indexPath = path.join(ROOT, "scripts", "case-law-index.ts")
  let s = fs.readFileSync(indexPath, "utf8")

  for (const cat of CATEGORIES) {
    const en = cat.exportName
    s = s.replace(new RegExp(`import \\{ ${en} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${en},\\n`, "g"), "")
  }

  const active = results.filter((r) => !r.skipped)
  if (active.length === 0) {
    fs.writeFileSync(indexPath, s, "utf8")
    return
  }

  const newImports = active
    .map((r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`)
    .join("\n")
  const newSpreads = active.map((r) => `  ...${r.exportName},`).join("\n")

  if (s.includes("import { CASE_LAW_CRIMINAL_BIH_BRCKO_21 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_BIH_BRCKO_21 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_CRIMINAL_BIH_BRCKO_21,\n)/, `$1${newSpreads}\n`)
  } else if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_8 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_8 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_8,\n)/, `$1${newSpreads}\n`)
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-brcko-sudjenje.mjs")
  fs.writeFileSync(indexPath, s, "utf8")
}

const results = []
for (const cat of CATEGORIES) {
  results.push(await processCategory(cat))
}

updateIndex(results)

console.log("\n| Category | Folder | legal_area | Cases | PDFs |")
console.log("|---|---|---|---:|---:|")
let tC = 0
let tP = 0
for (const r of results) {
  if (r.skipped) continue
  console.log(`| ${r.n} | ${r.folder} | ${r.legal_area} | ${r.cases} | ${r.pdfs} |`)
  tC += r.cases
  tP += r.pdfs
}
console.log(`| TOTAL | | | ${tC} | ${tP} |`)
