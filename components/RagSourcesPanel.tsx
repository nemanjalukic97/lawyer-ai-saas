"use client"

import type { RagMetadata } from "@/types/rag"
import { useLanguage } from "@/components/LanguageProvider"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

type Props = {
  ragData: RagMetadata
  showSimilarity?: boolean
}

export function RagSourcesPanel({ ragData, showSimilarity = true }: Props) {
  const { language, t } = useLanguage()
  const [translatedPreviews, setTranslatedPreviews] = useState<string[] | null>(
    null
  )
  const [translatePending, setTranslatePending] = useState(false)

  const previewKey = ragData.sources.map((s) => s.text_preview).join("\u0000")

  useEffect(() => {
    const texts = ragData.sources.map((s) => s.text_preview)
    if (texts.length === 0) return

    if (language === "en") {
      setTranslatedPreviews(texts)
      setTranslatePending(false)
      return
    }

    let cancelled = false
    setTranslatedPreviews(null)
    setTranslatePending(true)

    ;(async () => {
      try {
        const res = await fetch("/api/translate-rag-previews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts, targetLanguage: language }),
        })
        const data = (await res.json()) as { translations?: string[] }
        if (cancelled) return
        if (
          res.ok &&
          Array.isArray(data.translations) &&
          data.translations.length === texts.length
        ) {
          setTranslatedPreviews(data.translations)
        } else {
          setTranslatedPreviews(texts)
        }
      } catch {
        if (!cancelled) setTranslatedPreviews(texts)
      } finally {
        if (!cancelled) setTranslatePending(false)
      }
    })()

    return () => {
      cancelled = true
    }
    // previewKey ties this to retrieved excerpt text; language switches target locale.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ragData identity changes each parent render
  }, [previewKey, language])

  if (!ragData || ragData.sources.length === 0) return null

  const n = ragData.sources.length
  const articleWord =
    n === 1 ? t("rag.articleSingular") : t("rag.articlePlural")

  return (
    <div className="mt-4 rounded-md border border-border bg-muted/30 p-4">
      <details className="group">
        <summary
          className="cursor-pointer select-none text-sm 
          font-medium text-foreground list-none flex items-center 
          justify-between"
        >
          <span>
            {t("rag.title")}
            <span className="ml-2 text-muted-foreground font-normal">
              ({n} {articleWord})
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
          />
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
                  {s.paragraph_num
                    ? ` ${t("rag.paragraphLabel")} ${s.paragraph_num}`
                    : ""}
                </span>
                {showSimilarity && (
                  <span className="text-muted-foreground/60">
                    {t("rag.matchPercent").replace(
                      "{pct}",
                      (s.similarity * 100).toFixed(0)
                    )}
                  </span>
                )}
              </div>
              <p className="mt-1 leading-relaxed">
                {translatePending && translatedPreviews === null
                  ? t("rag.translating")
                  : (translatedPreviews?.[i] ?? s.text_preview)}
              </p>
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
              {t("rag.invalidCitations")}{" "}
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
            {t("rag.lowConfidence")}
          </div>
        )}
      </details>
    </div>
  )
}
