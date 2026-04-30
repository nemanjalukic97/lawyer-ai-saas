"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Loader2, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/LanguageProvider"
import { createClient } from "@/lib/supabase/client"
import { Constants } from "@/lib/supabase/types"
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types"
import { hasFeature, type EntitlementPlanId } from "../lib/entitlements"
import { logActivity } from "@/lib/activity/logActivity"

import { getEffectiveStatus } from "./lib/effectiveStatus"
import { calendarDaysUntil, formatDueHeading } from "./lib/dates"
import { sendTestDeadlineReminders } from "./actions"

type DeadlineRow = Tables<"deadlines">
type ClientMini = { id: string; name: string; email: string | null }
type MatterMini = { id: string; title: string; matter_number: string; client_id: string | null }

const DEADLINE_TYPES = Constants.public.Enums.deadline_type

type FilterKey = "all" | "upcoming" | "overdue" | "completed"

type Props = {
  planId: EntitlementPlanId
  prefillMatterId?: string | null
}

const PAGE_SIZE = 15

function toIsoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function urgencyClass(
  d: DeadlineRow
): "bg-muted-foreground" | "bg-destructive" | "bg-amber-500" | "bg-emerald-500" {
  const eff = getEffectiveStatus(d)
  if (eff === "completed" || eff === "cancelled") {
    return "bg-muted-foreground"
  }
  if (eff === "overdue") {
    return "bg-destructive"
  }
  const diff = calendarDaysUntil(d.due_date)
  if (diff <= 3) return "bg-amber-500"
  return "bg-emerald-500"
}

function matchesFilter(d: DeadlineRow, filter: FilterKey): boolean {
  const eff = getEffectiveStatus(d)
  if (eff === "cancelled") return filter === "all"
  if (filter === "completed") return eff === "completed"
  if (eff === "completed") return filter === "all"
  if (filter === "upcoming") return eff === "upcoming"
  if (filter === "overdue") return eff === "overdue"
  return true
}

