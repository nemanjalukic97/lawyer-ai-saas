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
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type CaseType =
  | "civil"
  | "commercial"
  | "labor"
  | "family"
  | "criminal"
  | "administrative"

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

const CASE_TYPE_OPTIONS: Option<CaseType>[] = [
  { value: "civil", label: "Civil Law" },
  { value: "commercial", label: "Commercial Law" },
  { value: "labor", label: "Labor Law" },
  { value: "family", label: "Family Law" },
  { value: "criminal", label: "Criminal Law" },
  { value: "administrative", label: "Administrative Law" },
]

const JURISDICTION_OPTIONS: Option<Jurisdiction>[] = [
  { value: "serbia", label: "Serbia" },
  { value: "croatia", label: "Croatia" },
  {
    value: "bih_fbih",
    label: "Bosnia & Herzegovina - Federation",
  },
  {
    value: "bih_rs",
    label: "Bosnia & Herzegovina - Republika Srpska",
  },
  {
    value: "bih_brcko",
    label: "Bosnia & Herzegovina - Brcko District",
  },
  { value: "montenegro", label: "Montenegro" },
  { value: "slovenia", label: "Slovenia" },
]

const EVIDENCE_QUALITY_OPTIONS: Option<EvidenceQuality>[] = [
  { value: "strong", label: "Strong" },
  { value: "medium", label: "Medium" },
  { value: "weak", label: "Weak" },
]

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
}

function labelForCaseType(caseType: CaseType): string {
  const option = CASE_TYPE_OPTIONS.find((opt) => opt.value === caseType)
  return option?.label ?? caseType
}

function labelForJurisdiction(jurisdiction: Jurisdiction): string {
  const option = JURISDICTION_OPTIONS.find((opt) => opt.value === jurisdiction)
  return option?.label ?? jurisdiction
}

function labelForEvidenceQuality(evidence: EvidenceQuality): string {
  const option = EVIDENCE_QUALITY_OPTIONS.find((opt) => opt.value === evidence)
  return option?.label ?? evidence
}

