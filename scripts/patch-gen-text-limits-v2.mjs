#!/usr/bin/env node
/** Second pass: regex izreka caps, Montenegro summarize, BiH RS reasoning, Brčko ocjene cap. */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const dir = path.dirname(fileURLToPath(import.meta.url))
const files = fs.readdirSync(dir).filter((f) => f.startsWith("_gen") && f.endsWith(".mjs"))

const MONTENEGRO_SUMMARIZE = `function summarize(full, izrekaRaw, caseNum, legal_area) {
  const cp =
    prepareText(izrekaRaw).replace(
      /^\\s*(P\\s*R\\s*E\\s*S\\s*U\\s*D\\s*U|R\\s*J\\s*E\\s*Š\\s*E\\s*N\\s*J\\s*E)\\s*/i,
      "",
    ) || prepareText(full)
  const obraz = extractObrazlozenje(full)
  const statute = statuteLabel(legal_area)
  const reasoning =
    obraz.length >= 120
      ? obraz
      : \`\${COURT} odlučuje u predmetu \${caseNum}, primjenjujući \${statute} i povezane procesne propise.\`
  const head = cp.slice(0, 160) || prepareText(full).slice(0, 200)
  return {
    legal_question: extractLegalQuestion({ body: full, izreka: izrekaRaw, prepareText }),
    court_position: cp,
    reasoning,
    headnote: head,
  }
}`

for (const f of files) {
  if (f === "_gen-prepare-text.mjs" || f.includes("patch-gen")) continue
  let s = fs.readFileSync(path.join(dir, f), "utf8")
  const before = s

  s = s.replace(/\[\s\\s\\S\]\{0,\s*1200\}/g, "[\\s\\S]*")
  s = s.replace(/return chunk\.slice\(start,\s*start\s*\+\s*2500\)/g, "return prepareText(chunk.slice(start))")
  s = s.replace(/return chunk\.slice\(start,\s*start\s*\+\s*1800\)/g, "return chunk.slice(start)")

  if (/^function summarize\(full, izrekaRaw, caseNum, legal_area\)/m.test(s) && f.startsWith("_gen-montenegro-") && f !== "_gen-montenegro-apelacioni-lib.mjs") {
    s = s.replace(/function summarize\(full, izrekaRaw, caseNum, legal_area\) \{[\s\S]*?\n\}/m, MONTENEGRO_SUMMARIZE.replace("COURT", f.includes("vrhovni") ? "Vrhovni sud Crne Gore" : f.includes("upravni") ? "Upravni sud Crne Gore" : f.includes("privredni") ? "Privredni sud Crne Gore" : "Apelacioni sud Crne Gore"))
  }

  if (s !== before) {
    if (s.includes("prepareText(") && !s.includes("_gen-prepare-text.mjs")) {
      const imp = 'import { prepareText, extractObrazlozenje } from "./_gen-prepare-text.mjs"\n'
      const m = s.match(/^import .+\n/m)
      if (m) s = s.slice(0, m.index + m[0].length) + imp + s.slice(m.index + m[0].length)
      else s = imp + s
    }
    fs.writeFileSync(path.join(dir, f), s, "utf8")
    console.log("patched", f)
  }
}

console.log("v2 done")
