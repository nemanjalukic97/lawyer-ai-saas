"use client"

import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage, type LanguageCode } from "@/components/LanguageProvider"

const LANGUAGES: { code: LanguageCode; label: string; countryCode: string }[] = [
  { code: "en", label: "EN", countryCode: "gb" },
  { code: "sr", label: "SRB", countryCode: "rs" },
  { code: "bs", label: "BOS", countryCode: "ba" },
  { code: "hr", label: "CRO", countryCode: "hr" },
  { code: "sl", label: "SLO", countryCode: "si" },
  { code: "me", label: "MNE", countryCode: "me" },
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
              <span
                className={`fi fi-${selected.countryCode} w-4`}
                style={{ borderRadius: "2px" }}
                aria-hidden="true"
              />
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
              <span
                className={`fi fi-${lang.countryCode} w-4`}
                style={{ borderRadius: "2px" }}
                aria-hidden="true"
              />
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
