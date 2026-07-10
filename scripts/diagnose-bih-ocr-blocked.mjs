/**
 * Quantify OCR-blocked / garbage-extraction PDFs per BiH jurisdiction (diagnose only).
 * Run: node scripts/diagnose-bih-ocr-blocked.mjs
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs"
import {
  scrubCyrillicRuns,
  deSpacePdfArtifact,
  fixDiacriticSpacing,
  fixHyphenBreaks,
  fixSyllableBreaks,
  collapseWhitespace,
} from "./_gen-prepare-text.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const MIN_CHARS = 200
const MIN_LETTER_RATIO = 0.35

const ENTITIES = [
  { id: "bih_fbih", dir: "downloads/bih-fbih" },
  { id: "bih_rs", dir: "downloads/bih-rs" },
  { id: "bih_brcko", dir: "downloads/bih-brcko" },
]

function prepareRaw(raw) {
  let s = scrubCyrillicRuns(String(raw ?? ""))
  s = deSpacePdfArtifact(s)
  s = fixDiacriticSpacing(s)
  s = fixHyphenBreaks(s)
  s = fixSyllableBreaks(s)
  return collapseWhitespace(s)
}

function letterRatio(s) {
  const letters = (s.match(/[A-Za-zČĆĐŠŽčćđšž]/g) ?? []).length
  return s.length ? letters / s.length : 0
}

function walkPdfs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walkPdfs(p, acc)
    else if (/\.pdf$/i.test(ent.name)) acc.push(p)
  }
  return acc
}

async function extractPdfText(pdfPath) {
  const buf = fs.readFileSync(pdfPath)
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf), disableWorker: true }).promise
  let full = ""
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const tc = await page.getTextContent()
    full += tc.items.map((x) => x.str).join(" ") + "\n"
  }
  return full
}

for (const entity of ENTITIES) {
  const dir = path.join(ROOT, entity.dir)
  const pdfs = walkPdfs(dir)
  let empty = 0
  let garbage = 0
  let ok = 0
  let extractFail = 0
  const samples = { empty: [], garbage: [] }

  for (const pdf of pdfs) {
    let raw
    try {
      raw = await extractPdfText(pdf)
    } catch {
      extractFail++
      continue
    }
    const text = prepareRaw(raw)
    const rel = path.relative(ROOT, pdf)
    if (text.length < MIN_CHARS) {
      empty++
      if (samples.empty.length < 5) samples.empty.push(rel)
    } else if (letterRatio(text) < MIN_LETTER_RATIO) {
      garbage++
      if (samples.garbage.length < 5) samples.garbage.push(rel)
    } else {
      ok++
    }
  }

  const blocked = empty + garbage + extractFail
  const pct = pdfs.length ? ((blocked / pdfs.length) * 100).toFixed(1) : "0.0"

  console.log(`\n=== ${entity.id} ===`)
  console.log(`Total PDFs: ${pdfs.length}`)
  console.log(`OK extraction: ${ok}`)
  console.log(`Near-empty (<${MIN_CHARS} chars): ${empty}`)
  console.log(`Low letter ratio (<${MIN_LETTER_RATIO}): ${garbage}`)
  console.log(`Extract failures: ${extractFail}`)
  console.log(`Blocked subset (OCR candidates): ${blocked} (${pct}%)`)
  if (samples.empty.length) {
    console.log("  empty samples:", samples.empty.join("; "))
  }
  if (samples.garbage.length) {
    console.log("  garbage samples:", samples.garbage.join("; "))
  }
}
