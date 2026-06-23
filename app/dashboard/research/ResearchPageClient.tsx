"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import {
  Search,
  BookmarkPlus,
  Loader2,
  Scale,
  BookOpen,
  ChevronDown,
  Trash2,
} from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"
import {
  highlightSubstring,
} from "@/lib/highlightSearchTerms"
import { CaseLawExpandableBody } from "@/components/CaseLawExpandableBody"
import type { EntitlementPlanId } from "../lib/entitlements"

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

type ResearchCaseLawResultItem = {
  id: string
  jurisdiction: string
  court: string
  case_number: string
  decision_date: string | null
  legal_question: string
  court_position: string
  reasoning: string
  outcome: string | null
  keywords: string[] | null
  related_articles: string[] | null
  similarity: number
  confidencePct: number
  excerpt: string
}

type SearchResponse = {
  query: string
  filters: { jurisdiction: string | null; category: string | null }
  results: ResearchResultItem[]
  caseLawResults?: ResearchCaseLawResultItem[]
  caseLawConfidence?: "high" | "medium" | "low" | "none"
  page?: number
  limit?: number
  totalResults?: number
  totalCaseLawResults?: number
  hasMoreLaws?: boolean
  hasMoreCaseLaw?: boolean
}

function mergeResultItemsById<T extends { id: string }>(
  existing: T[],
  incoming: T[],
): T[] {
  const seen = new Set(existing.map((item) => item.id))
  const added = incoming.filter((item) => !seen.has(item.id))
  return [...existing, ...added]
}

function defaultResearchResultsTab(
  data: Pick<SearchResponse, "results" | "caseLawResults">,
): "laws" | "caselaw" {
  return (data.results?.length ?? 0) > 0 ? "laws" : "caselaw"
}

function ResearchResultsPaginationFooter({
  shown,
  hasMore,
  loading,
  onLoadMore,
  t,
}: {
  shown: number
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
}) {
  if (shown === 0) return null

  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <p className="text-sm text-muted-foreground">
        {t("research.showingCount", { shown })}
      </p>
      {hasMore ? (
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={onLoadMore}
          className="gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
          {t("research.loadMore")}
        </Button>
      ) : null}
    </div>
  )
}

type SavedSessionResults =
  | ResearchResultItem[]
  | {
      law?: ResearchResultItem[]
      caseLaw?: ResearchCaseLawResultItem[]
      caseLawConfidence?: SearchResponse["caseLawConfidence"]
    }

type SavedSession = {
  id: string
  created_at: string
  query: string
  jurisdiction_filter: string | null
  category_filter: string | null
  results: SavedSessionResults
}

function parseSavedSessionResults(stored: SavedSessionResults): {
  law: ResearchResultItem[]
  caseLaw: ResearchCaseLawResultItem[]
  caseLawConfidence?: SearchResponse["caseLawConfidence"]
} {
  if (Array.isArray(stored)) {
    return { law: stored, caseLaw: [] }
  }
  return {
    law: Array.isArray(stored.law) ? stored.law : [],
    caseLaw: Array.isArray(stored.caseLaw) ? stored.caseLaw : [],
    caseLawConfidence: stored.caseLawConfidence,
  }
}

