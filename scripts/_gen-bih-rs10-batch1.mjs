import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs10-batch.mjs"

const skip = new Set([
  "11 0 K 003698 12 Kzz maskirana.txt",
  "85 0 K 032733 17 Kz 3.txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs10-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-10.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv službene dužnosti.
// Batch 1 of 3 (PDFs 1–23 alphabetically, ${blocks.length} unique cases; 69 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_10: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-23, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-10.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
