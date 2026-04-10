import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { hasFeature } from "../lib/entitlements"
import { getEntitlementPlanForUser } from "../lib/getEntitlementPlan"
import { TemplatesPageClient, type TemplateSummary } from "./TemplatesPageClient"
import { cookies } from "next/headers"

export default async function TemplatesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!hasFeature(planId, "template_library")) {
    redirect("/dashboard/billing")
  }

  const language = (await cookies()).get("legantis-language")?.value ?? "en"

  const { data: rows } = await supabase
    .from("templates")
    .select(
      "id, title, description, content, contract_type, document_type, jurisdiction, template_category, template_translations(language_code,title,description,content,content_html)"
    )
    .is("deleted_at", null)
    .is("user_id", null)
    .is("law_firm_id", null)
    .order("title", { ascending: true })

  const templates: TemplateSummary[] = (rows ?? []).map((row) => {
    const r = row as TemplateSummary & {
      template_translations?: Array<{
        language_code: string
        title?: string | null
        description?: string | null
        content?: string | null
      }>
    }
    if (language === "en") return r
    const tr = Array.isArray(r.template_translations)
      ? r.template_translations.find((trRow) => trRow.language_code === language)
      : null
    if (!tr) return r
    return {
      ...r,
      title: tr.title ?? r.title,
      description: tr.description ?? r.description,
      content: tr.content ?? r.content,
    }
  })

  return <TemplatesPageClient templates={templates} />
}

