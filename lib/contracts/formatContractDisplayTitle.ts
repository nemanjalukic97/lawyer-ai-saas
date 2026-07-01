const CONTRACT_TYPE_I18N: Record<string, string> = {
  employment: "contracts.contractTypes.employment",
  service: "contracts.contractTypes.service",
  sales: "contracts.contractTypes.sales",
  lease: "contracts.contractTypes.lease",
  nda: "contracts.contractTypes.nda",
  partnership: "contracts.contractTypes.partnership",
}

export function formatContractDisplayTitle(
  title: string,
  contractType: string | null | undefined,
  partyNames: Record<string, string> | null | undefined,
  t: (key: string) => string
): string {
  if (!contractType) return title

  const key = CONTRACT_TYPE_I18N[contractType]
  if (!key) return title

  const typeLabel = t(key)
  if (typeLabel === key) return title

  const parties = partyNames
    ? Object.values(partyNames)
        .map((v) => v.trim())
        .filter(Boolean)
    : []

  if (parties.length >= 2) {
    return `${typeLabel} - ${parties[0]} & ${parties[1]}`
  }

  const dashIdx = title.indexOf(" - ")
  if (dashIdx >= 0) {
    return `${typeLabel}${title.slice(dashIdx)}`
  }

  return typeLabel
}
