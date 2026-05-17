import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs9-batch.mjs"

const skip = new Set([
  "71 0 K 107859 12 Kvlz maskirana.txt",
  "73 0 K 023613 21 Kvlz (1).txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs9-extract/batch2", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-9.ts"
let s = fs.readFileSync(tsPath, "utf8")

s = s.replace(
  /\/\/ Batch 1 of 3 \(PDFs 1–31 alphabetically, \d+ unique cases; 93 PDFs total\)/,
  "// Batches 1-2 of 3 (93 PDFs total)",
)

const batch1Count = (s.match(/jurisdiction: "bih_rs"/g) || []).length
const totalAfter = batch1Count + blocks.length
const insert = `,
  // --- Batch 2 of 3 (PDFs 32-62, ${blocks.length} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 2 appended:", blocks.length, "entries")
console.log("Running total:", totalAfter)
console.log("First:", caseNumbers[0])
console.log("Last:", caseNumbers[caseNumbers.length - 1])
console.log("Skipped:", [...skip].join(", "))
