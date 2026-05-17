import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs13-batch.mjs"

const skip = new Set([
  "11 0 K 003698 12 Kzz.txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs13-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-13.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv privrede i platnog prometa.
// Batch 1 of 3 (PDFs 1–8 alphabetically, ${blocks.length} unique cases; 23 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_13: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-8, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-13.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
