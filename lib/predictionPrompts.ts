export type PredictionCaseType =
  | "civil"
  | "property"
  | "inheritance"
  | "commercial"
  | "labor"
  | "family"
  | "criminal"
  | "administrative"
  | "procedural"
  | "misdemeanor"

export type PredictionJurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

export type PredictionEvidenceQuality = "strong" | "medium" | "weak"

export type PredictionSectionConfig = {
  outcomeTitle: string
  confidenceTitle: string
  keyFactorsTitle: string
  precedentsTitle: string
  recommendationsTitle: string
  risksTitle: string
  disclaimerTitle: string
  confidenceHigh: string
  confidenceMedium: string
  confidenceLow: string
}

const JURISDICTION_LABELS: Record<PredictionJurisdiction, string> = {
  serbia: "Serbia",
  croatia: "Croatia",
  bih_fbih: "Bosnia & Herzegovina - Federation",
  bih_rs: "Bosnia & Herzegovina - Republika Srpska",
  bih_brcko: "Bosnia & Herzegovina - Brcko District",
  montenegro: "Montenegro",
  slovenia: "Slovenia",
}

export function labelForJurisdiction(
  jurisdiction: PredictionJurisdiction,
): string {
  return JURISDICTION_LABELS[jurisdiction] ?? jurisdiction
}

export function sectionConfigForLanguage(
  language: string,
): PredictionSectionConfig {
  switch (language) {
    case "sr":
      return {
        outcomeTitle: "VJEROVATNOĆA ISHODA",
        confidenceTitle: "NIVO POUZDANOSTI",
        keyFactorsTitle: "KLJUČNI FAKTORI",
        precedentsTitle: "RELEVANTNI PRESEDANI",
        recommendationsTitle: "STRATEŠKE PREPORUKE",
        risksTitle: "KLJUČNI RIZICI",
        disclaimerTitle: "ODRICANJE ODGOVORNOSTI",
        confidenceHigh: "Visok",
        confidenceMedium: "Srednji",
        confidenceLow: "Nizak",
      }
    case "bs":
      return {
        outcomeTitle: "VJEROVATNOĆA ISHODA",
        confidenceTitle: "NIVO POUZDANOSTI",
        keyFactorsTitle: "KLJUČNI FAKTORI",
        precedentsTitle: "RELEVANTNI PRESEDANI",
        recommendationsTitle: "STRATEŠKE PREPORUKE",
        risksTitle: "KLJUČNI RIZICI",
        disclaimerTitle: "ODRICANJE ODGOVORNOSTI",
        confidenceHigh: "Visok",
        confidenceMedium: "Srednji",
        confidenceLow: "Nizak",
      }
    case "hr":
      return {
        outcomeTitle: "VJEROJATNOST ISHODA",
        confidenceTitle: "RAZINA POUZDANOSTI",
        keyFactorsTitle: "KLJUČNI ČIMBENICI",
        precedentsTitle: "RELEVANTNI PRESEDANI",
        recommendationsTitle: "STRATEŠKE PREPORUKE",
        risksTitle: "KLJUČNI RIZICI",
        disclaimerTitle: "ODRICANJE ODGOVORNOSTI",
        confidenceHigh: "Visoka",
        confidenceMedium: "Srednja",
        confidenceLow: "Niska",
      }
    case "sl":
      return {
        outcomeTitle: "VERJETNOST IZIDA",
        confidenceTitle: "STOPNJA ZAUPANJA",
        keyFactorsTitle: "KLJUČNI DEJAVNIKI",
        precedentsTitle: "RELEVANTNI PRECEDENSI",
        recommendationsTitle: "STRATEŠKA PRIPOROČILA",
        risksTitle: "KLJUČNA TVEGANJA",
        disclaimerTitle: "ODPOVED ODGOVORNOSTI",
        confidenceHigh: "Visoka",
        confidenceMedium: "Srednja",
        confidenceLow: "Nizka",
      }
    case "me":
      return {
        outcomeTitle: "VJEROVATNOĆA ISHODA",
        confidenceTitle: "NIVO POUZDANOSTI",
        keyFactorsTitle: "KLJUČNI FAKTORI",
        precedentsTitle: "RELEVANTNI PRESEDANI",
        recommendationsTitle: "STRATEŠKE PREPORUKE",
        risksTitle: "KLJUČNI RIZICI",
        disclaimerTitle: "ODRICANJE ODGOVORNOSTI",
        confidenceHigh: "Visok",
        confidenceMedium: "Srednji",
        confidenceLow: "Nizak",
      }
    default:
      return {
        outcomeTitle: "OUTCOME PROBABILITY",
        confidenceTitle: "CONFIDENCE LEVEL",
        keyFactorsTitle: "KEY FACTORS",
        precedentsTitle: "RELEVANT PRECEDENTS",
        recommendationsTitle: "STRATEGIC RECOMMENDATIONS",
        risksTitle: "KEY RISKS",
        disclaimerTitle: "DISCLAIMER",
        confidenceHigh: "High",
        confidenceMedium: "Medium",
        confidenceLow: "Low",
      }
  }
}

