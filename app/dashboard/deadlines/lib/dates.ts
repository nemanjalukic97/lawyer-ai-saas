/** Parse YYYY-MM-DD as local calendar date (no UTC shift). */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map((x) => Number.parseInt(x, 10))
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function startOfTodayLocal(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Whole days from today to due (negative = overdue). */
export function calendarDaysUntil(dueIso: string): number {
  const due = parseLocalDate(dueIso)
  const today = startOfTodayLocal()
  return Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
}

export function formatDueHeading(iso: string, locale?: string): string {
  const d = parseLocalDate(iso)
  return d.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
