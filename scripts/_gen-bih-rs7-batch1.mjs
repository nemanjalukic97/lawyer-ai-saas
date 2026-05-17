import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs7-batch.mjs"

const skip = new Set([
  "118-0-Kz-06-000 067 (1).txt",
  "11 0 K 008966 12 Kz (1).txt",
  "11 0 K 010641 13 Kz 2 (1).txt",
  "11 0  017324 18 z 7.txt",
])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs7-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-7.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv imovine (krađa čl. 216–217., razbojništvo, prevara, pronevjera, prisvajanje).
// Batch 1 of 3 (PDFs 1–60 alphabetically, ${blocks.length} unique cases; 178 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_7: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-60, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-7.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
