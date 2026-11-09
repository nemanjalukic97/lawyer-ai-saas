import { cache } from "react"
import { cookies, headers } from "next/headers"

import {
  isExplicitLanguageCookie,
  resolveInitialLanguage,
  UI_LANGUAGE_CHOSEN_COOKIE,
  UI_LANGUAGE_COOKIE,
  type ResolvedUiLang,
} from "@/lib/resolve-initial-language"
import { createClient } from "@/lib/supabase/server"

type LanguageSource = {
  languageCookie?: string
  chosenCookie?: string
  acceptLanguage?: string | null
}

async function readProfileLanguage(): Promise<string | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null
    const { data, error } = await supabase
      .from("user_profiles")
      .select("preferred_language")
      .eq("id", user.id)
      .maybeSingle()
    if (error) {
      console.error("[language] preferred_language read failed")
      return null
    }
    return data?.preferred_language ?? null
  } catch {
    console.error("[language] preferred_language read failed")
    return null
  }
}

/**
 * Cookie when the user has chosen a language, otherwise the profile column,
 * otherwise Accept-Language, otherwise Serbian Latin.
 * The profile is read only when the explicit cookie is absent.
 */
export const resolveRequestUiLanguage = cache(async function resolveRequestUiLanguage(
  source?: LanguageSource,
): Promise<ResolvedUiLang> {
  const cookieStore = source ? null : await cookies()
  const headerList = source ? null : await headers()
  const languageCookie = source
    ? source.languageCookie
    : cookieStore!.get(UI_LANGUAGE_COOKIE)?.value
  const chosenCookie = source
    ? source.chosenCookie
    : cookieStore!.get(UI_LANGUAGE_CHOSEN_COOKIE)?.value
  const acceptLanguage = source
    ? (source.acceptLanguage ?? null)
    : headerList!.get("accept-language")

  const profileLanguage = isExplicitLanguageCookie(languageCookie, chosenCookie)
    ? null
    : await readProfileLanguage()

  return resolveInitialLanguage({
    languageCookie,
    chosenCookie,
    acceptLanguage,
    profileLanguage,
  })
})
