"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageProvider"

type Props = Omit<React.ComponentProps<typeof Button>, "disabled" | "type"> & {
  loadingText?: string
  loadingKey?: string
}

export default function AuthSubmitButton({
  children,
  loadingText,
  loadingKey,
  ...props
}: Props) {
  const { pending } = useFormStatus()
  const { t } = useLanguage()
  const resolvedLoadingText = loadingKey ? t(loadingKey) : loadingText

  return (
    <Button {...props} type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {resolvedLoadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