export default function DeadlinesPageClient({ planId, prefillMatterId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()
  const canUse = hasFeature(planId, "deadline_tracking")

  const [deadlines, setDeadlines] = useState<DeadlineRow[]>([])
  const [clients, setClients] = useState<ClientMini[]>([])
  const [matterOptions, setMatterOptions] = useState<MatterMini[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterKey>("all")
  const [page, setPage] = useState(1)
  const [actionId, setActionId] = useState<string | null>(null)
  const [testSending, setTestSending] = useState(false)
  const [testSummary, setTestSummary] = useState<string | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<DeadlineRow | null>(null)
  const [titleIn, setTitleIn] = useState("")
  const [typeIn, setTypeIn] = useState<string>(DEADLINE_TYPES[0])
  const [dueDateIn, setDueDateIn] = useState("")
  const [dueTimeIn, setDueTimeIn] = useState("")
  const [clientIdIn, setClientIdIn] = useState<string>("")
  const [matterIdIn, setMatterIdIn] = useState<string>("")
  const [descIn, setDescIn] = useState("")
  const [reminderIn, setReminderIn] = useState("3")
  const [clientQuery, setClientQuery] = useState("")
  const [saving, setSaving] = useState(false)

  const [monthCursor, setMonthCursor] = useState(() => {
    const n = new Date()
    return new Date(n.getFullYear(), n.getMonth(), 1)
  })

  const [dayDialog, setDayDialog] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!canUse) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError(t("deadlines.errors.mustBeLoggedIn"))
        return
      }

      const [
        { data: dl, error: dErr },
        { data: cl, error: cErr },
      ] = await Promise.all([
          supabase
            .from("deadlines")
            .select("*")
            .eq("user_id", user.id)
            .is("deleted_at", null)
            .order("due_date", { ascending: true }),
          supabase
            .from("clients")
            .select("id, name, email")
            .eq("user_id", user.id)
            .is("deleted_at", null)
            .order("name", { ascending: true }),
        ])

      if (dErr) throw dErr
      if (cErr) throw cErr

      setDeadlines((dl ?? []) as DeadlineRow[])
      const clientRows = (cl ?? []) as Array<{
        id: string
        name: string
        email: string | null
      }>
      setClients(
        clientRows.map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email ?? null,
        }))
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("deadlines.errors.loadFailed"))
    } finally {
      setLoading(false)
    }
  }, [canUse, supabase, t])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    async function loadMatters() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("matters")
        .select("id, title, matter_number, client_id")
        .eq("user_id", user.id)
        .eq("status", "open")
        .order("created_at", { ascending: false })

      if (data) setMatterOptions(data as MatterMini[])
    }
    void loadMatters()
  }, [])

  const filtered = useMemo(
    () => deadlines.filter((d) => matchesFilter(d, filter)),
    [deadlines, filter]
  )

  useEffect(() => {
    setPage(1)
  }, [filter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  const clientMap = useMemo(() => {
    const m = new Map<string, ClientMini>()
    for (const c of clients) m.set(c.id, c)
    return m
  }, [clients])

  const clientsFiltered = useMemo(() => {
    const q = clientQuery.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q))
    )
  }, [clients, clientQuery])

  const mattersFiltered = useMemo(() => {
    if (!clientIdIn) return matterOptions
    return matterOptions.filter((m) => m.client_id === clientIdIn)
  }, [matterOptions, clientIdIn])

  function openCreate() {
    setEditing(null)
    setTitleIn("")
    setTypeIn(DEADLINE_TYPES[0])
    const today = new Date()
    setDueDateIn(toIsoDate(today))
    setDueTimeIn("")
    setClientIdIn("")
    setMatterIdIn(prefillMatterId ?? "")
    setDescIn("")
    setReminderIn("3")
    setClientQuery("")
    setDialogOpen(true)
  }

  function openEdit(d: DeadlineRow) {
    setEditing(d)
    setTitleIn(d.title)
    setTypeIn(d.deadline_type)
    setDueDateIn(d.due_date)
    setDueTimeIn(d.due_time ? d.due_time.slice(0, 5) : "")
    setClientIdIn(d.client_id ?? "")
    setMatterIdIn(d.matter_id ?? "")
    setDescIn(d.description ?? "")
    setReminderIn(String(d.reminder_days_before ?? 3))
    setClientQuery("")
    setDialogOpen(true)
  }

  async function runTestReminders() {
    if (process.env.NODE_ENV === "production") return
    setTestSending(true)
    setTestSummary(null)
    try {
      const result = await sendTestDeadlineReminders()
      const errCount = result.errors?.length ?? 0
      setTestSummary(`Sent: ${result.sent}${errCount ? `, Errors: ${errCount}` : ""}`)
    } catch (e) {
      setTestSummary("Failed to run test reminders")
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    } finally {
      setTestSending(false)
    }
  }

  async function saveDeadline() {
    if (!titleIn.trim() || !dueDateIn) {
      setError(t("deadlines.dialog.errors.titleDate"))
      return
    }

    setSaving(true)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError(t("deadlines.errors.mustBeLoggedIn"))
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .maybeSingle()

      const reminder = Number.parseInt(reminderIn, 10)
      const dueTime =
        dueTimeIn.trim() === ""
          ? null
          : dueTimeIn.length === 5
            ? `${dueTimeIn}:00`
            : dueTimeIn

      const payload: TablesUpdate<"deadlines"> = {
        title: titleIn.trim(),
        deadline_type: typeIn as Tables<"deadlines">["deadline_type"],
        due_date: dueDateIn,
        due_time: dueTime,
        client_id: clientIdIn || null,
        matter_id: matterIdIn === "none" ? null : (matterIdIn || null),
        description: descIn.trim() || null,
        reminder_days_before: Number.isFinite(reminder) ? reminder : 3,
      }

      if (editing) {
        const { error: uErr } = await supabase
          .from("deadlines")
          .update(payload as TablesUpdate<"deadlines">)
          .eq("id", editing.id)
        if (uErr) throw uErr
      } else {
        const insertRow: TablesInsert<"deadlines"> = {
          user_id: user.id,
          law_firm_id: profile?.law_firm_id ?? null,
          status: "upcoming",
          title: payload.title ?? "",
          deadline_type: payload.deadline_type ?? "other",
          due_date: payload.due_date ?? dueDateIn,
          due_time: payload.due_time,
          client_id: payload.client_id,
          matter_id: payload.matter_id,
          description: payload.description,
          reminder_days_before: payload.reminder_days_before,
        }
        const { data: inserted, error: iErr } = await supabase
          .from("deadlines")
          .insert(insertRow)
          .select("id, title")
          .single()
        if (iErr) throw iErr

        if (inserted?.id) {
          void logActivity(
            supabase,
            "deadline.created",
            "deadline",
            inserted.id,
            inserted.title ?? insertRow.title,
            {
              deadline_type: insertRow.deadline_type,
              due_date: insertRow.due_date,
              client_id: insertRow.client_id,
              matter_id: insertRow.matter_id,
            }
          )
        }
      }

      setDialogOpen(false)
      await load()
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("deadlines.dialog.errors.saveFailed"))
    } finally {
      setSaving(false)
    }
  }

  async function markComplete(d: DeadlineRow) {
    setActionId(d.id)
    try {
      const completePatch: TablesUpdate<"deadlines"> = {
        status: "completed",
        completed_at: new Date().toISOString(),
      }
      const { error: uErr } = await supabase
        .from("deadlines")
        .update(completePatch)
        .eq("id", d.id)
      if (uErr) throw uErr
      setDeadlines((prev) =>
        prev.map((x) =>
          x.id === d.id
            ? { ...x, status: "completed", completed_at: new Date().toISOString() }
            : x
        )
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("deadlines.errors.updateFailed"))
    } finally {
      setActionId(null)
    }
  }

  async function softDelete(d: DeadlineRow) {
    setActionId(d.id)
    try {
      const delPatch: TablesUpdate<"deadlines"> = {
        deleted_at: new Date().toISOString(),
      }
      const { error: uErr } = await supabase
        .from("deadlines")
        .update(delPatch)
        .eq("id", d.id)
      if (uErr) throw uErr
      void logActivity(supabase, "deadline.deleted", "deadline", d.id, d.title)
      setDeadlines((prev) => prev.filter((x) => x.id !== d.id))
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e)
      }
      setError(t("deadlines.errors.deleteFailed"))
    } finally {
      setActionId(null)
    }
  }

  const calendarCells = useMemo(() => {
    const y = monthCursor.getFullYear()
    const m = monthCursor.getMonth()
    const firstDow = new Date(y, m, 1).getDay()
    const daysInMonth = new Date(y, m + 1, 0).getDate()
    const cells: { date: Date | null; iso: string | null }[] = []
    for (let i = 0; i < firstDow; i++) {
      cells.push({ date: null, iso: null })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d)
      cells.push({ date, iso: toIsoDate(date) })
    }
    while (cells.length % 7 !== 0) {
      cells.push({ date: null, iso: null })
    }
    return cells
  }, [monthCursor])

  const deadlinesByDay = useMemo(() => {
    const map = new Map<string, DeadlineRow[]>()
    for (const d of deadlines) {
      if (d.status === "cancelled") continue
      const key = d.due_date
      const arr = map.get(key) ?? []
      arr.push(d)
      map.set(key, arr)
    }
    return map
  }, [deadlines])

  const todayIso = toIsoDate(new Date())

  function formatRelative(d: DeadlineRow): string {
    const eff = getEffectiveStatus(d)
    if (eff === "completed" || eff === "cancelled") {
      return t("deadlines.list.done")
    }
    const diff = calendarDaysUntil(d.due_date)
    if (diff < 0) {
      return t("deadlines.list.overdueDays").replace("{n}", String(Math.abs(diff)))
    }
    if (diff === 0) return t("deadlines.list.dueToday")
    return t("deadlines.list.inDays").replace("{n}", String(diff))
  }

  if (!canUse) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("deadlines.title")}
          </h1>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">
              {t("deadlines.upgrade.body")}
            </p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/billing">{t("deadlines.upgrade.cta")}</Link>
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="mb-8 pb-6 border-b border-border/40 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("deadlines.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("deadlines.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("deadlines.subtitle")}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            <div className="flex flex-wrap gap-2">
              {process.env.NODE_ENV !== "production" && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={testSending}
                  onClick={() => void runTestReminders()}
                >
                  {testSending ? "Sending…" : "Send test reminder"}
                </Button>
              )}
              <Button type="button" onClick={openCreate}>
                {t("deadlines.actions.add")}
              </Button>
            </div>
          </div>
        </header>

        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/15">
          <Calendar className="h-5 w-5 text-yellow-400" />
        </div>

        {testSummary && process.env.NODE_ENV !== "production" && (
          <p className="text-sm text-muted-foreground">{testSummary}</p>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("deadlines.loading")}
          </div>
        ) : (
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4 w-full max-w-md">
              <TabsTrigger value="list" className="flex-1">
                {t("deadlines.tabs.list")}
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex-1">
                {t("deadlines.tabs.calendar")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "all",
                    "upcoming",
                    "overdue",
                    "completed",
                  ] as FilterKey[]
                ).map((k) => (
                  <Button
                    key={k}
                    type="button"
                    size="sm"
                    variant={filter === k ? "default" : "outline"}
                    onClick={() => setFilter(k)}
                  >
                    {t(`deadlines.filters.${k}`)}
                  </Button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                    <Calendar className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground/60">
                    No deadlines found
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/40">
                    Add a deadline to stay on top of important dates
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {paged.map((d) => {
                    const client = d.client_id
                      ? clientMap.get(d.client_id)
                      : undefined
                    const eff = getEffectiveStatus(d)
                    const diff = calendarDaysUntil(d.due_date)
                    const inXClass =
                      eff === "overdue"
                        ? "text-xs font-medium text-red-400"
                        : diff <= 2
                          ? "text-xs font-medium text-amber-400"
                          : "text-xs text-muted-foreground/50"
                    return (
                      <li key={d.id}>
                        <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/10 px-4 py-3 hover:bg-muted/20 transition-colors">
                          <div className="flex min-w-0 flex-1 items-start gap-3">
                            <span
                              className={`mt-1.5 size-2 shrink-0 rounded-full ${urgencyClass(d)}`}
                              aria-hidden
                            />
                            <div className="min-w-0 space-y-1">
                              <p className="text-sm font-semibold text-foreground leading-tight">
                                {d.title}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                {client && (
                                  <Link
                                    href={`/dashboard/clients?id=${client.id}`}
                                    className="text-xs text-muted-foreground/60 hover:text-foreground"
                                  >
                                    {client.name}
                                  </Link>
                                )}
                                <span className="rounded-md bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground/70">
                                  {t(`deadlines.types.${d.deadline_type}`)}
                                </span>
                                <span className="text-xs text-muted-foreground/60">
                                  {formatDueHeading(d.due_date)}
                                </span>
                                <span className={inXClass}>
                                  {formatRelative(d)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto shrink-0 flex gap-2">
                            {d.status !== "completed" &&
                              d.status !== "cancelled" && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  disabled={actionId === d.id}
                                  onClick={() => void markComplete(d)}
                                >
                                  {t("deadlines.actions.complete")}
                                </Button>
                              )}
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => openEdit(d)}
                            >
                              {t("deadlines.actions.edit")}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              disabled={actionId === d.id}
                              onClick={() => void softDelete(d)}
                              aria-label={t("deadlines.actions.delete")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}

              {filtered.length > PAGE_SIZE && (
                <div className="mt-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    {t("pagination.previous")}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {t("pagination.pageOf", { page, total: totalPages })}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    {t("pagination.next")}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setMonthCursor(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                      )
                    }
                    aria-label={t("deadlines.calendar.prev")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <p className="text-sm font-medium">
                    {monthCursor.toLocaleString(undefined, {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setMonthCursor(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                      )
                    }
                    aria-label={t("deadlines.calendar.next")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
                  {(
                    [
                      "sun",
                      "mon",
                      "tue",
                      "wed",
                      "thu",
                      "fri",
                      "sat",
                    ] as const
                  ).map((k) => (
                    <div key={k} className="py-1">
                      {t(`deadlines.calendar.weekdayShort.${k}`)}
                    </div>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1">
                  {calendarCells.map((cell, idx) => {
                    if (!cell.iso || !cell.date) {
                      return (
                        <div
                          key={`pad-${idx}`}
                          className="min-h-[72px] rounded-md border border-transparent bg-transparent"
                        />
                      )
                    }
                    const dayDeadlines = deadlinesByDay.get(cell.iso) ?? []
                    const isToday = cell.iso === todayIso
                    const primaryDeadline = dayDeadlines[0] ?? null
                    const primaryClientName =
                      primaryDeadline?.client_id
                        ? clientMap.get(primaryDeadline.client_id)?.name ?? null
                        : null
                    return (
                      <button
                        key={cell.iso}
                        type="button"
                        onClick={() =>
                          dayDeadlines.length > 0 && setDayDialog(cell.iso)
                        }
                        className={`flex min-h-[72px] flex-col gap-0.5 rounded-md border p-1 text-left text-xs transition-colors ${
                          isToday
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        } ${dayDeadlines.length ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <span className="font-medium">{cell.date.getDate()}</span>
                        <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
                          {primaryDeadline && (
                            <span
                              className={`h-2.5 w-2.5 shrink-0 rounded-full ${urgencyClass(primaryDeadline)}`}
                              title={primaryDeadline.title}
                            />
                          )}
                          {primaryClientName && (
                            <span className="min-w-0 truncate text-[10px] text-foreground">
                              {primaryClientName}
                            </span>
                          )}
                          {dayDeadlines.slice(1, 3).map((dl) => (
                            <span
                              key={dl.id}
                              className={`h-2 w-2 rounded-full ${urgencyClass(dl)}`}
                              title={dl.title}
                            />
                          ))}
                          {dayDeadlines.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{dayDeadlines.length - 3}
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Dialog open={!!dayDialog} onOpenChange={(o) => !o && setDayDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dayDialog
                ? formatDueHeading(dayDialog)
                : ""}
            </DialogTitle>
          </DialogHeader>
          <ul className="max-h-64 space-y-2 overflow-y-auto text-sm">
            {(dayDialog ? deadlinesByDay.get(dayDialog) ?? [] : []).map((d) => (
              <li key={d.id} className="rounded-md border border-border p-2">
                <p className="font-medium">{d.title}</p>
                <p className="text-xs text-muted-foreground">
                  {t(`deadlines.types.${d.deadline_type}`)}
                </p>
              </li>
            ))}
          </ul>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDayDialog(null)}>
              {t("deadlines.calendar.closeDay")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing
                ? t("deadlines.dialog.titleEdit")
                : t("deadlines.dialog.titleNew")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="dl-title">{t("deadlines.dialog.fields.title")}</Label>
              <Input
                id="dl-title"
                value={titleIn}
                onChange={(e) => setTitleIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("deadlines.dialog.fields.type")}</Label>
              <Select value={typeIn} onValueChange={setTypeIn}>
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEADLINE_TYPES.map((dt) => (
                    <SelectItem key={dt} value={dt}>
                      {t(`deadlines.types.${dt}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dl-date">{t("deadlines.dialog.fields.dueDate")}</Label>
                <Input
                  id="dl-date"
                  type="date"
                  value={dueDateIn}
                  onChange={(e) => setDueDateIn(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dl-time">{t("deadlines.dialog.fields.dueTime")}</Label>
                <Input
                  id="dl-time"
                  type="time"
                  value={dueTimeIn}
                  onChange={(e) => setDueTimeIn(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-client-q">{t("deadlines.dialog.fields.client")}</Label>
              <Input
                id="dl-client-q"
                placeholder={t("deadlines.dialog.clientSearchPlaceholder")}
                value={clientQuery}
                onChange={(e) => setClientQuery(e.target.value)}
              />
              <Select
                value={clientIdIn || "__none__"}
                onValueChange={(v) => setClientIdIn(v === "__none__" ? "" : v)}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder={t("deadlines.dialog.clientPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">
                    {t("deadlines.dialog.noClient")}
                  </SelectItem>
                  {clientsFiltered.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                      {c.email ? ` (${c.email})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("matters.title")}</Label>
              <Select
                value={matterIdIn}
                onValueChange={(v) => setMatterIdIn(v)}
              >
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder={t("matters.select.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("matters.select.none")}</SelectItem>
                  {mattersFiltered.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {`${m.matter_number} — ${m.title}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-desc">{t("deadlines.dialog.fields.description")}</Label>
              <Textarea
                id="dl-desc"
                value={descIn}
                onChange={(e) => setDescIn(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dl-rem">{t("deadlines.dialog.fields.reminder")}</Label>
              <Input
                id="dl-rem"
                type="number"
                min={0}
                value={reminderIn}
                onChange={(e) => setReminderIn(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              {t("deadlines.dialog.cancel")}
            </Button>
            <Button type="button" disabled={saving} onClick={() => void saveDeadline()}>
              {saving ? t("deadlines.dialog.saving") : t("deadlines.dialog.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
