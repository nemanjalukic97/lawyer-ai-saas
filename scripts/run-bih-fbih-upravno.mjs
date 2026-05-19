/**
 * Process all 22 BiH FBiH Upravno odjeljenje categories from downloads/bih-fbih/upravno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import mammoth from "mammoth"
import {
  createFbihUpravnoGenerator,
  safePdfStem,
} from "./_gen-bih-fbih-upravno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const UPRAVNO = path.join(ROOT, "downloads", "bih-fbih", "upravno")

const CATEGORIES = [
  {
    n: 1,
    folder: "civilne-zrtve-rata",
    tsFile: "case-law-administrative-bih-fbih-1.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_1",
    legal_area: "administrative",
    title: "civilne žrtve rata",
    label: "civilne žrtve rata",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 2,
    folder: "ekologija-energetika",
    tsFile: "case-law-administrative-bih-fbih-2.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_2",
    legal_area: "administrative",
    title: "ekologija i energetika",
    label: "ekologija",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 3,
    folder: "eksproprijacija",
    tsFile: "case-law-administrative-bih-fbih-3.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_3",
    legal_area: "administrative",
    title: "eksproprijacija",
    label: "eksproprijacija",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 4,
    folder: "gradjevinska-odobrenja",
    tsFile: "case-law-administrative-bih-fbih-4.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_4",
    legal_area: "administrative",
    title: "građevinska odobrenja",
    label: "građevinska odobrenja",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 5,
    folder: "gradjevinsko-zemljiste",
    tsFile: "case-law-administrative-bih-fbih-5.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_5",
    legal_area: "administrative",
    title: "građevinsko zemljište",
    label: "građevinsko zemljište",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 6,
    folder: "inspekcijski-nadzor",
    tsFile: "case-law-administrative-bih-fbih-6.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_6",
    legal_area: "administrative",
    title: "inspekcijski nadzor",
    label: "inspekcijski nadzor",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 7,
    folder: "invalidsko-boracka-zastita",
    tsFile: "case-law-administrative-bih-fbih-7.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_7",
    legal_area: "administrative",
    title: "invalidsko i boračka zaštita",
    label: "boračka zaštita",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 8,
    folder: "katastar-i-zemljisna-knjiga",
    tsFile: "case-law-administrative-bih-fbih-8.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_8",
    legal_area: "administrative",
    title: "katastar i zemljišna knjiga",
    label: "katastar",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 9,
    folder: "koncesije-i-podsticaji-u-poljoprivredi",
    tsFile: "case-law-administrative-bih-fbih-9.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_9",
    legal_area: "administrative",
    title: "koncesije i podsticaji u poljoprivredi",
    label: "poljoprivreda",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 10,
    folder: "penzijsko-i-invalidsko-osiguranje",
    tsFile: "case-law-administrative-bih-fbih-10.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_10",
    legal_area: "administrative",
    title: "penzijsko i invalidsko osiguranje",
    label: "PIO",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 11,
    folder: "porezi-doprinosi-i-takse",
    tsFile: "case-law-administrative-bih-fbih-11.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_11",
    legal_area: "administrative",
    title: "porezi, doprinosi i takse",
    label: "porezi",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 12,
    folder: "prava-iz-oblasti-djecije-zastite",
    tsFile: "case-law-administrative-bih-fbih-12.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_12",
    legal_area: "administrative",
    title: "dječija zaštita",
    label: "dječija zaštita",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 13,
    folder: "prava-iz-zdravstvenog-osiguranja-i-socijalne-zastite",
    tsFile: "case-law-administrative-bih-fbih-13.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_13",
    legal_area: "administrative",
    title: "zdravstveno osiguranje i socijalna zaštita",
    label: "socijalna zaštita",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 14,
    folder: "prava-nezaposlenih-lica",
    tsFile: "case-law-administrative-bih-fbih-14.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_14",
    legal_area: "administrative",
    title: "prava nezaposlenih lica",
    label: "nezaposleni",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 15,
    folder: "pregled-po-pravnim-shvatanjima",
    tsFile: "case-law-administrative-bih-fbih-pravna-shvatanja.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_PRAVNA_SHVATANJA",
    legal_area: "administrative",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    statuteTag: "ZUP FBiH",
    defaultQ: "Koje pravno shvatanje je zauzeo Vrhovni sud FBiH u upravnoj materiji?",
  },
  {
    n: 16,
    folder: "stambeno-pravo",
    tsFile: "case-law-administrative-bih-fbih-15.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_15",
    legal_area: "administrative",
    title: "stambeno pravo",
    label: "stambeno pravo",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 17,
    folder: "stvarna-prava",
    tsFile: "case-law-administrative-bih-fbih-16.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_16",
    legal_area: "administrative",
    title: "stvarna prava",
    label: "stvarna prava",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 18,
    folder: "upravni-postupak",
    tsFile: "case-law-administrative-bih-fbih-17.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_17",
    legal_area: "administrative",
    title: "upravni postupak",
    label: "upravni postupak",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 19,
    folder: "upravni-spor",
    tsFile: "case-law-administrative-bih-fbih-18.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_18",
    legal_area: "administrative",
    title: "upravni spor",
    label: "upravni spor",
    statuteTag: "ZUS FBiH",
  },
  {
    n: 20,
    folder: "ustavna-prava",
    tsFile: "case-law-administrative-bih-fbih-19.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_19",
    legal_area: "constitutional",
    title: "ustavna prava",
    label: "ustavna prava",
    statuteTag: "Ustav FBiH",
  },
  {
    n: 21,
    folder: "uzurpacija",
    tsFile: "case-law-administrative-bih-fbih-20.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_20",
    legal_area: "administrative",
    title: "uzurpacija",
    label: "uzurpacija",
    statuteTag: "ZUP FBiH",
  },
  {
    n: 22,
    folder: "vracanje-imovine-stana",
    tsFile: "case-law-administrative-bih-fbih-21.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_FBIH_21",
    legal_area: "administrative",
    title: "vraćanje imovine i stana",
    label: "vraćanje imovine",
    statuteTag: "ZUP FBiH",
  },
].map((c) => ({
  ...c,
  defaultQ:
    c.defaultQ ??
    `Da li je osnovana tužba ili žalba u predmetu iz oblasti ${c.title} u upravnom sporu pred Vrhovnim sudom FBiH?`,
  statuteLabel: "Zakon o upravnom postupku FBiH",
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

function extractOleText(buf) {
  const parts = []
  let i = 0
  while (i < buf.length) {
    const start = i
    while (
      i < buf.length &&
      ((buf[i] >= 0x20 && buf[i] <= 0x7e) || buf[i] === 0x0a || buf[i] === 0x0d)
    ) {
      i++
    }
    if (i - start >= 4) parts.push(buf.slice(start, i).toString("ascii"))
    i++
  }
  for (let j = 0; j < buf.length - 8; j += 2) {
    if (buf[j] >= 0x20 && buf[j] <= 0xff && buf[j + 1] === 0) {
      const start = j
      while (j < buf.length - 1 && buf[j] >= 0x20 && buf[j] <= 0xff && buf[j + 1] === 0) j += 2
      if (j - start >= 16) {
        try {
          parts.push(buf.slice(start, j).toString("utf16le"))
        } catch {
          /* skip */
        }
      }
    }
  }
  return parts.join("\n")
}

