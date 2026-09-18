'use server'

import { revalidatePath } from "next/cache"
import { RedirectType, redirect } from "next/navigation"

import { logOnboardingEventNow } from "@/lib/onboarding/logOnboardingEvent"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const msg = error.message.toLowerCase()

    if (
      msg.includes("invalid login credentials") ||
      msg.includes("user not found") ||
      msg.includes("no user found")
    ) {
      redirect("/login?error=user_not_found")
    }

    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  if (data.user) {
    await logOnboardingEventNow(
      supabase,
      { event: "login_success", path: "/login" },
      data.user.id,
    )
  }

  revalidatePath("/", "layout")
  redirect("/dashboard", RedirectType.replace)
}

