export function HighlightedText({
  parts,
}: {
  parts: Array<string | { mark: string }>
}) {
  return (
    <>
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
    </>
  )
}
