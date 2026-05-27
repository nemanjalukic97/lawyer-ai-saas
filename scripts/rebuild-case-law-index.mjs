/**
 * Rebuild scripts/case-law-index.ts from all case-law-*.ts export constants.
 * Run: node scripts/rebuild-case-law-index.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const scriptsDir = __dirname

const files = fs
  .readdirSync(scriptsDir)
  .filter(
    (f) =>
      f.startsWith("case-law-") &&
      f.endsWith(".ts") &&
      f !== "case-law-index.ts",
  )
  .sort((a, b) => a.localeCompare(b))

const modules = []
for (const f of files) {
  const content = fs.readFileSync(path.join(scriptsDir, f), "utf8")
  const m = /export const (CASE_LAW_[A-Z0-9_]+)/.exec(content)
  if (!m) {
    console.warn(`Skip (no export): ${f}`)
    continue
  }
  modules.push({ file: f, exportName: m[1], stem: f.replace(/\.ts$/, "") })
}

const imports = modules
  .map((m) => `import { ${m.exportName} } from "./${m.stem}"`)
  .join("\n")
const spreads = modules.map((m) => `  ...${m.exportName},`).join("\n")

const out = `// scripts/case-law-index.ts
// Auto-rebuilt by scripts/rebuild-case-law-index.mjs — do not hand-edit imports/spreads.

import type { CaseLawInput } from "./ingest-case-law"
${imports}

export const ALL_CASE_LAW: CaseLawInput[] = [
${spreads}
]
`

fs.writeFileSync(path.join(scriptsDir, "case-law-index.ts"), out, "utf8")
console.log(`Rebuilt case-law-index.ts with ${modules.length} modules.`)
