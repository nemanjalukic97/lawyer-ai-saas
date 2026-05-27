#!/usr/bin/env node
/** Use full obrazloženje in BiH RS batch/category summarizeNumbered. */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const dir = path.dirname(fileURLToPath(import.meta.url))
const IMPORT = 'import { summarizeCyrillicCase } from "./_gen-prepare-text.mjs"\n'

const summarizeRe =
  /function summarizeNumbered\(full, izrekaCyr\) \{[\s\S]*?return \{ legal_question:[\s\S]*?headnote:[^\n]+\s*\}\n\}/

const replacement = `function summarizeNumbered(full, izrekaCyr) {
  const lat = fixIjTerms(cyrToLatin(full))
  const dq = categoryLegalQuestion(lat)
  const sum = summarizeCyrillicCase(
    full,
    izrekaCyr,
    (s) => fixIjTerms(scrubCyrillicRuns(cyrToLatin(s))),
    "Sud ocjenjuje žalbene ili ZZL prigovore u predmetima krivičnih djela protiv službene dužnosti (zloupotreba službenog položaja, primanje mita, nesavjesno postupanje službenog lica, čl. 379–385. KZ RS), uključujući dokaz o službenom položaju, namjeri, protivpravnosti i postupovne povrede iz čl. 350–356. ZKOP RS.",
  )
  return {
    legal_question: scrubCyrillicRuns(dq),
    court_position: sum.court_position,
    reasoning: sum.reasoning,
    headnote: sum.headnote,
  }
}`

for (const f of fs.readdirSync(dir)) {
  if (!/^(_gen-bih-rs\d+-batch|_gen-bih-rs-category-lib)\.mjs$/.test(f)) continue
  let s = fs.readFileSync(path.join(dir, f), "utf8")
  if (!summarizeRe.test(s)) {
    console.log("skip", f)
    continue
  }
  s = s.replace(summarizeRe, replacement)
  if (!s.includes("summarizeCyrillicCase")) {
    const m = s.match(/^import .+\n/m)
    if (m) s = s.slice(0, m.index + m[0].length) + IMPORT + s.slice(m.index + m[0].length)
    else s = IMPORT + s
  }
  fs.writeFileSync(path.join(dir, f), s, "utf8")
  console.log("fixed", f)
}
