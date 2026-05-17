import fs from "fs"
import { generateBlocks } from "./_gen-bih-rs4-batch.mjs"

const skip = new Set(["71 0 K 319937 22 Kvlz (1).txt"])
const { blocks, caseNumbers } = generateBlocks("tmp-bih-rs4-extract/batch1", skip)

const header = `// scripts/case-law-criminal-bih-rs-4.ts
// BiH RS (Vrhovni sud RS) — krivična djela protiv braka i porodice (čl. 209–211 KZ RS: izdržavanje, nasilje u porodici, zanemarivanje i dr.).
// Batch 1 of 3 (PDFs 1–7 alphabetically, ${blocks.length} unique cases; 20 PDFs total)

import type { CaseLawInput } from "./ingest-case-law"

export const CASE_LAW_CRIMINAL_BIH_RS_4: CaseLawInput[] = [
  // --- Batch 1 of 3 (PDFs 1-7, ${blocks.length} unique cases) ---
`

fs.writeFileSync("scripts/case-law-criminal-bih-rs-4.ts", header + blocks.join(",\n") + "\n]\n", "utf8")
console.log("Wrote", blocks.length, "entries")
console.log("Case numbers:", caseNumbers.join("; "))
console.log("Skipped:", [...skip].join(", "))