export function buildPredictionSystemPrompt(
  jurisdiction: PredictionJurisdiction,
  outputLanguageName: string,
  sections: PredictionSectionConfig,
): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)

  return `
You are a legal analytics AI for ${jurisdictionLabel}.
Analyze this case and predict the outcome based on:
- Historical precedents in ${jurisdictionLabel}
- Applicable laws and regulations
- Key facts provided
- Evidence quality
- Current judicial trends in ${jurisdictionLabel}

Write the response in ${outputLanguageName}. Do not use English words like "Medium/High/Low" unless the output language is English.
Use these EXACT section titles (all caps), in this order, each on its own line:
1) ${sections.outcomeTitle}
2) ${sections.confidenceTitle}
3) ${sections.keyFactorsTitle}
4) ${sections.precedentsTitle}
5) ${sections.recommendationsTitle}
6) ${sections.risksTitle}

Do not write a disclaimer section. The application appends a product disclaimer after your analysis.

The "${sections.outcomeTitle}" section must describe the likely outcome in words only, grounded in the retrieved articles and court decisions. Do NOT state a numeric probability of success, a win rate, or any percentage (for example "75%") anywhere in the answer.

The statutes under [RELEVANT LEGISLATION] are listed in retrieval rank order (RANK 1, RANK 2, …). Rank is an ordering of relevance, not a requirement to apply every article.

For each item in "${sections.keyFactorsTitle}":
- Cite the highest-ranked retrieved article whose text actually supports that factor.
- You may add lower-ranked articles as extra support. Do not cite a lower-ranked article instead of a higher-ranked one that supports the same point.

If you describe a statutory mechanism in "${sections.recommendationsTitle}" (for example a buy-out, partition, or similar remedy), cite the highest-ranked article that creates that mechanism.

RANK 1: In "${sections.keyFactorsTitle}", either (a) use RANK 1 as the citation for the factor it supports, or (b) state in one sentence that RANK 1 does not apply to these facts and why — for example it governs a different institute, a different party, or a condition that is not present. Option (b) is a complete and correct response when RANK 1 is off-point. Do not cite RANK 1, and do not stretch its text, merely to satisfy this rule.

Use formal but clear language suitable for lawyers.

At the very end, append a machine footer exactly like this (for parsing; it will be hidden from the user):
---META---
CONFIDENCE_LEVEL: <high|medium|low>
`.trim()
}

export function buildPredictionUserPrompt(
  caseType: PredictionCaseType,
  jurisdiction: PredictionJurisdiction,
  keyFacts: string,
  evidenceQuality: PredictionEvidenceQuality,
  amountInDispute: string,
  additionalContext: string,
): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)

  const normalizedAmount =
    amountInDispute && amountInDispute.trim().length > 0
      ? amountInDispute.trim()
      : "Not specified"

  const normalizedContext =
    additionalContext && additionalContext.trim().length > 0
      ? additionalContext.trim()
      : "None provided"

  return `
Predict the outcome for this ${caseType} case in ${jurisdictionLabel}:

Key Facts: ${keyFacts.trim()}
Evidence Quality: ${evidenceQuality}
Amount in Dispute: ${normalizedAmount}
Additional Context: ${normalizedContext}
`.trim()
}

export function extractConfidenceLevel(
  text: string,
): "high" | "medium" | "low" {
  const lower = text.toLowerCase()

  if (
    lower.includes("confidence level: high") ||
    lower.includes("high confidence")
  ) {
    return "high"
  }

  if (
    lower.includes("confidence level: low") ||
    lower.includes("low confidence")
  ) {
    return "low"
  }

  if (
    lower.includes("confidence level: medium") ||
    lower.includes("medium confidence")
  ) {
    return "medium"
  }

  return "medium"
}

export function splitPredictionMeta(raw: string): {
  visible: string
  meta: string | null
} {
  const marker = "\n---META---\n"
  const idx = raw.indexOf(marker)
  if (idx === -1) return { visible: raw, meta: null }
  return {
    visible: raw.slice(0, idx).trimEnd(),
    meta: raw.slice(idx + marker.length).trim(),
  }
}

export function parsePredictionMeta(meta: string | null): {
  confidenceLevel: "high" | "medium" | "low" | null
} {
  if (!meta) return { confidenceLevel: null }
  const confMatch = meta.match(/CONFIDENCE_LEVEL:\s*(high|medium|low)/i)
  const confidenceLevel = confMatch
    ? (confMatch[1].toLowerCase() as "high" | "medium" | "low")
    : null
  return { confidenceLevel }
}
