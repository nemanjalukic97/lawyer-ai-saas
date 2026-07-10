import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { repairLegalTextSpacing } from "./_repair-legal-text-spacing.mjs"
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

function prepareLegacy(raw) {
  let s = scrubCyrillicRuns(String(raw ?? ""))
  s = deSpacePdfArtifact(s)
  s = fixDiacriticSpacing(s)
  s = fixHyphenBreaks(s)
  s = fixSyllableBreaks(s)
  return collapseWhitespace(s)
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

const FUSION_RES = [
  /[A-ZČĆŽŠĐ]{3,}[a-zčćžšđ]{2,}/g,
  /[a-zčćžšđ]{3,}i[A-ZČĆŽŠĐ][a-zčćžšđ]{3,}/g,
  /[a-zčćžšđ]{3,}(?:na|za|od|do|sa|u)[A-ZČĆŽŠĐ][a-zčćžšđ]{2,}/g,
  /Bosnei/g,
  /dase\b/gi,
  /suduna/gi,
  /ODBIJAkao/g,
  /kojise/gi,
  /Zakonaop/gi,
]

const entities = [
  ["bih-fbih", "downloads/bih-fbih"],
  ["bih-rs", "downloads/bih-rs"],
  ["bih-brcko", "downloads/bih-brcko"],
]

for (const [label, rel] of entities) {
  const dir = path.join(ROOT, rel)
  const pdfs = walkPdfs(dir)
  const counts = Object.fromEntries(FUSION_RES.map((_, i) => [`re${i}`, 0]))
  let sampled = 0
  for (const pdf of pdfs.slice(0, 200)) {
    // We only have PDFs; read companion .txt if exists else skip content
    const txt = pdf.replace(/\.pdf$/i, ".txt")
    if (!fs.existsSync(txt)) continue
    const before = prepareLegacy(fs.readFileSync(txt, "utf8"))
    sampled++
    for (let i = 0; i < FUSION_RES.length; i++) {
      const m = before.match(FUSION_RES[i])
      if (m) counts[`re${i}`] += m.length
    }
  }
  console.log(`${label}: ${pdfs.length} pdfs, ${sampled} with .txt`)
  console.log(counts)
}
