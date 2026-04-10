import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import type { Database } from "./types"

function getServerKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getServerKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignored when called from Server Components without write access
          }
        },
      },
    }
  )
}

/** Same concrete type as `createClient()`; use for server helpers so query rows are not inferred as `never`. */
export type ServerSupabaseClient = Awaited<ReturnType<typeof createClient>>
