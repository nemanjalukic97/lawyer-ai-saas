import fs from "fs"
import path from "path"

const dir = path.resolve("tmp-bih-rs2-extract/batch2")
const skip = new Set(["13 0 K 000891 13 Kz 2 (1).txt"])

function snippet(full) {
  const compact = full.slice(0, 6500)
  const markers = [
    /\u041f\s*\u0420\s*\u0415\s*\u0421\s*\u0423\s*\u0414\s*\u0423/u,
    /\u0420\s*\u0408\s*\u0415\s*\u0428\s*\u0415\s*\u040a\s*\u0415/u,
    /\u041f\s*\u0420\s*\u0415\s*\u0421\s*\u0423\s*\u0414/u,
  ]
  let idx = -1
  for (const re of markers) {
    const m = compact.match(re)
    if (m && m.index != null && (idx === -1 || m.index < idx)) idx = m.index
  }
  if (idx === -1) return compact.slice(0, 1200)
  const after = full.slice(idx, idx + 1400)
  const obr =
    after.search(/\u041e\s*\u0431\s*\u0440\s*\u0430\s*\u0437\s*\u043b\s*\u043e\s*\u0436/u)
  const cut = obr > 80 ? after.slice(0, obr) : after.slice(0, 900)
  return cut.replace(/\s+/g, " ").trim()
}

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt") && !skip.has(x)).sort()) {
  const full = fs.readFileSync(path.join(dir, f), "utf8")
  console.log("\n### " + f + "\n" + snippet(full).slice(0, 700) + "\n")
}
