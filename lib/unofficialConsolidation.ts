/** Honesty mark for consolidations we built. Not stored in text_local. */

export const UNOFFICIAL_CONSOLIDATION_CAPTION =
  "Неслужбени пречишћени текст. Саставили смо га из службених извора Народне скупштине РС и Уставног суда РС."

const STUB_MARKER = "unofficial consolidation"

export function isUnofficialConsolidationStub(
  text: string | null | undefined,
): boolean {
  return (text ?? "").toLowerCase().includes(STUB_MARKER)
}
