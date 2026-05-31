import { buildLegalArticlesNotificationEmail } from "@/lib/email/legalArticlesNotificationEmail"
import { getResend } from "@/lib/email/resend"
import { supabaseAdmin } from "@/lib/supabase/admin"

type LegalArticleRow = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  created_at: string
}

type LawSummary = {
  lawNameLocal: string
  articleCount: number
}

type UserProfileRow = {
  id: string
  full_name: string
  preferred_jurisdiction: string | null
  preferred_language: string | null
  deleted_at: string | null
}

export type LegalArticlesNotificationRunResult = {
  sent: number
  skippedNoArticles: number
  affectedJurisdictions: string[]
  errors: Array<{ userId: string; message: string }>
}

type Options = {
  onlyUserId?: string
}

function groupArticlesByJurisdiction(rows: LegalArticleRow[]): Map<string, LawSummary[]> {
  const byJurisdiction = new Map<string, Map<string, LawSummary>>()

  for (const row of rows) {
    const jurisdiction = row.jurisdiction
    if (!byJurisdiction.has(jurisdiction)) {
      byJurisdiction.set(jurisdiction, new Map())
    }
    const lawsMap = byJurisdiction.get(jurisdiction)!
    const existing = lawsMap.get(row.law_name)
    if (existing) {
      existing.articleCount += 1
    } else {
      lawsMap.set(row.law_name, {
        lawNameLocal: row.law_name_local,
        articleCount: 1,
      })
    }
  }

  const result = new Map<string, LawSummary[]>()
  for (const [jurisdiction, lawsMap] of byJurisdiction) {
    result.set(
      jurisdiction,
      [...lawsMap.values()].sort((a, b) => a.lawNameLocal.localeCompare(b.lawNameLocal))
    )
  }
  return result
}

export async function sendLegalArticlesNotifications(
  options: Options = {}
): Promise<LegalArticlesNotificationRunResult> {
  const errors: LegalArticlesNotificationRunResult["errors"] = []
  let sent = 0
  let skippedNoArticles = 0

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 90)

  const { data: rows, error: queryError } = await (supabaseAdmin as any)
    .from("legal_articles")
    .select("jurisdiction, law_name, law_name_local, created_at")
    .gte("created_at", cutoff.toISOString())

  if (queryError) {
    return {
      sent: 0,
      skippedNoArticles: 0,
      affectedJurisdictions: [],
      errors: [{ userId: "query", message: "Failed to load new legal articles" }],
    }
  }

  const articles = (rows ?? []) as unknown as LegalArticleRow[]
  if (articles.length === 0) {
    return {
      sent: 0,
      skippedNoArticles: 0,
      affectedJurisdictions: [],
      errors: [],
    }
  }

  const articlesByJurisdiction = groupArticlesByJurisdiction(articles)
  const affectedJurisdictions = [...articlesByJurisdiction.keys()]

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from("user_profiles")
    .select("id, full_name, preferred_jurisdiction, preferred_language, deleted_at")
    .in("preferred_jurisdiction", affectedJurisdictions as any)
    .is("deleted_at", null)
    .not("preferred_jurisdiction", "is", null)

  if (profilesError) {
    return {
      sent: 0,
      skippedNoArticles: 0,
      affectedJurisdictions,
      errors: [{ userId: "query", message: "Failed to load user profiles" }],
    }
  }

  const candidates = ((profiles ?? []) as UserProfileRow[]).filter((p) =>
    options.onlyUserId ? p.id === options.onlyUserId : true
  )

  for (const profile of candidates) {
    const jurisdiction = profile.preferred_jurisdiction
    if (!jurisdiction) continue

    const laws = articlesByJurisdiction.get(jurisdiction)
    if (!laws || laws.length === 0) {
      skippedNoArticles += 1
      continue
    }

    try {
      const { data: owner } = await supabaseAdmin.auth.admin.getUserById(profile.id)
      const userEmail = owner?.user?.email ?? null
      if (!userEmail) throw new Error("User email not found")

      const userName = profile.full_name || "Legantis user"
      const preferredLanguage = profile.preferred_language ?? null

      const email = buildLegalArticlesNotificationEmail({
        language: preferredLanguage,
        userName,
        jurisdiction,
        laws,
      })

      const resend = getResend()
      await resend.emails.send({
        from: "Legantis <noreply@legantis.app>",
        to: [userEmail],
        subject: email.subject,
        html: email.html,
        text: email.text,
      })

      sent += 1
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error"
      errors.push({ userId: profile.id, message: msg })
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("[legal-articles-notification] failed", { userId: profile.id, error: err })
      }
    }
  }

  return { sent, skippedNoArticles, affectedJurisdictions, errors }
}
