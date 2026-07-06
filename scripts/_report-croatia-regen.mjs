/**
 * Post-regen Croatia stats + spacing spot-check.
 * Run: node scripts/_report-croatia-regen.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "node:url"
import { createHash } from "crypto"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SCRIPTS = __dirname

function fingerprint(c) {
  return createHash("sha256")
    .update([c.legal_question, c.court_position, c.reasoning].join("\n\n"))
    .digest("hex")
}

const files = fs
  .readdirSync(SCRIPTS)
  .filter((f) => f.startsWith("case-law-") && f.includes("croatia") && f.endsWith(".ts"))
  .sort()

const byArea = {}
let total = 0
const cases = []

for (const f of files) {
  const content = fs.readFileSync(path.join(SCRIPTS, f), "utf8")
  const exportM = /export const (CASE_LAW_\w+)/.exec(content)
  if (!exportM) continue
  // Dynamic import would need tsx; parse legal_area from blocks
  const blocks = content.match(/legal_area:\s*"(\w+)"/g) ?? []
  for (const b of blocks) {
    const area = /"(\w+)"/.exec(b)[1]
    byArea[area] = (byArea[area] ?? 0) + 1
    total++
  }
  // collect sample cases with fused patterns fixed
  const caseNumM = [...content.matchAll(/case_number:\s*"([^"]+)"/g)]
  const cpM = [...content.matchAll(/court_position:\s*\n\s*"([^"]{0,200})/g)]
  for (let i = 0; i < caseNumM.length; i++) {
    cases.push({
      file: f,
      case_number: caseNumM[i][1],
      court_position: cpM[i]?.[1] ?? "",
    })
  }
}

console.log("=== Croatia regenerated totals ===")
console.log(`TS files: ${files.length}`)
console.log(`Cases in index: ${total}`)
for (const [a, n] of Object.entries(byArea).sort((x, y) => y[1] - x[1])) {
  console.log(`  ${a}: ${n}`)
}

// Spacing spot-check: entries that should have "suda u" not "sudau"
const spacingGood = cases.filter(
  (c) =>
    /suda u [A-ZČĆŽŠĐ]/.test(c.court_position) ||
    /presudio je/.test(c.court_position) ||
    /Odbija se/.test(c.court_position),
)
const spacingBad = cases.filter(
  (c) =>
    /sudau[A-ZČĆŽŠĐ]/.test(c.court_position) ||
    /presudioje/.test(c.court_position) ||
    /Odbijase/.test(c.court_position),
)

console.log("\n=== Spacing repair in TS output ===")
console.log(`Good patterns (sample pool): ${spacingGood.length}`)
console.log(`Bad fused patterns remaining: ${spacingBad.length}`)

const picks = [
  cases.find((c) => /Trgovačkog|Općinskog|Županijskog/.test(c.court_position) && /suda u/.test(c.court_position)),
  cases.find((c) => /presudio je/i.test(c.court_position)),
  cases.find((c) => /Odbija se/.test(c.court_position)),
].filter(Boolean)

for (const p of picks.slice(0, 3)) {
  console.log(`\n--- ${p.case_number} (${p.file}) ---`)
  console.log(`court_position: ${p.court_position.slice(0, 220)}…`)
}

// Index orphan check
const index = fs.readFileSync(path.join(SCRIPTS, "case-law-index.ts"), "utf8")
const importStems = [...index.matchAll(/from "\.\/(case-law-[^"]+)"/g)].map((m) => m[1] + ".ts")
const croatiaImports = importStems.filter((s) => s.includes("croatia"))
const missing = croatiaImports.filter((s) => !fs.existsSync(path.join(SCRIPTS, s)))
const orphans = files.filter((f) => !importStems.includes(f.replace(/\.ts$/, "").replace(/^/, "") && false))
const orphanFiles = files.filter((f) => {
  const stem = f.replace(/\.ts$/, "")
  return !index.includes(`"./${stem}"`)
})
console.log("\n=== Index wiring ===")
console.log(`Croatia imports in index: ${croatiaImports.length}`)
console.log(`Croatia TS files on disk: ${files.length}`)
console.log(`Missing import targets: ${missing.length}`)
console.log(`Orphan TS files (not in index): ${orphanFiles.length}`)
if (orphanFiles.length) console.log(orphanFiles.slice(0, 5))
