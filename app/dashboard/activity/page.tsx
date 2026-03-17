import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import {
  getRecentActivity,
  getScopeFromProfile,
  type ActivityItemType,
} from "../lib/activity"
import { ActivityPageClient } from "./ActivityPageClient"

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

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("law_firm_id")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle()

  const scope = getScopeFromProfile(user.id, {
    law_firm_id: profile?.law_firm_id ?? null,
  })

  const params = await searchParams
  const filterType = parseType(params.type)
  const typeForFetch = filterType === "all" ? undefined : filterType

  const items = await getRecentActivity(supabase, scope, {
    type: typeForFetch,
    limit: 50,
  })

  return (
    <ActivityPageClient items={items} currentFilter={filterType} />
  )
}
