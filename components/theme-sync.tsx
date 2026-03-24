"use client"

import { useEffect, useMemo } from "react"
import { useTheme } from "next-themes"

import { createClient as createBrowserClient } from "@/lib/supabase/client"

/**
 * Applies theme from user profile after load / auth changes (overrides local storage when signed in).
 */
export function ThemeSync() {
  const { setTheme } = useTheme()
  const supabase = useMemo(() => createBrowserClient(), [])

  useEffect(() => {
    async function syncFromServer() {
      try {
        const res = await fetch("/api/settings/preferences")
        if (!res.ok) return
        const data: unknown = await res.json().catch(() => null)
        if (!data || typeof data !== "object") return
        const theme = (data as Record<string, unknown>).theme
        if (theme === "dark" || theme === "light") {
          setTheme(theme)
        }
      } catch {
        // ignore
      }
    }

    void syncFromServer()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        void syncFromServer()
      }
    })

    return () => subscription.unsubscribe()
  }, [setTheme, supabase])

  return null
}
