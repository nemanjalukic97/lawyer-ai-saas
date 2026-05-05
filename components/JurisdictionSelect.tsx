"use client"

import { useState } from "react"

import { useLanguage } from "@/components/LanguageProvider"
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
  const { t } = useLanguage()

  return (
    <>
      <Select value={value} onValueChange={(v) => setValue(v)}>
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
