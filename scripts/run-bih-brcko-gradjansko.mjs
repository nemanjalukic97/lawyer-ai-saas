/**
 * Process all 19 BiH Brčko Distrikt Građansko odjeljenje categories
 * from downloads/bih-brcko/gradjansko/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import {
  createBrckoGradjanskoGenerator,
  safePdfStem,
} from "./_gen-bih-brcko-gradjansko-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const GRADJANSKO = path.join(ROOT, "downloads", "bih-brcko", "gradjansko")

const CATEGORIES = [
  {
    n: 1,
    folder: "intelektualno-vlasnistvo",
    tsFile: "case-law-civil-bih-brcko-1.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_1",
    legal_area: "civil",
    title: "intelektualno vlasništvo",
    label: "intelektualno vlasništvo",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu intelektualnog vlasništva pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 2,
    folder: "izvrsni-postupak",
    tsFile: "case-law-civil-bih-brcko-2.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_2",
    legal_area: "enforcement",
    title: "izvršni postupak",
    label: "izvršni postupak",
    statuteLabel: "Zakon o izvršnom postupku Brčko Distrikta BiH",
    statuteTag: "ZIP BD",
    defaultQ:
      "Da li je osnovan pravni lijek u izvršnom postupku pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 3,
    folder: "nasljedno-pravo",
    tsFile: "case-law-civil-bih-brcko-3.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_3",
    legal_area: "inheritance",
    title: "nasljedno pravo",
    label: "nasljedno pravo",
    statuteLabel: "Zakon o nasljeđivanju Brčko Distrikta BiH",
    statuteTag: "ZN BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu nasljednog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 4,
    folder: "nove-odluke",
    tsFile: "case-law-civil-bih-brcko-4.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_4",
    legal_area: "civil",
    title: "nove odluke",
    label: "nove odluke",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ: "Koja je pravna odluka Apelacionog suda Brčko Distrikta BiH u novom građanskom predmetu?",
  },
  {
    n: 5,
    folder: "obligaciono-pravo",
    tsFile: "case-law-civil-bih-brcko-5.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_5",
    legal_area: "civil",
    title: "obligaciono pravo",
    label: "obligaciono pravo",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu obligacionog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 6,
    folder: "parnicni-postupak",
    tsFile: "case-law-civil-bih-brcko-6.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_6",
    legal_area: "procedural",
    title: "parnični postupak",
    label: "parnični postupak",
    statuteLabel: "Zakon o parničnom postupku Brčko Distrikta BiH",
    statuteTag: "ZPP BD",
    defaultQ:
      "Da li je osnovana žalba zbog povrede odredaba parničnog postupka pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 7,
    folder: "porodicno-pravo",
    tsFile: "case-law-civil-bih-brcko-7.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_7",
    legal_area: "family",
    title: "porodično pravo",
    label: "porodično pravo",
    statuteLabel: "Porodični zakon Brčko Distrikta BiH",
    statuteTag: "PZ BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu porodičnog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 8,
    folder: "pravna-shvatanja",
    tsFile: "case-law-civil-bih-brcko-8.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_8",
    legal_area: "civil",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Koje pravno shvatanje je zauzeo Apelacioni sud Brčko Distrikta BiH u građanskoj materiji?",
  },
  {
    n: 9,
    folder: "privredno-pravo",
    tsFile: "case-law-civil-bih-brcko-9.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_9",
    legal_area: "commercial",
    title: "privredno pravo",
    label: "privredno pravo",
    statuteLabel: "Zakon o privrednim društvima Brčko Distrikta BiH",
    statuteTag: "ZPD BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu privrednog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 10,
    folder: "procesno-pravo",
    tsFile: "case-law-civil-bih-brcko-10.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_10",
    legal_area: "procedural",
    title: "procesno pravo",
    label: "procesno pravo",
    statuteLabel: "Zakon o parničnom postupku Brčko Distrikta BiH",
    statuteTag: "ZPP BD",
    defaultQ:
      "Da li je osnovan pravni lijek u procesnom smislu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 11,
    folder: "radno-pravo",
    tsFile: "case-law-civil-bih-brcko-11.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_11",
    legal_area: "labor",
    title: "radno pravo",
    label: "radno pravo",
    statuteLabel: "Zakon o radu Brčko Distrikta BiH",
    statuteTag: "ZR BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu radnog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 12,
    folder: "revizije",
    tsFile: "case-law-civil-bih-brcko-12.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_12",
    legal_area: "procedural",
    title: "revizije",
    label: "revizije",
    statuteLabel: "Zakon o parničnom postupku Brčko Distrikta BiH",
    statuteTag: "ZPP BD",
    defaultQ:
      "Da li je osnovana revizija pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 13,
    folder: "sporna-pravna-pitanja",
    tsFile: "case-law-civil-bih-brcko-13.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_13",
    legal_area: "civil",
    title: "sporna pravna pitanja",
    label: "sporna pravna pitanja",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Kako je Apelacioni sud Brčko Distrikta BiH riješio sporno pravno pitanje u građanskom predmetu?",
  },
  {
    n: 14,
    folder: "stambeno-pravo",
    tsFile: "case-law-civil-bih-brcko-14.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_14",
    legal_area: "civil",
    title: "stambeno pravo",
    label: "stambeno pravo",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu stambenog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 15,
    folder: "stvarno-pravo",
    tsFile: "case-law-civil-bih-brcko-15.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_15",
    legal_area: "civil",
    title: "stvarno pravo",
    label: "stvarno pravo",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu stvarnog prava pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 16,
    folder: "upis-u-zemljisne-knjige",
    tsFile: "case-law-civil-bih-brcko-16.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_16",
    legal_area: "civil",
    title: "upis u zemljišne knjige",
    label: "zemljišne knjige",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu upisa u zemljišne knjige pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 17,
    folder: "vanparnicni-postupak",
    tsFile: "case-law-civil-bih-brcko-17.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_17",
    legal_area: "procedural",
    title: "vanparnični postupak",
    label: "vanparnični postupak",
    statuteLabel: "Zakon o parničnom postupku Brčko Distrikta BiH",
    statuteTag: "ZPP BD",
    defaultQ:
      "Da li je osnovan pravni lijek u vanparničnom postupku pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 18,
    folder: "zastita-od-diskriminacije",
    tsFile: "case-law-civil-bih-brcko-18.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_18",
    legal_area: "civil",
    title: "zaštita od diskriminacije",
    label: "diskriminacija",
    statuteLabel: "Zakon o zabrani diskriminacije Brčko Distrikta BiH",
    statuteTag: "ZZD BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu zaštite od diskriminacije pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 19,
    folder: "zastita-od-klevete",
    tsFile: "case-law-civil-bih-brcko-19.ts",
    exportName: "CASE_LAW_CIVIL_BIH_BRCKO_19",
    legal_area: "civil",
    title: "zaštita od klevete",
    label: "kleveta",
    statuteLabel: "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    statuteTag: "ZOO BD",
    defaultQ:
      "Da li je osnovana žalba u predmetu naknade štete zbog klevete pred Apelacionim sudom Brčko Distrikta BiH?",
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

  const extractDir = path.join(ROOT, "tmp-bih-brcko-gradjansko", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createBrckoGradjanskoGenerator(cat)
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
// BiH Brčko Građansko — ${cat.title}.
// Auto-generated from downloads/bih-brcko/gradjansko/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_CRIMINAL_BIH_BRCKO_21 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_BIH_BRCKO_21 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21,)(\n\s+\.\.\.CASE_LAW_CRIMINAL_BIH_BRCKO_1,)/,
      `$1\n${newSpreads}$2`,
    )
  } else if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
  } else if (s.includes("import { CASE_LAW_PROCEDURAL_BIH_FBIH_2 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_PROCEDURAL_BIH_FBIH_2 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_PROCEDURAL_BIH_FBIH_2,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-brcko-gradjansko.mjs")
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
