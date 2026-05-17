import fs from "fs"
import path from "path"

const dir = path.resolve("tmp-bih-rs2-extract/batch2")
const skip = new Set(["13 0 K 000891 13 Kz 2 (1).txt"])
const god = "\u0433\u043e\u0434\u0438\u043d\u0435"
const re = new RegExp(
  `(\\d{1,2})\\s*\\.\\s*(\\d{1,2})\\s*\\.\\s*(\\d{4})\\s*\\.\\s*${god}`,
  "u",
)

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt") && !skip.has(x)).sort()) {
  const s = fs.readFileSync(path.join(dir, f), "utf8")
  const compact = s.slice(0, 3500).replace(/\s+/g, "")
  const reCompact = new RegExp(
    `(\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})\\.${god}`,
    "u",
  )
  const m = compact.match(reCompact)
  let iso = ""
  if (m) iso = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`
  console.log(`${(iso || "(none)").padEnd(12)} ${f}`)
}
