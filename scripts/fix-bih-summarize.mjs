#!/usr/bin/env node
/** Fix BiH generator summarize() — remove 450/900 char caps, use full izreka + obrazloženje. */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const dir = path.dirname(fileURLToPath(import.meta.url))
const IMPORT =
  'import { summarizeBihCase } from "./_gen-prepare-text.mjs"\n'

const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("_gen-bih-") && f.endsWith("-lib.mjs"))

const summarizeRe =
  /function summarize\(full, iz\) \{[\s\S]*?\n  \}\n\n  function tsEscape/

for (const f of files) {
  let src = fs.readFileSync(path.join(dir, f), "utf8")
  if (!summarizeRe.test(src)) {
    console.log("skip (no summarize):", f)
    continue
  }

  // Detect fallback template from existing summarize
  const m = src.match(
    /const reasoning = cleanSnippet\(\s*`([^`]+)`/,
  )
  const fallback =
    m?.[1]?.replace(/\s*\$\{full[^}]+\}/, "").trim() ||
    "Sud ocjenjuje predmet primjenjujući važeće propise."

  const replacement = `function summarize(full, iz) {
    const sum = summarizeBihCase(full, iz, ${JSON.stringify(fallback)})
    return {
      legal_question: defaultQ,
      court_position: sum.court_position,
      reasoning: sum.reasoning,
      headnote: sum.headnote,
    }
  }

  function tsEscape`

  src = src.replace(summarizeRe, replacement)

  if (!src.includes("_gen-prepare-text.mjs")) {
    const firstImport = src.match(/^import .+\n/m)
    if (firstImport) {
      src =
        src.slice(0, firstImport.index + firstImport[0].length) +
        IMPORT +
        src.slice(firstImport.index + firstImport[0].length)
    } else {
      src = IMPORT + src
    }
  }

  // Fix broken patch artifact: .replace(..., " ")\n          ,\n        450,
  src = src.replace(
    /\.replace\(\/\\\[\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f\]\/g,\s*" "\)\s*,\s*\n\s*450,\s*\n\s*\)/g,
    '.replace(/[\\x00-\\x08\\x0b\\x0c\\x0e-\\x1f]/g, " "))',
  )

  fs.writeFileSync(path.join(dir, f), src, "utf8")
  console.log("fixed", f)
}
