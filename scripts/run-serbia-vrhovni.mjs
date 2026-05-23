/**
 * Process all 18 Serbia Vrhovni sud categories from downloads/serbia/
 * Run: node scripts/run-serbia-vrhovni.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import { createSerbiaGenerator } from "./_gen-serbia-vrhovni-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const SERBIA = path.join(ROOT, "downloads", "serbia")

const CATEGORIES = [
  {
    n: 1,
    folder: "ustavni/praksa-ustavnog-suda",
    tsFile: "case-law-constitutional-serbia-1.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_SERBIA_1",
    legal_area: "constitutional",
    title: "praksa Ustavnog suda",
    label: "ustavno pravo",
    statuteLabel: "Ustav Republike Srbije",
    statuteTag: "Ustav RS",
    defaultQ: "Koje ustavno pitanje je razmatrao Ustavni sud Srbije u predmetu {case}?",
    constitutional: true,
  },
  {
    n: 2,
    folder: "ustavni/presude-protiv-srbije",
    tsFile: "case-law-constitutional-serbia-2.ts",
    exportName: "CASE_LAW_CONSTITUTIONAL_SERBIA_2",
    legal_area: "constitutional",
    title: "presude protiv Srbije (ESLJP)",
    label: "ESLJP",
    statuteLabel: "Evropska konvencija o ljudskim pravima",
    statuteTag: "EKLP",
    defaultQ: "Da li je Srbija povredila Konvenciju u predmetu {case}?",
    echr: true,
  },
  {
    n: 3,
    folder: "bilteni/bilten-vrhovnog-suda",
    tsFile: "case-law-civil-serbia-6.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_6",
    legal_area: "civil",
    title: "bilten Vrhovnog suda",
    label: "bilten VS",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Koje pravno pitanje je razmatrao Vrhovni sud Srbije u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 4,
    folder: "bilteni/bilten-vrhovnog-kasacionog-suda",
    tsFile: "case-law-civil-serbia-7.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_7",
    legal_area: "civil",
    title: "bilten Vrhovnog kasacionog suda",
    label: "bilten VKS",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Koje pravno pitanje je razmatrao Vrhovni kasacioni sud u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 5,
    folder: "bilteni/bilten-vrhovnog-suda-srbije",
    tsFile: "case-law-civil-serbia-8.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_8",
    legal_area: "civil",
    title: "bilten Vrhovnog suda Srbije",
    label: "bilten VS Srbije",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Koje pravno pitanje je razmatrao Vrhovni sud Srbije u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 6,
    folder: "pravna-shvatanja/krivicna-materija",
    tsFile: "case-law-criminal-serbia-3.ts",
    exportName: "CASE_LAW_CRIMINAL_SERBIA_3",
    legal_area: "criminal",
    title: "pravna shvatanja — krivična materija",
    label: "krivično pravo",
    statuteLabel: "Krivični zakonik",
    statuteTag: "KZ",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud u krivičnom predmetu {case}?",
  },
  {
    n: 7,
    folder: "pravna-shvatanja/gradanska-materija",
    tsFile: "case-law-civil-serbia-9.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_9",
    legal_area: "civil",
    title: "pravna shvatanja — građanska materija",
    label: "građansko pravo",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud u građanskom predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 8,
    folder: "pravna-shvatanja/upravna-materija",
    tsFile: "case-law-administrative-serbia-3.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_SERBIA_3",
    legal_area: "administrative",
    title: "pravna shvatanja — upravna materija",
    label: "upravno pravo",
    statuteLabel: "Zakon o upravnim sporovima",
    statuteTag: "ZUS",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud u upravnom predmetu {case}?",
  },
  {
    n: 9,
    folder: "pravna-shvatanja/razumni-rok",
    tsFile: "case-law-procedural-serbia-1.ts",
    exportName: "CASE_LAW_PROCEDURAL_SERBIA_1",
    legal_area: "procedural",
    title: "pravna shvatanja — razumni rok",
    label: "razumni rok",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Da li je povređeno pravo na suđenje u razumnom roku u predmetu {case}?",
  },
  {
    n: 10,
    folder: "pravna-shvatanja/referati",
    tsFile: "case-law-civil-serbia-10.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_10",
    legal_area: "civil",
    title: "referati",
    label: "referat",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Koje pitanje građanskog prava analizira Vrhovni sud u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 11,
    folder: "sentence/krivicna-materija",
    tsFile: "case-law-criminal-serbia-4.ts",
    exportName: "CASE_LAW_CRIMINAL_SERBIA_4",
    legal_area: "criminal",
    title: "sentence — krivična materija",
    label: "krivična sentenca",
    statuteLabel: "Krivični zakonik",
    statuteTag: "KZ",
    defaultQ: "Koje pravno shvatanje sadrži sentenca Vrhovnog suda u predmetu {case}?",
  },
  {
    n: 12,
    folder: "sentence/gradanska-materija",
    tsFile: "case-law-civil-serbia-11.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_11",
    legal_area: "civil",
    title: "sentence — građanska materija",
    label: "građanska sentenca",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Koje pravno shvatanje sadrži sentenca Vrhovnog suda u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 13,
    folder: "sentence/upravna-materija",
    tsFile: "case-law-administrative-serbia-4.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_SERBIA_4",
    legal_area: "administrative",
    title: "sentence — upravna materija",
    label: "upravna sentenca",
    statuteLabel: "Zakon o upravnim sporovima",
    statuteTag: "ZUS",
    defaultQ: "Koje pravno shvatanje sadrži pravni stav Vrhovnog suda u predmetu {case}?",
  },
  {
    n: 14,
    folder: "sentence/razumni-rok",
    tsFile: "case-law-procedural-serbia-2.ts",
    exportName: "CASE_LAW_PROCEDURAL_SERBIA_2",
    legal_area: "procedural",
    title: "sentence — razumni rok",
    label: "razumni rok",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Da li je povređeno pravo na suđenje u razumnom roku u predmetu {case}?",
  },
  {
    n: 15,
    folder: "ujednacavanje/horizontalno-vertikalno",
    tsFile: "case-law-civil-serbia-12.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_12",
    legal_area: "civil",
    title: "horizontalno i vertikalno ujednačavanje",
    label: "ujednačavanje",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Koje pitanje ujednačavanja prakse razmatra Vrhovni sud u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 16,
    folder: "ujednacavanje/sporna-pitanja",
    tsFile: "case-law-civil-serbia-13.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_13",
    legal_area: "civil",
    title: "sporna pravna pitanja",
    label: "sporno pitanje",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Koje sporno pravno pitanje razmatra Vrhovni sud u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 17,
    folder: "ujednacavanje/apelacioni",
    tsFile: "case-law-civil-serbia-14.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_14",
    legal_area: "civil",
    title: "ujednačavanje prakse apelacionih sudova",
    label: "apelacija",
    statuteLabel: "Zakon o parničnom postupku",
    statuteTag: "ZPP",
    defaultQ: "Kako Vrhovni sud ujednačava praksu apelacionih sudova u predmetu {case}?",
    multiDecision: true,
  },
  {
    n: 18,
    folder: "uporedna/valutna-klauzula",
    tsFile: "case-law-civil-serbia-15.ts",
    exportName: "CASE_LAW_CIVIL_SERBIA_15",
    legal_area: "civil",
    title: "uporedna praksa — valutna klauzula",
    label: "valutna klauzula",
    statuteLabel: "Zakon o obligacionim odnosima",
    statuteTag: "ZOO",
    defaultQ: "Kako Vrhovni sud tumači valutnu klauzulu u predmetu {case}?",
    multiDecision: true,
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

function writeEmptyTs(cat) {
  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// Serbia Vrhovni sud — ${cat.title} (empty folder).

import type { CaseLawInput } from "./ingest-case-law"

export const ${cat.exportName}: CaseLawInput[] = []
`
  fs.writeFileSync(tsPath, header, "utf8")
}

async function processCategory(cat) {
  const folderPath = path.join(SERBIA, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — downloads/serbia/${cat.folder}`)
    writeEmptyTs(cat)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — downloads/serbia/${cat.folder}`)
    writeEmptyTs(cat)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-serbia-vrhovni", `cat-${cat.n}`)
  fs.mkdirSync(extractDir, { recursive: true })

  let done = 0
  for (const pdfPath of pdfs) {
    const base = path.basename(pdfPath, ".pdf").replace(/[^\w\s\-().,čćžšđČĆŽŠĐ]/g, "_")
    const outPath = path.join(extractDir, `${base}.txt`)
    if (!fs.existsSync(outPath)) await extractPdf(pdfPath, outPath)
    done++
    if (done % 25 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }

  const gen = createSerbiaGenerator(cat)
  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// Serbia Vrhovni sud — ${cat.title}.
// Auto-generated from downloads/serbia/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

import type { CaseLawInput } from "./ingest-case-law"

export const ${cat.exportName}: CaseLawInput[] = [
`
  const body = blocks.length ? blocks.join(",\n") + "\n" : ""
  fs.writeFileSync(tsPath, header + body + "]\n", "utf8")
  console.log(`✓ Category ${cat.n} complete: ${blocks.length} cases from ${pdfs.length} PDFs`)
  return { ...cat, cases: blocks.length, pdfs: pdfs.length, skipped: false }
}

function updateIndex(results) {
  const indexPath = path.join(ROOT, "scripts", "case-law-index.ts")
  let s = fs.readFileSync(indexPath, "utf8")

  const imports = results.map(
    (r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`,
  )
  const spreads = results.map((r) => `  ...${r.exportName},`)

  for (const r of results) {
    s = s.replace(new RegExp(`import \\{ ${r.exportName} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${r.exportName},\\n`, "g"), "")
  }

  const block = imports.join("\n") + "\n"
  const spreadBlock = spreads.join("\n") + "\n"

  if (s.includes("import { CASE_LAW_CRIMINAL_SERBIA_2 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_SERBIA_2 \}[^\n]+\n)/,
      `$1${block}`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_CRIMINAL_SERBIA_2,\n)/, `$1${spreadBlock}`)
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${block}`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${spreadBlock}`)
  }

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
  console.log(
    `| ${r.n} | downloads/serbia/${r.folder} | ${r.legal_area} | ${r.cases} | ${r.pdfs} |`,
  )
  tC += r.cases
  tP += r.pdfs
}
console.log(`| TOTAL | | | ${tC} | ${tP} |`)
