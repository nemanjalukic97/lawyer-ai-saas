"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { SCROLL_REVEAL_TRANSITION } from "./home-styles"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  rootMargin?: string
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          setAnimating(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin, threshold }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [visible, rootMargin, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        SCROLL_REVEAL_TRANSITION,
        className,
        !visible && "motion-safe:translate-y-8 motion-safe:opacity-0",
        visible && "motion-safe:translate-y-0 motion-safe:opacity-100",
        animating && "motion-safe:will-change-[opacity,transform]"
      )}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.propertyName === "opacity" || event.propertyName === "transform") {
          setAnimating(false)
        }
      }}
    >
      {children}
    </div>
  )
}
