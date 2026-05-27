#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const dir = path.dirname(fileURLToPath(import.meta.url))
for (const f of fs.readdirSync(dir).filter((x) => x.startsWith("_gen-bih-") && x.endsWith(".mjs"))) {
  let s = fs.readFileSync(path.join(dir, f), "utf8")
  const before = s
  s = s.replace(
    /summarizeBihCase\(full, iz, "([^"]*\$\{[^"]+)"/g,
    "summarizeBihCase(full, iz, `$1`",
  )
  s = s.replace(/\.slice\(0,\s*420\)\s*\n\s*\.replace/g, "\n            .replace")
  if (s !== before) {
    fs.writeFileSync(path.join(dir, f), s, "utf8")
    console.log("fixed", f)
  }
}
