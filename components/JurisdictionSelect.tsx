"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useLanguage } from "@/components/LanguageProvider"
import { uiLanguageForJurisdiction } from "@/lib/jurisdiction-ui-language"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const JURISDICTION_IDS = [
  "serbia",
  "croatia",
  "bih_fbih",
  "bih_rs",
  "bih_brcko",
  "montenegro",
  "slovenia",
] as const

export default function JurisdictionSelect() {
  const [value, setValue] = useState<string>("serbia")
  const router = useRouter()
  const { t, setLanguage } = useLanguage()

  const handleJurisdictionChange = (next: string) => {
    setValue(next)
    const uiLang = uiLanguageForJurisdiction(next)
    if (uiLang) {
      setLanguage(uiLang)
      router.refresh()
    }
  }

  return (
    <>
      <Select value={value} onValueChange={handleJurisdictionChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("auth.jurisdictionPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          {JURISDICTION_IDS.map((id) => (
            <SelectItem key={id} value={id}>
              {t(`settings.jurisdictions.${id}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name="jurisdiction" value={value} />
    </>
  )
}
