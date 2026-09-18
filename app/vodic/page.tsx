"use client"

import { useLayoutEffect } from "react"

import { captureSignupAttribution } from "@/lib/signupAttribution"

const GUIDE_PDF = "/Legantis-Vodic-za-Korisnike-2026.pdf"

export default function VodicPage() {
  useLayoutEffect(() => {
    captureSignupAttribution()
    window.location.replace(GUIDE_PDF)
  }, [])

  return null
}
