import type { ServerSupabaseClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/types"

export type ActivityItemType =
  | "contract"
  | "document"
  | "analysis"
  | "prediction"
  | "client"
  | "matter"

export type ActivityItem = {
  type: ActivityItemType
  id: string
  title: string
  createdAt: string
}

export type DashboardScope = {
  userId: string
  lawFirmId: string | null
}

export const ACTIVITY_HREF_BY_TYPE: Record<ActivityItemType, string> = {
  contract: "/dashboard/contracts",
  document: "/dashboard/generate",
  analysis: "/dashboard/analyze",
  prediction: "/dashboard/predictions",
  client: "/dashboard/clients",
  matter: "/dashboard/matters",
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityItemType, string> = {
  contract: "Contract",
  document: "Document",
  analysis: "Document analysis",
  prediction: "Case prediction",
  client: "Client",
  matter: "Matter",
}

export const ACTIVITY_FILTER_OPTIONS: { value: "all" | ActivityItemType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "matter", label: "Matters" },
  { value: "document", label: "Documents" },
  { value: "contract", label: "Contracts" },
  { value: "prediction", label: "Predictions" },
  { value: "analysis", label: "Analyses" },
  { value: "client", label: "Clients" },
]

export function getScopeFromProfile(
  userId: string,
  profile: { law_firm_id: string | null }
): DashboardScope {
  return {
    userId,
    lawFirmId: profile.law_firm_id ?? null,
  }
}

export async function getRecentActivity(
  supabase: ServerSupabaseClient,
  scope: DashboardScope,
  options: { type?: ActivityItemType; limit?: number } = {}
): Promise<ActivityItem[]> {
  const { type, limit = 10 } = options
  const filterCol = scope.lawFirmId ? "law_firm_id" : "user_id"
  const filterVal = scope.lawFirmId ?? scope.userId
  const limitPerTable = type ? limit : Math.ceil(limit / 6)

  if (type) {
    const items = await fetchSingleType(supabase, filterCol, filterVal, type, limitPerTable)
    return items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, limit)
  }

  const [
    { data: contracts },
    { data: documents },
    { data: analyses },
    { data: predictions },
    { data: clients },
    { data: matters },
  ] = await Promise.all([
    supabase
      .from("contracts")
      .select("id, title, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("documents")
      .select("id, title, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("document_analyses")
      .select("id, original_filename, analyzed_at, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("analyzed_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("case_predictions")
      .select("id, case_name, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("clients")
      .select("id, name, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(limitPerTable),
    supabase
      .from("matters")
      .select("id, title, updated_at, created_at")
      .eq(filterCol, filterVal)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false })
      .limit(limitPerTable),
  ])

  const items: ActivityItem[] = []

  ;(contracts ?? []).forEach((c: { id: string; title: string; created_at: string }) =>
    items.push({
      type: "contract",
      id: c.id,
      title: c.title,
      createdAt: c.created_at,
    })
  )
  ;(documents ?? []).forEach((d: { id: string; title: string; created_at: string }) =>
    items.push({
      type: "document",
      id: d.id,
      title: d.title,
      createdAt: d.created_at,
    })
  )
  ;(analyses ?? []).forEach((a: { id: string; original_filename: string; analyzed_at: string | null; created_at: string }) =>
    items.push({
      type: "analysis",
      id: a.id,
      title: a.original_filename,
      createdAt: a.analyzed_at ?? a.created_at,
    })
  )
  ;(predictions ?? []).forEach((p: { id: string; case_name: string | null; created_at: string }) =>
    items.push({
      type: "prediction",
      id: p.id,
      title: p.case_name ?? "Case prediction",
      createdAt: p.created_at,
    })
  )
  ;(clients ?? []).forEach((cl: { id: string; name: string; created_at: string }) =>
    items.push({
      type: "client",
      id: cl.id,
      title: cl.name,
      createdAt: cl.created_at,
    })
  )

  ;(matters ?? []).forEach((m: { id: string; title: string; updated_at: string | null; created_at: string }) =>
    items.push({
      type: "matter",
      id: m.id,
      title: m.title,
      createdAt: m.updated_at ?? m.created_at,
    })
  )

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return items.slice(0, limit)
}

async function fetchSingleType(
  supabase: ServerSupabaseClient,
  filterCol: string,
  filterVal: string,
  type: ActivityItemType,
  limit: number
): Promise<ActivityItem[]> {
  switch (type) {
    case "contract": {
      const { data } = await supabase
        .from("contracts")
        .select("id, title, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"contracts">,
        "id" | "title" | "created_at"
      >[]
      return rows.map((c) => ({
        type: "contract" as const,
        id: c.id,
        title: c.title,
        createdAt: c.created_at ?? "",
      }))
    }
    case "document": {
      const { data } = await supabase
        .from("documents")
        .select("id, title, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"documents">,
        "id" | "title" | "created_at"
      >[]
      return rows.map((d) => ({
        type: "document" as const,
        id: d.id,
        title: d.title,
        createdAt: d.created_at ?? "",
      }))
    }
    case "analysis": {
      const { data } = await supabase
        .from("document_analyses")
        .select("id, original_filename, analyzed_at, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("analyzed_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"document_analyses">,
        "id" | "original_filename" | "analyzed_at" | "created_at"
      >[]
      return rows.map((a) => ({
        type: "analysis" as const,
        id: a.id,
        title: a.original_filename,
        createdAt: a.analyzed_at ?? a.created_at ?? "",
      }))
    }
    case "prediction": {
      const { data } = await supabase
        .from("case_predictions")
        .select("id, case_name, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"case_predictions">,
        "id" | "case_name" | "created_at"
      >[]
      return rows.map((p) => ({
        type: "prediction" as const,
        id: p.id,
        title: p.case_name ?? "Case prediction",
        createdAt: p.created_at ?? "",
      }))
    }
    case "client": {
      const { data } = await supabase
        .from("clients")
        .select("id, name, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"clients">,
        "id" | "name" | "created_at"
      >[]
      return rows.map((cl) => ({
        type: "client" as const,
        id: cl.id,
        title: cl.name,
        createdAt: cl.created_at ?? "",
      }))
    }
    case "matter": {
      const { data } = await supabase
        .from("matters")
        .select("id, title, updated_at, created_at")
        .eq(filterCol, filterVal)
        .is("deleted_at", null)
        .order("updated_at", { ascending: false })
        .limit(limit)
      const rows = (data ?? []) as Pick<
        Tables<"matters">,
        "id" | "title" | "updated_at" | "created_at"
      >[]
      return rows.map((m) => ({
        type: "matter" as const,
        id: m.id,
        title: m.title,
        createdAt: m.updated_at ?? m.created_at ?? "",
      }))
    }
    default:
      return []
  }
}
