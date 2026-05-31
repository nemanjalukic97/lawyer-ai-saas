import type { CaseLawSource } from "@/types/rag"

const MIN_SIMILARITY = 0.25
const MAX_CASES = 5
const COURT_POSITION_MAX = 500

export function formatDecisionDateDDMMYYYY(value: string | null): string {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

export function truncateCourtPosition(
  text: string,
  maxLen = COURT_POSITION_MAX,
): string {
  const trimmed = text.trim()
  if (trimmed.length <= maxLen) return trimmed
  return `${trimmed.slice(0, maxLen)}...`
}

export function buildCaseLawAppendixSection(
  sources: CaseLawSource[],
  options: { title: string; basedOn: string },
): string | null {
  const cases = sources
    .filter((c) => c.similarity >= MIN_SIMILARITY)
    .slice(0, MAX_CASES)

  if (cases.length === 0) return null

  const lines: string[] = ["", "---", "", options.title.toUpperCase(), ""]

  for (const c of cases) {
    lines.push(
      `- ${c.court} | ${c.case_number} | ${formatDecisionDateDDMMYYYY(c.decision_date)}`,
    )
    lines.push(`  ${truncateCourtPosition(c.court_position)}`)
    lines.push("")
  }

  lines.push(options.basedOn.replace("{count}", String(cases.length)))
  lines.push("")
  lines.push("---")

  return lines.join("\n")
}
