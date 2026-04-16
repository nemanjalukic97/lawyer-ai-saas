"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

import { useLanguage } from "@/components/LanguageProvider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import type { Tables } from "@/lib/supabase/types"
import { Loader2 } from "lucide-react"

type MatterRow = Tables<"matters">
type MatterStatus = MatterRow["status"]

type DeadlineRow = Pick<Tables<"deadlines">, "id" | "title" | "due_date" | "status" | "client_id">
type ContractRow = Pick<Tables<"contracts">, "id" | "title" | "created_at" | "status">
type DocumentRow = Pick<Tables<"documents">, "id" | "title" | "created_at" | "status">
type TimeEntryRow = Pick<Tables<"time_entries">, "id" | "work_date" | "duration_minutes" | "status" | "notes" | "amount">
type InvoiceRow = Pick<Tables<"invoices">, "id" | "invoice_number" | "status" | "total_amount" | "currency" | "due_date">
type PredictionRow = Pick<Tables<"case_predictions">, "id" | "case_name" | "created_at" | "outcome_probability" | "confidence_level">

type MatterDetail = MatterRow & { client?: { name: string } | null }

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

type Props = { matterId: string }

export function MatterDetailPageClient({ matterId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [matter, setMatter] = useState<MatterDetail | null>(null)

  const [deadlines, setDeadlines] = useState<DeadlineRow[]>([])
  const [contracts, setContracts] = useState<ContractRow[]>([])
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntryRow[]>([])
  const [invoices, setInvoices] = useState<InvoiceRow[]>([])
  const [predictions, setPredictions] = useState<PredictionRow[]>([])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const mQuery = supabase
        .from("matters")
        .select(
          "id, user_id, law_firm_id, client_id, title, matter_number, matter_type, jurisdiction, status, description, opened_at, closed_at, deleted_at, created_at, updated_at, client:clients(name)"
        )
        .eq("id", matterId)
        .is("deleted_at", null)
      const { data: m, error: mErr } = await mQuery.maybeSingle()

      if (mErr) throw mErr
      if (!m) {
        setMatter(null)
        setError(t("matters.detail.notFound"))
        setLoading(false)
        return
      }

      setMatter(m as MatterDetail)

      const [
        dlRes,
        cRes,
        docRes,
        teRes,
        invRes,
        predRes,
      ] = await Promise.all([
        (() => {
          const q = supabase
            .from("deadlines")
            .select("id, title, due_date, status, client_id")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("due_date", { ascending: true })
          return q
        })(),
        (() => {
          const q = supabase
            .from("contracts")
            .select("id, title, created_at, status")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(50)
          return q
        })(),
        (() => {
          const q = supabase
            .from("documents")
            .select("id, title, created_at, status")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(50)
          return q
        })(),
        (() => {
          const q = supabase
            .from("time_entries")
            .select("id, work_date, duration_minutes, status, notes, amount")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("work_date", { ascending: false })
            .limit(100)
          return q
        })(),
        (() => {
          const q = supabase
            .from("invoices")
            .select("id, invoice_number, status, total_amount, currency, due_date")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(50)
          return q
        })(),
        (() => {
          const q = supabase
            .from("case_predictions")
            .select("id, case_name, created_at, outcome_probability, confidence_level")
            .eq("matter_id", matterId)
            .is("deleted_at", null)
            .order("created_at", { ascending: false })
            .limit(50)
          return q
        })(),
      ])

      if (dlRes.error) throw dlRes.error
      if (cRes.error) throw cRes.error
      if (docRes.error) throw docRes.error
      if (teRes.error) throw teRes.error
      if (invRes.error) throw invRes.error
      if (predRes.error) throw predRes.error

      setDeadlines((dlRes.data ?? []) as DeadlineRow[])
      setContracts((cRes.data ?? []) as ContractRow[])
      setDocuments((docRes.data ?? []) as DocumentRow[])
      setTimeEntries((teRes.data ?? []) as TimeEntryRow[])
      setInvoices((invRes.data ?? []) as InvoiceRow[])
      setPredictions((predRes.data ?? []) as PredictionRow[])
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e)
      }
      setError(t("matters.detail.loadFailed"))
    } finally {
      setLoading(false)
    }
  }, [matterId, supabase, t])

  useEffect(() => {
    void load()
  }, [load])

  const stats = useMemo(() => {
    const openDeadlines = deadlines.filter((d) => d.status !== "completed" && d.status !== "cancelled").length

    const unbilledHours = timeEntries
      .filter((te) => (te.status ?? "") === "pending")
      .reduce((sum, te) => sum + hoursFromMinutes(Number(te.duration_minutes ?? 0)), 0)

    const totalBilled = invoices
      .filter((inv) => (inv.status ?? "") === "paid")
      .reduce((sum, inv) => sum + Number(inv.total_amount ?? 0), 0)

    const outstanding = invoices
      .filter((inv) => ["sent", "overdue"].includes(String(inv.status ?? "")))
      .reduce((sum, inv) => sum + Number(inv.total_amount ?? 0), 0)

    return {
      contracts: contracts.length,
      documents: documents.length,
      openDeadlines,
      unbilledHours,
      totalBilled,
      outstanding,
      predictions: predictions.length,
    }
  }, [contracts.length, deadlines, documents.length, invoices, predictions.length, timeEntries])

  const recentActivity = useMemo(() => {
    const items: Array<{ kind: string; title: string; at: string | null; href?: string }> = []

    for (const c of contracts) {
      items.push({ kind: t("activity.types.contract"), title: c.title, at: c.created_at ?? null, href: `/dashboard/contracts?id=${c.id}` })
    }
    for (const d of documents) {
      items.push({ kind: t("activity.types.document"), title: d.title, at: d.created_at ?? null, href: `/dashboard/generate?id=${d.id}` })
    }
    for (const dl of deadlines) {
      items.push({ kind: t("nav.deadlines"), title: dl.title, at: dl.due_date ?? null, href: "/dashboard/deadlines" })
    }

    items.sort((a, b) => new Date(b.at ?? 0).getTime() - new Date(a.at ?? 0).getTime())
    return items.slice(0, 8)
  }, [contracts, deadlines, documents, t])

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("deadlines.loading")}
          </div>
        </div>
      </div>
    )
  }

  if (!matter) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-3">
          <p className="text-sm text-destructive">{error ?? t("matters.detail.notFound")}</p>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/matters">{t("matters.detail.backToList")}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("matters.detail.kicker")}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                {matter.matter_number}
              </Badge>
              <h1 className="min-w-0 truncate text-2xl font-semibold tracking-tight">
                {matter.title}
              </h1>
              <Badge variant="outline" className={statusBadgeClass(matter.status)}>
                {t(`matters.status.${matter.status}`)}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {matter.client?.name ? `${matter.client.name} · ` : ""}
              {t(`matters.types.${matter.matter_type}`)} · {matter.jurisdiction} ·{" "}
              {t("matters.fields.openedAt")}: {fmtDate(matter.opened_at)}
            </p>
            {matter.description && (
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                {matter.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/matters">{t("matters.detail.backToList")}</Link>
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full max-w-2xl">
            <TabsTrigger value="overview" className="flex-1">
              {t("matters.tabs.overview")}
            </TabsTrigger>
            <TabsTrigger value="deadlines" className="flex-1">
              {t("matters.tabs.deadlines")}
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex-1">
              {t("matters.tabs.documentsContracts")}
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex-1">
              {t("matters.tabs.timeBilling")}
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex-1">
              {t("matters.tabs.predictions")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("matters.stats.contracts")}
                </p>
                <p className="mt-2 text-2xl font-semibold">{stats.contracts}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("dashboard.stats.documents.title")}
                </p>
                <p className="mt-2 text-2xl font-semibold">{stats.documents}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("matters.detail.stats.openDeadlines")}
                </p>
                <p className="mt-2 text-2xl font-semibold">{stats.openDeadlines}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("matters.stats.unbilledHours")}
                </p>
                <p className="mt-2 text-2xl font-semibold">{stats.unbilledHours.toFixed(2)}h</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("matters.detail.stats.totalBilled")}
                </p>
                <p className="mt-2 text-2xl font-semibold">€{stats.totalBilled.toFixed(2)}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("matters.detail.stats.outstandingPrefix")} €{stats.outstanding.toFixed(2)}
                </p>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{t("matters.detail.recentActivity.title")}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.recentActivity.subtitle")}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("matters.detail.recentActivity.empty")}</p>
                ) : (
                  recentActivity.map((it, idx) => (
                    <div key={`${it.kind}-${idx}`} className="flex items-start justify-between gap-3 rounded-md border p-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {it.href ? (
                            <Link href={it.href} className="hover:underline">
                              {it.kind}: {it.title}
                            </Link>
                          ) : (
                            <>
                              {it.kind}: {it.title}
                            </>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{fmtDate(it.at)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines" className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{t("matters.tabs.deadlines")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.deadlines.subtitle")}</p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/deadlines?matterId=${encodeURIComponent(matterId)}`}>
                  {t("matters.detail.deadlines.add")}
                </Link>
              </Button>
            </div>

            <Card className="divide-y">
              {deadlines.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">{t("matters.detail.deadlines.empty")}</div>
              ) : (
                deadlines.map((d) => (
                  <div key={d.id} className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{d.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {fmtDate(d.due_date)} · {t(`deadlines.filters.${d.status === "completed" ? "completed" : d.status === "overdue" ? "overdue" : "upcoming"}`)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="mt-4 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{t("matters.detail.contracts.title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.contracts.subtitle")}</p>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/contracts?matterId=${encodeURIComponent(matterId)}`}>
                      {t("matters.detail.contracts.generate")}
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  {contracts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("matters.detail.contracts.empty")}</p>
                  ) : (
                    contracts.slice(0, 12).map((c) => (
                      <div key={c.id} className="rounded-md border p-3">
                        <p className="text-sm font-medium">{c.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{fmtDate(c.created_at)}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{t("matters.detail.documents.title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.documents.subtitle")}</p>
                  </div>
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/dashboard/analyze?matterId=${encodeURIComponent(matterId)}`}>
                      {t("matters.detail.documents.analyze")}
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  {documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("matters.detail.documents.empty")}</p>
                  ) : (
                    documents.slice(0, 12).map((d) => (
                      <div key={d.id} className="rounded-md border p-3">
                        <p className="text-sm font-medium">{d.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{fmtDate(d.created_at)}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-4 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{t("matters.detail.time.title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.time.subtitle")}</p>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/dashboard/time?matterId=${encodeURIComponent(matterId)}`}>
                      {t("matters.detail.time.log")}
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  {timeEntries.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("matters.detail.time.empty")}</p>
                  ) : (
                    timeEntries.slice(0, 12).map((te) => (
                      <div key={te.id} className="rounded-md border p-3">
                        <p className="text-sm font-medium">
                          {fmtDate(te.work_date ?? null)} ·{" "}
                          {hoursFromMinutes(Number(te.duration_minutes ?? 0)).toFixed(2)}h
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {t("time.status.unbilled")}: {String(te.status ?? "") === "pending" ? t("time.status.unbilled") : String(te.status ?? "")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{t("matters.detail.billing.title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.billing.subtitle")}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {invoices.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t("matters.detail.billing.empty")}</p>
                  ) : (
                    invoices.slice(0, 12).map((inv) => (
                      <div key={inv.id} className="rounded-md border p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium">{inv.invoice_number}</p>
                          <Badge variant="outline">
                            {t(`time.invoices.status.${String(inv.status ?? "draft")}`)}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {Number(inv.total_amount ?? 0).toFixed(2)} {inv.currency ?? "EUR"}
                          {inv.due_date ? ` · ${t("time.invoices.duePrefix")} ${inv.due_date}` : ""}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{t("matters.tabs.predictions")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("matters.detail.predictions.subtitle")}</p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/predictions?matterId=${encodeURIComponent(matterId)}`}>
                  {t("matters.detail.predictions.new")}
                </Link>
              </Button>
            </div>

            <Card className="divide-y">
              {predictions.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">{t("matters.detail.predictions.empty")}</div>
              ) : (
                predictions.map((p) => (
                  <div key={p.id} className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        {p.case_name ?? t("predictions.sidebar.fallbackCaseName")}
                      </p>
                      <div className="flex items-center gap-2">
                        {typeof p.outcome_probability === "number" && (
                          <Badge variant="outline">{p.outcome_probability}%</Badge>
                        )}
                        <Badge variant="outline">
                          {t(`predictions.confidenceLevels.${p.confidence_level}`)}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{fmtDate(p.created_at)}</p>
                  </div>
                ))
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

