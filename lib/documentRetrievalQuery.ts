/**
 * Statute-retrieval phrase for a generated document. The generation
 * prompt stays the full form. These strings are what gets embedded
 * and keyword-searched.
 *
 * Six BCS phrases are shared by the six BCS jurisdictions. Slovenia
 * has its own six. Cyrillic search patterns are produced later by
 * getScriptVariants; this table stays Latin.
 */

const BCS_DOCUMENT_LABELS = {
  nda: "Ugovor o povjerljivosti",
  employment: "Ugovor o radu",
  power_of_attorney: "Punomoć",
  sales: "Ugovor o prodaji",
  lease: "Ugovor o zakupu",
  service: "Ugovor o pružanju usluga",
} as const

const SLOVENIAN_DOCUMENT_LABELS = {
  nda: "Pogodba o nerazkritju",
  employment: "Pogodba o zaposlitvi",
  power_of_attorney: "Pooblastilo",
  sales: "Prodajna pogodba",
  lease: "Najemna pogodba",
  service: "Pogodba o storitvah",
} as const

const BCS_JURISDICTIONS = new Set([
  "serbia",
  "montenegro",
  "croatia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
])

export type RetrievalDocumentType = keyof typeof BCS_DOCUMENT_LABELS

/**
 * Types that embed the short label and run the keyword channel.
 * A type goes on this list only after it is measured better than the
 * English form dump. Measurement: generator-six-types.json, the
 * 2026-11-05 Serbia run (k=6, hint mode). Employment and power of
 * attorney improved. NDA, sales, lease, and service regressed and
 * stay off. A phrase in the tables above is not an enablement.
 *
 * Keyword-stage wall, one Serbia run, no category filter, limit 40:
 * Ugovor o radu 825 ms; Ugovor o povjerljivosti 913 ms;
 * Ugovor o zakupu 953 ms; Punomoć 2514 ms; Ugovor o prodaji 3189 ms;
 * Ugovor o pružanju usluga 3548 ms.
 * Employment phrase, n=15, p95: Serbia 984, FBiH 293, Slovenia 349,
 * Republika Srpska 155, Montenegro 152, Croatia 151, Brčko 142.
 */
export const SHORT_RETRIEVAL_DOCUMENT_TYPES = new Set<string>([
  "employment",
  "power_of_attorney",
])

export function retrievalQueryForDocument(
  documentType: string,
  jurisdiction: string,
): string | null {
  const table =
    jurisdiction === "slovenia"
      ? SLOVENIAN_DOCUMENT_LABELS
      : BCS_JURISDICTIONS.has(jurisdiction)
        ? BCS_DOCUMENT_LABELS
        : null
  if (!table) return null
  if (!Object.prototype.hasOwnProperty.call(table, documentType)) return null
  return table[documentType as RetrievalDocumentType]
}
