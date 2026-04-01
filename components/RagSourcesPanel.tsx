"use client"

import type { RagMetadata } from "@/types/rag"

type Props = {
  ragData: RagMetadata
  showSimilarity?: boolean
}

export function RagSourcesPanel({ ragData, showSimilarity = true }: Props) {
  if (!ragData || ragData.sources.length === 0) return null

  const confidenceColor = {
    high: "text-emerald-600",
    medium: "text-amber-600",
    low: "text-red-600",
    none: "text-muted-foreground",
  }[ragData.confidence]

  return (
    <div className="mt-4 rounded-md border border-border bg-muted/30 p-4">
      <details>
        <summary
          className="cursor-pointer select-none text-sm 
          font-medium text-foreground list-none flex items-center 
          justify-between"
        >
          <span>
            Legal sources retrieved
            <span className="ml-2 text-muted-foreground font-normal">
              ({ragData.sources.length} article
              {ragData.sources.length !== 1 ? "s" : ""})
            </span>
          </span>
          <span className="flex items-center gap-3 text-xs">
            <span className={confidenceColor}>
              confidence: {ragData.confidence}
            </span>
            {ragData.answerMode && ragData.answerMode !== "none" && (
              <span
                className={
                  ragData.answerMode === "extracted"
                    ? "text-blue-600 dark:text-blue-400"
                    : ragData.answerMode === "analytical"
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-muted-foreground"
                }
              >
                mode: {ragData.answerMode}
              </span>
            )}
            {ragData.validation && !ragData.validation.valid && (
              <span className="text-amber-600">
                ⚠ citation issues detected
              </span>
            )}
          </span>
        </summary>

        <ul className="mt-3 space-y-3">
          {ragData.sources.map((s, i) => (
            <li
              key={i}
              className="text-xs text-muted-foreground border-l-2 
                border-border pl-3"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {s.law_name_local}, {s.article_num}
                  {s.paragraph_num ? ` §${s.paragraph_num}` : ""}
                </span>
                {showSimilarity && (
                  <span className="text-muted-foreground/60">
                    {(s.similarity * 100).toFixed(0)}% match
                  </span>
                )}
              </div>
              <p className="mt-1 leading-relaxed">{s.text_preview}</p>
            </li>
          ))}
        </ul>

        {ragData.validation &&
          ragData.validation.invalidCitations.length > 0 && (
            <div
              className="mt-3 rounded border border-amber-200 
            bg-amber-500/5 px-3 py-2 text-xs text-amber-700 
            dark:border-amber-800 dark:text-amber-400"
            >
              ⚠ The following citations in the AI response were not
              found in the retrieved legal database and may be
              inaccurate:{" "}
              <strong>
                {ragData.validation.invalidCitations.join(", ")}
              </strong>
            </div>
          )}

        {ragData.confidence === "low" && (
          <div
            className="mt-3 rounded border border-border 
            bg-muted/60 px-3 py-2 text-xs text-muted-foreground"
          >
            Low confidence: the retrieved provisions had weak
            relevance to this query. The applicable law may not
            yet be in the database.
          </div>
        )}
      </details>
    </div>
  )
}

