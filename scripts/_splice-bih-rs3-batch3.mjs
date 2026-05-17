import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs3-batch.mjs"

const skip = new Set(["13 0 K 004876 18 Kz 3 (1).txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs3-extract/batch3", skip)

const tsPath = "scripts/case-law-criminal-bih-rs-3.ts"
let s = fs.readFileSync(tsPath, "utf8")

const batch1Count = 38
const batch2Count = 40
const batch3Count = blocks.length
const totalUnique = batch1Count + batch2Count + batch3Count
const duplicatesTotal = 122 - totalUnique

s = s.replace(
  /\/\/ Batches 1-2 of 3 \(122 PDFs total\)/,
  `// All 3 batches complete (122 PDFs, ${totalUnique} unique cases${duplicatesTotal ? `; ${duplicatesTotal} duplicate PDFs skipped` : ""})`,
)

const insert = `,
  // --- Batch 3 of 3 (PDFs 83-122, ${batch3Count} unique cases) ---
${blocks.join(",\n")}`

s = s.replace(/\n]\n$/, `${insert}\n]\n`)
fs.writeFileSync(tsPath, s, "utf8")

console.log("Batch 3 appended:", batch3Count, "entries")
console.log("Running total:", totalUnique)
console.log("First batch3:", caseNumbers[0])
console.log("Last batch3:", caseNumbers[caseNumbers.length - 1])
console.log("Skipped:", [...skip].join(", "))
