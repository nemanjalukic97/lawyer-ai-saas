"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

import { MESSAGES } from "@/lib/i18n/messages"
import { lookupMessage } from "@/lib/i18n/translate"
import type { LanguageCode, Messages } from "@/lib/i18n/types"
import {
  DEFAULT_UI_LANGUAGE,
  htmlLangFromUiLang,
  UI_LANGUAGE_CHOSEN_COOKIE,
  UI_LANGUAGE_CHOSEN_VALUE,
  UI_LANGUAGE_COOKIE,
  type ResolvedUiLang,
} from "@/lib/resolve-initial-language"

export type { LanguageCode, Messages }

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const parts = document.cookie.split(";")
  for (const part of parts) {
    const idx = part.indexOf("=")
    const key = (idx === -1 ? part : part.slice(0, idx)).trim()
    if (key !== name) continue
    const raw = idx === -1 ? "" : part.slice(idx + 1).trim()
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }
  return null
}

function writeChosenLanguage(code: LanguageCode) {
  const attrs = "Path=/; Max-Age=31536000; SameSite=Lax"
  document.cookie = `${UI_LANGUAGE_COOKIE}=${code}; ${attrs}`
  document.cookie = `${UI_LANGUAGE_CHOSEN_COOKIE}=${UI_LANGUAGE_CHOSEN_VALUE}; ${attrs}`
}

const LANGUAGE_CHANGE_EVENT = "legantis-language-change"

function notifyLanguageStore() {
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT))
}

function subscribeLanguageStore(onStoreChange: () => void) {
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

/**
 * A localStorage language counts only together with the chosen marker.
 * The old jurisdiction control wrote the language alone. That bare value is
 * ignored and must not be copied into the chosen cookie.
 * When the cookie marker is already set, the server painted that choice.
 */
function readStoredChoice(): LanguageCode | null {
  if (readCookie(UI_LANGUAGE_CHOSEN_COOKIE) === UI_LANGUAGE_CHOSEN_VALUE) return null
  if (window.localStorage.getItem(UI_LANGUAGE_CHOSEN_COOKIE) !== UI_LANGUAGE_CHOSEN_VALUE) {
    return null
  }
  const stored = window.localStorage.getItem(UI_LANGUAGE_COOKIE)
  if (!stored || !MESSAGES[stored as LanguageCode]) return null
  return stored as LanguageCode
}

function noStoredChoice(): LanguageCode | null {
  return null
}

function translate(
  language: LanguageCode,
  key: string,
  vars?: Record<string, string | number>,
): string {
  return lookupMessage(MESSAGES, language, key, vars)
}

type LanguageProviderProps = {
  children: React.ReactNode
  /** From root layout, already resolved. First paint uses this and does not wait for localStorage. */
  initialLanguage?: LanguageCode
}

export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_UI_LANGUAGE,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage)
  const storedChoice = useSyncExternalStore(
    subscribeLanguageStore,
    readStoredChoice,
    noStoredChoice,
  )
  const activeLanguage = storedChoice ?? language

  useEffect(() => {
    // storedChoice is null for a bare localStorage value, so this cannot
    // promote a language written by the old jurisdiction control.
    if (!storedChoice) return
    writeChosenLanguage(storedChoice)
  }, [storedChoice])

  useEffect(() => {
    document.documentElement.lang = htmlLangFromUiLang(activeLanguage as ResolvedUiLang)
  }, [activeLanguage])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    if (typeof window === "undefined") return
    window.localStorage.setItem(UI_LANGUAGE_COOKIE, code)
    window.localStorage.setItem(UI_LANGUAGE_CHOSEN_COOKIE, UI_LANGUAGE_CHOSEN_VALUE)
    writeChosenLanguage(code)
    notifyLanguageStore()
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(activeLanguage, key, vars),
    [activeLanguage],
  )

  const value = useMemo(
    () => ({
      language: activeLanguage,
      setLanguage,
      t,
    }),
    [activeLanguage, setLanguage, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    const language: LanguageCode = DEFAULT_UI_LANGUAGE
    return {
      language,
      setLanguage: () => {},
      t: (key: string, vars?: Record<string, string | number>) => translate(language, key, vars),
    }
  }
  return ctx
}
