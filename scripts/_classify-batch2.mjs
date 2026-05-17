import fs from "fs"
import path from "path"

const dir = path.resolve("tmp-bih-rs2-extract/batch2")
const skip = new Set(["13 0 K 000891 13 Kz 2 (1).txt"])
const god = "\u0433\u043e\u0434\u0438\u043d\u0435"

function compactSlice(s, n) {
  return s.slice(0, n).replace(/\s+/g, "")
}

function firstDate(s) {
  const compact = compactSlice(s, 4500)
  const re = new RegExp(`(\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})\\.${god}`, "u")
  const m = compact.match(re)
  if (!m) return ""
  return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`
}

function classify(full) {
  const iz = full.slice(0, 9000)
  const uva =
    /\u0423\u0432\u0430\u0436\u0430\u0432\u0430\s+\u0441\u0435/i.test(iz) ||
    /\u0423\u0432\u0430\u0436\u0435\u043d/i.test(iz)
  const uk =
    /\u0443\u043a\u0438\u043d\u0443\u0442/i.test(iz) ||
    /\u0443\u043a\u0438\u043d\u0443\u0458\u0435/i.test(iz)
  const preina =
    /\u041f\u0440\u0435\u0438\u043d\u0430\u0447/i.test(iz) ||
    /\u043f\u0440\u0435\u0438\u043d\u0430\u0447/i.test(iz)
  const odbija =
    /\u041e\u0434\u0431\u0438\u0458\u0430/i.test(iz) ||
    /\u043e\u0434\u0431\u0438\u0458\u0435\u043d/i.test(iz)

  if (uva && uk && !preina) return "remand_uva" // often ZZL + revoke?
  if (uva && /заштиту\s+законитости/i.test(iz)) return "zzl_uva"
  if (preina && uk) return "remanded_preina"
  if (preina && !uk) return "modified_preina"
  if (uk && !preina) return "remanded"
  if (odbija && !uk && !preina) return "appeal_dismissed"
  return "unknown"
}

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt") && !skip.has(x)).sort()) {
  const full = fs.readFileSync(path.join(dir, f), "utf8")
  const len = full.trim().length
  const date = len < 200 ? "" : firstDate(full)
  const cat = len < 200 ? "SHORT" : classify(full)
  console.log(`${String(len).padStart(6)} ${(date || "(no date)").padEnd(12)} ${cat.padEnd(18)} ${f}`)
}
