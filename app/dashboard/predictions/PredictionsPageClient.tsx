"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Scale } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/components/LanguageProvider"
import { RagSourcesPanel } from "@/components/RagSourcesPanel"
import type { RagMetadata } from "@/types/rag"

type CaseType =
  | "civil"
  | "commercial"
  | "labor"
  | "family"
  | "criminal"
  | "administrative"
  | "misdemeanor"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

type EvidenceQuality = "strong" | "medium" | "weak"

interface Option<T extends string> {
  value: T
  label: string
}

type LocalizedOption<T extends string> = Option<T> & { translationKey: string }

type PredictionDetail = {
  id: string
  case_name: string | null
  case_type: CaseType
  jurisdiction: Jurisdiction
  outcome_probability: number | null
  confidence_level: "high" | "medium" | "low"
  key_factors: string[] | null
  strategic_recommendations: string[] | null
  full_analysis: string | null
  created_at: string
}

const CASE_TYPE_OPTIONS: LocalizedOption<CaseType>[] = [
  { value: "civil", label: "Civil Law", translationKey: "predictions.caseTypes.civil" },
  { value: "commercial", label: "Commercial Law", translationKey: "predictions.caseTypes.commercial" },
  { value: "labor", label: "Labor Law", translationKey: "predictions.caseTypes.labor" },
  { value: "family", label: "Family Law", translationKey: "predictions.caseTypes.family" },
  { value: "criminal", label: "Criminal Law", translationKey: "predictions.caseTypes.criminal" },
  { value: "administrative", label: "Administrative Law", translationKey: "predictions.caseTypes.administrative" },
  { value: "misdemeanor", label: "Misdemeanor Law", translationKey: "predictions.caseTypes.misdemeanor" },
]

const JURISDICTION_OPTIONS: LocalizedOption<Jurisdiction>[] = [
  { value: "serbia", label: "Serbia", translationKey: "predictions.jurisdictions.serbia" },
  { value: "croatia", label: "Croatia", translationKey: "predictions.jurisdictions.croatia" },
  {
    value: "bih_fbih",
    label: "Bosnia & Herzegovina - Federation",
    translationKey: "predictions.jurisdictions.bih_fbih",
  },
  {
    value: "bih_rs",
    label: "Bosnia & Herzegovina - Republika Srpska",
    translationKey: "predictions.jurisdictions.bih_rs",
  },
  {
    value: "bih_brcko",
    label: "Bosnia & Herzegovina - Brcko District",
    translationKey: "predictions.jurisdictions.bih_brcko",
  },
  { value: "montenegro", label: "Montenegro", translationKey: "predictions.jurisdictions.montenegro" },
  { value: "slovenia", label: "Slovenia", translationKey: "predictions.jurisdictions.slovenia" },
]

const EVIDENCE_QUALITY_OPTIONS: LocalizedOption<EvidenceQuality>[] = [
  { value: "strong", label: "Strong", translationKey: "predictions.evidenceQuality.strong" },
  { value: "medium", label: "Medium", translationKey: "predictions.evidenceQuality.medium" },
  { value: "weak", label: "Weak", translationKey: "predictions.evidenceQuality.weak" },
]

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
}

function labelForJurisdiction(jurisdiction: Jurisdiction): string {
  const option = JURISDICTION_OPTIONS.find((opt) => opt.value === jurisdiction)
  return option?.label ?? jurisdiction
}

