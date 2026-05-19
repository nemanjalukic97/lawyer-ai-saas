/**
 * Process all 10 BiH FBiH Krivično odjeljenje categories from downloads/bih-fbih/krivicno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import { createFbihKrivicnoGenerator, safePdfStem } from "./_gen-bih-fbih-krivicno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const KRIVICNO = path.join(ROOT, "downloads", "bih-fbih", "krivicno")

const CATEGORIES = [
  {
    n: 1,
    folder: "krivicna-djela-iz-oblasti-poreza",
    tsFile: "case-law-criminal-bih-fbih-1.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_1",
    title: "krivična djela iz oblasti poreza",
    label: "porezna krivična djela",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu poreznog krivičnog djela pred Vrhovnim sudom FBiH?",
  },
  {
    n: 2,
    folder:
      "krivicna-djela-podmicivanja-i-krivicna-djela-protiv-sluzbene-i-druge-odgovorne-funkcije",
    tsFile: "case-law-criminal-bih-fbih-2.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_2",
    title: "podmićivanje i krivična djela protiv službene i druge odgovorne funkcije",
    label: "službena funkcija",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv službene funkcije pred Vrhovnim sudom FBiH?",
  },
  {
    n: 3,
    folder: "krivicna-djela-protiv-covjecnosti-i-medjunarodnog-prava",
    tsFile: "case-law-criminal-bih-fbih-3.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_3",
    title: "krivična djela protiv čovječnosti i međunarodnog prava",
    label: "međunarodno krivično pravo",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv čovječnosti i međunarodnog prava pred Vrhovnim sudom FBiH?",
  },
  {
    n: 4,
    folder: "krivicna-djela-protiv-imovine",
    tsFile: "case-law-criminal-bih-fbih-4.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_4",
    title: "krivična djela protiv imovine",
    label: "imovinsko krivično pravo",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv imovine pred Vrhovnim sudom FBiH?",
  },
  {
    n: 5,
    folder: "krivicna-djela-protiv-javnog-reda-i-pravnog-prometa",
    tsFile: "case-law-criminal-bih-fbih-5.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_5",
    title: "krivična djela protiv javnog reda i pravnog prometa",
    label: "javni red",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv javnog reda pred Vrhovnim sudom FBiH?",
  },
  {
    n: 6,
    folder: "krivicna-djela-protiv-pravosudja",
    tsFile: "case-law-criminal-bih-fbih-6.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_6",
    title: "krivična djela protiv pravosuđa",
    label: "pravosuđe",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv pravosuđa pred Vrhovnim sudom FBiH?",
  },
  {
    n: 7,
    folder: "krivicna-djela-protiv-privrede-poslovanja-i-sigurnosti-platnog-prometa",
    tsFile: "case-law-criminal-bih-fbih-7.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_7",
    title: "krivična djela protiv privrede, poslovanja i sigurnosti platnog prometa",
    label: "privredno krivično pravo",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv privrede i platnog prometa pred Vrhovnim sudom FBiH?",
  },
  {
    n: 8,
    folder: "krivicna-djela-protiv-sigurnosti-javnog-prometa",
    tsFile: "case-law-criminal-bih-fbih-8.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_8",
    title: "krivična djela protiv sigurnosti javnog prometa",
    label: "sigurnost javnog prometa",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv sigurnosti javnog prometa pred Vrhovnim sudom FBiH?",
  },
  {
    n: 9,
    folder: "krivicna-djela-protiv-zdravlja-ljudi",
    tsFile: "case-law-criminal-bih-fbih-9.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_9",
    title: "krivična djela protiv zdravlja ljudi",
    label: "zdravlje ljudi",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv zdravlja ljudi pred Vrhovnim sudom FBiH?",
  },
  {
    n: 10,
    folder: "krivicna-djela-protiv-zivota-i-tijela",
    tsFile: "case-law-criminal-bih-fbih-10.ts",
    exportName: "CASE_LAW_CRIMINAL_BIH_FBIH_10",
    title: "krivična djela protiv života i tijela",
    label: "život i tijelo",
    defaultQ:
      "Da li je osnovana žalba ili zahtjev za zaštitu zakonitosti u predmetu krivičnog djela protiv života i tijela pred Vrhovnim sudom FBiH?",
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
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-fbih-krivicno", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createFbihKrivicnoGenerator(cat)
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
// BiH FBiH Krivično — ${cat.title}.
// Auto-generated from downloads/bih-fbih/krivicno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_RS_32 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_RS_32 \}[^\n]+\n)/,
      `$1${newImports}\n`,
    )
    s = s.replace(/(\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_RS_32,\n)/, `$1${newSpreads}\n`)
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

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
  const short = r.folder
  console.log(`| ${r.n} | ${short} | ${r.cases} | ${r.pdfs} |`)
  tC += r.cases
  tP += r.pdfs
}
console.log(`| TOTAL | | ${tC} | ${tP} |`)
