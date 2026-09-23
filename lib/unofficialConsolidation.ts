/** Honesty mark for consolidations we built. Not stored in text_local. */

export const UNOFFICIAL_CONSOLIDATION_CAPTION =
  "Неслужбени пречишћени текст. Саставили смо га из службених извора Народне скупштине РС и Уставног суда РС."

/** Lawyer-facing caption. The English stub is not consulted. */
export const UNOFFICIAL_CONSOLIDATIONS: readonly {
  jurisdiction: string
  law_name_local: string
}[] = [
  { jurisdiction: "bih_rs", law_name_local: "Породични закон" },
  { jurisdiction: "bih_rs", law_name_local: "Закон о раду" },
]

export function isUnofficialConsolidation(
  jurisdiction: string | null | undefined,
  lawNameLocal: string | null | undefined,
): boolean {
  if (!jurisdiction || !lawNameLocal) return false
  return UNOFFICIAL_CONSOLIDATIONS.some(
    (row) =>
      row.jurisdiction === jurisdiction && row.law_name_local === lawNameLocal,
  )
}
