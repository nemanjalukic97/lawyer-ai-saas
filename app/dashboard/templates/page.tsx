import { createClient } from "@/lib/supabase/server"
import { TemplatesPageClient, type TemplateSummary } from "./TemplatesPageClient"
import { cookies } from "next/headers"

export default async function TemplatesPage() {
  const supabase = await createClient()
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

  const templates: TemplateSummary[] = ((rows ?? []) as any).map((row: any) => {
    if (language === "en") return row
    const tr = Array.isArray(row.template_translations)
      ? row.template_translations.find((t: any) => t.language_code === language)
      : null
    if (!tr) return row
    return {
      ...row,
      title: tr.title ?? row.title,
      description: tr.description ?? row.description,
      content: tr.content ?? row.content,
    }
  })

  return <TemplatesPageClient templates={templates} />
}

