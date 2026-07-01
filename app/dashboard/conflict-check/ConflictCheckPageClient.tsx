"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/LanguageProvider"
import { localeForLanguage } from "@/lib/i18n/locale"
import { cn } from "@/lib/utils"
import type { EntitlementPlanId } from "../lib/entitlements"
import { ShieldAlert, Trash2, Loader2 } from "lucide-react"

type ConflictMatch = {
  source: "clients" | "contracts" | "case_predictions"
  id: string
  title: string
  subtitle?: string | null
  createdAt?: string | null
  context?: string | null
}

type ConflictCheckResults = {
  status: "clear" | "conflict"
  query: { raw: string; normalized: string }
  matches: {
    clients: ConflictMatch[]
    contracts: ConflictMatch[]
    case_predictions: ConflictMatch[]
  }
}

type HistoryItem = {
  id: string
  created_at: string
  search_query: string
  results_summary: string
  has_conflict: boolean
  override: boolean
  override_confirmed: boolean
}

const PAGE_SIZE = 12

function formatDate(value: string, locale: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function historySummary(
  item: HistoryItem,
  t: (key: string) => string
): string {
  return item.has_conflict
    ? t("conflict.history.summary.hasMatches")
    : t("conflict.history.summary.clear")
}

function badgeClass(kind: "clear" | "conflict"): string {
  return cn(
    "inline-flex h-8 shrink-0 items-center rounded-full px-2.5 text-xs font-medium",
    kind === "clear"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
  )
}

export function ConflictCheckPageClient({ planId }: { planId: EntitlementPlanId }) {
  const { t, language } = useLanguage()
  const dateLocale = localeForLanguage(language)
  const canViewHistory = planId === "professional" || planId === "firm"

  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ConflictCheckResults | null>(null)

  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const totalMatches = useMemo(() => {
    if (!results) return 0
    return (
      results.matches.clients.length +
      results.matches.contracts.length +
      results.matches.case_predictions.length
    )
  }, [results])

  async function runCheck(input: string) {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const resp = await fetch("/api/conflict-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setError(
          (json && typeof json.error === "string" && json.error) ||
            t("conflict.errors.searchFailed")
        )
        return
      }
      setResults((json as any).results as ConflictCheckResults)
      if (canViewHistory) {
        void loadHistory()
      }
    } catch {
      setError(t("conflict.errors.searchFailed"))
    } finally {
      setLoading(false)
    }
  }

  async function loadHistory() {
    setHistoryLoading(true)
    setHistoryError(null)
    try {
      const resp = await fetch("/api/conflict-check", { method: "GET" })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setHistoryError(
          (json && typeof json.error === "string" && json.error) ||
            t("conflict.errors.historyFailed")
        )
        return
      }
      const items = Array.isArray((json as any).items) ? ((json as any).items as HistoryItem[]) : []
      setHistory(items)
    } catch {
      setHistoryError(t("conflict.errors.historyFailed"))
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    if (!canViewHistory) return
    void loadHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canViewHistory])

  useEffect(() => {
    setPage(1)
  }, [history.length])

  const totalPages = Math.max(1, Math.ceil(history.length / PAGE_SIZE))
  const pagedHistory = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return history.slice(start, start + PAGE_SIZE)
  }, [history, page])

  async function handleDelete(item: HistoryItem) {
    const ok = window.confirm(t("conflict.history.deleteConfirm"))
    if (!ok) return

    setDeletingId(item.id)
    setHistoryError(null)
    try {
      const resp = await fetch(`/api/conflict-check/${item.id}`, { method: "DELETE" })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setHistoryError(
          (json && typeof json.error === "string" && json.error) ||
            t("conflict.history.deleteFailed")
        )
        return
      }

      setHistory((prev) => {
        const next = prev.filter((row) => row.id !== item.id)
        const nextTotalPages = Math.max(1, Math.ceil(next.length / PAGE_SIZE))
        setPage((p) => Math.min(p, nextTotalPages))
        return next
      })
    } catch {
      setHistoryError(t("conflict.history.deleteFailed"))
    } finally {
      setDeletingId(null)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      setError(t("conflict.errors.queryRequired"))
      return
    }
    void runCheck(trimmed)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("conflict.header.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("conflict.header.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("conflict.header.subtitle")}
            </p>
          </div>
        </header>

        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/15">
          <ShieldAlert className="h-5 w-5 text-red-400" />
        </div>

        <Card className="rounded-xl border border-border/40 bg-muted/10 p-6">
          <form className="space-y-4" onSubmit={onSubmit}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/50 mb-3">
              Search for conflicts
            </p>
            <div className="space-y-2">
              <Label htmlFor="conflictQuery">{t("conflict.form.query.label")}</Label>
              <Input
                id="conflictQuery"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("conflict.form.query.placeholder")}
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">
                {t("conflict.form.query.help")}
              </p>
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? t("conflict.form.actions.checking") : t("conflict.form.actions.check")}
              </Button>
              {results && (
                <span className="text-xs text-muted-foreground">
                  {totalMatches} {t("conflict.results.matchCountSuffix")}
                </span>
              )}
            </div>
          </form>
        </Card>

        {results && (
          <Card className="p-6">
            {results.status === "clear" ? (
              <div className="space-y-2">
                <span className={badgeClass("clear")}>{t("conflict.results.clearBadge")}</span>
                <h2 className="text-lg font-semibold">{t("conflict.results.clearTitle")}</h2>
                <p className="text-sm text-muted-foreground">{t("conflict.results.clearBody")}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className={badgeClass("conflict")}>{t("conflict.results.conflictBadge")}</span>
                <h2 className="text-lg font-semibold">{t("conflict.results.conflictTitle")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("conflict.results.conflictBody")}
                </p>
              </div>
            )}

            {results.status === "conflict" && (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <ResultGroup
                  title={t("conflict.results.groups.clients")}
                  items={results.matches.clients}
                />
                <ResultGroup
                  title={t("conflict.results.groups.contracts")}
                  items={results.matches.contracts}
                />
                <ResultGroup
                  title={t("conflict.results.groups.cases")}
                  items={results.matches.case_predictions}
                />
              </div>
            )}
          </Card>
        )}

        <section className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold">{t("conflict.history.title")}</h2>
            {canViewHistory ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void loadHistory()}
                disabled={historyLoading}
              >
                {historyLoading ? t("conflict.history.refreshing") : t("conflict.history.refresh")}
              </Button>
            ) : null}
          </div>

          {!canViewHistory ? (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">
                {t("conflict.history.upgradeHint")}
              </p>
            </Card>
          ) : (
            <Card className="p-6">
              {historyError ? (
                <p className="text-sm text-destructive">{historyError}</p>
              ) : historyLoading && history.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("conflict.history.loading")}</p>
              ) : history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                    <ShieldAlert className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground/60">
                    {t("conflict.history.empty")}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pagedHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 rounded-lg border border-border/40 px-4 py-3 hover:bg-muted/20 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {item.search_query}
                        </p>
                        <p className="text-xs text-muted-foreground/40">
                          {formatDate(item.created_at, dateLocale)}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">
                          {historySummary(item, t)}
                        </p>
                        {item.override && (
                          <p className="text-xs text-amber-400 mt-0.5">
                            {t("conflict.history.overrideLine")}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5 self-center">
                        <span className={badgeClass(item.has_conflict ? "conflict" : "clear")}>
                          {item.has_conflict
                            ? t("conflict.history.badges.conflict")
                            : t("conflict.history.badges.clear")}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          disabled={deletingId === item.id}
                          onClick={() => void handleDelete(item)}
                          aria-label={t("conflict.history.delete")}
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
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
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}

function ResultGroup({ title, items }: { title: string; items: ConflictMatch[] }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">—</p>
      ) : (
        <div className="mt-3 space-y-3">
          {items.map((m) => (
            <div key={`${m.source}-${m.id}`} className="space-y-1">
              <p className="text-sm font-medium text-foreground">{m.title}</p>
              {m.subtitle && (
                <p className="text-xs text-muted-foreground">{m.subtitle}</p>
              )}
              {m.context && (
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {m.context}
                </p>
              )}
              {m.createdAt && (
                <p className="text-[11px] text-muted-foreground">
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

