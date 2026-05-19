"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { HighlightedText } from "@/components/HighlightedText"

export type CaseLawExpandableBodyProps = {
  legalQuestion: string
  courtPosition: string
  courtPositionParts?: Array<string | { mark: string }>
  reasoning?: string
  keywords?: string[] | null
  relatedArticles?: string[] | null
  compact?: boolean
  t: (key: string) => string
}

function hasExpandableContent(
  reasoning?: string,
  keywords?: string[] | null,
  relatedArticles?: string[] | null,
): boolean {
  if (reasoning?.trim()) return true
  if (keywords && keywords.length > 0) return true
  if (relatedArticles && relatedArticles.length > 0) return true
  return false
}

export function CaseLawExpandableBody({
  legalQuestion,
  courtPosition,
  courtPositionParts,
  reasoning,
  keywords,
  relatedArticles,
  compact,
  t,
}: CaseLawExpandableBodyProps) {
  const [expanded, setExpanded] = useState(false)
  const canExpand = hasExpandableContent(reasoning, keywords, relatedArticles)
  const reasoningText = reasoning?.trim() ?? ""
  const keywordList = keywords?.filter((k) => k.trim()) ?? []
  const articleList = relatedArticles?.filter((a) => a.trim()) ?? []

  return (
    <>
      {legalQuestion ? (
        <p
          className={cn(
            "whitespace-normal break-words italic text-muted-foreground",
            compact ? "mt-2 text-xs" : "mt-3 text-sm",
          )}
        >
          {legalQuestion}
        </p>
      ) : null}
      {courtPosition ? (
        <div
          className={cn(
            "w-full whitespace-normal break-words leading-relaxed text-foreground",
            compact ? "mt-2 text-xs" : "mt-3 text-sm",
          )}
        >
          {courtPositionParts && courtPositionParts.length > 0 ? (
            <HighlightedText parts={courtPositionParts} />
          ) : (
            courtPosition
          )}
        </div>
      ) : null}
      {expanded ? (
        <>
          {reasoningText ? (
            <div className={cn("w-full", compact ? "mt-2" : "mt-3")}>
              <span className="text-sm font-semibold text-foreground">
                {t("rag.caseLaw.reasoningLabel")}{" "}
              </span>
              <span className="whitespace-normal break-words text-sm leading-relaxed text-muted-foreground">
                {reasoningText}
              </span>
            </div>
          ) : null}
          {keywordList.length > 0 ? (
            <div
              className={cn(
                "flex flex-wrap gap-1.5",
                compact ? "mt-2" : "mt-3",
              )}
            >
              {keywordList.map((keyword, idx) => (
                <span
                  key={`${keyword}-${idx}`}
                  className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
          {articleList.length > 0 ? (
            <p
              className={cn(
                "whitespace-normal break-words text-xs italic text-muted-foreground",
                compact ? "mt-2" : "mt-3",
              )}
            >
              <span className="not-italic">
                {t("rag.caseLaw.relatedArticlesLabel")}{" "}
              </span>
              {articleList.join(", ")}
            </p>
          ) : null}
        </>
      ) : null}
      {canExpand ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
        >
          {expanded ? t("rag.caseLaw.showLess") : t("rag.caseLaw.showMore")}
          {expanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      ) : null}
    </>
  )
}
