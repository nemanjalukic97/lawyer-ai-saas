/**
 * Process all 34 BiH RS Upravno odjeljenje categories from downloads/bih-rs/upravno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import { createUpravnoGenerator } from "./_gen-bih-rs-upravno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const UPRAVNO = path.join(ROOT, "downloads", "bih-rs", "upravno")

const CATEGORIES = [
  { n: 1, folder: "advokatura", tsFile: "case-law-administrative-bih-rs-1.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_1", legal_area: "administrative", title: "advokatura", label: "advokatura", statuteTag: "ZAdv RS" },
  { n: 2, folder: "civilne-zrtve-rata", tsFile: "case-law-administrative-bih-rs-2.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_2", legal_area: "administrative", title: "civilne žrtve rata", label: "civilne žrtve rata", statuteTag: "ZZR RS" },
  { n: 3, folder: "ekologija-energetika", tsFile: "case-law-administrative-bih-rs-3.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_3", legal_area: "administrative", title: "ekologija i energetika", label: "ekologija", statuteTag: "ZUP RS" },
  { n: 4, folder: "eksproprijacija", tsFile: "case-law-administrative-bih-rs-4.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_4", legal_area: "administrative", title: "eksproprijacija", label: "eksproprijacija", statuteTag: "ZUP RS" },
  { n: 5, folder: "gradjevinska-odobrenja", tsFile: "case-law-administrative-bih-rs-5.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_5", legal_area: "administrative", title: "građevinska odobrenja", label: "građevinska odobrenja", statuteTag: "ZUP RS" },
  { n: 6, folder: "gradjevinsko-zemljiste", tsFile: "case-law-administrative-bih-rs-6.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_6", legal_area: "administrative", title: "građevinsko zemljište", label: "građevinsko zemljište", statuteTag: "ZUP RS" },
  { n: 7, folder: "imenovanje-razrjesenje", tsFile: "case-law-administrative-bih-rs-7.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_7", legal_area: "administrative", title: "imenovanje i razrješenje", label: "imenovanje", statuteTag: "ZUP RS" },
  { n: 8, folder: "inspekcijski-nadzor", tsFile: "case-law-administrative-bih-rs-8.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_8", legal_area: "administrative", title: "inspekcijski nadzor", label: "inspekcijski nadzor", statuteTag: "ZUP RS" },
  { n: 9, folder: "invalidsko-boracka-zastita", tsFile: "case-law-administrative-bih-rs-9.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_9", legal_area: "administrative", title: "invalidsko i boračka zaštita", label: "boračka zaštita", statuteTag: "ZUP RS" },
  { n: 10, folder: "javne-nabavke", tsFile: "case-law-administrative-bih-rs-10.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_10", legal_area: "administrative", title: "javne nabavke", label: "javne nabavke", statuteTag: "ZNJ RS" },
  { n: 11, folder: "katastar-i-zemljisna-knjiga", tsFile: "case-law-administrative-bih-rs-11.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_11", legal_area: "administrative", title: "katastar i zemljišna knjiga", label: "katastar", statuteTag: "ZUP RS" },
  { n: 12, folder: "komisija-za-hartije-od-vrijednosti-poslovi-nadzora", tsFile: "case-law-administrative-bih-rs-12.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_12", legal_area: "administrative", title: "hartije od vrijednosti — nadzor", label: "hartije od vrijednosti", statuteTag: "ZUP RS" },
  { n: 13, folder: "koncesije-i-podsticaji-u-poljoprivredi", tsFile: "case-law-administrative-bih-rs-13.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_13", legal_area: "administrative", title: "koncesije i podsticaji u poljoprivredi", label: "poljoprivreda", statuteTag: "ZUP RS" },
  { n: 14, folder: "obrazovanje", tsFile: "case-law-administrative-bih-rs-14.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_14", legal_area: "administrative", title: "obrazovanje", label: "obrazovanje", statuteTag: "ZUP RS" },
  { n: 15, folder: "odluke-po-apelacijama", tsFile: "case-law-administrative-bih-rs-odluke-apelacije.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_ODLUKE_APELACIJE", legal_area: "administrative", title: "odluke po apelacijama", label: "apelacija", statuteTag: "ZUP RS" },
  { n: 16, folder: "otpremnina", tsFile: "case-law-administrative-bih-rs-15.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_15", legal_area: "administrative", title: "otpremnina", label: "otpremnina", statuteTag: "ZUP RS" },
  { n: 17, folder: "penzijsko-i-invalidsko-osiguranje", tsFile: "case-law-administrative-bih-rs-16.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_16", legal_area: "administrative", title: "penzijsko i invalidsko osiguranje", label: "PIO", statuteTag: "ZUP RS" },
  { n: 18, folder: "porezi-doprinosi-i-takse", tsFile: "case-law-administrative-bih-rs-17.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_17", legal_area: "administrative", title: "porezi, doprinosi i takse", label: "porezi", statuteTag: "ZUP RS" },
  { n: 19, folder: "porodicno-pravo", tsFile: "case-law-administrative-bih-rs-18.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_18", legal_area: "family", title: "porodično pravo (upravno)", label: "porodično pravo", statuteTag: "PZ RS" },
  { n: 20, folder: "prava-iz-oblasti-djecije-zastite", tsFile: "case-law-administrative-bih-rs-19.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_19", legal_area: "administrative", title: "dječija zaštita", label: "dječija zaštita", statuteTag: "ZUP RS" },
  { n: 21, folder: "prava-iz-zdravstvenog-osiguranja-i-socijalne-zastite", tsFile: "case-law-administrative-bih-rs-20.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_20", legal_area: "administrative", title: "zdravstveno osiguranje i socijalna zaštita", label: "socijalna zaštita", statuteTag: "ZUP RS" },
  { n: 22, folder: "prava-nezaposlenih-lica", tsFile: "case-law-administrative-bih-rs-21.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_21", legal_area: "administrative", title: "prava nezaposlenih lica", label: "nezaposleni", statuteTag: "ZUP RS" },
  { n: 23, folder: "pravna-shvatanja", tsFile: "case-law-administrative-bih-rs-pravna-shvatanja.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_PRAVNA_SHVATANJA", legal_area: "administrative", title: "pravna shvatanja", label: "pravna shvatanja", statuteTag: "ZUP RS" },
  { n: 24, folder: "pristup-informacijama", tsFile: "case-law-administrative-bih-rs-22.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_22", legal_area: "administrative", title: "pristup informacijama", label: "pristup informacijama", statuteTag: "ZUP RS" },
  { n: 25, folder: "privreda", tsFile: "case-law-administrative-bih-rs-23.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_23", legal_area: "administrative", title: "privreda", label: "privreda", statuteTag: "ZUP RS" },
  { n: 26, folder: "saobracaj", tsFile: "case-law-administrative-bih-rs-24.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_24", legal_area: "administrative", title: "saobraćaj", label: "saobraćaj", statuteTag: "ZUP RS" },
  { n: 27, folder: "stambeno-pravo", tsFile: "case-law-administrative-bih-rs-25.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_25", legal_area: "administrative", title: "stambeno pravo", label: "stambeno pravo", statuteTag: "ZUP RS" },
  { n: 28, folder: "statusna-prava", tsFile: "case-law-administrative-bih-rs-26.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_26", legal_area: "administrative", title: "statusna prava", label: "statusna prava", statuteTag: "ZUP RS" },
  { n: 29, folder: "stvarna-prava", tsFile: "case-law-administrative-bih-rs-27.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_27", legal_area: "administrative", title: "stvarna prava", label: "stvarna prava", statuteTag: "ZUP RS" },
  { n: 30, folder: "upravni-postupak", tsFile: "case-law-administrative-bih-rs-28.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_28", legal_area: "administrative", title: "upravni postupak", label: "upravni postupak", statuteTag: "ZUP RS" },
  { n: 31, folder: "upravni-spor", tsFile: "case-law-administrative-bih-rs-29.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_29", legal_area: "administrative", title: "upravni spor", label: "upravni spor", statuteTag: "ZUS RS" },
  { n: 32, folder: "ustavna-prava", tsFile: "case-law-administrative-bih-rs-30.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_30", legal_area: "constitutional", title: "ustavna prava", label: "ustavna prava", statuteTag: "Ustav RS" },
  { n: 33, folder: "uzurpacija", tsFile: "case-law-administrative-bih-rs-31.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_31", legal_area: "administrative", title: "uzurpacija", label: "uzurpacija", statuteTag: "ZUP RS" },
  { n: 34, folder: "vracanje-imovine-stana", tsFile: "case-law-administrative-bih-rs-32.ts", exportName: "CASE_LAW_ADMINISTRATIVE_BIH_RS_32", legal_area: "administrative", title: "vraćanje imovine i stana", label: "vraćanje imovine", statuteTag: "ZUP RS" },
].map((c) => ({
  ...c,
  defaultQ: `Da li je osnovana tužba, žalba ili vanredno preispitivanje u predmetu iz oblasti ${c.title} u upravnom sporu pred sudom RS?`,
  statuteLabel: "Zakon o upravnom postupku RS",
}))

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
  const folderPath = path.join(UPRAVNO, cat.folder)
  if (!fs.existsSync(folderPath)) {
    console.log(`⊘ Category ${cat.n}: folder missing — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const pdfs = listPdfs(folderPath)
  if (pdfs.length === 0) {
    console.log(`⊘ Category ${cat.n}: empty folder — ${cat.folder}`)
    return { ...cat, cases: 0, pdfs: 0, skipped: true }
  }

  const extractDir = path.join(ROOT, "tmp-bih-rs-upravno", `cat-${cat.n}`)
  fs.mkdirSync(extractDir, { recursive: true })

  let done = 0
  for (const pdfPath of pdfs) {
    const base = path.basename(pdfPath, ".pdf").replace(/[^\w\s\-().]/g, "_")
    const outPath = path.join(extractDir, `${base}.txt`)
    if (!fs.existsSync(outPath)) await extractPdf(pdfPath, outPath)
    done++
    if (done % 100 === 0) process.stdout.write(`  [${cat.n}] extracted ${done}/${pdfs.length}\n`)
  }

  const gen = createUpravnoGenerator(cat)
  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH RS Upravno — ${cat.title}.
// Auto-generated from downloads/bih-rs/upravno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  const active = results.filter((r) => !r.skipped && r.cases > 0)
  const imports = active.map((r) => `import { ${r.exportName} } from "./${r.tsFile.replace(/\.ts$/, "")}"`)
  const spreads = active.map((r) => `  ...${r.exportName},`)

  for (const r of results) {
    s = s.replace(new RegExp(`import \\{ ${r.exportName} \\}[^\\n]+\\n`, "g"), "")
    s = s.replace(new RegExp(`\\s+\\.\\.\\.${r.exportName},\\n`, "g"), "")
  }

  if (imports.length > 0) {
    const block = imports.join("\n") + "\n"
    const spreadBlock = spreads.join("\n") + "\n"
    if (s.includes("import { CASE_LAW_CIVIL_BIH_RS_STVARNO }")) {
      s = s.replace(/(import \{ CASE_LAW_CIVIL_BIH_RS_STVARNO \}[^\n]+\n)/, `$1${block}`)
      s = s.replace(
        /(\s+\.\.\.CASE_LAW_CIVIL_BIH_RS_STVARNO,\n)(\s*\])/,
        `$1${spreadBlock}$2`,
      )
    } else {
      s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${block}`)
      s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${spreadBlock}`)
    }
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-rs-upravno.mjs")
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
