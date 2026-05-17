import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs4-batch.mjs"

const skip = new Set()
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs4-extract/batch2", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-4.ts"
let s = fs.readFileSync(tsPath, "utf8")

s = s.replace(
  /\/\/ Batch 1 of 3 \(PDFs 1–7 alphabetically, \d+ unique cases; 20 PDFs total\)/,
  "// Batches 1-2 of 3 (20 PDFs total)",
)

const totalAfter = 6 + blocks.length
const insert = `,
  // --- Batch 2 of 3 (PDFs 8-14, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 2 appended:", blocks.length, "entries")
console.log("Running total:", totalAfter)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
