/**
 * Ensures every scripts/case-law-*.ts module (except case-law-index.ts) is imported in case-law-index.ts.
 * Run from repo root: npx tsx scripts/verify-case-law-index.ts
 */
import { readdirSync, readFileSync } from "fs"
import { join } from "path"

const scriptsDir = join(process.cwd(), "scripts")
const indexPath = join(scriptsDir, "case-law-index.ts")
const indexContent = readFileSync(indexPath, "utf8")

const files = readdirSync(scriptsDir).filter(
  (f) =>
    f.startsWith("case-law-") &&
    f.endsWith(".ts") &&
    f !== "case-law-index.ts",
)

const missing: string[] = []
for (const f of files) {
  const modulePath = `./${f.replace(/\.ts$/, "")}`
  if (!indexContent.includes(modulePath)) {
    missing.push(f)
  }
}

if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.error(
    "These case-law modules are NOT imported in case-law-index.ts:\n" +
      missing.join("\n"),
  )
  process.exitCode = 1
} else {
  // eslint-disable-next-line no-console
  console.log(
    `OK: ${files.length} case-law module(s) are referenced in case-law-index.ts.`,
  )
}