type PredictionSectionConfig = {
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

function sectionConfigForLanguage(language: string): PredictionSectionConfig {
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

function buildSystemPrompt(
  jurisdiction: Jurisdiction,
  outputLanguageName: string,
  sections: PredictionSectionConfig
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
7) ${sections.disclaimerTitle}

Use formal but clear language suitable for lawyers.

At the very end, append a machine footer exactly like this (for parsing; it will be hidden from the user):
---META---
OUTCOME_PROBABILITY_PERCENT: <number 0-100>
CONFIDENCE_LEVEL: <high|medium|low>
`.trim()
}

function buildUserPrompt(
  caseType: CaseType,
  jurisdiction: Jurisdiction,
  keyFacts: string,
  evidenceQuality: EvidenceQuality,
  amountInDispute: string,
  additionalContext: string
): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const caseTypeLabel = caseType
  const evidenceLabel = evidenceQuality

  const normalizedAmount =
    amountInDispute && amountInDispute.trim().length > 0
      ? amountInDispute.trim()
      : "Not specified"

  const normalizedContext =
    additionalContext && additionalContext.trim().length > 0
      ? additionalContext.trim()
      : "None provided"

  return `
Predict the outcome for this ${caseTypeLabel} case in ${jurisdictionLabel}:

Key Facts: ${keyFacts.trim()}
Evidence Quality: ${evidenceLabel}
Amount in Dispute: ${normalizedAmount}
Additional Context: ${normalizedContext}

Provide detailed analysis with outcome probability.
`.trim()
}

function extractConfidenceLevel(text: string): "high" | "medium" | "low" {
  const lower = text.toLowerCase()

  if (lower.includes("confidence level: high") || lower.includes("high confidence")) {
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

function extractOutcomeProbability(text: string): number | null {
  const match = text.match(/(\d{1,3})\s*%/)
  if (!match) return null

  const value = Number.parseInt(match[1], 10)
  if (Number.isNaN(value) || value < 0 || value > 100) return null
  return value
}

function splitMeta(raw: string): { visible: string; meta: string | null } {
  const marker = "\n---META---\n"
  const idx = raw.indexOf(marker)
  if (idx === -1) return { visible: raw, meta: null }
  return {
    visible: raw.slice(0, idx).trimEnd(),
    meta: raw.slice(idx + marker.length).trim(),
  }
}

function parseMeta(meta: string | null): {
  outcomeProbability: number | null
  confidenceLevel: "high" | "medium" | "low" | null
} {
  if (!meta) return { outcomeProbability: null, confidenceLevel: null }
  const probMatch = meta.match(/OUTCOME_PROBABILITY_PERCENT:\s*(\d{1,3})/i)
  const confMatch = meta.match(/CONFIDENCE_LEVEL:\s*(high|medium|low)/i)
  const prob = probMatch ? Number.parseInt(probMatch[1], 10) : null
  const outcomeProbability =
    prob != null && Number.isFinite(prob) && prob >= 0 && prob <= 100 ? prob : null
  const confidenceLevel = confMatch
    ? (confMatch[1].toLowerCase() as "high" | "medium" | "low")
    : null
  return { outcomeProbability, confidenceLevel }
}

function parseAmountInDispute(raw: string): number | null {
  if (!raw.trim()) return null

  const cleaned = raw.replace(/[^0-9,.\-]/g, "").replace(",", ".")
  const value = Number.parseFloat(cleaned)
  if (Number.isNaN(value)) return null
  return value
}

type ClientProps = {
  selectedId: string | null
  prefillMatterId?: string | null
}

export default function PredictionsPageClient({ selectedId, prefillMatterId }: ClientProps) {
  const supabase = useMemo(() => createClient(), [])
  const { t, language } = useLanguage()

  const outputLanguageName = useMemo(() => {
    switch (language) {
      case "sr":
        return "Serbian"
      case "bs":
        return "Bosnian"
      case "hr":
        return "Croatian"
      case "sl":
        return "Slovenian"
      case "me":
        return "Montenegrin"
      default:
        return "English"
    }
  }, [language])

  const sections = useMemo(() => sectionConfigForLanguage(language), [language])

  const [caseType, setCaseType] = useState<CaseType>("civil")
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("serbia")
  const [matterId, setMatterId] = useState<string>(prefillMatterId ?? "")
  const [matterOptions, setMatterOptions] = useState<
    Array<{ id: string; title: string; matter_number: string }>
  >([])
  const [keyFacts, setKeyFacts] = useState("")
  const [evidenceQuality, setEvidenceQuality] =
    useState<EvidenceQuality>("medium")
  const [amountInDispute, setAmountInDispute] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [predictionContent, setPredictionContent] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [ragData, setRagData] = useState<RagMetadata | null>(null)

  const [detail, setDetail] = useState<PredictionDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMatters() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("matters")
        .select("id, title, matter_number")
        .eq("user_id", user.id)
        .eq("status", "open")
        .order("created_at", { ascending: false })

      if (data) {
        setMatterOptions(
          (data as Array<Record<string, unknown>>).map((m) => ({
            id: String(m.id),
            title: String(m.title ?? ""),
            matter_number: String(m.matter_number ?? ""),
          }))
        )
      }
    }
    void loadMatters()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setRagData(null)
    setError(null)
    setSaveSuccess(false)
    setPredictionContent("")

    if (!caseType || !jurisdiction || !keyFacts.trim()) {
      setError(
        t("predictions.errors.missingRequired")
      )
      return
    }

    setIsLoading(true)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction, outputLanguageName, sections)
      const userPrompt = buildUserPrompt(
        caseType,
        jurisdiction,
        keyFacts,
        evidenceQuality,
        amountInDispute,
        additionalContext
      )

      const mappedCategory = caseType

      const body = {
        systemPrompt,
        userPrompt,
        featureType: "case_prediction",
        jurisdiction: jurisdiction,
        category: mappedCategory,
        outputLanguage: outputLanguageName,
      }
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        let message = `Failed to generate prediction (status ${response.status})`

        try {
          const data = (await response.json()) as { error?: string }
          if (data?.error) {
            message = data.error
          }
        } catch {
          // ignore JSON parse errors and use default message
        }

        throw new Error(message)
      }

      const data = (await response.json()) as {
        content?: string
        rag?: RagMetadata
      }
      const raw = data.content ?? ""
      if (data.rag) setRagData(data.rag)
      const { visible: content, meta } = splitMeta(raw)

      setPredictionContent(content)

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError(t("predictions.errors.mustBeLoggedInToSave"))
          return
        }

        const amountValue = parseAmountInDispute(amountInDispute)
        const parsed = parseMeta(meta)
        const confidenceLevel =
          parsed.confidenceLevel ?? extractConfidenceLevel(content)
        const outcomeProbability =
          parsed.outcomeProbability ?? extractOutcomeProbability(content)

        type CasePredictionInsert = {
          user_id: string
          case_type: CaseType
          jurisdiction: Jurisdiction
          case_facts: string
          amount_in_dispute: number | null
          evidence_quality: EvidenceQuality
          outcome_probability: number | null
          confidence_level: "high" | "medium" | "low"
          full_analysis: string
          matter_id?: string | null
        }

        const insertRow: CasePredictionInsert = {
          user_id: user.id,
          case_type: caseType,
          jurisdiction,
          case_facts: keyFacts.trim(),
          amount_in_dispute: amountValue,
          evidence_quality: evidenceQuality,
          outcome_probability: outcomeProbability,
          confidence_level: confidenceLevel,
          full_analysis: content,
          matter_id: matterId === "none" ? null : (matterId || null),
        }

        await supabase.from("case_predictions").insert(insertRow)

        setSaveSuccess(true)
      } catch (saveError) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(
            "Failed to save case prediction:",
            saveError instanceof Error ? saveError.message : String(saveError)
          )
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("predictions.errors.generateFailed")
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleDownloadPdf() {
    if (!predictionContent) return

    try {
      const cleaned = cleanMarkdown(predictionContent)
      const printWindow = window.open("", "_blank")
      if (!printWindow) return

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Case Prediction Analysis</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 12pt;
                line-height: 1.6;
                margin: 50px;
                color: #000;
              }
              pre {
                white-space: pre-wrap;
                font-family: Arial, sans-serif;
              }
            </style>
          </head>
          <body>
            <pre>${cleaned}</pre>
          </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to download PDF:", error)
      }
    }
  }

  useEffect(() => {
    let isMounted = true

    async function loadDetail() {
      if (!selectedId) {
        setDetail(null)
        setDetailError(null)
        return
      }

      setDetailLoading(true)
      setDetailError(null)

      try {
        const { data, error } = await supabase
          .from("case_predictions")
          .select(
            "id, case_name, case_type, jurisdiction, outcome_probability, confidence_level, key_factors, strategic_recommendations, full_analysis, created_at"
          )
          .eq("id", selectedId)
          .is("deleted_at", null)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isMounted) return

        if (!data) {
          setDetail(null)
          setDetailError(t("predictions.sidebar.recordNotFound"))
          return
        }

        const detail: PredictionDetail = {
          id: data.id,
          case_name: data.case_name ?? null,
          case_type: data.case_type,
          jurisdiction: data.jurisdiction,
          outcome_probability: data.outcome_probability ?? null,
          confidence_level: data.confidence_level,
          key_factors: (data.key_factors as string[] | null) ?? null,
          strategic_recommendations:
            (data.strategic_recommendations as string[] | null) ?? null,
          full_analysis: data.full_analysis ?? null,
          created_at: data.created_at,
        }

        setDetail(detail)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load prediction detail:", error)
        }
        setDetail(null)
        setDetailError(t("predictions.sidebar.recordNotFound"))
      } finally {
        if (isMounted) {
          setDetailLoading(false)
        }
      }
    }

    void loadDetail()

    return () => {
      isMounted = false
    }
  }, [selectedId, supabase, t])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="flex flex-col gap-8">
          <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
                {t("predictions.header.kicker")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t("predictions.header.title")}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
                {t("predictions.header.subtitle")}
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">{t("predictions.header.back")}</Link>
              </Button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)]">
            <Card className="rounded-xl border border-border/40 bg-muted/10 p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
                <Scale className="h-5 w-5 text-amber-400" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="mb-1.5 text-xs font-medium text-muted-foreground/70">
                      {t("predictions.form.caseType.label")}
                    </Label>
                    <Select
                      value={caseType}
                      onValueChange={(value) => setCaseType(value as CaseType)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("predictions.form.caseType.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {CASE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {(() => {
                              const translated = t(option.translationKey)
                              return translated === option.translationKey ? option.label : translated
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="mb-1.5 text-xs font-medium text-muted-foreground/70">
                      {t("predictions.form.jurisdiction.label")}
                    </Label>
                    <Select
                      value={jurisdiction}
                      onValueChange={(value) =>
                        setJurisdiction(value as Jurisdiction)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("predictions.form.jurisdiction.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {JURISDICTION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {(() => {
                              const translated = t(option.translationKey)
                              return translated === option.translationKey ? option.label : translated
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="mb-1.5 text-xs font-medium text-muted-foreground/70">
                    {t("matters.title")}
                  </Label>
                  <Select
                    value={matterId}
                    onValueChange={(v) => setMatterId(v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("matters.select.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("matters.select.none")}</SelectItem>
                      {matterOptions.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {`${m.matter_number} — ${m.title}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground/40">
                    {t("matters.select.help")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="keyFacts"
                    className="mb-1.5 text-xs font-medium text-muted-foreground/70"
                  >
                    {t("predictions.form.keyFacts.label")}
                  </Label>
                  <Textarea
                    id="keyFacts"
                    value={keyFacts}
                    onChange={(event) => setKeyFacts(event.target.value)}
                    rows={4}
                    placeholder={t("predictions.form.keyFacts.placeholder")}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("predictions.form.keyFacts.help")}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="mb-1.5 text-xs font-medium text-muted-foreground/70">
                      {t("predictions.form.evidenceQuality.label")}
                    </Label>
                    <Select
                      value={evidenceQuality}
                      onValueChange={(value) =>
                        setEvidenceQuality(value as EvidenceQuality)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("predictions.form.evidenceQuality.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {EVIDENCE_QUALITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {(() => {
                              const translated = t(option.translationKey)
                              return translated === option.translationKey ? option.label : translated
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="amountInDispute"
                      className="mb-1.5 text-xs font-medium text-muted-foreground/70"
                    >
                      {t("predictions.form.amountInDispute.label")}
                    </Label>
                    <Input
                      id="amountInDispute"
                      value={amountInDispute}
                      onChange={(event) => setAmountInDispute(event.target.value)}
                      placeholder={t("predictions.form.amountInDispute.placeholder")}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t("predictions.form.amountInDispute.help")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="additionalContext"
                      className="mb-1.5 text-xs font-medium text-muted-foreground/70"
                    >
                      {t("predictions.form.additionalContext.label")}
                    </Label>
                    <Textarea
                      id="additionalContext"
                      value={additionalContext}
                      onChange={(event) =>
                        setAdditionalContext(event.target.value)
                      }
                      rows={3}
                      placeholder={t("predictions.form.additionalContext.placeholder")}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? t("predictions.form.actions.loading") : t("predictions.form.actions.submit")}
                  </Button>
                  <p className="text-xs text-muted-foreground/40">
                    {t("predictions.form.actions.note")}
                  </p>
                </div>
              </form>
            </Card>

            <Card className="flex min-h-[420px] flex-col rounded-xl border border-border/40 bg-muted/10 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold">
                    {t("predictions.result.title")}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">
                    {t("predictions.result.subtitle")}
                  </p>
                </div>
                {predictionContent && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPdf}
                    disabled={!predictionContent}
                  >
                    {t("predictions.result.downloadPdf")}
                  </Button>
                )}
              </div>

              {saveSuccess && (
                <p className="mt-3 text-xs font-medium text-emerald-600">
                  {t("predictions.result.saved")}
                </p>
              )}

              <div className="mt-4 flex-1 rounded-md border bg-muted/40 p-4">
                {predictionContent ? (
                  <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {predictionContent}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                      <Scale className="h-5 w-5 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground/60">
                      Run a prediction to see the analysis
                    </p>
                  </div>
                )}
                {ragData && <RagSourcesPanel ragData={ragData} />}
              </div>
            </Card>
          </div>
        </div>

        <Card className="h-fit space-y-4 rounded-xl border border-border/40 bg-muted/10 p-6">
          <h2 className="text-base font-semibold">{t("predictions.sidebar.title")}</h2>
          {!selectedId ? (
            <div className="space-y-3">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                  <Scale className="h-5 w-5 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground/60">
                  Run a prediction to see the analysis
                </p>
                <Button asChild variant="outline" size="sm" className="mt-2">
                  <Link href="/dashboard/activity">
                    {t("predictions.sidebar.viewActivity")}
                  </Link>
                </Button>
              </div>
            </div>
          ) : detailLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("predictions.sidebar.loading")}</span>
            </div>
          ) : detailError ? (
            <p className="text-sm text-destructive">{detailError}</p>
          ) : detail ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">
                  {detail.case_name || t("predictions.sidebar.fallbackCaseName")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(() => {
                    const opt = CASE_TYPE_OPTIONS.find((o) => o.value === detail.case_type)
                    const translated = opt ? t(opt.translationKey) : detail.case_type
                    const caseLabel = opt && translated !== opt.translationKey ? translated : (opt?.label ?? detail.case_type)
                    const jOpt = JURISDICTION_OPTIONS.find((o) => o.value === detail.jurisdiction)
                    const jTranslated = jOpt ? t(jOpt.translationKey) : detail.jurisdiction
                    const jurLabel = jOpt && jTranslated !== jOpt.translationKey ? jTranslated : (jOpt?.label ?? detail.jurisdiction)
                    return `${caseLabel} · ${jurLabel}`
                  })()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("predictions.sidebar.created")}{" "}
                  {new Date(detail.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  {t("predictions.sidebar.outcomeProbability")}{" "}
                  {detail.outcome_probability != null
                    ? `${detail.outcome_probability}%`
                    : t("predictions.common.notSpecified")}
                </p>
                <p>
                  {t("predictions.sidebar.confidenceLevel")}{" "}
                  {t(`predictions.confidenceLevels.${detail.confidence_level}`)}
                </p>
              </div>
              {detail.key_factors && detail.key_factors.length > 0 && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {t("predictions.sidebar.keyFactors")}
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    {detail.key_factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.strategic_recommendations &&
                detail.strategic_recommendations.length > 0 && (
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {t("predictions.sidebar.recommendations")}
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                      {detail.strategic_recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              {detail.full_analysis && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {t("predictions.sidebar.fullAnalysis")}
                  </p>
                  <div className="max-h-64 overflow-y-auto rounded-md border bg-muted/40 p-3">
                    <pre className="whitespace-pre-wrap">
                      {detail.full_analysis}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}

