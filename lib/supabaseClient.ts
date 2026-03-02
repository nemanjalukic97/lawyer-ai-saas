import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from '../database.types'
import type { cookies } from 'next/headers'

// Client-side Supabase instance (use in client components)
export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// Server-side Supabase instance (use in server components / route handlers)
export const createSupabaseServerClient = (cookieStore: ReturnType<typeof cookies>) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Parameters<ReturnType<typeof cookies>['set']>[2]) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: Parameters<ReturnType<typeof cookies>['set']>[2]) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

