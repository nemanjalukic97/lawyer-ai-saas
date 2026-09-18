import type { Enums } from "@/lib/supabase/types"

export type DeadlineType = Enums<"deadline_type">
export type DeadlineSeverity = "preclusive" | "record"

/** Types a practising lawyer classified as preclusive (RED). */
const PRECLUSIVE_TYPES: ReadonlySet<string> = new Set([
  "appeal_deadline",
  "court_hearing",
  "filing_deadline",
  "statute_of_limitations",
  "claim",
  "objection",
  "court_advance",
])

export function deadlineSeverity(type: string): DeadlineSeverity {
  return PRECLUSIVE_TYPES.has(type) ? "preclusive" : "record"
}

export function isPreclusiveDeadline(type: string): boolean {
  return deadlineSeverity(type) === "preclusive"
}

type StatusLike = Enums<"deadline_status"> | string | null | undefined

function isInactive(status: StatusLike): boolean {
  return status === "completed" || status === "cancelled"
}

/** Calendar / list / dashboard dot fill. Inactive items are muted. */
export function severityDotClass(type: string, status?: StatusLike): string {
  if (isInactive(status)) return "bg-muted-foreground"
  return isPreclusiveDeadline(type) ? "bg-destructive" : "bg-primary/50"
}

export function severityBorderClass(type: string, status?: StatusLike): string {
  if (isInactive(status)) return "border-muted-foreground/40"
  return isPreclusiveDeadline(type)
    ? "border-destructive/60"
    : "border-primary/40"
}
