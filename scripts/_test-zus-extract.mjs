import fs from "fs"
import path from "path"

const root = path.join(import.meta.dirname, "..")
const full = fs.readFileSync(path.join(root, "tmp-zus-si-fulltext.txt"), "utf8")
const startMarker = "Z A K O N O UPRAVNEM SPORU (ZUS-1)"
const i0 = full.indexOf(startMarker)
const iEnd = full.indexOf("4488.", i0)
const slice = full.slice(i0, iEnd)
// eslint-disable-next-line no-console
console.log("slice len", slice.length, "start", i0, "end", iEnd)

function extractZusClen(s, num) {
  const re = new RegExp(`(?:^|\\s)${num}\\.\\s+člen\\s([\\s\\S]*?)(?=(?:^|\\s)\\d+\\.\\s+člen\\s)`)
  const m = s.match(re)
  return m ? m[1].trim() : null
}

for (const n of [1, 2, 18, 28, 65, 73]) {
  const t = extractZusClen(slice, n)
  // eslint-disable-next-line no-console
  console.log("---", n, t ? t.slice(0, 120) + "..." : "MISSING")
}
