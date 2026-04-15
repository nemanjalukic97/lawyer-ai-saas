/** Optional intake field keys stored in intake_forms.fields (JSON array). */
export const OPTIONAL_INTAKE_KEYS = ["company", "address", "notes"] as const

export type OptionalIntakeKey = (typeof OPTIONAL_INTAKE_KEYS)[number]

export function parseFieldsJson(raw: unknown): OptionalIntakeKey[] {
  if (!Array.isArray(raw)) return []
  const out: OptionalIntakeKey[] = []
  for (const item of raw) {
    if (
      item === "company" ||
      item === "address" ||
      item === "notes"
    ) {
      out.push(item)
    }
  }
  return out
}