function confidenceBadgeClass(pct: number): string {
  return cn(
    "font-medium",
    pct >= 65
      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
      : pct >= 30
        ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
        : "bg-muted text-muted-foreground",
  )
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

function caseLawOutcomeBorderClass(outcome: string | null): string {
  switch (outcome) {
    case "plaintiff_won":
      return "border-l-emerald-500"
    case "defendant_won":
      return "border-l-red-500"
    case "partially":
      return "border-l-amber-500"
    case "remanded":
      return "border-l-blue-500"
    case "procedural":
      return "border-l-muted-foreground"
    default:
      return "border-l-border"
  }
}

function ResearchCaseLawResults({
  results,
  t,
  jurisdictionBadgeClass,
  confidenceBadgeClass,
}: {
  results: SearchResponse
  t: (key: string) => string
  jurisdictionBadgeClass: (j: string) => string
  confidenceBadgeClass: (pct: number) => string
}) {
  const items = results.caseLawResults ?? []
  return (
    <div className="space-y-4">
      {items.map((c) => {
        const outcomeKey = c.outcome ? `rag.caseLaw.outcomes.${c.outcome}` : null
        const outcomeLabel =
          outcomeKey && t(outcomeKey) !== outcomeKey ? t(outcomeKey) : c.outcome
        const decisionLabel =
          c.decision_date && c.decision_date.trim()
            ? new Date(c.decision_date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : null
        return (
          <Card
            key={c.id}
            className={cn(
              "border-l-2 p-5",
              caseLawOutcomeBorderClass(c.outcome),
            )}
          >
            <CaseLawResultCardBody
              c={c}
              outcomeLabel={outcomeLabel}
              decisionLabel={decisionLabel}
              t={t}
              jurisdictionBadgeClass={jurisdictionBadgeClass}
              confidenceBadgeClass={confidenceBadgeClass}
            />
          </Card>
        )
      })}
    </div>
  )
}

function CaseLawResultCardBody({
  c,
  outcomeLabel,
  decisionLabel,
  t,
  jurisdictionBadgeClass,
  confidenceBadgeClass,
}: {
  c: ResearchCaseLawResultItem
  outcomeLabel: string | null
  decisionLabel: string | null
  t: (key: string) => string
  jurisdictionBadgeClass: (j: string) => string
  confidenceBadgeClass: (pct: number) => string
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="flex-1 whitespace-normal break-words text-sm text-muted-foreground">
          {c.court}
        </p>
        {outcomeLabel ? (
          <Badge variant="secondary" className="shrink-0">
            {outcomeLabel}
          </Badge>
        ) : null}
      </div>
      <p className="mt-1 text-base font-bold text-foreground">{c.case_number}</p>
      {decisionLabel ? (
        <p className="mt-0.5 text-xs text-muted-foreground">
          {t("rag.caseLaw.decisionDateLabel")} {decisionLabel}
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={jurisdictionBadgeClass(c.jurisdiction)}>
          {c.jurisdiction}
        </span>
        <Badge
          className={confidenceBadgeClass(c.confidencePct)}
          variant="outline"
        >
          {t("research.results.confidenceLabel")} {c.confidencePct}%
        </Badge>
      </div>
      <CaseLawExpandableBody
        legalQuestion={c.legal_question}
        courtPosition={c.court_position}
        courtPositionSnippet={c.excerpt}
        plainText
        reasoning={c.reasoning}
        keywords={c.keywords}
        relatedArticles={c.related_articles}
        showAllDetails
        t={t}
      />
    </>
  )
}

function ResearchResultsTabs({
  results,
  activeTab,
  onTabChange,
  t,
  jurisdictionBadgeClass,
  confidenceBadgeClass,
  loadingMoreLaws,
  loadingMoreCaseLaw,
  onLoadMoreLaws,
  onLoadMoreCaseLaw,
}: {
  results: SearchResponse
  activeTab: "laws" | "caselaw"
  onTabChange: (tab: "laws" | "caselaw") => void
  t: (key: string, vars?: Record<string, string | number>) => string
  jurisdictionBadgeClass: (j: string) => string
  confidenceBadgeClass: (pct: number) => string
  loadingMoreLaws: boolean
  loadingMoreCaseLaw: boolean
  onLoadMoreLaws: () => void
  onLoadMoreCaseLaw: () => void
}) {
  const lawCount = results.results?.length ?? 0
  const caseCount = results.caseLawResults?.length ?? 0
  const showLawsTab = lawCount > 0
  const showCaseTab = caseCount > 0
  const tabValue =
    activeTab === "laws" && showLawsTab
      ? "laws"
      : activeTab === "caselaw" && showCaseTab
        ? "caselaw"
        : showLawsTab
          ? "laws"
          : "caselaw"

  if (!showLawsTab && !showCaseTab) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          {t("research.results.empty")}
        </p>
      </Card>
    )
  }

  return (
    <Tabs
      value={tabValue}
      onValueChange={(value) => onTabChange(value as "laws" | "caselaw")}
      className="space-y-3"
    >
      <TabsList className="flex h-auto w-full p-1">
        {showLawsTab ? (
          <TabsTrigger
            value="laws"
            className="flex-1 cursor-pointer gap-2 px-6 py-3 text-base font-semibold text-foreground/70 data-[state=active]:text-lg data-[state=active]:font-bold data-[state=active]:text-blue-800 data-[state=active]:shadow-sm dark:text-foreground/60 dark:data-[state=active]:text-blue-300"
          >
            <BookOpen className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
            {t("research.results.lawsTab")} ({lawCount})
          </TabsTrigger>
        ) : null}
        {showCaseTab ? (
          <TabsTrigger
            value="caselaw"
            className="flex-1 cursor-pointer gap-2 px-6 py-3 text-base font-semibold text-foreground/70 data-[state=active]:text-lg data-[state=active]:font-bold data-[state=active]:text-amber-800 data-[state=active]:shadow-sm dark:text-foreground/60 dark:data-[state=active]:text-amber-300"
          >
            <Scale className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            {t("research.results.caseLawTab")} ({caseCount})
          </TabsTrigger>
        ) : null}
      </TabsList>

      {showLawsTab ? (
        <TabsContent value="laws" className="mt-3 space-y-3">
          {lawCount === 0 ? (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">
                {t("research.results.empty")}
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {results.results.map((r) => {
                const displayText =
                  r.text_local && r.text_local.trim() ? r.text_local : r.text ?? ""
                const parts = highlightSubstring(displayText, results.query)
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
                          {t("research.results.confidenceLabel")}{" "}
                          {r.confidencePct}%
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
              <ResearchResultsPaginationFooter
                shown={lawCount}
                hasMore={results.hasMoreLaws ?? false}
                loading={loadingMoreLaws}
                onLoadMore={onLoadMoreLaws}
                t={t}
              />
            </div>
          )}
        </TabsContent>
      ) : null}

      {showCaseTab ? (
        <TabsContent value="caselaw" className="mt-3 space-y-3">
          <ResearchCaseLawResults
            results={results}
            t={t}
            jurisdictionBadgeClass={jurisdictionBadgeClass}
            confidenceBadgeClass={confidenceBadgeClass}
          />
          <ResearchResultsPaginationFooter
            shown={caseCount}
            hasMore={results.hasMoreCaseLaw ?? false}
            loading={loadingMoreCaseLaw}
            onLoadMore={onLoadMoreCaseLaw}
            t={t}
          />
        </TabsContent>
      ) : null}
    </Tabs>
  )
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

  const [loading, setLoading] = useState(false)
  const [loadingMoreLaws, setLoadingMoreLaws] = useState(false)
  const [loadingMoreCaseLaw, setLoadingMoreCaseLaw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [resultsTab, setResultsTab] = useState<"laws" | "caselaw">("laws")
  const [lawsPage, setLawsPage] = useState(1)
  const [caseLawPage, setCaseLawPage] = useState(1)

  const [saving, setSaving] = useState(false)

  const [historyLoading, setHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState<string | null>(null)
  const [history, setHistory] = useState<SavedSession[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const hasResults =
    (results?.results?.length ?? 0) > 0 ||
    (results?.caseLawResults?.length ?? 0) > 0

  const selectedJurisdictionLabel = useMemo(() => {
    const found = JURISDICTIONS.find((j) => j.id === jurisdiction)
    return found ? t(found.labelKey) : jurisdiction
  }, [jurisdiction, t])

  const selectedCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((c) => c.id === category)
    return found ? t(found.labelKey) : category
  }, [category, t])

  function searchRequestBody(
    input: string,
    page: number,
    scope: "laws" | "caselaw" | "both",
  ) {
    return {
      query: input,
      jurisdiction: jurisdiction === "all" ? null : jurisdiction,
      // API expects null for "all categories", not the string "all"
      category: category === "all" ? null : category,
      page,
      limit: results?.limit ?? 10,
      scope,
    }
  }

  async function runSearch(input: string) {
    setLoading(true)
    setError(null)
    setResults(null)
    setLawsPage(1)
    setCaseLawPage(1)
    try {
      const resp = await fetch("/api/research/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchRequestBody(input, 1, "both")),
      })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setError(
          (json && typeof json.error === "string" && json.error) ||
            t("research.errors.searchFailed"),
        )
        return
      }
      const nextResults = json as SearchResponse
      setResults(nextResults)
      setResultsTab(defaultResearchResultsTab(nextResults))
      setLawsPage(1)
      setCaseLawPage(1)
      if (canSave) void loadHistory()
    } catch {
      setError(t("research.errors.searchFailed"))
    } finally {
      setLoading(false)
    }
  }

  async function loadMore(scope: "laws" | "caselaw") {
    if (!results?.query) return
    const nextPage = scope === "laws" ? lawsPage + 1 : caseLawPage + 1
    const setLoadingMore =
      scope === "laws" ? setLoadingMoreLaws : setLoadingMoreCaseLaw

    setLoadingMore(true)
    setError(null)
    try {
      const resp = await fetch("/api/research/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          searchRequestBody(results.query, nextPage, scope),
        ),
      })
      const json = (await resp.json().catch(() => null)) as SearchResponse | null
      if (!resp.ok || !json) {
        setError(
          (json && typeof (json as { error?: string }).error === "string" &&
            (json as { error: string }).error) ||
            t("research.errors.searchFailed"),
        )
        return
      }

      setResults((prev) => {
        if (!prev) return json
        if (scope === "laws") {
          return {
            ...prev,
            results: mergeResultItemsById(prev.results, json.results ?? []),
            hasMoreLaws: json.hasMoreLaws ?? false,
            limit: json.limit ?? prev.limit,
          }
        }
        return {
          ...prev,
          caseLawResults: mergeResultItemsById(
            prev.caseLawResults ?? [],
            json.caseLawResults ?? [],
          ),
          hasMoreCaseLaw: json.hasMoreCaseLaw ?? false,
          caseLawConfidence: json.caseLawConfidence ?? prev.caseLawConfidence,
          limit: json.limit ?? prev.limit,
        }
      })

      if (scope === "laws") setLawsPage(nextPage)
      else setCaseLawPage(nextPage)
    } catch {
      setError(t("research.errors.searchFailed"))
    } finally {
      setLoadingMore(false)
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

  async function deleteSession(s: SavedSession) {
    if (!canSave) return
    const ok = window.confirm(t("research.sessions.deleteConfirm"))
    if (!ok) return

    setDeletingId(s.id)
    setHistoryError(null)
    try {
      const resp = await fetch(`/api/research/sessions/${s.id}`, {
        method: "DELETE",
      })
      const json = await resp.json().catch(() => null)
      if (!resp.ok) {
        setHistoryError(
          (json && typeof json.error === "string" && json.error) ||
            t("research.errors.deleteFailed"),
        )
        return
      }
      setHistory((prev) => prev.filter((item) => item.id !== s.id))
    } catch {
      setHistoryError(t("research.errors.deleteFailed"))
    } finally {
      setDeletingId(null)
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
          results: {
            law: results.results,
            caseLaw: results.caseLawResults ?? [],
            caseLawConfidence: results.caseLawConfidence,
          },
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
    const parsed = parseSavedSessionResults(s.results)
    setLawsPage(1)
    setCaseLawPage(1)
    const sessionResults = {
      query: s.query,
      filters: {
        jurisdiction: s.jurisdiction_filter,
        category: s.category_filter,
      },
      results: parsed.law,
      caseLawResults: parsed.caseLaw,
      caseLawConfidence: parsed.caseLawConfidence,
      page: 1,
      limit: 10,
      hasMoreLaws: false,
      hasMoreCaseLaw: false,
    }
    setResults(sessionResults)
    setResultsTab(defaultResearchResultsTab(sessionResults))
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

                <div className="grid gap-4 sm:grid-cols-2">
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
              {!results ? (
                <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-border/40 bg-muted/10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                    <Search className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <p className="text-sm text-muted-foreground/60">
                    Run a search to see relevant law articles
                  </p>
                </div>
              ) : (
                <ResearchResultsTabs
                  results={results}
                  activeTab={resultsTab}
                  onTabChange={setResultsTab}
                  t={t}
                  jurisdictionBadgeClass={jurisdictionBadgeClass}
                  confidenceBadgeClass={confidenceBadgeClass}
                  loadingMoreLaws={loadingMoreLaws}
                  loadingMoreCaseLaw={loadingMoreCaseLaw}
                  onLoadMoreLaws={() => void loadMore("laws")}
                  onLoadMoreCaseLaw={() => void loadMore("caselaw")}
                />
              )}
            </section>
          </div>

          <aside className="space-y-3">
            <h2 className="text-base font-semibold mb-3">
              {t("research.sessions.title")}
            </h2>

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
                      <div
                        key={s.id}
                        className={cn(
                          "flex items-start gap-2 rounded-lg border border-border/40 bg-muted/10 px-4 py-3 hover:bg-muted/20 transition-colors",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenSession(s)}
                          className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          disabled={deletingId === s.id}
                          onClick={() => void deleteSession(s)}
                          aria-label={t("research.sessions.deleteAria")}
                        >
                          {deletingId === s.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
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

