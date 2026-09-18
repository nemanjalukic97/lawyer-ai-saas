import type { SupabaseClient } from "@supabase/supabase-js"

import type { Database, Json } from "@/lib/supabase/types"

export type OnboardingEventInput =
  | { event: "login_success"; path?: string }
  | { event: "dashboard_view"; path?: string }
  | { event: "research_view"; path?: string }
  | { event: "research_input_focus"; path?: string }
  | {
      event: "starter_query_click"
      path?: string
      metadata: { jurisdiction: string }
    }
  | {
      event: "search_submit"
      path?: string
      metadata: { jurisdiction: string; source: "starter" | "typed" }
    }
  | {
      event: "search_results_shown"
      path?: string
      metadata: { count: number; top_score: number | null }
    }
  | { event: "search_error"; path?: string; metadata: { message: string } }

function metadataOf(input: OnboardingEventInput): Json | null {
  if ("metadata" in input) return input.metadata
  return null
}

async function insertOnboardingEvent(
  supabase: SupabaseClient<Database, any, any, any>,
  input: OnboardingEventInput,
  userId?: string,
): Promise<void> {
  try {
    let uid = userId ?? null
    if (!uid) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      uid = user?.id ?? null
    }
    if (!uid) return

    await supabase.from("onboarding_events").insert({
      user_id: uid,
      event: input.event,
      path: input.path ?? null,
      metadata: metadataOf(input),
    })
  } catch {
    // must never block the primary action
  }
}

/** Fire-and-forget. Callers must not await this on the UI path. */
export function logOnboardingEvent(
  supabase: SupabaseClient<Database, any, any, any>,
  input: OnboardingEventInput,
): void {
  void insertOnboardingEvent(supabase, input)
}

/**
 * Awaited insert that still swallows errors. Use only where the process
 * would otherwise drop the write (login server action before redirect).
 */
export async function logOnboardingEventNow(
  supabase: SupabaseClient<Database, any, any, any>,
  input: OnboardingEventInput,
  userId?: string,
): Promise<void> {
  await insertOnboardingEvent(supabase, input, userId)
}

/** Truncate and strip query text so search_error metadata stays non-sensitive. */
export function sanitizeOnboardingErrorMessage(
  message: string,
  queryText?: string,
): string {
  let out = message
  const query = queryText?.trim()
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    out = out.replace(new RegExp(escaped, "gi"), "")
  }
  out = out.replace(/\s+/g, " ").trim()
  if (out.length > 200) out = out.slice(0, 200)
  return out
}
