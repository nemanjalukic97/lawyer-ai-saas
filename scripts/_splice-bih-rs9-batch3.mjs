import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs9-batch.mjs"

const skip = new Set()
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs9-extract/batch3", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-9.ts"
let s = fs.readFileSync(tsPath, "utf8")

s = s.replace(
  /\/\/ Batches 1-2 of 3 \(93 PDFs total\)/,
  `// All 3 batches complete (93 PDFs, ${(s.match(/jurisdiction: "bih_rs"/g) || []).length + blocks.length} unique cases)`,
)

const batch12Count = (s.match(/jurisdiction: "bih_rs"/g) || []).length
const totalAfter = batch12Count + blocks.length
const insert = `,
  // --- Batch 3 of 3 (PDFs 63-93, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 3 appended:", blocks.length, "entries")
console.log("Final total:", totalAfter)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
if (skip.size) console.log("Skipped:", [...skip].join(", "))
