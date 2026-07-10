/**
 * Sample BiH downloads: compare prepareText before/after extended spacing repair.
 * Run: node scripts/validate-bih-spacing-repair.mjs
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
import { repairLegalTextSpacing } from "./_repair-legal-text-spacing.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const ENTITIES = [
  { id: "bih_fbih", dir: "downloads/bih-fbih" },
  { id: "bih_rs", dir: "downloads/bih-rs" },
  { id: "bih_brcko", dir: "downloads/bih-brcko" },
]

const BIH_BAD_RE =
  /BosneiHercegovine|Bosnei\s+Hercegovine|dase\b|kojise\b|suduna\b|ODBIJAkao|Zakonaop[a-zčćžšđ]|PRESUDUODBIJA|UTVRĐUJESE|nijeuskladusa|prijedlogza\b|podnioje\b/gi

const PROTECTED = [
  /UsI-\d+/i,
  /Rev-\d+/i,
  /Gž-\d+/i,
  /Rsž-\d+/i,
  /Gžž-\d+/i,
]

function prepareTextLegacy(raw) {
  let s = scrubCyrillicRuns(String(raw ?? ""))
  s = deSpacePdfArtifact(s)
  s = fixDiacriticSpacing(s)
  s = fixHyphenBreaks(s)
  s = fixSyllableBreaks(s)
  return collapseWhitespace(s)
}

function prepareTextNew(raw) {
  return repairLegalTextSpacing(prepareTextLegacy(raw))
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

function seededSample(files, n, seed) {
  const copy = [...files]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

function findProtected(text) {
  const hits = []
  for (const re of PROTECTED) {
    const m = text.match(re)
    if (m) hits.push(m[0])
  }
  return hits
}

function diffSnippets(before, after, max = 3) {
  const snippets = []
  let m
  const re = BIH_BAD_RE
  while ((m = re.exec(before)) !== null && snippets.length < max) {
    const frag = m[0]
    const idx = before.indexOf(frag, Math.max(0, m.index - 1))
    snippets.push({
      needle: frag,
      before: before.slice(Math.max(0, idx - 25), idx + frag.length + 25),
      after: after.slice(Math.max(0, idx - 25), idx + frag.length + 35),
    })
  }
  if (snippets.length === 0 && before !== after) {
    for (let i = 0; i < Math.min(before.length, after.length); i++) {
      if (before[i] !== after[i]) {
        snippets.push({
          needle: "(first diff)",
          before: before.slice(Math.max(0, i - 30), i + 50),
          after: after.slice(Math.max(0, i - 30), i + 50),
        })
        break
      }
    }
  }
  return snippets
}

let totalRegressions = 0

for (const entity of ENTITIES) {
  const dir = path.join(ROOT, entity.dir)
  const pdfs = walkPdfs(dir)
  const sample = seededSample(pdfs, 50, entity.id.length * 97)
  let changed = 0
  let badBefore = 0
  let badAfter = 0
  const examples = []
  const regressions = []

  for (const pdf of sample) {
    let raw
    try {
      raw = await extractPdfText(pdf)
    } catch {
      continue
    }
    const before = prepareTextLegacy(raw)
    const after = prepareTextNew(raw)
    if (before === after) continue
    changed++

    const bHits = before.match(BIH_BAD_RE)?.length ?? 0
    const aHits = after.match(BIH_BAD_RE)?.length ?? 0
    badBefore += bHits
    badAfter += aHits

    for (const p of findProtected(before)) {
      if (!after.includes(p)) {
        regressions.push({ file: path.relative(ROOT, pdf), lost: p })
      }
    }

    if (examples.length < 8) {
      examples.push({
        file: path.relative(ROOT, pdf),
        snippets: diffSnippets(before, after),
        badBefore: bHits,
        badAfter: aHits,
      })
    }
  }

  totalRegressions += regressions.length

  console.log(`\n=== ${entity.id} ===`)
  console.log(`PDFs on disk: ${pdfs.length}`)
  console.log(`Sampled: ${sample.length}`)
  console.log(`Changed by repair: ${changed}`)
  console.log(`BiH bad-pattern hits (before → after): ${badBefore} → ${badAfter}`)
  console.log(`Protected-pattern regressions: ${regressions.length}`)
  if (regressions.length) {
    for (const r of regressions) console.log(`  REGRESSION ${r.file}: lost "${r.lost}"`)
  }

  console.log("\nRepresentative before/after:")
  for (const ex of examples.slice(0, 6)) {
    console.log(`--- ${ex.file} (bad ${ex.badBefore}→${ex.badAfter}) ---`)
    for (const sn of ex.snippets) {
      console.log(`  [${sn.needle}]`)
      console.log(`  BEFORE: …${sn.before}…`)
      console.log(`  AFTER:  …${sn.after}…`)
      console.log("")
    }
  }
}

console.log(`\nTotal protected regressions across BiH samples: ${totalRegressions}`)
