"use client"

import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { HighlightedText } from "@/components/HighlightedText"
import {
  COURT_POSITION_CARD_COLLAPSED_MAX_CHARS,
  COURT_POSITION_PREVIEW_MAX_CHARS,
  repairLegalTextSpacing,
  truncateCourtPositionPreview,
  trimLeadingMidSentenceFragment,
} from "@/lib/repairLegalTextSpacing"
import { cn } from "@/lib/utils"

export type CaseLawExpandableBodyProps = {
  legalQuestion: string
  courtPosition: string
  courtPositionParts?: Array<string | { mark: string }>
  /** Optional snippet (e.g. research API excerpt); used for long court_position bodies */
  courtPositionSnippet?: string | null
  reasoning?: string
  reasoningParts?: Array<string | { mark: string }>
  keywords?: string[] | null
  relatedArticles?: string[] | null
  compact?: boolean
  /**
   * When true: legal_question / court_position / reasoning are plain strings only
   * (no HighlightedText), e.g. research Sudska praksa tab.
   */
  plainText?: boolean
  /** When true, reasoning/keywords/articles are shown without "Show more"; does not force entire court_position on screen */
  showAllDetails?: boolean
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

function CaseLawDetails({
  reasoningText,
  reasoningParts,
  plainText,
  keywordList,
  articleList,
  compact,
  t,
}: {
  reasoningText: string
  reasoningParts?: Array<string | { mark: string }>
  plainText?: boolean
  keywordList: string[]
  articleList: string[]
  compact?: boolean
  t: (key: string) => string
}) {
  return (
    <>
      {reasoningText ? (
        <div className={cn("w-full", compact ? "mt-2" : "mt-3")}>
          <span className="text-sm font-semibold text-foreground">
            {t("rag.caseLaw.reasoningLabel")}{" "}
          </span>
          <span className="whitespace-normal break-words text-sm leading-relaxed text-muted-foreground">
            {plainText ||
            !reasoningParts ||
            reasoningParts.length === 0 ? (
              reasoningText
            ) : (
              <HighlightedText parts={reasoningParts} />
            )}
          </span>
        </div>
      ) : null}
      {keywordList.length > 0 ? (
        <div
          className={cn("flex flex-wrap gap-1.5", compact ? "mt-2" : "mt-3")}
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
  )
}

export function CaseLawExpandableBody({
  legalQuestion,
  courtPosition,
  courtPositionParts,
  courtPositionSnippet,
  reasoning,
  reasoningParts,
  keywords,
  relatedArticles,
  compact,
  plainText = false,
  showAllDetails = false,
  t,
}: CaseLawExpandableBodyProps) {
  const [expanded, setExpanded] = useState(false)
  /** Toggle between tight card excerpt and full judgment text */
  const [courtPositionExpanded, setCourtPositionExpanded] = useState(false)
  /** Inside full view, reveal beyond COURT_POSITION_PREVIEW_MAX_CHARS */
  const [courtPositionUltraExpanded, setCourtPositionUltraExpanded] =
    useState(false)

  const repairedCourtPositionFull = useMemo(() => {
    const raw = courtPosition?.trim() ?? ""
    if (!raw) return ""
    const useRawForPartsOnly =
      Boolean(courtPositionParts?.length) && !plainText
    const spaced = useRawForPartsOnly ? raw : repairLegalTextSpacing(raw)
    return trimLeadingMidSentenceFragment(spaced)
  }, [courtPosition, courtPositionParts, plainText])

  const repairedSnippet = useMemo(() => {
    const raw = courtPositionSnippet?.trim() ?? ""
    if (!raw) return ""
    return trimLeadingMidSentenceFragment(repairLegalTextSpacing(raw))
  }, [courtPositionSnippet])

  const excerptUsable =
    repairedSnippet.length >= 48 &&
    repairedCourtPositionFull.length >= COURT_POSITION_CARD_COLLAPSED_MAX_CHARS

  const truncatedCardPreview = useMemo(() => {
    const { preview } = truncateCourtPositionPreview(
      repairedCourtPositionFull,
      COURT_POSITION_CARD_COLLAPSED_MAX_CHARS,
    )
    return trimLeadingMidSentenceFragment(preview)
  }, [repairedCourtPositionFull])

  const collapsedCourtDisplay = excerptUsable
    ? repairedSnippet
    : truncatedCardPreview

  const collapsibleCourt =
    repairedCourtPositionFull.length >=
      COURT_POSITION_CARD_COLLAPSED_MAX_CHARS &&
    (!courtPositionParts?.length || plainText)

  const truncatedVeryLong = useMemo(() => {
    const { preview, isTruncated } = truncateCourtPositionPreview(
      repairedCourtPositionFull,
      COURT_POSITION_PREVIEW_MAX_CHARS,
    )
    return {
      preview: trimLeadingMidSentenceFragment(preview),
      isTruncated,
    }
  }, [repairedCourtPositionFull])

  const ultraLong =
    repairedCourtPositionFull.length > COURT_POSITION_PREVIEW_MAX_CHARS

  const expandedNeedsUltraToggle =
    collapsibleCourt &&
    courtPositionExpanded &&
    ultraLong &&
    truncatedVeryLong.isTruncated

  const displayCourtPlain = useMemo(() => {
    if (!repairedCourtPositionFull) return ""
    if (courtPositionParts?.length && !plainText) return ""
    if (!collapsibleCourt) return repairedCourtPositionFull
    if (!courtPositionExpanded) return collapsedCourtDisplay
    if (ultraLong && !courtPositionUltraExpanded) {
      return truncatedVeryLong.preview
    }
    return repairedCourtPositionFull
  }, [
    repairedCourtPositionFull,
    courtPositionParts?.length,
    plainText,
    collapsibleCourt,
    courtPositionExpanded,
    ultraLong,
    courtPositionUltraExpanded,
    collapsedCourtDisplay,
    truncatedVeryLong.preview,
  ])

  const canExpand =
    !showAllDetails && hasExpandableContent(reasoning, keywords, relatedArticles)
  const showDetails = showAllDetails || expanded
  const reasoningText = reasoning?.trim() ?? ""
  const keywordList = keywords?.filter((k) => k.trim()) ?? []
  const articleList = relatedArticles?.filter((a) => a.trim()) ?? []

  const mainCourtBody =
    plainText ? (
      displayCourtPlain
    ) : courtPositionParts && courtPositionParts.length > 0 ? (
      <HighlightedText parts={courtPositionParts} />
    ) : (
      displayCourtPlain
    )

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
      {repairedCourtPositionFull ? (
        <div
          className={cn(
            "w-full whitespace-normal break-words leading-relaxed text-foreground",
            compact ? "mt-2 text-xs" : "mt-3 text-sm",
            collapsibleCourt && courtPositionExpanded
              ? "max-h-[min(70vh,48rem)] overflow-y-auto pr-1"
              : null,
          )}
        >
          {mainCourtBody}
          {expandedNeedsUltraToggle ? (
            <button
              type="button"
              className={cn(
                "mt-2 flex items-center gap-1 text-muted-foreground hover:text-foreground",
                compact ? "text-xs" : "text-sm",
              )}
              aria-expanded={courtPositionUltraExpanded}
              onClick={() => setCourtPositionUltraExpanded((p) => !p)}
            >
              {courtPositionUltraExpanded
                ? t("rag.caseLaw.showLess")
                : t("rag.caseLaw.showMore")}
              {courtPositionUltraExpanded ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ) : null}
          {collapsibleCourt ? (
            <button
              type="button"
              className={cn(
                "mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-400",
                compact ? "text-xs" : "text-sm",
              )}
              aria-expanded={courtPositionExpanded}
              onClick={() => {
                setCourtPositionExpanded((p) => !p)
                if (courtPositionExpanded) {
                  setCourtPositionUltraExpanded(false)
                }
              }}
            >
              {courtPositionExpanded
                ? t("rag.caseLaw.collapseCourtPosition")
                : t("rag.caseLaw.expandCourtPosition")}
              {courtPositionExpanded ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      ) : null}
      {showDetails ? (
        <CaseLawDetails
          reasoningText={reasoningText}
          reasoningParts={reasoningParts}
          plainText={plainText}
          keywordList={keywordList}
          articleList={articleList}
          compact={compact}
          t={t}
        />
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
