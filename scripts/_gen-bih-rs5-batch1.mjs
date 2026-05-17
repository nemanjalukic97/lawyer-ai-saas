import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs5-batch.mjs"

const skip = new Set(["11 0  017324 17 z 4.txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs5-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-5.ts
// BiH RS (Vrhovni sud RS) — krivična djela organizovanog kriminala (udruživanje čl. 250. KZ RS, kriminalna organizacija, stićaj i dr.).
// Batch 1 of 3 (PDFs 1–23 alphabetically, ${blocks.length} unique cases; 67 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_5: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-23, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-5.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
