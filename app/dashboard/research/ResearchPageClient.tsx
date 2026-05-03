"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Search, BookmarkPlus, Loader2 } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import type { EntitlementPlanId } from "../lib/entitlements"

type LanguageMode = "local" | "en"

type ResearchResultItem = {
  id: string
  jurisdiction: string
  category: string
  law_name: string
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  text: string
  text_local: string | null
  similarity: number
  confidencePct: number
  excerpt: string
}

type SearchResponse = {
  query: string
  filters: { jurisdiction: string | null; category: string | null }
  results: ResearchResultItem[]
}

type SavedSession = {
  id: string
  created_at: string
  query: string
  jurisdiction_filter: string | null
  category_filter: string | null
  results: SearchResponse["results"]
}

const JURISDICTIONS: Array<{ id: string; labelKey: string }> = [
  { id: "all", labelKey: "research.jurisdictions.all" },
  { id: "serbia", labelKey: "research.jurisdictions.serbia" },
  { id: "croatia", labelKey: "research.jurisdictions.croatia" },
  { id: "bih_federation", labelKey: "research.jurisdictions.bihFederation" },
  { id: "bih_rs", labelKey: "research.jurisdictions.bihRs" },
  { id: "bih_brcko", labelKey: "research.jurisdictions.bihBrcko" },
  { id: "montenegro", labelKey: "research.jurisdictions.montenegro" },
  { id: "slovenia", labelKey: "research.jurisdictions.slovenia" },
]

const CATEGORIES: Array<{ id: string; labelKey: string }> = [
  { id: "all", labelKey: "research.categories.all" },
  { id: "civil", labelKey: "research.categories.civil" },
  { id: "commercial", labelKey: "research.categories.commercial" },
  { id: "labor", labelKey: "research.categories.labor" },
  { id: "family", labelKey: "research.categories.family" },
  { id: "criminal", labelKey: "research.categories.criminal" },
  { id: "administrative", labelKey: "research.categories.administrative" },
  { id: "procedural", labelKey: "research.categories.procedural" },
  { id: "constitutional", labelKey: "research.categories.constitutional" },
  { id: "inheritance", labelKey: "research.categories.inheritance" },
  { id: "property", labelKey: "research.categories.property" },
  { id: "confidentiality", labelKey: "research.categories.confidentiality" },
  { id: "misdemeanor", labelKey: "research.categories.misdemeanor" },
]

function formatDate(value: string): string {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function highlightExcerpt(excerpt: string, query: string): Array<string | { mark: string }> {
  const trimmed = query.trim()
  if (!excerpt || !trimmed) return [excerpt]

  const tokens = Array.from(
    new Set(
      trimmed
        .split(/\s+/g)
        .map((t) => t.trim())
        .filter((t) => t.length >= 3)
        .slice(0, 8),
    ),
  )

  if (tokens.length === 0) return [excerpt]

  const pattern = tokens.map(escapeRegExp).join("|")
  const re = new RegExp(`(${pattern})`, "gi")

  const parts: Array<string | { mark: string }> = []
  let lastIdx = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(excerpt)) !== null) {
    const start = m.index
    const end = start + (m[0]?.length ?? 0)
    if (start > lastIdx) parts.push(excerpt.slice(lastIdx, start))
    parts.push({ mark: excerpt.slice(start, end) })
    lastIdx = end
    if (re.lastIndex === start) re.lastIndex++
  }
  if (lastIdx < excerpt.length) parts.push(excerpt.slice(lastIdx))
  return parts.length ? parts : [excerpt]
}

function jurisdictionBadgeClass(j: string): string {
  return cn(
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
    "bg-muted text-foreground",
  )
}

