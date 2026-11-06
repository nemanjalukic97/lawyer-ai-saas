import {
  highlightSubstring,
  type HighlightPart,
} from "@/lib/highlightSearchTerms"
import type { TrimmedExcerpt } from "@/lib/excerptTrim"

const ELLIPSIS = "\u2026"

function Highlighted({ parts }: { parts: HighlightPart[] }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={index}>{part}</span>
        ) : (
          <mark
            key={index}
            className="rounded bg-primary/15 px-0.5 text-foreground"
          >
            {part.mark}
          </mark>
        ),
      )}
    </>
  )
}

/** Muted head and tail stay the same size as the body. The ellipsis sits on the outer edge. */
export function ExcerptText({
  excerpt,
  query,
}: {
  excerpt: TrimmedExcerpt
  query?: string
}) {
  const parts = query ? highlightSubstring(excerpt.body, query) : null
  return (
    <>
      {excerpt.headElided ? (
        <span className="text-foreground">{ELLIPSIS}</span>
      ) : excerpt.head ? (
        <span className="text-muted-foreground">
          {ELLIPSIS}
          {excerpt.head}
        </span>
      ) : null}
      {parts ? (
        <Highlighted parts={parts} />
      ) : (
        <span className="text-foreground">{excerpt.body}</span>
      )}
      {excerpt.tailElided ? (
        <span className="text-foreground">{ELLIPSIS}</span>
      ) : excerpt.tail ? (
        <span className="text-muted-foreground">
          {excerpt.tail}
          {ELLIPSIS}
        </span>
      ) : null}
    </>
  )
}
