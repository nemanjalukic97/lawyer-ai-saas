"use client"

import type { CaseLawSource, RagMetadata } from "@/types/rag"
import { useLanguage } from "@/components/LanguageProvider"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type Props = {
  sources: CaseLawSource[]
  confidence?: RagMetadata["caseLawConfidence"]
  showSimilarity?: boolean
  variant?: "panel" | "cards"
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

function formatDecisionDate(value: string | null): string {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function CaseLawItemContent({
  source,
  showSimilarity,
  outcomeLabel,
  t,
  compact,
}: {
  source: CaseLawSource
  showSimilarity: boolean
  outcomeLabel: string | null
  t: (key: string) => string
  compact?: boolean
}) {
  const confidencePct = Math.max(
    0,
    Math.min(100, Math.round(source.similarity * 100)),
  )

  return (
    <>
      <CaseLawItemHeader
        court={source.court}
        caseNumber={source.case_number}
        decisionDate={formatDecisionDate(source.decision_date)}
        confidencePct={confidencePct}
        showSimilarity={showSimilarity}
        outcomeLabel={outcomeLabel}
        t={t}
        compact={compact}
      />
      {source.legal_question ? (
        <p
          className={cn(
            "leading-relaxed text-foreground",
            compact ? "mt-2 text-xs" : "mt-3 text-sm",
          )}
        >
          {source.legal_question}
        </p>
      ) : null}
      {source.court_position ? (
        <p
          className={cn(
            "leading-relaxed text-muted-foreground",
            compact ? "mt-2 text-xs" : "mt-2 text-sm",
          )}
        >
          {source.court_position}
        </p>
      ) : null}
    </>
  )
}

function CaseLawItemHeader({
  court,
  caseNumber,
  decisionDate,
  confidencePct,
  showSimilarity,
  outcomeLabel,
  t,
  compact,
}: {
  court: string
  caseNumber: string
  decisionDate: string
  confidencePct: number
  showSimilarity: boolean
  outcomeLabel: string | null
  t: (key: string) => string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        !compact && "sm:flex-row sm:items-start sm:justify-between",
      )}
    >
      <div className="min-w-0">
        <p
          className={cn(
            "font-medium text-foreground",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {court}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {t("rag.caseLaw.caseNumberLabel")}{" "}
          <span className="font-medium text-foreground">{caseNumber}</span>
          {" · "}
          {t("rag.caseLaw.decisionDateLabel")} {decisionDate}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {outcomeLabel ? (
          <Badge variant="secondary">{outcomeLabel}</Badge>
        ) : null}
        {showSimilarity ? (
          <Badge
            className={confidenceBadgeClass(confidencePct)}
            variant="outline"
          >
            {t("research.results.confidenceLabel")} {confidencePct}%
          </Badge>
        ) : null}
      </div>
    </div>
  )
}

export function CaseLawSourcesPanel({
  sources,
  confidence,
  showSimilarity = true,
  variant = "panel",
}: Props) {
  const { t } = useLanguage()

  if (!sources || sources.length === 0) return null

  const n = sources.length
  const caseWord =
    n === 1 ? t("rag.caseLaw.caseSingular") : t("rag.caseLaw.casePlural")

  const resolveOutcome = (outcome: string | null): string | null => {
    if (!outcome) return null
    const key = `rag.caseLaw.outcomes.${outcome}`
    const label = t(key)
    return label === key ? outcome : label
  }

  const items = sources.map((c, i) => {
    const outcomeLabel = resolveOutcome(c.outcome)
    if (variant === "cards") {
      return (
        <Card key={`${c.case_number}-${i}`} className="p-5">
          <CaseLawItemContent
            source={c}
            showSimilarity={showSimilarity}
            outcomeLabel={outcomeLabel}
            t={t}
          />
        </Card>
      )
    }
    return (
      <li
        key={`${c.case_number}-${i}`}
        className="border-l-2 border-border pl-3 text-muted-foreground"
      >
        <CaseLawItemContent
          source={c}
          showSimilarity={showSimilarity}
          outcomeLabel={outcomeLabel}
          t={t}
          compact
        />
      </li>
    )
  })

  if (variant === "cards") {
    return <div className="space-y-4">{items}</div>
  }

  return (
    <CaseLawPanel
      title={t("rag.caseLaw.title")}
      countLabel={`(${n} ${caseWord})`}
      items={items}
      confidence={confidence}
      lowConfidenceLabel={t("rag.caseLaw.lowConfidence")}
    />
  )
}

function CaseLawPanel({
  title,
  countLabel,
  items,
  confidence,
  lowConfidenceLabel,
}: {
  title: string
  countLabel: string
  items: React.ReactNode[]
  confidence?: RagMetadata["caseLawConfidence"]
  lowConfidenceLabel: string
}) {
  return (
    <div className="mt-4 rounded-md border border-border bg-muted/30 p-4">
      <details className="group" open>
        <summary className="flex cursor-pointer list-none select-none items-center justify-between text-sm font-medium text-foreground">
          <span>
            {title}
            <span className="ml-2 font-normal text-muted-foreground">
              {countLabel}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
          />
        </summary>
        <ul className="mt-3 space-y-4">{items}</ul>
        {confidence === "low" ? (
          <div className="mt-3 rounded border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            {lowConfidenceLabel}
          </div>
        ) : null}
      </details>
    </div>
  )
}
