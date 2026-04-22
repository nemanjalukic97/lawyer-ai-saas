import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import {
  getRecentActivity,
  getScopeFromProfile,
  type ActivityItemType,
} from "../lib/activity"
import { hasFeature } from "../lib/entitlements"
import { getEntitlementPlanForUser } from "../lib/getEntitlementPlan"
import { ActivityPageClient } from "./ActivityPageClient"

type AuditLogRow = {
  id: string
  action: string
  entity_type: string
  entity_id: string | null
  description: string | null
  metadata: unknown | null
  created_at: string | null
}

const VALID_TYPES: (ActivityItemType | "all")[] = [
  "all",
  "document",
  "contract",
  "prediction",
  "analysis",
  "client",
]

function parseType(typeParam: string | undefined): "all" | ActivityItemType {
  if (!typeParam || !VALID_TYPES.includes(typeParam as typeof VALID_TYPES[number])) {
    return "all"
  }
  if (typeParam === "all") return "all"
  return typeParam as ActivityItemType
}

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const planId = await getEntitlementPlanForUser(supabase, user.id)
  if (!hasFeature(planId, "activity_feed")) {
    redirect("/dashboard/billing")
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const law_firm_id = (profile as { law_firm_id: string | null } | null)?.law_firm_id ?? null

  const scope = getScopeFromProfile(user.id, {
    law_firm_id,
  })

  const params = await searchParams
  const filterType = parseType(params.type)
  const typeForFetch = filterType === "all" ? undefined : filterType

  const items = await getRecentActivity(supabase, scope, {
    type: typeForFetch,
    limit: 50,
  })

  const { data: auditRows } = await supabase
    .from("audit_logs")
    .select("id, action, entity_type, entity_id, description, metadata, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(200)

  const auditLogs = (auditRows ?? []) as AuditLogRow[]

  return (
    <ActivityPageClient items={items} currentFilter={filterType} auditLogs={auditLogs} />
  )
}
