"use client"

import { useLayoutEffect } from "react"

import { captureSignupAttribution } from "@/lib/signupAttribution"

export function SignupAttributionCapture() {
  useLayoutEffect(() => {
    captureSignupAttribution()
  }, [])
  return null
}
