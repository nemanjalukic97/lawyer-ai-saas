import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs10-batch.mjs"

const skip = new Set(["85 0 K 032733 17 Kz 3.txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs10-extract/batch3", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-10.ts"
let s = fs.readFileSync(tsPath, "utf8")

const batch12Count = (s.match(/jurisdiction: "bih_rs"/g) || []).length
const totalAfter = batch12Count + blocks.length

s = s.replace(
  /\/\/ Batches 1-2 of 3 \(69 PDFs total\)/,
  `// All 3 batches complete (69 PDFs, ${totalAfter} unique cases)`,
)

const insert = `,
  // --- Batch 3 of 3 (PDFs 47-69, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 3 appended:", blocks.length, "entries")
console.log("Final total:", totalAfter)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
if (skip.size) console.log("Skipped:", [...skip].join(", "))
