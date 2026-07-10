import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptsDir = __dirname

for (const file of fs.readdirSync(scriptsDir).filter((f) => f.startsWith("run-bih-") && f.endsWith(".mjs"))) {
  const p = path.join(scriptsDir, file)
  let s = fs.readFileSync(p, "utf8")
  if (s.includes("_case-law-index-guard.mjs")) {
    console.log(`skip ${file} (already patched)`)
    continue
  }
  if (!s.includes("function updateIndex")) {
    console.log(`skip ${file} (no updateIndex)`)
    continue
  }
  if (!s.includes('import { fileURLToPath } from "url"')) {
    console.log(`skip ${file} (no url import)`)
    continue
  }
  s = s.replace(
    'import { fileURLToPath } from "url"',
    'import { fileURLToPath } from "url"\nimport { assertCaseLawIndexSpreads } from "./_case-law-index-guard.mjs"',
  )
  s = s.replace(
    /(\n  fs\.writeFileSync\(indexPath, s, "utf8"\)\n\})/,
    `\n  const _spreadNames = (typeof active !== "undefined" ? active : results.filter((r) => !r.skipped && r.cases > 0)).map((r) => r.exportName)\n  assertCaseLawIndexSpreads(s, _spreadNames, "${file}")\n  fs.writeFileSync(indexPath, s, "utf8")\n}`,
  )
  fs.writeFileSync(p, s, "utf8")
  console.log(`patched ${file}`)
}
