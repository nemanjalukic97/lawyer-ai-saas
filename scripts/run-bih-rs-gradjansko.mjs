/**
 * Process all 13 BiH RS Građansko odjeljenje categories from downloads/bih-rs/gradjansko/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import { createGradjanskoGenerator } from "./_gen-bih-rs-gradjansko-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const GRADJANSKO = path.join(ROOT, "downloads", "bih-rs", "gradjansko")

const CATEGORIES = [
  {
    n: 1,
    folder: "nasljedno-pravo",
    tsFile: "case-law-inheritance-bih-rs-1.ts",
    exportName: "CASE_LAW_INHERITANCE_BIH_RS_1",
    legal_area: "inheritance",
    title: "nasljedno pravo",
    label: "nasljedno pravo",
    statuteLabel: "Zakon o nasljeđivanju RS",
    statuteTag: "ZN RS",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu nasljednog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 2,
    folder: "obligaciono-pravo",
    tsFile: "case-law-civil-bih-rs-1.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_1",
    legal_area: "civil",
    title: "obligaciono pravo",
    label: "obligaciono pravo",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu obligacionog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 3,
    folder: "odluke-po-apelacijama",
    tsFile: "case-law-civil-bih-rs-odluke-apelacije.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_ODLUKE_APELACIJE",
    legal_area: "civil",
    title: "odluke po apelacijama",
    label: "apelacija",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ:
      "Da li je osnovana apelacija ili drugi pravni lijek u građanskom postupku pred Vrhovnim sudom RS?",
  },
  {
    n: 4,
    folder: "ostalo",
    tsFile: "case-law-civil-bih-rs-ostalo.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_OSTALO",
    legal_area: "civil",
    title: "ostalo (građansko)",
    label: "građansko ostalo",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ: "Da li je osnovan pravni lijek u građanskom predmetu pred Vrhovnim sudom RS?",
  },
  {
    n: 5,
    folder: "porodicno-pravo",
    tsFile: "case-law-family-bih-rs-1.ts",
    exportName: "CASE_LAW_FAMILY_BIH_RS_1",
    legal_area: "family",
    title: "porodično pravo",
    label: "porodično pravo",
    statuteLabel: "Porodični zakon RS",
    statuteTag: "PZ RS",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu porodičnog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 6,
    folder: "pravna-shvatanja",
    tsFile: "case-law-civil-bih-rs-pravna-shvatanja.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_PRAVNA_SHVATANJA",
    legal_area: "civil",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud RS u građanskoj materiji?",
  },
  {
    n: 7,
    folder: "pravo-intelektualne-svojine",
    tsFile: "case-law-civil-bih-rs-intelektualna-svojina.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_INTELEKTUALNA_SVOJINA",
    legal_area: "civil",
    title: "pravo intelektualne svojine",
    label: "intelektualna svojina",
    statuteLabel: "Zakon o autorskom pravu i srodnim pravima",
    statuteTag: "ZAP RS",
    defaultQ:
      "Da li je osnovana revizija u predmetu intelektualne svojine pred Vrhovnim sudom RS?",
  },
  {
    n: 8,
    folder: "pravo-na-sudjenje-u-razumnom-roku",
    tsFile: "case-law-civil-bih-rs-razumni-rok.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_RAZUMNI_ROK",
    legal_area: "procedural",
    title: "pravo na suđenje u razumnom roku",
    label: "razumni rok",
    statuteLabel: "Zakon o parničnom postupku RS",
    statuteTag: "ZPP RS",
    defaultQ:
      "Da li je povrijeđeno pravo na suđenje u razumnom roku u postupku pred sudom RS?",
  },
  {
    n: 9,
    folder: "procesno-pravo",
    tsFile: "case-law-procedural-bih-rs-1.ts",
    exportName: "CASE_LAW_PROCEDURAL_BIH_RS_1",
    legal_area: "procedural",
    title: "procesno pravo",
    label: "procesno pravo",
    statuteLabel: "Zakon o parničnom postupku RS",
    statuteTag: "ZPP RS",
    defaultQ:
      "Da li je osnovana revizija zbog povrede odredaba parničnog postupka pred Vrhovnim sudom RS?",
  },
  {
    n: 10,
    folder: "radno-pravo",
    tsFile: "case-law-labor-bih-rs-1.ts",
    exportName: "CASE_LAW_LABOR_BIH_RS_1",
    legal_area: "labor",
    title: "radno pravo",
    label: "radno pravo",
    statuteLabel: "Zakon o radu RS",
    statuteTag: "ZR RS",
    defaultQ: "Da li je osnovana revizija u predmetu radnog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 11,
    folder: "stambeno-pravo",
    tsFile: "case-law-civil-bih-rs-stambeno.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_STAMBENO",
    legal_area: "civil",
    title: "stambeno pravo",
    label: "stambeno pravo",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ:
      "Da li je osnovana revizija u predmetu stambenog prava pred Vrhovnim sudom RS?",
  },
  {
    n: 12,
    folder: "stecajni-postupak",
    tsFile: "case-law-commercial-bih-rs-1.ts",
    exportName: "CASE_LAW_COMMERCIAL_BIH_RS_1",
    legal_area: "commercial",
    title: "stecajni postupak",
    label: "stecaj",
    statuteLabel: "Zakon o stecaju RS",
    statuteTag: "ZS RS",
    defaultQ:
      "Da li je osnovana revizija ili žalba u stecajnom postupku pred Vrhovnim sudom RS?",
  },
  {
    n: 13,
    folder: "stvarno-pravo",
    tsFile: "case-law-civil-bih-rs-stvarno.ts",
    exportName: "CASE_LAW_CIVIL_BIH_RS_STVARNO",
    legal_area: "civil",
    title: "stvarno pravo",
    label: "stvarno pravo",
    statuteLabel: "Zakon o obligacionim odnosima RS",
    statuteTag: "ZOO RS",
    defaultQ:
      "Da li je osnovana revizija u predmetu stvarnog prava pred Vrhovnim sudom RS?",
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
  const folderPath = path.join(GRADJANSKO, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-rs-gradjansko", `cat-${cat.n}`)
  fs.mkdirSync(extractDir, { recursive: true })

  let done = 0
  for (const pdfPath of pdfs) {
    const base = path.basename(pdfPath, ".pdf").replace(/[^\w\s\-().,]/g, "_")
    const outPath = path.join(extractDir, `${base}.txt`)
    await extractPdf(pdfPath, outPath)
    done++
    if (done % 100 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }

  const gen = createGradjanskoGenerator(cat)
  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH RS Građansko — ${cat.title}.
// Auto-generated from downloads/bih-rs/gradjansko/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  const gradImports = results
    .filter((r) => !r.skipped && r.cases > 0)
    .map((r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`)
  const gradSpreads = results
    .filter((r) => !r.skipped && r.cases > 0)
    .map((r) => `  ...${r.exportName},`)

  const exportNames = results.map((r) => r.exportName)
  for (const en of exportNames) {
    s = s.replace(new RegExp(`import \\{ ${en} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${en},\\n`, "g"), "")
  }

  if (gradImports.length > 0) {
    const block = gradImports.join("\n") + "\n"
    const spreadBlock = gradSpreads.join("\n") + "\n"
    if (s.includes("import { CASE_LAW_CRIMINAL_BIH_RS_24 }")) {
      s = s.replace(
        /(import \{ CASE_LAW_CRIMINAL_BIH_RS_24 \}[^\n]+\n)/,
        `$1${block}`,
      )
      s = s.replace(/(\s+\.\.\.CASE_LAW_CRIMINAL_BIH_RS_24,\n)/, `$1${spreadBlock}`)
    } else {
      s = s.replace(
        /(import type \{ CaseLawInput \}[^\n]+\n)/,
        `$1${block}`,
      )
      s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${spreadBlock}`)
    }
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-rs-gradjansko.mjs")
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
