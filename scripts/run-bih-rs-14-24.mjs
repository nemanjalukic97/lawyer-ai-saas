/**
 * Process BiH RS criminal case law categories 14–24 from downloads/bih-rs/krivicno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import { createCategoryGenerator } from "./_gen-bih-rs-category-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const KRIVICNO = path.join(ROOT, "downloads", "bih-rs", "krivicno")

const CATEGORIES = [
  {
    n: 14,
    folder: "krivicna-djela-protiv-slobode-i-prava-gradjana",
    title: "krivična djela protiv slobode i prava građana",
    label: "sloboda građana",
    artMin: 130,
    artMax: 175,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv slobode i prava građana pred Vrhovnim sudom RS?",
  },
  {
    n: 15,
    folder: "krivicna-djela-protiv-opste-sigurnosti-ljudi-i-imovine",
    title: "krivična djela protiv opšte sigurnosti ljudi i imovine",
    label: "opšta sigurnost",
    artMin: 195,
    artMax: 215,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv opšte sigurnosti ljudi i imovine pred Vrhovnim sudom RS?",
  },
  {
    n: 16,
    folder: "krivicna-djela-protiv-zivotne-sredine",
    title: "krivična djela protiv životne sredine",
    label: "životna sredina",
    artMin: 240,
    artMax: 260,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv životne sredine pred Vrhovnim sudom RS?",
  },
  {
    n: 17,
    folder: "krivicna-djela-protiv-bezbjednosti-racunarskih-podataka",
    title: "krivična djela protiv bezbjednosti računarskih podataka",
    label: "računarski podaci",
    artMin: 300,
    artMax: 320,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv bezbjednosti računarskih podataka pred Vrhovnim sudom RS?",
  },
  {
    n: 18,
    folder: "krivicna-djela-protiv-bezbjednosti-javnog-saobracaja",
    title: "krivična djela protiv bezbjednosti javnog saobraćaja",
    label: "bezbjednost javnog saobraćaja",
    artMin: 296,
    artMax: 315,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv bezbjednosti javnog saobraćaja pred Vrhovnim sudom RS?",
  },
  {
    n: 19,
    folder: "krivicna-djela-protiv-organa-republike-srpske",
    title: "krivična djela protiv organa Republike Srpske",
    label: "organi RS",
    artMin: 355,
    artMax: 375,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv organa Republike Srpske pred Vrhovnim sudom RS?",
  },
  {
    n: 20,
    folder: "krivicna-djela-terorizma",
    title: "krivična djela terorizma",
    label: "terorizam",
    artMin: 200,
    artMax: 210,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela terorizma pred Vrhovnim sudom RS?",
  },
  {
    n: 21,
    folder: "delegacija-mjesne-nadleznosti",
    title: "delegacija mjesne nadležnosti",
    label: "mjesna nadležnost",
    artMin: 300,
    artMax: 360,
    defaultQ:
      "Da li je osnovana žalba ili odluka po pitanju delegacije mjesne nadležnosti u krivičnom postupku pred Vrhovnim sudom RS?",
  },
  {
    n: 22,
    folder: "prekrsajno-pravo",
    title: "prekršajno pravo",
    label: "prekršaj",
    artMin: 1,
    artMax: 400,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu iz oblasti prekršajnog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 23,
    folder: "krivicna-djela-protiv-pravosudja",
    title: "krivična djela protiv pravosuđa",
    label: "pravosuđe",
    artMin: 374,
    artMax: 400,
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv pravosuđa pred Vrhovnim sudom RS?",
  },
  {
    n: 24,
    folder: "odluke-po-apelacijama",
    title: "odluke po apelacijama",
    label: "apelacija",
    artMin: 300,
    artMax: 360,
    defaultQ:
      "Da li je osnovana apelacija ili drugi pravni lijek u krivičnom postupku pred Vrhovnim sudom RS?",
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
  const folderPath = path.join(KRIVICNO, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    return { n: cat.n, folder: cat.folder, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { n: cat.n, folder: cat.folder, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-rs-downloads", `rs-${cat.n}`)
  fs.mkdirSync(extractDir, { recursive: true })

  for (const pdfPath of pdfs) {
    const base = path.basename(pdfPath, ".pdf").replace(/[^\w\s\-().]/g, "_")
    const outPath = path.join(extractDir, `${base}.txt`)
    await extractPdf(pdfPath, outPath)
  }

  const gen = createCategoryGenerator(cat)
  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip)

  const tsPath = path.join(ROOT, "scripts", `case-law-criminal-bih-rs-${cat.n}.ts`)
  const header = `// scripts/case-law-criminal-bih-rs-${cat.n}.ts
// BiH RS — ${cat.title}.
// Auto-generated from downloads/bih-rs/krivicno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_${cat.n}: CaseLawInput[] = [
`
  fs.writeFileSync(tsPath, header + blocks.join(",\n") + "\n]\n", "utf8")
  console.log(`✓ Category ${cat.n} complete: ${blocks.length} cases from ${pdfs.length} PDFs`)
  return { n: cat.n, folder: cat.folder, cases: blocks.length, pdfs: pdfs.length, skipped: false }
}

function updateIndex(results) {
  const indexPath = path.join(ROOT, "scripts", "case-law-index.ts")
  let s = fs.readFileSync(indexPath, "utf8")
  const active = results.filter((r) => !r.skipped && r.cases > 0).map((r) => r.n).sort((a, b) => a - b)
  s = s.replace(/import \{ CASE_LAW_CRIMINAL_BIH_RS_(1[4-9]|2[0-4]) \}[^\n]+\n/g, "")
  s = s.replace(/\s+\.\.\.CASE_LAW_CRIMINAL_BIH_RS_(1[4-9]|2[0-4]),\n/g, "")
  if (active.length === 0) {
    fs.writeFileSync(indexPath, s, "utf8")
    return
  }
  const newImports = active.map((n) => `import { CASE_LAW_CRIMINAL_BIH_RS_${n} } from "./case-law-criminal-bih-rs-${n}"`).join("\n") + "\n"
  const newSpreads = active.map((n) => `  ...CASE_LAW_CRIMINAL_BIH_RS_${n},`).join("\n") + "\n"
  s = s.replace(/(import \{ CASE_LAW_CRIMINAL_BIH_RS_13 \}[^\n]+\n)/, `$1${newImports}`)
  s = s.replace(/(\s+\.\.\.CASE_LAW_CRIMINAL_BIH_RS_13,\n)/, `$1${newSpreads}`)
  fs.writeFileSync(indexPath, s, "utf8")
}

const results = []
for (const cat of CATEGORIES) {
  results.push(await processCategory(cat))
}

updateIndex(results)

console.log("\n| Category | Folder | Cases | PDFs |")
console.log("|---|---|---:|---:|")
let tC = 0
let tP = 0
for (const r of results) {
  if (r.skipped) continue
  const short = r.folder.length > 40 ? r.folder.slice(0, 37) + "..." : r.folder
  console.log(`| ${r.n} | ${short} | ${r.cases} | ${r.pdfs} |`)
  tC += r.cases
  tP += r.pdfs
}
console.log(`| **TOTAL** | | **${tC}** | **${tP}** |`)
