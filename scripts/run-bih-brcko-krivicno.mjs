/**
 * Process all 21 BiH Brčko Distrikt Krivično odjeljenje categories from downloads/bih-brcko/krivicno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import { openPdfFromFileBuffer } from "./_pdf-get-document.mjs"
import { createBrckoKrivicnoGenerator, safePdfStem } from "./_gen-bih-brcko-krivicno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const KRIVICNO = path.join(ROOT, "downloads", "bih-brcko", "krivicno")

const CATEGORIES = [
  {
    n: 1,
    folder: "krivicna-djela-iz-oblasti-poreza",
    tsFile: "case-law-criminal-bih-brcko-1.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_1",
    legal_area: "criminal",
    title: "krivična djela iz oblasti poreza",
    label: "porezna krivična djela",
    defaultQ:
      "Da li je osnovana žalba u predmetu poreznog krivičnog djela pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 2,
    folder: "krivicna-djela-iz-zakona-o-oruzju-i-munici-brcko-distrikta-bih",
    tsFile: "case-law-criminal-bih-brcko-2.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_2",
    legal_area: "criminal",
    title: "krivična djela iz zakona o oružju i municiji",
    label: "oružje i municija",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela iz zakona o oružju i municiji pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 3,
    folder:
      "krivicna-djela-podmicivanja-i-krivicna-djela-protiv-sluzbene-i-druge-odgovorne-duznosti",
    tsFile: "case-law-criminal-bih-brcko-3.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_3",
    legal_area: "criminal",
    title: "podmićivanje i krivična djela protiv službene i druge odgovorne dužnosti",
    label: "službena dužnost",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv službene dužnosti pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 4,
    folder: "krivicna-djela-protiv-braka-porodice-i-omladine",
    tsFile: "case-law-criminal-bih-brcko-4.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_4",
    legal_area: "family",
    title: "krivična djela protiv braka, porodice i omladine",
    label: "brak i porodica",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv braka, porodice i omladine pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 5,
    folder: "krivicna-djela-protiv-covjecnosti-i-vrijednosti-zasticenih-medjunarodnim-pravom",
    tsFile: "case-law-criminal-bih-brcko-5.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_5",
    legal_area: "criminal",
    title: "krivična djela protiv čovječnosti i vrijednosti zaštićenih međunarodnim pravom",
    label: "međunarodno krivično pravo",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv čovječnosti pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 6,
    folder: "krivicna-djela-protiv-drzave",
    tsFile: "case-law-criminal-bih-brcko-6.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_6",
    legal_area: "criminal",
    title: "krivična djela protiv države",
    label: "država",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv države pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 7,
    folder: "krivicna-djela-protiv-imovine",
    tsFile: "case-law-criminal-bih-brcko-7.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_7",
    legal_area: "criminal",
    title: "krivična djela protiv imovine",
    label: "imovinsko krivično pravo",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv imovine pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 8,
    folder: "krivicna-djela-protiv-javnog-reda-i-pravnog-saobracaja",
    tsFile: "case-law-criminal-bih-brcko-8.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_8",
    legal_area: "criminal",
    title: "krivična djela protiv javnog reda i pravnog saobraćaja",
    label: "javni red i saobraćaj",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv javnog reda pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 9,
    folder: "krivicna-djela-protiv-okoline-poljoprivrede-i-prirodnih-dobara",
    tsFile: "case-law-criminal-bih-brcko-9.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_9",
    legal_area: "criminal",
    title: "krivična djela protiv okoline, poljoprivrede i prirodnih dobara",
    label: "okolina i priroda",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv okoline pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 10,
    folder: "krivicna-djela-protiv-opste-bezbjednosti-ljudi-i-imovine",
    tsFile: "case-law-criminal-bih-brcko-10.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_10",
    legal_area: "criminal",
    title: "krivična djela protiv opšte bezbjednosti ljudi i imovine",
    label: "opšta bezbjednost",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv opšte bezbjednosti pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 11,
    folder: "krivicna-djela-protiv-polne-slobode-i-morala",
    tsFile: "case-law-criminal-bih-brcko-11.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_11",
    legal_area: "criminal",
    title: "krivična djela protiv polne slobode i morala",
    label: "polna sloboda",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv polne slobode pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 12,
    folder: "krivicna-djela-protiv-pravosudja",
    tsFile: "case-law-criminal-bih-brcko-12.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_12",
    legal_area: "criminal",
    title: "krivična djela protiv pravosuđa",
    label: "pravosuđe",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv pravosuđa pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 13,
    folder: "krivicna-djela-protiv-privrede-poslovanja-i-bezbjednosti-platnog-prometa",
    tsFile: "case-law-criminal-bih-brcko-13.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_13",
    legal_area: "commercial",
    title: "krivična djela protiv privrede, poslovanja i bezbjednosti platnog prometa",
    label: "privredno krivično pravo",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv privrede i platnog prometa pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 14,
    folder: "krivicna-djela-protiv-slobode-i-prava-covjeka-i-gradjanina",
    tsFile: "case-law-criminal-bih-brcko-14.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_14",
    legal_area: "criminal",
    title: "krivična djela protiv slobode i prava čovjeka i građanina",
    label: "sloboda i prava građanina",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv slobode i prava građanina pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 15,
    folder: "krivicna-djela-protiv-zdravlja-ljudi",
    tsFile: "case-law-criminal-bih-brcko-15.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_15",
    legal_area: "criminal",
    title: "krivična djela protiv zdravlja ljudi",
    label: "zdravlje ljudi",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv zdravlja ljudi pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 16,
    folder: "krivicna-djela-protiv-zivota-i-tijela",
    tsFile: "case-law-criminal-bih-brcko-16.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_16",
    legal_area: "criminal",
    title: "krivična djela protiv života i tijela",
    label: "život i tijelo",
    defaultQ:
      "Da li je osnovana žalba u predmetu krivičnog djela protiv života i tijela pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 17,
    folder: "krivicno-materijalno-pravo-opsti-dio",
    tsFile: "case-law-criminal-bih-brcko-17.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_17",
    legal_area: "criminal",
    title: "krivično materijalno pravo — opšti dio",
    label: "opšti dio KZ",
    defaultQ:
      "Kako je Apelacioni sud Brčko Distrikta BiH tumačio pitanja opšteg dijela krivičnog materijalnog prava?",
  },
  {
    n: 18,
    folder: "krivicno-procesno-pravo",
    tsFile: "case-law-criminal-bih-brcko-18.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_18",
    legal_area: "procedural",
    title: "krivično procesno pravo",
    label: "krivični postupak",
    defaultQ:
      "Kako je Apelacioni sud Brčko Distrikta BiH primijenio odredbe krivičnog procesnog prava?",
  },
  {
    n: 19,
    folder: "mjere-za-obezbjedjenje-prisustva-osumnjicenog-optuzenog",
    tsFile: "case-law-criminal-bih-brcko-19.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_19",
    legal_area: "procedural",
    title: "mjere za obezbjeđenje prisustva osumnjičenog/optuženog",
    label: "mjere prisustva",
    defaultQ:
      "Da li su zakonito određene mjere za obezbjeđenje prisustva osumnjičenog ili optuženog pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 20,
    folder: "pravna-shvatanja",
    tsFile: "case-law-criminal-bih-brcko-20.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_20",
    legal_area: "criminal",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    defaultQ:
      "Koje pravno shvatanje je zauzeo Apelacioni sud Brčko Distrikta BiH u krivičnom predmetu?",
  },
  {
    n: 21,
    folder: "prekrsaji",
    tsFile: "case-law-criminal-bih-brcko-21.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_BRCKO_21",
    legal_area: "criminal",
    title: "prekršaji",
    label: "prekršaji",
    defaultQ:
      "Da li je osnovana žalba u predmetu prekršaja pred Apelacionim sudom Brčko Distrikta BiH?",
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

async function processCategory(cat) {
  const folderPath = path.join(KRIVICNO, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-brcko-krivicno", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createBrckoKrivicnoGenerator(cat)
  const fallbackStems = []
  let done = 0
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const result = await extractPdf(pdfPath, outPath)
    if (!result.ok || result.chars < 200) fallbackStems.push(stem)
    done++
    if (done % 25 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }

  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip, fallbackStems)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH Brčko Krivično — ${cat.title}.
// Auto-generated from downloads/bih-brcko/krivicno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_CRIMINAL_BIH_FBIH_10 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_CRIMINAL_BIH_FBIH_10 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    if (s.includes("...CASE_LAW_CRIMINAL_BIH_FBIH_10,")) {
      s = s.replace(/(\s+\.\.\.CASE_LAW_CRIMINAL_BIH_FBIH_10,\n)/, `$1${newSpreads}\n`)
    } else {
      s = s.replace(/(\]\s*$)/, `${newSpreads}\n$1`)
    }
  } else if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21,\n)/, `$1${newSpreads}\n`)
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-brcko-krivicno.mjs")
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
