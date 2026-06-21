import type { LanguageCode } from "@/components/LanguageProvider"

type AuthDescriptionVariant = "login" | "signup"

/** Language-specific line breaks for auth subheadings (Slovenian login/signup, Croatian signup only). */
export function renderAuthDescription(
  text: string,
  language: LanguageCode,
  variant: AuthDescriptionVariant
) {
  const breakAt = (marker: string) => {
    const idx = text.indexOf(marker)
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx).trimEnd()}
        <br />
        {text.slice(idx)}
      </>
    )
  }

  if (language === "sl" && variant === "login") {
    return breakAt("dostop do nadzorne")
  }

  if (language === "sl" && variant === "signup") {
    return breakAt("Legantis za svojo pravno")
  }

  if (language === "hr" && variant === "signup") {
    return breakAt("Legantis za svoj")
  }

  return text
}
