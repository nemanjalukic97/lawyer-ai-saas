import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from '../database.types'
import type { cookies } from 'next/headers'

// Client-side Supabase instance (use in client components)
export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

type CookieStore = Awaited<ReturnType<typeof cookies>>

// Server-side Supabase instance (use in server components / route handlers)
// Usage: createSupabaseServerClient(await cookies())
export const createSupabaseServerClient = (cookieStore: CookieStore) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Parameters<CookieStore['set']>[2]) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: Parameters<CookieStore['set']>[2]) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

