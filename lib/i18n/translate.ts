import type { LanguageCode, Messages } from "./types"

/**
 * Requested language, then Serbian, then English.
 * A catalogue that is already in the chain is not asked twice.
 */
export function catalogueOrder(language: LanguageCode): LanguageCode[] {
  const order: LanguageCode[] = [language]
  if (!order.includes("sr")) order.push("sr")
  if (!order.includes("en")) order.push("en")
  return order
}

/** A nested object is not a translation. Only a string leaf counts. */
export function readMessage(messages: Messages, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== "object") return undefined
    return (acc as Record<string, unknown>)[part]
  }, messages)
  return typeof value === "string" ? value : undefined
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value
  return value.replace(/\{(\w+)\}/g, (_, varName: string) => {
    const v = vars[varName]
    return v === undefined || v === null ? `{${varName}}` : String(v)
  })
}

export function lookupMessage(
  catalogues: Record<LanguageCode, Messages>,
  language: LanguageCode,
  key: string,
  vars?: Record<string, string | number>,
): string {
  for (const code of catalogueOrder(language)) {
    const catalogue = catalogues[code]
    if (!catalogue) continue
    const value = readMessage(catalogue, key)
    if (value !== undefined) return interpolate(value, vars)
  }
  return key
}
