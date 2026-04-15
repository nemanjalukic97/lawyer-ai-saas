import type { Tables } from "@/lib/supabase/types"

import { calendarDaysUntil } from "./dates"

type DeadlineStatus = Tables<"deadlines">["status"]

/**
 * Display/filter status: treat stored `upcoming` with a past due_date as `overdue`.
 * Does not change persisted `status` in the database.
 */
export function getEffectiveStatus(
  deadline: Pick<Tables<"deadlines">, "status" | "due_date">
): DeadlineStatus {
  if (
    deadline.status === "upcoming" &&
    calendarDaysUntil(deadline.due_date) < 0
  ) {
    return "overdue"
  }
  return deadline.status
}
