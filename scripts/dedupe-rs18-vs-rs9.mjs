import fs from "fs"

function normCaseNumber(s) {
  let x = String(s).replace(/_/g, " ").replace(/\s+/g, " ").trim()
  x = x.replace(/^(\d{2})\s+0\s+(\d)/, "$1 0 K $2")
  x = x.replace(/^11 0 (\d)/, "11 0 K $1")
  x = x.replace(/\s(\d{2})\s+vlz\b/i, " $1 Kvlz")
  x = x.replace(/\s(\d{2})\s+([zž])\s+(\d+)/i, " $1 K$2 $3")
  x = x.replace(/\s(\d{2})\s+K\s*$/i, " $1 Kz")
  x = x.replace(/\s(\d{2})\s+K\s+(\d+)\s*$/i, " $1 Kz $2")
  x = x.replace(/118\s*0\s*K\s*_/gi, "118-0-Kz-")
  x = x.replace(/118-0-K-\s*/gi, "118-0-Kz-")
  x = x.replace(/118-0-K__-/gi, "118-0-Kzz-")
  x = x.replace(/118-0-K__\s*/gi, "118-0-Kzz-")
  x = x.replace(/K-\s*(\d)/gi, "Kz-$1")
  x = x.replace(/\s+K\s*_\s*(\d)/gi, " Kz $1")
  x = x.replace(/\bK\s+(\d+)\s*$/i, "Kz $1")
  x = x.replace(/K\s+z\s+/gi, "Kzz ")
  x = x.replace(/\.DOC$/i, "")
  x = x.replace(/\s+-\s+anonimizirana\.?/gi, " - anonimizirana")
  x = x.replace(/\s+[a-f0-9]{8}$/i, "")
  x = x.replace(/__+[a-f0-9]+$/i, "")
  return x.toLowerCase().replace(/\s+/g, " ").trim()
}

function extractCaseNumbers(content) {
  const re = /case_number:\s*"([^"]+)"/g
  const out = []
  let m
  while ((m = re.exec(content))) out.push({ raw: m[1], norm: normCaseNumber(m[1]) })
  return out
}

function splitObjects(content) {
  const arrStart = content.indexOf("[", content.indexOf("export const CASE_LAW"))
  const body = content.slice(arrStart + 1)
  const blocks = []
  let depth = 0
  let objStart = -1
  for (let i = 0; i < body.length; i++) {
    if (body[i] === "{") {
      if (depth === 0) objStart = i
      depth++
    } else if (body[i] === "}") {
      depth--
      if (depth === 0 && objStart >= 0) {
        blocks.push(body.slice(objStart, i + 1))
        objStart = -1
      }
    }
  }
  return { preamble: content.slice(0, arrStart + 1), blocks, footer: "\n]\n" }
}

const rs9Path = "scripts/case-law-criminal-bih-rs-9.ts"
const rs18Path = "scripts/case-law-criminal-bih-rs-18.ts"
const rs9 = fs.readFileSync(rs9Path, "utf8")
const rs18 = fs.readFileSync(rs18Path, "utf8")

const set9 = new Set(extractCaseNumbers(rs9).map((c) => c.norm))
const { preamble, blocks, footer } = splitObjects(rs18)

const dupes = []
const kept = []
for (const block of blocks) {
  const m = block.match(/case_number:\s*"([^"]+)"/)
  if (!m) {
    kept.push(block)
    continue
  }
  const norm = normCaseNumber(m[1])
  if (set9.has(norm)) dupes.push({ raw: m[1], norm })
  else kept.push(block)
}

console.log("RS-9 unique (normalized):", set9.size)
console.log("RS-18 before:", blocks.length)
console.log("Duplicates removed:", dupes.length)
console.log("RS-18 after:", kept.length)
console.log("\nDuplicate case_numbers removed from rs-18:")
for (const d of dupes) console.log(`  - ${d.raw}`)

const headerEnd = rs18.indexOf("export const CASE_LAW")
const fileHeader = rs18.slice(0, headerEnd).replace(
  /\(\d+ cases, \d+ PDFs\)/,
  `(${kept.length} cases, ${kept.length} unique after dedupe vs rs-9; was ${blocks.length})`,
)

const joined = kept.map((b, i) => (i === 0 ? "\n  " : ",\n  ") + b.trim()).join("")
const newContent = fileHeader + `export const CASE_LAW_CRIMINAL_BIH_RS_18: CaseLawInput[] = [${joined}${footer}`
fs.writeFileSync(rs18Path, newContent, "utf8")
console.log("\nWrote", rs18Path)
