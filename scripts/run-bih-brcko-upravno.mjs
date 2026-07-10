/**
 * Process all 8 BiH Brčko Distrikt Upravno odjeljenje categories from downloads/bih-brcko/upravno/
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import mammoth from "mammoth"
import {
  createBrckoUpravnoGenerator,
  safePdfStem,
} from "./_gen-bih-brcko-upravno-lib.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const UPRAVNO = path.join(ROOT, "downloads", "bih-brcko", "upravno")

const CATEGORIES = [
  {
    n: 1,
    folder: "imovinsko-pravni-odnosi",
    tsFile: "case-law-administrative-bih-brcko-1.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_1",
    legal_area: "administrative",
    title: "imovinsko-pravni odnosi",
    label: "imovinsko-pravni odnosi",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti imovinsko-pravnih odnosa u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 2,
    folder: "inspekcijski-nadzor",
    tsFile: "case-law-administrative-bih-brcko-2.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_2",
    legal_area: "administrative",
    title: "inspekcijski nadzor",
    label: "inspekcijski nadzor",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti inspekcijskog nadzora u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 3,
    folder: "pravna-shvatanja",
    tsFile: "case-law-administrative-bih-brcko-3.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_3",
    legal_area: "administrative",
    title: "pravna shvatanja",
    label: "pravna shvatanja",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Koje je pravno shvatanje Apelacionog suda Brčko Distrikta BiH u upravnom predmetu?",
  },
  {
    n: 4,
    folder: "sloboda-pristupa-informacijama",
    tsFile: "case-law-administrative-bih-brcko-4.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_4",
    legal_area: "administrative",
    title: "sloboda pristupa informacijama",
    label: "sloboda pristupa informacijama",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti slobode pristupa informacijama u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 5,
    folder: "sukob-interesa",
    tsFile: "case-law-administrative-bih-brcko-5.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_5",
    legal_area: "administrative",
    title: "sukob interesa",
    label: "sukob interesa",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti sukoba interesa u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 6,
    folder: "upravni-postupak",
    tsFile: "case-law-administrative-bih-brcko-6.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_6",
    legal_area: "administrative",
    title: "upravni postupak",
    label: "upravni postupak",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti upravnog postupka pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 7,
    folder: "upravni-spor",
    tsFile: "case-law-administrative-bih-brcko-7.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_7",
    legal_area: "administrative",
    title: "upravni spor",
    label: "upravni spor",
    statuteTag: "ZUS Brčko",
    statuteLabel: "Zakon o upravnim sporovima Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
  },
  {
    n: 8,
    folder: "vozacka-dozvola",
    tsFile: "case-law-administrative-bih-brcko-8.ts",
    exportName: "CASE_LAW_ADMINISTRATIVE_BIH_BRCKO_8",
    legal_area: "administrative",
    title: "vozačka dozvola",
    label: "vozačka dozvola",
    statuteTag: "ZUP Brčko",
    statuteLabel: "Zakon o upravnom postupku Brčko Distrikta BiH",
    defaultQ:
      "Da li je osnovana tužba ili žalba u predmetu iz oblasti vozačke dozvole u upravnom sporu pred Apelacionim sudom Brčko Distrikta BiH?",
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

  const extractDir = path.join(ROOT, "tmp-bih-brcko-upravno", `cat-${cat.n}`)
  if (fs.existsSync(extractDir)) fs.rmSync(extractDir, { recursive: true, force: true })
  fs.mkdirSync(extractDir, { recursive: true })

  const gen = createBrckoUpravnoGenerator(cat)
  const fallbackStems = []
  for (const pdfPath of pdfs) {
    const base = safePdfStem(pdfPath)
    const stem = gen.normCase(`${base}.txt`)
    const outPath = path.join(extractDir, `${base}.txt`)
    const result = await extractDocument(pdfPath, outPath)
    if (!result.ok || result.chars < 200) fallbackStems.push(stem)
  }

  const txtFiles = fs
    .readdirSync(extractDir)
    .filter((f) => f.endsWith(".txt") && f !== "_summary.json")
  const skip = dedupeSkipSet(txtFiles, gen.normCase)
  const { blocks } = gen.generateBlocks(extractDir, skip, fallbackStems)

  const tsPath = path.join(ROOT, "scripts", cat.tsFile)
  const header = `// scripts/${cat.tsFile}
// BiH Brčko Upravno — ${cat.title}.
// Auto-generated from downloads/bih-brcko/upravno/${cat.folder}/ (${blocks.length} cases, ${pdfs.length} PDFs)

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

  if (s.includes("import { CASE_LAW_ADMINISTRATIVE_BIH_FBIH_1 }")) {
    s = s.replace(
      /(import \{ CASE_LAW_ADMINISTRATIVE_BIH_FBIH_1 \}[^\n]+\n)/,
      `${newImports}\n$1`,
    )
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_PROCEDURAL_BIH_FBIH_2,)(\n\s+\.\.\.CASE_LAW_ADMINISTRATIVE_BIH_FBIH_1,)/,
      `$1\n${newSpreads}$2`,
    )
  } else if (s.includes("import { CASE_LAW_PROCEDURAL_BIH_FBIH_2 }")) {
    s = s.replace(/(import \{ CASE_LAW_PROCEDURAL_BIH_FBIH_2 \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(
      /(\s+\.\.\.CASE_LAW_PROCEDURAL_BIH_FBIH_2,)(\n?\])/,
      `$1\n${newSpreads}$2`,
    )
  } else {
    s = s.replace(/(import type \{ CaseLawInput \}[^\n]+\n)/, `$1${newImports}\n`)
    s = s.replace(/(export const ALL_CASE_LAW[^=]+= \[\n)/, `$1${newSpreads}\n`)
  }

  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)
  assertCaseLawIndexSpreads(s, _spreadNames, "run-bih-brcko-upravno.mjs")
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
