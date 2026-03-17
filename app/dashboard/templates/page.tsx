import { createClient } from "@/lib/supabase/server"
import { TemplatesPageClient, type TemplateSummary } from "./TemplatesPageClient"

export default async function TemplatesPage() {
  const supabase = await createClient()

  const { data: rows } = await supabase
    .from("templates")
    .select(
      "id, title, description, content, contract_type, document_type, jurisdiction, template_category"
    )
    .is("deleted_at", null)
    .is("user_id", null)
    .is("law_firm_id", null)
    .order("title", { ascending: true })

  const templates: TemplateSummary[] = (rows ?? []) as any

  return <TemplatesPageClient templates={templates} />
}