export function ResearchPageClient({ planId }: { planId: EntitlementPlanId }) {
  const { t } = useLanguage()
  const canSave = planId === "professional" || planId === "firm"

  const [query, setQuery] = useState("")
  const [jurisdiction, setJurisdiction] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [languageMode, setLanguageMode] = useState<LanguageMode>("local")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResponse | null>(null)

  const [saving, setSaving] = useState(false)

  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [history, setHistory] = useState<SavedSession[]>([])

  const hasResults = (results?.results?.length ?? 0) > 0

  const selectedJurisdictionLabel = useMemo(() => {
    const found = JURISDICTIONS.find((j) => j.id === jurisdiction)
    return found ? t(found.labelKey) : jurisdiction
  }, [jurisdiction, t])

  const selectedCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((c) => c.id === category)
    return found ? t(found.labelKey) : category
  }, [category, t])

  async function runSearch(input: string) {
    setLoading(true)
    setError(null)
    setResults(null)
    try {
      const resp = await fetch("/api/research/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          jurisdiction: jurisdiction === "all" ? null : jurisdiction,
          category: category === "all" ? null : category,
        }),
      })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setError(
          (json && typeof json.error === "string" && json.error) ||
            t("research.errors.searchFailed"),
        )
        return
      }
      setResults(json as SearchResponse)
      if (canSave) void loadHistory()
    } catch {
      setError(t("research.errors.searchFailed"))
    } finally {
      setLoading(false)
    }
  }

  async function loadHistory() {
    if (!canSave) return
    setHistoryLoading(true)
    setHistoryError(null)
    try {
      const resp = await fetch("/api/research/sessions", { method: "GET" })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setHistoryError(
          (json && typeof json.error === "string" && json.error) ||
            t("research.errors.historyFailed"),
        )
        return
      }
      const items = Array.isArray((json as any).items)
        ? ((json as any).items as SavedSession[])
        : []
      setHistory(items)
    } catch {
      setHistoryError(t("research.errors.historyFailed"))
    } finally {
      setHistoryLoading(false)
    }
  }

  async function saveSession() {
    if (!canSave) return
    if (!results) return
    setSaving(true)
    try {
      const resp = await fetch("/api/research/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: results.query,
          jurisdiction_filter: jurisdiction === "all" ? null : jurisdiction,
          category_filter: category === "all" ? null : category,
          results: results.results,
        }),
      })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setError(
          (json && typeof json.error === "string" && json.error) ||
            t("research.errors.saveFailed"),
        )
        return
      }
      void loadHistory()
    } catch {
      setError(t("research.errors.saveFailed"))
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (!canSave) return
    void loadHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSave])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      setError(t("research.errors.queryRequired"))
      return
    }
    void runSearch(trimmed)
  }

  function onOpenSession(s: SavedSession) {
    setQuery(s.query)
    setJurisdiction(s.jurisdiction_filter ?? "all")
    setCategory(s.category_filter ?? "all")
    setResults({
      query: s.query,
      filters: {
        jurisdiction: s.jurisdiction_filter,
        category: s.category_filter,
      },
      results: Array.isArray(s.results) ? s.results : [],
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("research.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("research.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("research.subtitle")}
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="rounded-xl border border-border/40 bg-muted/10 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/15">
                <Search className="h-5 w-5 text-teal-400" />
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <Label
                    htmlFor="researchQuery"
                    className="text-xs font-medium text-muted-foreground/70 mb-1.5"
                  >
                    {t("research.search.label")}
                  </Label>
                  <Input
                    id="researchQuery"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("research.search.placeholder")}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground/70 mb-1.5">
                      {t("research.filters.jurisdiction")}
                    </Label>
                    <Select value={jurisdiction} onValueChange={setJurisdiction}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("research.filters.jurisdiction")} />
                      </SelectTrigger>
                      <SelectContent>
                        {JURISDICTIONS.map((j) => (
                          <SelectItem key={j.id} value={j.id}>
                            {t(j.labelKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground/70 mb-1.5">
                      {t("research.filters.category")}
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("research.filters.category")} />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {t(c.labelKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground/70 mb-1.5">
                      {t("research.filters.language")}
                    </Label>
                    <Select
                      value={languageMode}
                      onValueChange={(v) => setLanguageMode(v as LanguageMode)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("research.filters.language")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">{t("research.language.local")}</SelectItem>
                        <SelectItem value="en">{t("research.language.english")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("research.actions.searching")}
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        {t("research.actions.search")}
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-muted-foreground">
                    {t("research.filters.summaryPrefix")}{" "}
                    <span className="font-medium text-foreground">
                      {selectedJurisdictionLabel}
                    </span>{" "}
                    ·{" "}
                    <span className="font-medium text-foreground">
                      {selectedCategoryLabel}
                    </span>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {canSave ? (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!hasResults || saving}
                        onClick={() => void saveSession()}
                      >
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("research.actions.saving")}
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="mr-2 h-4 w-4" />
                            {t("research.actions.save")}
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                        {t("research.upgradePrompt")}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-semibold mb-3">
                  {t("research.results.title")}
                </h2>
                {results ? (
                  <p className="text-xs text-muted-foreground">
                    {(results.results?.length ?? 0).toString()}{" "}
                    {t("research.results.countSuffix")}
                  </p>
                ) : null}
              </div>

              {!results ? (
                <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-border/40 bg-muted/10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                    <Search className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm text-muted-foreground/60">
                    Run a search to see relevant law articles
                  </p>
                </div>
              ) : results.results.length === 0 ? (
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {t("research.results.empty")}
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {results.results.map((r) => {
                    const textForMode =
                      languageMode === "en"
                        ? r.text
                        : (r.text_local && r.text_local.trim() ? r.text_local : r.text)
                    const excerpt = r.excerpt || (textForMode?.slice(0, 260) ?? "")
                    const parts = highlightExcerpt(excerpt, results.query)
                    return (
                      <Card key={r.id} className="p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              <span className="truncate">{r.law_name_local}</span>
                              {" "}
                              <span className="text-muted-foreground">
                                — {r.law_name}
                              </span>
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {t("research.results.articleLabel")}{" "}
                              <span className="font-medium text-foreground">
                                {r.article_num}
                                {r.paragraph_num ? ` §${r.paragraph_num}` : ""}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className={jurisdictionBadgeClass(r.jurisdiction)}>
                              {r.jurisdiction}
                            </span>
                            <Badge variant="secondary">{r.category}</Badge>
                            <Badge
                              className={cn(
                                "font-medium",
                                r.confidencePct >= 65
                                  ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                                  : r.confidencePct >= 30
                                  ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                                  : "bg-muted text-muted-foreground",
                              )}
                              variant="outline"
                            >
                              {t("research.results.confidenceLabel")} {r.confidencePct}%
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-3 text-sm leading-relaxed text-foreground">
                          {parts.map((p, idx) =>
                            typeof p === "string" ? (
                              <span key={idx}>{p}</span>
                            ) : (
                              <mark
                                key={idx}
                                className="rounded bg-primary/15 px-0.5 text-foreground"
                              >
                                {p.mark}
                              </mark>
                            ),
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-semibold mb-3">
                {t("research.sessions.title")}
              </h2>
              {canSave ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void loadHistory()}
                  disabled={historyLoading}
                >
                  {historyLoading
                    ? t("research.sessions.refreshing")
                    : t("research.sessions.refresh")}
                </Button>
              ) : null}
            </div>

            {!canSave ? (
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">
                  {t("research.sessions.upgradeHint")}
                </p>
              </Card>
            ) : (
              <Card className="p-0 overflow-hidden">
                {historyError ? (
                  <div className="p-6">
                    <p className="text-sm text-destructive">{historyError}</p>
                  </div>
                ) : historyLoading && history.length === 0 ? (
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t("research.sessions.loading")}
                    </p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t("research.sessions.empty")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 p-4">
                    {history.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => onOpenSession(s)}
                        className={cn(
                          "flex items-start justify-between gap-4 rounded-lg border border-border/40 bg-muted/10 px-4 py-3 hover:bg-muted/20 transition-colors w-full text-left",
                        )}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground line-clamp-2">
                            {s.query}
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {[
                              s.jurisdiction_filter ?? "all",
                              s.category_filter ?? "all",
                            ].map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xs text-muted-foreground/40">
                            {formatDate(s.created_at)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

