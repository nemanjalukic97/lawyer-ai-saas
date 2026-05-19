const JURISDICTION_ALIASES: Record<string, string> = {
  bih_federation: "bih_fbih",
  bih_republika_srpska: "bih_rs",
  bih_brcko_district: "bih_brcko",
}

export function normalizeJurisdiction(j: string | null): string | null {
  if (!j) return null
  return JURISDICTION_ALIASES[j] ?? j
}
