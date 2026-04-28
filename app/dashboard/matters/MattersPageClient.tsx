"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

import { useLanguage } from "@/components/LanguageProvider"
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
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Constants } from "@/lib/supabase/types"
import type { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types"
import { Briefcase, Loader2, Trash2 } from "lucide-react"
import { logActivity } from "@/lib/activity/logActivity"

type MatterRow = Tables<"matters">
type MatterType = MatterRow["matter_type"]
type MatterStatus = MatterRow["status"]
type Jurisdiction = MatterRow["jurisdiction"]

type ClientMini = { id: string; name: string; email: string | null }

type Stats = {
  contractsCount: number
  deadlinesCount: number
  unbilledHours: number
}

type MatterListItem = MatterRow & {
  client?: { name: string } | null
  stats?: Stats
}

const MATTER_TYPES = Constants.public.Enums.matter_type
const JURISDICTIONS = Constants.public.Enums.jurisdiction
const STATUSES = Constants.public.Enums.matter_status

const PAGE_SIZE = 15

function statusBadgeClass(status: MatterStatus): string {
  switch (status) {
    case "open":
      return "border-emerald-500/50 bg-emerald-500/10 text-emerald-700"
    case "on_hold":
      return "border-amber-500/50 bg-amber-500/10 text-amber-700"
    case "closed":
      return "border-border bg-muted text-muted-foreground"
    case "archived":
      return "border-border bg-muted/60 text-muted-foreground"
    default:
      return "border-border bg-muted text-muted-foreground"
  }
}

function fmtDate(d: string | null): string {
  if (!d) return ""
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return d
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

function hoursFromMinutes(min: number): number {
  if (!Number.isFinite(min)) return 0
  return min / 60
}

function statusRowBorderClass(status: MatterStatus): string {
  switch (status) {
    case "open":
      return "border-l-blue-500"
    case "closed":
      return "border-l-muted-foreground/30"
    case "on_hold":
      return "border-l-amber-500"
    case "archived":
      return "border-l-muted-foreground/20"
    default:
      return "border-l-muted-foreground/20"
  }
}

export function MattersPageClient() {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [matters, setMatters] = useState<MatterListItem[]>([])
  const [clients, setClients] = useState<ClientMini[]>([])

  const [statusFilter, setStatusFilter] = useState<MatterStatus | "all">("all")
  const [typeFilter, setTypeFilter] = useState<MatterType | "all">("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<MatterRow | null>(null)
  const [saving, setSaving] = useState(false)

  const [statusIn, setStatusIn] = useState<MatterStatus>("open")
  const [titleIn, setTitleIn] = useState("")
  const [clientQuery, setClientQuery] = useState("")
  const [clientIdIn, setClientIdIn] = useState<string>("")
  const [typeIn, setTypeIn] = useState<MatterType>(MATTER_TYPES[MATTER_TYPES.length - 1])
  const [jurisdictionIn, setJurisdictionIn] = useState<Jurisdiction>(JURISDICTIONS[0])
  const [descIn, setDescIn] = useState("")
  const [openedAtIn, setOpenedAtIn] = useState<string>(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, "0")
    const d = String(now.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  })

  const [actionId, setActionId] = useState<string | null>(null)

  const clientsFiltered = useMemo(() => {
    const q = clientQuery.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.email ? c.email.toLowerCase().includes(q) : false)
    )
  }, [clients, clientQuery])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Not authenticated")
        setLoading(false)
        return
      }

      const [matterRes, clientsRes] = await Promise.all([
        (() => {
          const q = supabase
            .from("matters")
            .select(
              "id, user_id, law_firm_id, client_id, title, matter_number, matter_type, jurisdiction, status, description, opened_at, closed_at, deleted_at, created_at, updated_at, client:clients(name)"
            )
            .eq("user_id", user.id)
            .is("deleted_at", null)
            .order("updated_at", { ascending: false })
          return q
        })(),
        (() => {
          const q = supabase
            .from("clients")
            .select("id, name, email")
            .eq("user_id", user.id)
            .is("deleted_at", null)
            .order("name", { ascending: true })
          return q
        })(),
      ])

      if (matterRes.error) throw matterRes.error
      if (clientsRes.error) throw clientsRes.error

      const matterRows = (matterRes.data ?? []) as MatterListItem[]
      const clientRows = (clientsRes.data ?? []) as Array<{
        id: string
        name: string
        email: string | null
      }>

      setClients(clientRows.map((c) => ({ id: c.id, name: c.name, email: c.email ?? null })))

      if (matterRows.length === 0) {
        setMatters([])
        setLoading(false)
        return
      }

      const ids = matterRows.map((m) => m.id)

      const [contractsRes, deadlinesRes, pendingTimeRes] = await Promise.all([
        (() => {
          const q = supabase
            .from("contracts")
            .select("id, matter_id")
            .in("matter_id", ids)
            .is("deleted_at", null)
            .eq("user_id", user.id)
          return q
        })(),
        (() => {
          const q = supabase
            .from("deadlines")
            .select("id, matter_id")
            .in("matter_id", ids)
            .is("deleted_at", null)
            .eq("user_id", user.id)
          return q
        })(),
        (() => {
          const q = supabase
            .from("time_entries")
            .select("matter_id, duration_minutes, status")
            .in("matter_id", ids)
            .is("deleted_at", null)
            .eq("status", "pending")
            .eq("user_id", user.id)
          return q
        })(),
      ])

      if (contractsRes.error) throw contractsRes.error
      if (deadlinesRes.error) throw deadlinesRes.error
      if (pendingTimeRes.error) throw pendingTimeRes.error

      const contractsByMatter = new Map<string, number>()
      for (const r of (contractsRes.data ?? []) as Array<{ matter_id: string | null }>) {
        if (!r.matter_id) continue
        contractsByMatter.set(r.matter_id, (contractsByMatter.get(r.matter_id) ?? 0) + 1)
      }

      const deadlinesByMatter = new Map<string, number>()
      for (const r of (deadlinesRes.data ?? []) as Array<{ matter_id: string | null }>) {
        if (!r.matter_id) continue
        deadlinesByMatter.set(r.matter_id, (deadlinesByMatter.get(r.matter_id) ?? 0) + 1)
      }

      const unbilledHoursByMatter = new Map<string, number>()
      for (const r of (pendingTimeRes.data ?? []) as Array<{
        matter_id: string | null
        duration_minutes: number | null
      }>) {
        if (!r.matter_id) continue
        const h = hoursFromMinutes(Number(r.duration_minutes ?? 0))
        unbilledHoursByMatter.set(r.matter_id, (unbilledHoursByMatter.get(r.matter_id) ?? 0) + h)
      }

      setMatters(
        matterRows.map((m) => ({
          ...m,
          stats: {
            contractsCount: contractsByMatter.get(m.id) ?? 0,
            deadlinesCount: deadlinesByMatter.get(m.id) ?? 0,
            unbilledHours: unbilledHoursByMatter.get(m.id) ?? 0,
          },
        }))
      )
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e)
      }
      setError("Failed to load matters.")
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    void load()
  }, [load])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return matters.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false
      if (typeFilter !== "all" && m.matter_type !== typeFilter) return false
      if (!q) return true
      const clientName = m.client?.name?.toLowerCase?.() ?? ""
      return (
        m.title.toLowerCase().includes(q) ||
        (m.matter_number ?? "").toLowerCase().includes(q) ||
        clientName.includes(q)
      )
    })
  }, [matters, search, statusFilter, typeFilter])

  useEffect(() => {
    setPage(1)
  }, [statusFilter, typeFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  function openCreate() {
    setEditing(null)
    setStatusIn("open")
    setTitleIn("")
    setClientQuery("")
    setClientIdIn("")
    setTypeIn(MATTER_TYPES[MATTER_TYPES.length - 1])
    setJurisdictionIn(JURISDICTIONS[0])
    setDescIn("")
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, "0")
    const d = String(now.getDate()).padStart(2, "0")
    setOpenedAtIn(`${y}-${m}-${d}`)
    setDialogOpen(true)
  }

  function openEdit(m: MatterRow) {
    setEditing(m)
    setStatusIn(m.status)
    setTitleIn(m.title ?? "")
    setClientQuery("")
    setClientIdIn(m.client_id ?? "")
    setTypeIn(m.matter_type)
    setJurisdictionIn(m.jurisdiction)
    setDescIn(m.description ?? "")
    setOpenedAtIn(m.opened_at ?? openedAtIn)
    setDialogOpen(true)
  }

  async function saveMatter() {
    if (!titleIn.trim()) {
      setError("Title is required.")
      return
    }

    setSaving(true)
    setError(null)
    try {
      const editingMatter = editing
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setError("Not authenticated")
        return
      }

      if (editingMatter) {
        const payload = {
          title: titleIn.trim(),
          matter_type: typeIn,
          jurisdiction: jurisdictionIn,
          status: statusIn,
          description: descIn.trim() || null,
          opened_at: openedAtIn,
          client_id: clientIdIn || null,
        } satisfies Pick<
          TablesUpdate<"matters">,
          | "title"
          | "matter_type"
          | "jurisdiction"
          | "status"
          | "description"
          | "opened_at"
          | "client_id"
        >

        const { error: uErr } = await supabase
          .from("matters")
          .update(payload)
          .eq("id", editingMatter.id)
          .eq("user_id", user.id)
        if (uErr) throw uErr

        void logActivity(
          supabase,
          "matter.updated",
          "matter",
          editingMatter.id,
          payload.title,
          { matter_type: payload.matter_type, jurisdiction: payload.jurisdiction, status: payload.status }
        )
      } else {
        // 3) INSERT: do not set law_firm_id at all
        const insertRow: TablesInsert<"matters"> = {
          user_id: user.id,
          title: titleIn.trim(),
          matter_type: typeIn,
          jurisdiction: jurisdictionIn,
          status: "open",
          description: descIn.trim() || null,
          opened_at: openedAtIn,
          client_id: clientIdIn || null,
        }
        const { data: inserted, error: iErr } = await supabase
          .from("matters")
          .insert(insertRow)
          .select("id, title")
          .single()
        if (iErr) throw iErr

        if (inserted?.id) {
          void logActivity(
            supabase,
            "matter.created",
            "matter",
            inserted.id,
            inserted.title ?? insertRow.title,
            { matter_type: insertRow.matter_type, jurisdiction: insertRow.jurisdiction }
          )
        }
      }

      setDialogOpen(false)
      await load()
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e)
      }
      setError("Failed to save matter.")
    } finally {
      setSaving(false)
    }
  }

  async function setStatus(m: MatterRow, status: MatterStatus) {
    setActionId(m.id)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const patch: TablesUpdate<"matters"> = {
        status,
        closed_at: status === "closed" ? new Date().toISOString().slice(0, 10) : null,
      }
      const { error: uErr } = await supabase
        .from("matters")
        .update(patch)
        .eq("id", m.id)
        .eq("user_id", user.id)
      if (uErr) throw uErr
      setMatters((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, status } : x))
      )

      void logActivity(supabase, "matter.updated", "matter", m.id, m.title ?? "Matter", {
        status,
      })
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e)
      }
      setError("Failed to update status.")
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="mb-8 pb-6 border-b border-border/40 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("matters.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("matters.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("matters.subtitle")}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            <Button type="button" onClick={openCreate}>
              {t("matters.actions.new")}
            </Button>
          </div>
        </header>

        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
          <Briefcase className="h-5 w-5 text-indigo-400" />
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/40 bg-muted/20 p-3">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
              >
                {t("matters.filters.all")}
              </Button>
              {(STATUSES as MatterStatus[]).map((s) => (
                <Button
                  key={s}
                  type="button"
                  size="sm"
                  variant={statusFilter === s ? "default" : "outline"}
                  onClick={() => setStatusFilter(s)}
                >
                  {t(`matters.status.${s}`)}
                </Button>
              ))}
            </div>

            <div className="ml-auto flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="min-w-44">
                <Select
                  value={typeFilter}
                  onValueChange={(v) => setTypeFilter(v as MatterType | "all")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("matters.filters.type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("matters.filters.all")}</SelectItem>
                    {(MATTER_TYPES as MatterType[]).map((mt) => (
                      <SelectItem key={mt} value={mt}>
                        {t(`matters.types.${mt}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("matters.filters.searchPlaceholder")}
                className="w-full sm:w-64"
              />
            </div>
          </div>
        </Card>

        <div className="rounded-md border">
          {loading ? (
            <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("deadlines.loading")}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                <Briefcase className="h-5 w-5 text-muted-foreground/40" />
              </div>
              <p className="text-sm font-medium text-muted-foreground/60">
                No matters found
              </p>
              <p className="mt-1 text-xs text-muted-foreground/40">
                Create your first matter to get started
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {paged.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-l-2 hover:bg-muted/20 transition-all",
                    statusRowBorderClass(m.status)
                  )}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs bg-muted/60 px-2 py-0.5 rounded">
                        {m.matter_number}
                      </span>
                      <p className="min-w-0 truncate text-sm font-semibold text-foreground">
                        {m.title}
                      </p>
                      <Badge variant="outline" className={statusBadgeClass(m.status)}>
                        {t(`matters.status.${m.status}`)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/60">
                      <span>{m.client?.name ?? t("time.invoices.clientFallback")}</span>
                      <span>·</span>
                      <Badge variant="outline" className="text-[10px]">
                        {t(`matters.types.${m.matter_type}`)}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {m.jurisdiction}
                      </Badge>
                      <span>·</span>
                      <span className="text-xs text-muted-foreground/40">
                        {t("matters.fields.openedAt")}: {fmtDate(m.opened_at)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground/50 font-mono">
                      <span>
                        {t("matters.stats.contracts")}:{" "}
                        <span className="font-medium text-foreground not-italic">
                          {m.stats?.contractsCount ?? 0}
                        </span>
                      </span>
                      <span>
                        {t("matters.stats.deadlines")}:{" "}
                        <span className="font-medium text-foreground not-italic">
                          {m.stats?.deadlinesCount ?? 0}
                        </span>
                      </span>
                      <span>
                        {t("matters.stats.unbilledHours")}:{" "}
                        <span className="font-medium text-foreground not-italic">
                          {(m.stats?.unbilledHours ?? 0).toFixed(2)} h
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild type="button" size="sm" variant="secondary">
                      <Link href={`/dashboard/matters/${m.id}`}>
                        {t("matters.actions.open")}
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(m)}
                    >
                      {t("matters.actions.edit")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      disabled={actionId === m.id}
                      onClick={async () => {
                        const ok = window.confirm("Delete this matter?")
                        if (!ok) return
                        setActionId(m.id)
                        setError(null)
                        try {
                          const {
                            data: { user },
                          } = await supabase.auth.getUser()
                          if (!user) throw new Error("Not authenticated")

                          const { error: uErr } = await supabase
                            .from("matters")
                            .update({ deleted_at: new Date().toISOString() })
                            .eq("id", m.id)
                            .eq("user_id", user.id)
                          if (uErr) throw uErr

                          void logActivity(
                            supabase,
                            "matter.deleted",
                            "matter",
                            m.id,
                            m.title ?? "Matter",
                            { matter_number: m.matter_number }
                          )

                          setMatters((prev) => prev.filter((x) => x.id !== m.id))
                        } catch (e) {
                          if (process.env.NODE_ENV !== "production") {
                            console.error(e)
                          }
                          setError("Failed to delete matter.")
                        } finally {
                          setActionId(null)
                        }
                      }}
                      aria-label={t("matters.actions.delete") ?? "Delete matter"}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Select
                      value={m.status}
                      onValueChange={(v) => void setStatus(m, v as MatterStatus)}
                      disabled={actionId === m.id}
                    >
                      <SelectTrigger className="h-9 w-[170px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(STATUSES as MatterStatus[]).map((s) => (
                          <SelectItem key={s} value={s}>
                            {t(`matters.status.${s}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filtered.length > PAGE_SIZE && (
          <div className="mt-4 flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void saveMatter()
              }}
            >
              <DialogHeader>
                <DialogTitle>
                  {editing ? t("matters.actions.edit") : t("matters.actions.create")}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="m_title">{t("matters.fields.title")}</Label>
                  <Input
                    id="m_title"
                    value={titleIn}
                    onChange={(e) => setTitleIn(e.target.value)}
                    placeholder="e.g. Ana Kovač — Razvod braka"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="m_client_q">{t("matters.fields.client")}</Label>
                  <Input
                    id="m_client_q"
                    value={clientQuery}
                    onChange={(e) => setClientQuery(e.target.value)}
                    placeholder={t("deadlines.dialog.clientSearchPlaceholder")}
                  />
                  <Select
                    value={clientIdIn || "__none__"}
                    onValueChange={(v) => setClientIdIn(v === "__none__" ? "" : v)}
                  >
                    <SelectTrigger className="w-full min-w-0">
                      <SelectValue placeholder={t("deadlines.dialog.clientPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">{t("deadlines.dialog.noClient")}</SelectItem>
                      {clientsFiltered.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                          {c.email ? ` (${c.email})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t("matters.fields.matterType")}</Label>
                    <Select value={typeIn} onValueChange={(v) => setTypeIn(v as MatterType)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(MATTER_TYPES as MatterType[]).map((mt) => (
                          <SelectItem key={mt} value={mt}>
                            {t(`matters.types.${mt}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("matters.fields.jurisdiction")}</Label>
                    <Select
                      value={jurisdictionIn}
                      onValueChange={(v) => setJurisdictionIn(v as Jurisdiction)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(JURISDICTIONS as Jurisdiction[]).map((j) => (
                          <SelectItem key={j} value={j}>
                            {j}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="m_opened">{t("matters.fields.openedAt")}</Label>
                    <Input
                      id="m_opened"
                      type="date"
                      value={openedAtIn}
                      onChange={(e) => setOpenedAtIn(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("matters.fields.status")}</Label>
                    <Select
                      value={statusIn}
                      onValueChange={(v) => setStatusIn(v as MatterStatus)}
                      disabled={!editing}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(STATUSES as MatterStatus[]).map((s) => (
                          <SelectItem key={s} value={s}>
                            {t(`matters.status.${s}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="m_desc">{t("matters.fields.description")}</Label>
                  <Textarea
                    id="m_desc"
                    value={descIn}
                    onChange={(e) => setDescIn(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t("matters.actions.cancel")}
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {saving ? t("deadlines.dialog.saving") : t("matters.actions.save")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