async function extractDocument(filePath, outPath) {
  if (!fs.existsSync(filePath)) return { ok: false, chars: 0, error: "missing" }
  try {
    const buf = fs.readFileSync(filePath)
    const b0 = buf[0]
    const b1 = buf[1]
    let full = ""

    if (b0 === 0x25 && b1 === 0x50) {
      const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), disableWorker: true }).promise
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i)
        const tc = await page.getTextContent()
        full += tc.items.map((x) => x.str).join(" ") + "\n"
      }
    } else if (b0 === 0x50 && b1 === 0x4b) {
      const { value } = await mammoth.extractRawText({ buffer: buf })
      full = value
    } else if (b0 === 0xd0 && b1 === 0xcf) {
      full = extractOleText(buf)
    } else {
      return { ok: false, chars: 0, error: "unknown format" }
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

  const extractDir = path.join(ROOT, "tmp-bih-fbih-upravno", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createFbihUpravnoGenerator(cat)
  const fallbackStems = []
  let done = 0
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const result = await extractDocument(pdfPath, outPath)
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
// BiH FBiH Upravno — ${cat.title}.
// Auto-generated from downloads/bih-fbih/upravno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_PROCEDURAL_BIH_FBIH_2 }")) {
    s = s.replace(/(import \{ CASE_LAW_PROCEDURAL_BIH_FBIH_2 \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_PROCEDURAL_BIH_FBIH_2,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
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
