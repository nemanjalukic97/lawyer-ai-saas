import fs from "fs"
import path from "path"

const dir = "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-bih-rs2-extract/batch3"
const skip = new Set(["Kz-211-05 (1).txt"])
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".txt") && !skip.has(f)).sort()

function firstDecisionDate(text) {
  const m = text.match(/Бањ[аa]\s*Лук[аa][^0-9]{0,120}(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})/)
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`
  const m2 = text.match(/(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})\s*\.\s*године/)
  if (m2) return `${m2[3]}-${m2[2].padStart(2, "0")}-${m2[1].padStart(2, "0")}`
  return null
}

function sniffIzreka(t) {
  const head = t.slice(0, 5000)
  if (/Захтјев\s+за\s+заштиту\s+законитости\s+се\s+уважава/i.test(head)) return "zzl_uvazhen"
  if (/Одбацује\s+се\s+захтјев\s+за\s+заштиту\s+законитости\s+као\s+недозвољен/i.test(head))
    return "zzl_odbacen_nedozvoljen"
  if (/Одбија\s+се\s+као\s+неоснован\s+захтјев\s+за\s+заштиту/i.test(head)) return "zzl_odbijen"
  if (/Одбија\s+се\s+захтјев\s+за\s+заштиту\s+законитости/i.test(head)) return "zzl_odbijen"
  if (/Захтјев\s+за\s+заштиту\s+законитости\s+се\s+одбија/i.test(head)) return "zzl_odbijen"
  if (/Одбија\s+се\s+оптужба/i.test(head)) return "optuzba_odbacena_vs"
  if (/укину/i.test(head.slice(0, 1200)) && /поновно\s+суђење/i.test(head.slice(0, 3500))) return "ukidanje_ponovo"
  return "unknown"
}

for (const f of files) {
  const p = path.join(dir, f)
  const t = fs.readFileSync(p, "utf8")
  const kz = /^Kz-/i.test(f)
  if (kz) {
    const dm = t.match(/(\d{1,2})\.(\d{1,2})\.\s*\.?(\d{4})/)
    const d = dm ? `${dm[3]}-${dm[2].padStart(2, "0")}-${dm[1].padStart(2, "0")}` : "year-unknown"
    console.log(`${f}\tKZ\t${d}`)
    continue
  }
  const d = firstDecisionDate(t) || "no-date"
  const iz = sniffIzreka(t)
  console.log(`${f}\tOK\t${d}\t${iz}`)
}
