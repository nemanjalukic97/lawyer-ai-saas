import type { CaseLawSource } from "@/types/rag"

export type SimilarCaseOutcomeStats = {
  plaintiffWon: number
  defendantWon: number
  partially: number
  other: number
  knownOutcomeCount: number
  plaintiffWinPct: number
}

function normalizeOutcome(outcome: string | null): string | null {
  if (outcome == null) return null
  const trimmed = outcome.trim().toLowerCase()
  return trimmed.length > 0 ? trimmed : null
}

export function computeSimilarCaseOutcomeStats(
  sources: CaseLawSource[],
): SimilarCaseOutcomeStats | null {
  let plaintiffWon = 0
  let defendantWon = 0
  let partially = 0
  let other = 0
  let knownOutcomeCount = 0

  for (const source of sources) {
    const outcome = normalizeOutcome(source.outcome)
    if (outcome == null) {
      other += 1
      continue
    }

    knownOutcomeCount += 1

    switch (outcome) {
      case "plaintiff_won":
        plaintiffWon += 1
        break
      case "defendant_won":
        defendantWon += 1
        break
      case "partially":
        partially += 1
        break
      case "procedural":
      case "remanded":
        other += 1
        break
      default:
        other += 1
        break
    }
  }

  if (knownOutcomeCount < 2) {
    return null
  }

  const plaintiffWinPct = Math.round(
    (plaintiffWon / knownOutcomeCount) * 100,
  )

  return {
    plaintiffWon,
    defendantWon,
    partially,
    other,
    knownOutcomeCount,
    plaintiffWinPct,
  }
}
