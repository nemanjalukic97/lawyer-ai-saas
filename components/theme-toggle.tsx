"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { useLanguage } from "@/components/LanguageProvider"
import { cn } from "@/lib/utils"

export type ThemeMode = "light" | "dark"

type ThemeToggleProps = {
  className?: string
  id?: string
  /** Keeps parent state in sync (e.g. settings form). */
  onThemeChange?: (theme: ThemeMode) => void
  /** When saving to the server fails (e.g. settings page). */
  onPersistError?: (message: string) => void
}

export function ThemeToggle({
  className,
  id,
  onThemeChange,
  onPersistError,
}: ThemeToggleProps) {
  const { t } = useLanguage()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = (resolvedTheme ?? theme) === "dark"

  const toggle = useCallback(async () => {
    const next: ThemeMode = isDark ? "light" : "dark"
    setTheme(next)
    onThemeChange?.(next)
    try {
      const res = await fetch("/api/settings/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: next }),
      })
      if (!res.ok) {
        if (res.status === 401) return
        const json: unknown = await res.json().catch(() => ({}))
        const errorMessage =
          json && typeof json === "object" && "error" in json
            ? String((json as Record<string, unknown>).error)
            : t("settings.errors.failedToSavePreferences")
        onPersistError?.(errorMessage)
      }
    } catch {
      onPersistError?.(t("settings.errors.failedToSavePreferences"))
    }
  }, [isDark, onPersistError, onThemeChange, setTheme, t])

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-14 shrink-0 rounded-full border border-border bg-muted",
          className
        )}
        aria-hidden
      />
    )
  }

  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={isDark}
      aria-label={t("nav.themeToggle")}
      onClick={() => void toggle()}
      className={cn(
        "relative flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-border bg-muted p-1 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-background text-foreground shadow-sm ring-1 ring-border transition-all duration-200 ease-out",
          !isDark && "ml-auto"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        ) : (
          <Sun className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        )}
      </span>
    </button>
  )
}
