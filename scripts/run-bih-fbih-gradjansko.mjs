/**
 * Process all 14 BiH FBiH Građansko odjeljenje categories from downloads/bih-fbih/gradjansko/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import {
  createFbihGradjanskoGenerator,
  safePdfStem,
} from "./_gen-bih-fbih-gradjansko-lib.mjs"
import { isBihUtilityStem } from "./_bih-utility-skip.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const GRADJANSKO = path.join(ROOT, "downloads", "bih-fbih", "gradjansko")

const CATEGORIES = [
  {
    n: 1,
    folder: "diskriminacija",
    tsFile: "case-law-civil-bih-fbih-diskriminacija.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_DISKRIMINACIJA",
    legal_area: "civil",
    title: "diskriminacija",
    label: "diskriminacija",
    statuteLabel: "Zakon o zabrani diskriminacije FBiH",
    statuteTag: "ZZD FBiH",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu diskriminacije pred Vrhovnim sudom FBiH?",
  },
  {
    n: 2,
    folder: "nasljedno-pravo",
    tsFile: "case-law-inheritance-bih-fbih-1.ts",
    exportName: "CASE_LAW_INHERITANCE_BIH_FBIH_1",
    legal_area: "inheritance",
    title: "nasljedno pravo",
    label: "nasljedno pravo",
    statuteLabel: "Zakon o nasljeđivanju FBiH",
    statuteTag: "ZN FBiH",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu nasljednog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 3,
    folder: "nove-odluke",
    tsFile: "case-law-civil-bih-fbih-nove-odluke.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_NOVE_ODLUKE",
    legal_area: "civil",
    title: "nove odluke",
    label: "nove odluke",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ: "Koja je pravna odluka Vrhovnog suda FBiH u novom građanskom predmetu?",
  },
  {
    n: 4,
    folder: "obligaciono-pravo",
    tsFile: "case-law-civil-bih-fbih-1.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_1",
    legal_area: "civil",
    title: "obligaciono pravo",
    label: "obligaciono pravo",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu obligacionog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 5,
    folder: "parnicni-postupak",
    tsFile: "case-law-procedural-bih-fbih-1.ts",
    exportName: "CASE_LAW_PROCEDURAL_BIH_FBIH_1",
    legal_area: "procedural",
    title: "parnični postupak",
    label: "parnični postupak",
    statuteLabel: "Zakon o parničnom postupku FBiH",
    statuteTag: "ZPP FBiH",
    defaultQ:
      "Da li je osnovana revizija zbog povrede odredaba parničnog postupka pred Vrhovnim sudom FBiH?",
  },
  {
    n: 6,
    folder: "porodicno-pravo",
    tsFile: "case-law-family-bih-fbih-1.ts",
    exportName: "CASE_LAW_FAMILY_BIH_FBIH_1",
    legal_area: "family",
    title: "porodično pravo",
    label: "porodično pravo",
    statuteLabel: "Porodični zakon FBiH",
    statuteTag: "PZ FBiH",
    defaultQ:
      "Da li je osnovana revizija ili žalba u predmetu porodičnog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 7,
    folder: "pregled-po-pravnim-shvatanjima",
    tsFile: "case-law-civil-bih-fbih-pravna-shvatanja.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_PRAVNA_SHVATANJA",
    legal_area: "civil",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud FBiH u građanskoj materiji?",
  },
  {
    n: 8,
    folder: "pregled-po-spornom-pravnom-pitanju",
    tsFile: "case-law-civil-bih-fbih-sporno-pitanje.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_SPORNO_PITANJE",
    legal_area: "civil",
    title: "sporno pravno pitanje",
    label: "sporno pravno pitanje",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ:
      "Kako je Vrhovni sud FBiH riješio sporno pravno pitanje u građanskom predmetu?",
  },
  {
    n: 9,
    folder: "privredno-pravo",
    tsFile: "case-law-commercial-bih-fbih-1.ts",
    exportName: "CASE_LAW_COMMERCIAL_BIH_FBIH_1",
    legal_area: "commercial",
    title: "privredno pravo",
    label: "privredno pravo",
    statuteLabel: "Zakon o privrednim društvima FBiH",
    statuteTag: "ZPD FBiH",
    defaultQ:
      "Da li je osnovana revizija u predmetu privrednog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 10,
    folder: "radno-pravo",
    tsFile: "case-law-labor-bih-fbih-1.ts",
    exportName: "CASE_LAW_LABOR_BIH_FBIH_1",
    legal_area: "labor",
    title: "radno pravo",
    label: "radno pravo",
    statuteLabel: "Zakon o radu FBiH",
    statuteTag: "ZR FBiH",
    defaultQ: "Da li je osnovana revizija u predmetu radnog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 11,
    folder: "stambeno-pravo",
    tsFile: "case-law-civil-bih-fbih-stambeno.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_STAMBENO",
    legal_area: "civil",
    title: "stambeno pravo",
    label: "stambeno pravo",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ:
      "Da li je osnovana revizija u predmetu stambenog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 12,
    folder: "steta-zbog-klevete",
    tsFile: "case-law-civil-bih-fbih-kleveta.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_KLEVETA",
    legal_area: "civil",
    title: "šteta zbog klevete",
    label: "kleveta",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ:
      "Da li je osnovana revizija u predmetu naknade štete zbog klevete pred Vrhovnim sudom FBiH?",
  },
  {
    n: 13,
    folder: "stvarno-pravo",
    tsFile: "case-law-civil-bih-fbih-stvarno.ts",
    exportName: "CASE_LAW_CIVIL_BIH_FBIH_STVARNO",
    legal_area: "civil",
    title: "stvarno pravo",
    label: "stvarno pravo",
    statuteLabel: "Zakon o obligacionim odnosima FBiH",
    statuteTag: "ZOO FBiH",
    defaultQ:
      "Da li je osnovana revizija u predmetu stvarnog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 14,
    folder: "vanparnicni-postupak",
    tsFile: "case-law-procedural-bih-fbih-2.ts",
    exportName: "CASE_LAW_PROCEDURAL_BIH_FBIH_2",
    legal_area: "procedural",
    title: "vanparnični postupak",
    label: "vanparnični postupak",
    statuteLabel: "Zakon o parničnom postupku FBiH",
    statuteTag: "ZPP FBiH",
    defaultQ:
      "Da li je osnovan pravni lijek u vanparničnom postupku pred Vrhovnim sudom FBiH?",
  },
]

function listPdfs(dir) {
  const out = []
  function walk(d) {
    if (!fs.existsSync(d)) return
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.toLowerCase().endsWith(".pdf") && !isBihUtilityStem(e.name)) out.push(p)
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

  const extractDir = path.join(ROOT, "tmp-bih-fbih-gradjansko", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createFbihGradjanskoGenerator(cat)
  const fallbackStems = []
  let done = 0
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const result = await extractPdf(pdfPath, outPath)
    if (!result.ok || result.chars < 200) fallbackStems.push(stem)
    done++
    if (done % 50 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }

  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip, fallbackStems)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH FBiH Građansko — ${cat.title}.
// Auto-generated from downloads/bih-fbih/gradjansko/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  const active = results.filter((r) => !r.skipped && r.cases > 0)
  if (active.length === 0) {
    fs.writeFileSync(indexPath, s, "utf8")
    return
  }

  const newImports = active
    .map((r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`)
    .join("\n")
  const newSpreads = active.map((r) => `  ...${r.exportName},`).join("\n")

  if (s.includes("import { CASE_LAW_CRIMINAL_BIH_FBIH_10 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_BIH_FBIH_10 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_RS_32,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
  } else if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_RS_32 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_RS_32 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_RS_32,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  assertCaseLawIndexSpreads(
    s,
    active.map((r) => r.exportName),
    "run-bih-fbih-gradjansko.mjs",
  )
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
