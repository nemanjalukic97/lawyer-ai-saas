"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/LanguageProvider"
import {
  Briefcase,
  CalendarClock,
  FileSignature,
  Receipt,
  User,
  ClipboardList,
} from "lucide-react"

type AuditLogRow = {
  id: string
  action: string
  entity_type: string
  entity_id: string | null
  description: string | null
  metadata: unknown | null
  created_at: string | null
}

type FilterKey = "all" | "contracts" | "clients" | "matters" | "intake" | "deadlines" | "invoices"

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "contracts", label: "Contracts" },
  { key: "clients", label: "Clients" },
  { key: "matters", label: "Matters" },
  { key: "intake", label: "Intake" },
  { key: "deadlines", label: "Deadlines" },
  { key: "invoices", label: "Invoices" },
]

function filterMatches(entityType: string, filter: FilterKey): boolean {
  if (filter === "all") return true
  if (filter === "contracts") return entityType === "contract"
  if (filter === "clients") return entityType === "client"
  if (filter === "matters") return entityType === "matter"
  if (filter === "deadlines") return entityType === "deadline"
  if (filter === "invoices") return entityType === "invoice"
  if (filter === "intake") return entityType === "intake_form" || entityType === "intake_submission"
  return true
}

function iconForEntityType(entityType: string) {
  switch (entityType) {
    case "contract":
      return FileSignature
    case "client":
      return User
    case "matter":
      return Briefcase
    case "deadline":
      return CalendarClock
    case "invoice":
      return Receipt
    case "intake_form":
    case "intake_submission":
      return ClipboardList
    default:
      return ClipboardList
  }
}

function titleCaseAction(action: string): string {
  const parts = action.split(".")
  if (parts.length !== 2) return action
  const [entity, verb] = parts
  const entityLabel = entity.replace(/_/g, " ")
  const verbLabel = verb.replace(/_/g, " ")
  return `${entityLabel} ${verbLabel}`
    .split(" ")
    .filter(Boolean)
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ")
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  const now = new Date()
  const ms = d.getTime()
  if (Number.isNaN(ms)) return iso
  const diffSec = Math.round((ms - now.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
  const abs = Math.abs(diffSec)

  if (abs < 60) return rtf.format(diffSec, "second")
  const diffMin = Math.round(diffSec / 60)
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute")
  const diffHr = Math.round(diffSec / 3600)
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, "hour")
  const diffDay = Math.round(diffSec / 86400)
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, "day")
  const diffMonth = Math.round(diffSec / (86400 * 30))
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, "month")
  const diffYear = Math.round(diffSec / (86400 * 365))
  return rtf.format(diffYear, "year")
}

export function AuditLogListClient({ logs }: { logs: AuditLogRow[] }) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<FilterKey>("all")

  const visible = useMemo(() => {
    const filtered = logs.filter((l) => filterMatches(String(l.entity_type ?? ""), filter))
    return filtered
  }, [filter, logs])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant="ghost"
            size="sm"
            onClick={() => setFilter(f.key)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full border border-border/40",
              filter === f.key
                ? "bg-foreground text-background"
                : "bg-transparent text-muted-foreground/60 hover:bg-muted/40"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <ul className="space-y-3">
        {visible.length === 0 ? (
          <li className="py-8 text-center text-sm text-muted-foreground">
            {t("activity.audit.empty")}
          </li>
        ) : (
          visible.map((row) => {
            const Icon = iconForEntityType(row.entity_type)
            const label = row.description ?? "—"
            const when = formatRelativeTime(row.created_at)
            return (
              <li key={row.id}>
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted/20 transition-colors -mx-3">
                  <div className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                    {titleCaseAction(row.action)}: {label}
                  </p>
                  <span className="text-xs text-muted-foreground/40 ml-auto shrink-0">
                    {when || (row.created_at ? new Date(row.created_at).toLocaleString() : "")}
                  </span>
                </div>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

