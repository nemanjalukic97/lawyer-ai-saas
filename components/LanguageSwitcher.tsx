"use client"

import { Globe2 } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageProvider"

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "sr", label: "SER" },
  { code: "bs", label: "BOS" },
  { code: "hr", label: "CRO" },
  { code: "sl", label: "SLO" },
  { code: "me", label: "MNE" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Globe2 className="size-4" aria-hidden="true" />
      <Select value={language} onValueChange={(next) => setLanguage(next as LanguageCode)}>
        <SelectTrigger className="h-8 gap-1.5 px-2">
          <SelectValue aria-label="Language">
            {LANGUAGES.find((l) => l.code === language)?.label ?? t("language.label")}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {LANGUAGES.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

