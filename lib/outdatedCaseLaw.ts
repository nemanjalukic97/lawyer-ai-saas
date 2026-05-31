import type { CaseLawSource } from "@/types/rag"

export const CASE_LAW_OUTDATED_YEARS = 15

function parseDecisionDate(value: string | null): Date | null {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function isCaseLawOutdated(
  decisionDate: string | null,
  referenceDate: Date = new Date(),
): boolean {
  const parsed = parseDecisionDate(decisionDate)
  if (!parsed) return false

  const cutoff = new Date(referenceDate)
  cutoff.setFullYear(cutoff.getFullYear() - CASE_LAW_OUTDATED_YEARS)

  return parsed < cutoff
}

export function countOutdatedCaseLaw(sources: CaseLawSource[]): {
  outdatedCount: number
  totalCount: number
} {
  const totalCount = sources.length
  const outdatedCount = sources.filter((source) =>
    isCaseLawOutdated(source.decision_date),
  ).length

  return { outdatedCount, totalCount }
}
