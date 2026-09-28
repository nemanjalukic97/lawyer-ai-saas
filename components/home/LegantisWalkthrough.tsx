"use client"

import { useEffect, useRef, useState } from "react"

export function LegantisWalkthrough({ label }: { label: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setSrc("/legantis-walkthrough.html?v=8")
      },
      { rootMargin: "300px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-[#05070d] shadow-2xl">
      <iframe
        ref={ref}
        title={label}
        src={src}
        tabIndex={-1}
        className="pointer-events-none h-full w-full border-0"
      />
    </div>
  )
}
