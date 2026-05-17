import fs from "fs"

const target =
  "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/scripts/case-law-criminal-bih-rs-2.ts"
const batch3Path =
  "c:/Users/neco9/OneDrive/Desktop/CursorModel/my-app/tmp-batch3-snippet.ts.txt"

let main = fs.readFileSync(target, "utf8")
const batch3 = fs.readFileSync(batch3Path, "utf8")

main = main.replace("// Batches 1-2 of 3", "// All 3 batches complete (136 PDFs, 132 unique cases)")

main = main.replace(
  `export const CASE_LAW_CRIMINAL_BIH_RS_2: CaseLawInput[] = [\n  {`,
  `export const CASE_LAW_CRIMINAL_BIH_RS_2: CaseLawInput[] = [\n  // --- Batch 1 of 3 (PDFs 1-46, 44 unique cases) ---\n  {`,
)

const needle = `    case_number: "71 0 K 094613 13 Kvlz",
    decision_date: "2013-12-09",
    legal_area: "criminal",
    legal_question:
      "Da li je osnovan ZZL okružnog tužioca protiv oslobađajuće presude za tjelesnu povredu zbog uslova privatne tužbe?",
    court_position:
      "Uvažava se ZZL i utvrđuje da je povrijeđen zakon u korist okužnih.",
    reasoning:
      "Za djelo počinjeno prije izmjena KZ RS gonjenje po privatnoj tužbi nije bilo propisano; nakon stupanja izmjena na snagu potreban je prijedlog oštećenog, što prvostepeni sud nije osigurao prije odbijanja optužbe.",
    keywords: ["ZZL","privatna tužba","čl. 155. KZ RS"],
    related_articles: ["čl. 213. st. 2. ZKOP RS","čl. 356. st. 2. ZKOP RS"],
    headnote: "Tužilac dobio ZZL; pravosnažna oslobađajuća ostaje neizmijenjena ali je utvrđena povreda zakona.",
    outcome: "plaintiff_won",
  },
]`

const insert = `    case_number: "71 0 K 094613 13 Kvlz",
    decision_date: "2013-12-09",
    legal_area: "criminal",
    legal_question:
      "Da li je osnovan ZZL okružnog tužioca protiv oslobađajuće presude za tjelesnu povredu zbog uslova privatne tužbe?",
    court_position:
      "Uvažava se ZZL i utvrđuje da je povrijeđen zakon u korist okužnih.",
    reasoning:
      "Za djelo počinjeno prije izmjena KZ RS gonjenje po privatnoj tužbi nije bilo propisano; nakon stupanja izmjena na snagu potreban je prijedlog oštećenog, što prvostepeni sud nije osigurao prije odbijanja optužbe.",
    keywords: ["ZZL","privatna tužba","čl. 155. KZ RS"],
    related_articles: ["čl. 213. st. 2. ZKOP RS","čl. 356. st. 2. ZKOP RS"],
    headnote: "Tužilac dobio ZZL; pravosnažna oslobađajuća ostaje neizmijenjena ali je utvrđena povreda zakona.",
    outcome: "plaintiff_won",
  },
  // --- Batch 3 of 3 (PDFs 92-136, 44 unique cases) ---
${batch3}
]`

if (!main.includes(needle)) {
  console.error("Needle not found — abort")
  process.exit(1)
}

main = main.replace(needle, insert)
fs.writeFileSync(target, main, "utf8")
console.error("Spliced Batch 3 into", target)
