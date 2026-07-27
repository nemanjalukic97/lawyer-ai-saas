import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath("/", "layout")

  const response = NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  })
  // Discourage caching of the post-logout transition on shared machines.
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate")
  response.headers.set("Pragma", "no-cache")
  return response
}