function buildSystemPrompt(jurisdiction: Jurisdiction): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)

  return `
You are a legal analytics AI for ${jurisdictionLabel}.
Analyze this case and predict the outcome based on:
- Historical precedents in ${jurisdictionLabel}
- Applicable laws and regulations
- Key facts provided
- Evidence quality
- Current judicial trends in ${jurisdictionLabel}

Structure your response with these sections:
1. OUTCOME PROBABILITY - percentage chance and direction
2. CONFIDENCE LEVEL - High/Medium/Low with explanation
3. KEY FACTORS - bullet points of factors affecting outcome
4. RELEVANT PRECEDENTS - similar cases in ${jurisdictionLabel}
5. STRATEGIC RECOMMENDATIONS - actionable advice
6. KEY RISKS - what could change the outcome
7. DISCLAIMER - that this is AI analysis only

Use formal but clear language suitable for lawyers.
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
  const caseTypeLabel = labelForCaseType(caseType)
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const evidenceLabel = labelForEvidenceQuality(evidenceQuality)

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

function parseAmountInDispute(raw: string): number | null {
  if (!raw.trim()) return null

  const cleaned = raw.replace(/[^0-9,.\-]/g, "").replace(",", ".")
  const value = Number.parseFloat(cleaned)
  if (Number.isNaN(value)) return null
  return value
}

type ClientProps = {
  selectedId: string | null
}

export default function PredictionsPageClient({ selectedId }: ClientProps) {
  const supabase = useMemo(() => createClient(), [])

  const [caseType, setCaseType] = useState<CaseType>("civil")
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("serbia")
  const [keyFacts, setKeyFacts] = useState("")
  const [evidenceQuality, setEvidenceQuality] =
    useState<EvidenceQuality>("medium")
  const [amountInDispute, setAmountInDispute] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [predictionContent, setPredictionContent] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [detail, setDetail] = useState<PredictionDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError(null)
    setSaveSuccess(false)
    setPredictionContent("")

    if (!caseType || !jurisdiction || !keyFacts.trim()) {
      setError(
        "Please select a case type and jurisdiction, and provide the key facts of the case."
      )
      return
    }

    setIsLoading(true)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction)
      const userPrompt = buildUserPrompt(
        caseType,
        jurisdiction,
        keyFacts,
        evidenceQuality,
        amountInDispute,
        additionalContext
      )

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          featureType: "case_prediction",
        }),
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

      const data = (await response.json()) as { content?: string }
      const content = data.content ?? ""

      setPredictionContent(content)

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError("You must be logged in to save predictions.")
          return
        }

        const amountValue = parseAmountInDispute(amountInDispute)
        const confidenceLevel = extractConfidenceLevel(content)
        const outcomeProbability = extractOutcomeProbability(content)

        await supabase.from("case_predictions").insert({
          user_id: user.id,
          case_type: caseType,
          jurisdiction,
          case_facts: keyFacts.trim(),
          amount_in_dispute: amountValue,
          evidence_quality: evidenceQuality,
          outcome_probability: outcomeProbability,
          confidence_level: confidenceLevel,
          full_analysis: content,
        } as any)

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
          : "Failed to generate prediction. Please try again."
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
          setDetailError("Record not found")
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
        setDetailError("Record not found")
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
  }, [selectedId, supabase])

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Legantis · Case prediction
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                AI case outcome prediction
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Analyze case facts, evidence strength, and dispute size to get an
                AI-generated prediction and strategic recommendations for your
                matters across the Balkans.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)]">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Case type</Label>
                    <Select
                      value={caseType}
                      onValueChange={(value) => setCaseType(value as CaseType)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        {CASE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Jurisdiction</Label>
                    <Select
                      value={jurisdiction}
                      onValueChange={(value) =>
                        setJurisdiction(value as Jurisdiction)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        {JURISDICTION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyFacts">Key facts of the case</Label>
                  <Textarea
                    id="keyFacts"
                    value={keyFacts}
                    onChange={(event) => setKeyFacts(event.target.value)}
                    rows={4}
                    placeholder="Describe the key facts of the case, including relevant events, timeline, and circumstances..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Do not include confidential details that cannot be shared.
                    Focus on the legally relevant facts, procedure, and current
                    status.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Evidence quality</Label>
                    <Select
                      value={evidenceQuality}
                      onValueChange={(value) =>
                        setEvidenceQuality(value as EvidenceQuality)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select evidence quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {EVIDENCE_QUALITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amountInDispute">Amount in dispute</Label>
                    <Input
                      id="amountInDispute"
                      value={amountInDispute}
                      onChange={(event) => setAmountInDispute(event.target.value)}
                      placeholder="e.g. €50,000"
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional, but helps contextualize risk and strategy.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalContext">Additional context</Label>
                    <Textarea
                      id="additionalContext"
                      value={additionalContext}
                      onChange={(event) =>
                        setAdditionalContext(event.target.value)
                      }
                      rows={3}
                      placeholder="Any additional context, procedural history, or specific questions you want addressed..."
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
                    {isLoading ? "Predicting outcome..." : "Predict outcome"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Uses your plan&apos;s AI quota. This is AI analysis only and
                    does not replace independent legal judgment.
                  </p>
                </div>
              </form>
            </Card>

            <Card className="flex min-h-[420px] flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Prediction analysis</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Outcome probability, key factors, precedents, recommendations,
                    and risks based on the information you provided.
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
                    Download PDF
                  </Button>
                )}
              </div>

              {saveSuccess && (
                <p className="mt-3 text-xs font-medium text-emerald-600">
                  Prediction saved to workspace.
                </p>
              )}

              <div className="mt-4 flex-1 rounded-md border bg-muted/40 p-4">
                {predictionContent ? (
                  <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {predictionContent}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Your case prediction will appear here after you run an
                    analysis. You will see outcome probability, confidence level,
                    key factors, relevant precedents, strategic recommendations,
                    and risks, together with a clear disclaimer.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        <Card className="h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">Prediction details</h2>
          {!selectedId ? (
            <p className="text-sm text-muted-foreground">
              Select a prediction from recent activity to see details here.
            </p>
          ) : detailLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading prediction…</span>
            </div>
          ) : detailError ? (
            <p className="text-sm text-destructive">{detailError}</p>
          ) : detail ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">
                  {detail.case_name || "Case prediction"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {labelForCaseType(detail.case_type)} ·{" "}
                  {labelForJurisdiction(detail.jurisdiction)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Created {new Date(detail.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  Outcome probability:{" "}
                  {detail.outcome_probability != null
                    ? `${detail.outcome_probability}%`
                    : "Not specified"}
                </p>
                <p>Confidence level: {detail.confidence_level}</p>
              </div>
              {detail.key_factors && detail.key_factors.length > 0 && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Key factors</p>
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
                      Strategic recommendations
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
                    Full analysis
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

