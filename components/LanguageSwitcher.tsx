"use client"

import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider"

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "sr", label: "SRB", flag: "🇷🇸" },
  { code: "bs", label: "BOS", flag: "🇧🇦" },
  { code: "hr", label: "CRO", flag: "🇭🇷" },
  { code: "sl", label: "SLO", flag: "🇸🇮" },
  { code: "me", label: "MNE", flag: "🇲🇪" },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const selected = LANGUAGES.find((l) => l.code === language)

  return (
    <Select
      value={language}
      onValueChange={(next) => {
        setLanguage(next as LanguageCode)
        // Server components (e.g. /dashboard/templates) read language from cookie.
        router.refresh()
      }}
    >
      <SelectTrigger
        size="sm"
        className="h-8 gap-1 rounded-full border-transparent bg-transparent px-2 text-sm font-medium text-muted-foreground shadow-none hover:bg-accent/50 hover:text-foreground focus-visible:ring-2 [&_svg]:size-3.5"
      >
        <SelectValue aria-label="Language">
          {selected ? (
            <span className="flex items-center gap-1">
              <span aria-hidden="true" className="text-xs leading-none">
                {selected.flag}
              </span>
              <span>{selected.label}</span>
            </span>
          ) : (
            t("language.label")
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={6} className="max-h-60">
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
