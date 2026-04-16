"use client"

import { Globe2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider"

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "sr", label: "SRB" },
  { code: "bs", label: "BOS" },
  { code: "hr", label: "CRO" },
  { code: "sl", label: "SLO" },
  { code: "me", label: "MNE" },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Globe2 className="size-4" aria-hidden="true" />
      <Select
        value={language}
        onValueChange={(next) => {
          setLanguage(next as LanguageCode)
          // Server components (e.g. /dashboard/templates) read language from cookie.
          router.refresh()
        }}
      >
        <SelectTrigger className="h-8 gap-1.5 px-2">
          <SelectValue aria-label="Language">
            {LANGUAGES.find((l) => l.code === language)?.label ?? t("language.label")}
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={6} className="max-h-60">
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

