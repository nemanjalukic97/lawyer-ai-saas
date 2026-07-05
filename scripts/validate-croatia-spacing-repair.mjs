/**
 * Sample Croatian downloads: compare prepareText before/after spacing repair.
 * Run: node scripts/validate-croatia-spacing-repair.mjs
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
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
const CROATIA = path.join(ROOT, "downloads", "croatia")

/** prepareText without spacing repair (pre-Phase-A behaviour). */
function prepareTextLegacy(raw) {
  if (!raw) return ""
  let s = scrubCyrillicRuns(String(raw))
  s = deSpacePdfArtifact(s)
  s = fixDiacriticSpacing(s)
  s = fixHyphenBreaks(s)
  s = fixSyllableBreaks(s)
  return collapseWhitespace(s)
}

function prepareTextNew(raw) {
  return repairLegalTextSpacing(prepareTextLegacy(raw))
}

function walkTxtFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walkTxtFiles(p, acc)
    else if (ent.name.endsWith(".txt")) acc.push(p)
  }
  return acc
}

function seededSample(files, n, seed = 42) {
  const copy = [...files]
  let s = seed
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

function diffSnippets(before, after, max = 3) {
  const snippets = []
  const re = /.{0,40}(?:sudau|sudau|presudioje|riješioje|Odbijase|Zakonaoparničnom|prvostupanjskisud|Trgovačkog sudau|u[A-ZČĆŽŠĐ][a-zčćžšđ]+).{0,40}/g
  let m
  while ((m = re.exec(before)) !== null && snippets.length < max) {
    const frag = m[0]
    const idx = before.indexOf(frag)
    const b = before.slice(Math.max(0, idx - 20), idx + frag.length + 20)
    const a = after.slice(Math.max(0, idx - 20), idx + frag.length + 40)
    snippets.push({ before: b, after: a })
  }
  if (snippets.length === 0 && before !== after) {
    for (let i = 0; i < Math.min(before.length, after.length); i++) {
      if (before[i] !== after[i]) {
        snippets.push({
          before: before.slice(Math.max(0, i - 30), i + 50),
          after: after.slice(Math.max(0, i - 30), i + 50),
        })
        break
      }
    }
  }
  return snippets
}

const PROTECTED = [
  /UsI-\d+/i,
  /Usi-\d+/i,
  /Rev-\d+/i,
  /Revr-\d+/i,
  /Gž-\d+/i,
  /Povrv-\d+/i,
  /St-\d+/i,
]

function findProtected(text) {
  const hits = []
  for (const re of PROTECTED) {
    const m = text.match(re)
    if (m) hits.push(m[0])
  }
  return hits
}

const all = walkTxtFiles(CROATIA)
const sample = seededSample(all, 50)
let changed = 0
const examples = []
const regressions = []

for (const file of sample) {
  const raw = fs.readFileSync(file, "utf8")
  const before = prepareTextLegacy(raw)
  const after = prepareTextNew(raw)
  if (before === after) continue
  changed++

  const protBefore = findProtected(before)
  const protAfter = findProtected(after)
  for (const p of protBefore) {
    if (!after.includes(p)) {
      regressions.push({ file: path.relative(ROOT, file), lost: p })
    }
  }

  if (examples.length < 12) {
    examples.push({
      file: path.relative(ROOT, file),
      snippets: diffSnippets(before, after),
      protected: protAfter,
    })
  }
}

console.log(`Sampled ${sample.length} of ${all.length} Croatian .txt files`)
console.log(`Changed by spacing repair: ${changed}`)
console.log(`Protected-pattern regressions: ${regressions.length}`)
if (regressions.length) {
  for (const r of regressions) console.log(`  REGRESSION ${r.file}: lost "${r.lost}"`)
}

console.log("\n=== Before / after examples ===\n")
for (const ex of examples) {
  console.log(`--- ${ex.file} ---`)
  if (ex.protected.length) console.log(`  (protected kept: ${ex.protected.join(", ")})`)
  for (const sn of ex.snippets) {
    console.log(`  BEFORE: …${sn.before}…`)
    console.log(`  AFTER:  …${sn.after}…`)
    console.log("")
  }
}
