"use client"

import { usePathname } from "next/navigation"

import { Footer } from "@/components/Footer"

const HIDDEN_PREFIXES = ["/dashboard", "/vodic"]

export function AppFooter() {
  const pathname = usePathname()
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null
  }
  return <Footer />
}
