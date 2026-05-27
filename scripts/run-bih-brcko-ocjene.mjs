/**
 * Process all 5 BiH Brčko Ocjene usklađenosti categories.
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { openPdfFromFileBuffer } from "./_pdf-get-document.mjs"
import { createBrckoOcjeneGenerator, safePdfStem } from "./_gen-bih-brcko-ocjene-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const OCJENE = path.join(ROOT, "downloads", "bih-brcko", "ocjene-uskladjenosti")

const CATEGORIES = [
  {
    n: 1,
    folder: "ocjena-statutarnosti-akata",
    tsFile: "case-law-constitutional-bih-brcko-1.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_BIH_BRCKO_1",
    legal_area: "constitutional",
    reviewKind: "statutarnost",
    title: "ocjena statutarnosti akata",
    label: "statutarnost akata",
    defaultQ:
      "Da li je inicijativa za ocjenu statutarnosti pravnog akta Brčko distrikta BiH osnovana pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 2,
    folder: "ocjena-uskladjenosti-akata",
    tsFile: "case-law-constitutional-bih-brcko-2.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_BIH_BRCKO_2",
    legal_area: "constitutional",
    reviewKind: "usklađenost",
    title: "ocjena usklađenosti akata",
    label: "usklađenost akata",
    defaultQ:
      "Da li je inicijativa za ocjenu usklađenosti pravnog akta Brčko distrikta BiH osnovana pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 3,
    folder: "ocjena-zakonitosti-akata",
    tsFile: "case-law-constitutional-bih-brcko-3.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_BIH_BRCKO_3",
    legal_area: "constitutional",
    reviewKind: "zakonitost",
    title: "ocjena zakonitosti akata",
    label: "zakonitost akata",
    defaultQ:
      "Da li je inicijativa za ocjenu zakonitosti pravnog akta Brčko distrikta BiH osnovana pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 4,
    folder: "pravna-shvatanja",
    tsFile: "case-law-constitutional-bih-brcko-4.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_BIH_BRCKO_4",
    legal_area: "constitutional",
    reviewKind: "pravna_shvatanja",
    title: "pravna shvatanja (ocjene usklađenosti)",
    label: "pravna shvatanja",
    defaultQ:
      "Koje pravno shvatanje je zauzeo Apelacioni sud Brčko Distrikta BiH u postupku ocjene usklađenosti pravnih akata?",
  },
  {
    n: 5,
    folder: "sukob-nadleznosti",
    tsFile: "case-law-constitutional-bih-brcko-5.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_BIH_BRCKO_5",
    legal_area: "constitutional",
    reviewKind: "sukob",
    title: "rješavanje sukoba nadležnosti",
    label: "sukob nadležnosti",
    defaultQ:
      "Kako je Apelacioni sud Brčko Distrikta BiH riješio sukob nadležnosti između organa Brčko distrikta BiH?",
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
    const doc = await openPdfFromFileBuffer(buf)
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

async function processCategoryFromExtract(cat) {
  const folderPath = path.join(OCJENE, cat.folder)
  const pdfs = listPdfs(folderPath)
  const extractDir = path.join(ROOT, "tmp-bih-brcko-ocjene", `cat-${cat.n}`)

  const gen = createBrckoOcjeneGenerator(cat)
  const fallbackStems = []
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const chars = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8").length : 0
    if (chars < 200) fallbackStems.push(stem)
  }

  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skipByFile = new Set()
  const seenCn = new Set()
  for (const f of [...txtFiles].sort()) {
    const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
    const cn = gen.caseNumberFromText(raw, gen.normCase(f))
    if (seenCn.has(cn)) skipByFile.add(f)
    else seenCn.add(cn)
  }

  // Enrich scanned PDFs: copy longest extract per case_number across folder
  const byCase = new Map()
  for (const f of txtFiles) {
    const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
    const cn = gen.caseNumberFromText(raw, gen.normCase(f))
    const prev = byCase.get(cn)
    if (!prev || raw.length > prev.len) byCase.set(cn, { f, raw, len: raw.length })
  }
  for (const { f, raw } of byCase.values()) {
    if (raw.length >= 200) fs.writeFileSync(path.join(extractDir, f), raw, "utf8")
  }

  const { blocks } = gen.generateBlocks(extractDir, skipByFile, fallbackStems)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH Brčko — ${cat.title}.
// Auto-generated from downloads/bih-brcko/ocjene-uskladjenosti/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21,\n)/, `$1${newSpreads}\n`)
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  fs.writeFileSync(indexPath, s, "utf8")
}

/** After all PDFs are extracted, copy richest text per case_number across categories. */
function enrichExtractsFromGlobal() {
  const globalByCase = new Map()
  for (const cat of CATEGORIES) {
    const extractDir = path.join(ROOT, "tmp-bih-brcko-ocjene", `cat-${cat.n}`)
    if (!fs.existsSync(extractDir)) continue
    const gen = createBrckoOcjeneGenerator(cat)
    for (const f of fs.readdirSync(extractDir).filter((x) => x.endsWith(".txt"))) {
      const raw = fs.readFileSync(path.join(extractDir, f), "utf8")
      const cn = gen.caseNumberFromText(raw, gen.normCase(f))
      const prev = globalByCase.get(cn)
      if (!prev || raw.length > prev.len) globalByCase.set(cn, { raw, len: raw.length })
    }
  }
  for (const cat of CATEGORIES) {
    const extractDir = path.join(ROOT, "tmp-bih-brcko-ocjene", `cat-${cat.n}`)
    if (!fs.existsSync(extractDir)) continue
    const gen = createBrckoOcjeneGenerator(cat)
    for (const f of fs.readdirSync(extractDir).filter((x) => x.endsWith(".txt"))) {
      const p = path.join(extractDir, f)
      const raw = fs.readFileSync(p, "utf8")
      const cn = gen.caseNumberFromText(raw, gen.normCase(f))
      const best = globalByCase.get(cn)
      if (best && best.len >= 200 && raw.length < 200) fs.writeFileSync(p, best.raw, "utf8")
    }
  }
}

const results = new Array(CATEGORIES.length)

for (let i = 0; i < CATEGORIES.length; i++) {
  const cat = CATEGORIES[i]
  const folderPath = path.join(OCJENE, cat.folder)
  if (!fs.existsSync(folderPath) || listPdfs(folderPath).length === 0) {
    if (!fs.existsSync(folderPath)) {
      console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    } else {
      console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    }
    results[i] = { ...cat, cases: 0, pdfs: 0, skipped: true }
    continue
  }
  const extractDir = path.join(ROOT, "tmp-bih-brcko-ocjene", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })
  const pdfs = listPdfs(folderPath)
  let done = 0
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const outPath = path.join(extractDir, `${base}.txt`)
    await extractPdf(pdfPath, outPath)
    done++
    if (done % 25 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }
}

enrichExtractsFromGlobal()

for (let i = 0; i < CATEGORIES.length; i++) {
  if (results[i]?.skipped) continue
  results[i] = await processCategoryFromExtract(CATEGORIES[i])
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
