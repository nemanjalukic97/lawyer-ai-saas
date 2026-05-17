import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs5-batch.mjs"

const skip = new Set([
  "11 0 K 020421 18 Kz 9 - anonimizirano (002) (1).txt",
  "11 0 K 022516 18 Kz 2 (1).txt",
  "11 0 K 022516 18 Kz 2 (2).txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs5-extract/batch2", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-5.ts"
let s = fs.readFileSync(tsPath, "utf8")

s = s.replace(
  /\/\/ Batch 1 of 3 \(PDFs 1–23 alphabetically, \d+ unique cases; 67 PDFs total\)/,
  "// Batches 1-2 of 3 (67 PDFs total)",
)

const totalAfter = 22 + blocks.length
const insert = `,
  // --- Batch 2 of 3 (PDFs 24-45, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 2 appended:", blocks.length, "entries")
console.log("Running total:", totalAfter)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
console.log("Skipped:", [...skip].join(", "))
