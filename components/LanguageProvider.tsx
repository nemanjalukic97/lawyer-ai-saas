"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { MESSAGES } from "@/lib/i18n/messages"
import type { LanguageCode, Messages } from "@/lib/i18n/types"
import { htmlLangFromUiLang, type ResolvedUiLang } from "@/lib/resolve-initial-language"

export type { LanguageCode, Messages }

const STORAGE_KEY = "legantis-language"

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getNestedMessage(messages: Messages, key: string): string | undefined {
  return key
    .split(".")
    .reduce<unknown>((acc, part) => {
      if (!acc || typeof acc !== "object") return undefined
      return (acc as Record<string, unknown>)[part]
    }, messages) as string | undefined
}

function readLanguageFromCookie(): LanguageCode | null {
  if (typeof document === "undefined") return null
  const parts = document.cookie.split(";")
  for (const part of parts) {
    const idx = part.indexOf("=")
    const key = (idx === -1 ? part : part.slice(0, idx)).trim()
    if (key !== STORAGE_KEY) continue
    const raw = idx === -1 ? "" : part.slice(idx + 1).trim()
    let value = raw
    try {
      value = decodeURIComponent(raw)
    } catch {
      /* keep raw */
    }
    if (value && MESSAGES[value as LanguageCode]) return value as LanguageCode
  }
  return null
}

const detectLanguage = (): LanguageCode => {
  if (typeof window === "undefined") return "en"
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && MESSAGES[saved as LanguageCode]) return saved as LanguageCode

  const fromCookie = readLanguageFromCookie()
  if (fromCookie) return fromCookie

  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  const lang = browserLang.toLowerCase().split("-")[0]

  const supported: Record<string, LanguageCode> = {
    sr: "sr",
    bs: "bs",
    hr: "hr",
    sl: "sl",
    cnr: "me",
    me: "me",
    en: "en",
  }

  return supported[lang] ?? "en"
}

type LanguageProviderProps = {
  children: React.ReactNode
  /** From root layout: cookie and/or Accept-Language so first paint is not stuck on English */
  initialLanguage?: LanguageCode
}

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguage)

  useEffect(() => {
    const fromCookie = readLanguageFromCookie()
    const fromStorage =
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    const detected =
      fromStorage && MESSAGES[fromStorage as LanguageCode]
        ? (fromStorage as LanguageCode)
        : fromCookie ?? initialLanguage

    setLanguageState((prev) => (detected !== prev ? detected : prev))
  }, [initialLanguage])

  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = htmlLangFromUiLang(language as ResolvedUiLang)
  }, [language])

  useEffect(() => {
    if (typeof window === "undefined") return
    document.cookie = `${STORAGE_KEY}=${language}; Path=/; Max-Age=31536000; SameSite=Lax`
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code)
      document.cookie = `${STORAGE_KEY}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const messages = MESSAGES[language] ?? MESSAGES.en
      const value = getNestedMessage(messages, key)
      if (typeof value !== "string") return key
      if (!vars) return value
      return value.replace(/\{(\w+)\}/g, (_, varName: string) => {
        const v = vars[varName]
        return v === undefined || v === null ? `{${varName}}` : String(v)
      })
    },
    [language]
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    const language: LanguageCode = "en"
    return {
      language,
      setLanguage: () => {},
      t: (key: string, vars?: Record<string, string | number>) => {
        const messages = MESSAGES[language] ?? MESSAGES.en
        const value = getNestedMessage(messages, key)
        if (typeof value !== "string") return key
        if (!vars) return value
        return value.replace(/\{(\w+)\}/g, (_, varName: string) => {
          const v = vars[varName]
          return v === undefined || v === null ? `{${varName}}` : String(v)
        })
      },
    }
  }
  return ctx
}
