/** Remove stale case-law-*-croatia-*.ts before full regen. */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))
let removed = 0
for (const f of fs.readdirSync(scriptsDir)) {
  if (
    f.startsWith("case-law-") &&
    f.endsWith(".ts") &&
    f.includes("croatia")
  ) {
    fs.unlinkSync(path.join(scriptsDir, f))
    removed++
  }
}
console.log(`Removed ${removed} Croatia case-law TS files.`)
