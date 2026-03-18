"use client"

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
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
import { Loader2, UploadCloud } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Json } from "@/database.types"
import { useLanguage } from "@/components/LanguageProvider"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

type AnalysisFocus =
  | "General Review"
  | "Risk Assessment"
  | "Compliance Check"
  | "Missing Clauses"

interface Option<T extends string> {
  value: T
  label: string
}

type LocalizedOption<T extends string> = Option<T> & { translationKey: string }

const JURISDICTION_OPTIONS: LocalizedOption<Jurisdiction>[] = [
  { value: "serbia", label: "Serbia", translationKey: "analyze.jurisdictions.serbia" },
  { value: "croatia", label: "Croatia", translationKey: "analyze.jurisdictions.croatia" },
  {
    value: "bih_fbih",
    label: "Bosnia & Herzegovina - Federation",
    translationKey: "analyze.jurisdictions.bih_fbih",
  },
  {
    value: "bih_rs",
    label: "Bosnia & Herzegovina - Republika Srpska",
    translationKey: "analyze.jurisdictions.bih_rs",
  },
  {
    value: "bih_brcko",
    label: "Bosnia & Herzegovina - Brcko District",
    translationKey: "analyze.jurisdictions.bih_brcko",
  },
  { value: "montenegro", label: "Montenegro", translationKey: "analyze.jurisdictions.montenegro" },
  { value: "slovenia", label: "Slovenia", translationKey: "analyze.jurisdictions.slovenia" },
]

const ANALYSIS_FOCUS_OPTIONS: LocalizedOption<AnalysisFocus>[] = [
  { value: "General Review", label: "General Review", translationKey: "analyze.focus.general" },
  { value: "Risk Assessment", label: "Risk Assessment", translationKey: "analyze.focus.risk" },
  { value: "Compliance Check", label: "Compliance Check", translationKey: "analyze.focus.compliance" },
  { value: "Missing Clauses", label: "Missing Clauses", translationKey: "analyze.focus.missing" },
]

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
}

function getJurisdictionLabel(jurisdiction: Jurisdiction): string {
  const option = JURISDICTION_OPTIONS.find((opt) => opt.value === jurisdiction)
  return option?.label ?? jurisdiction
}

function buildSystemPrompt(
  jurisdiction: Jurisdiction,
  analysisFocus: AnalysisFocus,
  outputLanguageName: string
): string {
  const jurisdictionLabel = getJurisdictionLabel(jurisdiction)

  return `
You are a contract review AI for ${jurisdictionLabel}.
Analyze this document and identify:
1. RISKY CLAUSES - Terms unfavorable to client
   or legally problematic
2. MISSING PROVISIONS - Standard clauses that
   should be included
3. COMPLIANCE ISSUES - Violations of ${jurisdictionLabel} law
4. AMBIGUOUS LANGUAGE - Unclear terms that could
   cause disputes
5. EXECUTIVE SUMMARY - Brief overall assessment
6. RISK SCORE - Rate overall risk 1-10
   (1=very safe, 10=very risky)
7. RECOMMENDATIONS - Actionable improvements

Focus: ${analysisFocus}
Write the response in ${outputLanguageName}, but keep the labels "RISK SCORE" and the phrase "Risk score:" in English and include a clear line like "Risk score: X/10" so the app can parse it.
Use formal but clear language suitable for lawyers.
`.trim()
}

function buildUserPrompt(
  jurisdiction: Jurisdiction,
  analysisFocus: AnalysisFocus,
  documentText: string
): string {
  const jurisdictionLabel = getJurisdictionLabel(jurisdiction)

  return `
Analyze this document for a ${jurisdictionLabel} jurisdiction:

${documentText}

Focus on: ${analysisFocus}
Provide detailed analysis with risk score and recommendations.
`.trim()
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function extractRiskScore(text: string): number | null {
  const lower = text.toLowerCase()

  const riskLabelMatch = lower.match(/risk\s*score[^0-9]{0,10}(\d{1,2})/)
  if (riskLabelMatch) {
    const value = Number.parseInt(riskLabelMatch[1], 10)
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      return value
    }
  }

  const genericMatch = lower.match(/\b([1-9]|10)\b/)
  if (genericMatch) {
    const value = Number.parseInt(genericMatch[1], 10)
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      return value
    }
  }

  return null
}

function getRiskBadgeClasses(score: number | null): string {
  if (score == null) {
    return "inline-flex items-center rounded-full border border-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
  }

  if (score >= 1 && score <= 3) {
    return "inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
  }

  if (score >= 4 && score <= 6) {
    return "inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400"
  }

  return "inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400"
}

function getRiskBadgeLabel(score: number | null): string {
  if (score == null) return "Risk score not detected"
  return `Risk score: ${score}/10`
}

async function parseTxtFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Failed to read TXT file."))
    reader.onload = () => resolve(String(reader.result ?? ""))
    reader.readAsText(file)
  })
}

async function parseDocxFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const mammoth = await import("mammoth")
  const { value } = await mammoth.extractRawText({ arrayBuffer })
  return value ?? ""
}

async function parsePdfFile(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfjsLib = await import("pdfjs-dist")

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    let textContent = ""

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const content = await page.getTextContent()
      const strings = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .filter(Boolean)
      textContent += strings.join(" ") + "\n\n"
    }

    return textContent.trim()
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Failed to parse PDF:", error)
    }
    throw new Error(
      "We couldn't reliably extract text from this PDF. Please try uploading a DOCX or TXT version instead."
    )
  }
}

type AnalysisDetail = {
  id: string
  original_filename: string
  risk_score: number | null
  analyzed_at: string | null
  executive_summary: string | null
  risky_clauses: Json | null
  recommendations: Json | null
}

type DocumentAnalysisPageProps = {
  selectedId: string | null
}

export default function DocumentAnalysisPage({ selectedId }: DocumentAnalysisPageProps) {
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
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("serbia")
  const [analysisFocus, setAnalysisFocus] =
    useState<AnalysisFocus>("General Review")
  const [extractedText, setExtractedText] = useState("")
  const [analysisContent, setAnalysisContent] = useState("")
  const [riskScore, setRiskScore] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [detail, setDetail] = useState<AnalysisDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  const resetAnalysisState = useCallback(() => {
    setExtractedText("")
    setAnalysisContent("")
    setRiskScore(null)
    setError(null)
    setSuccessMessage(null)
  }, [])

  const handleFileSelected = useCallback(
    async (selectedFile: File | null) => {
      if (!selectedFile) {
        setFile(null)
        setFileName(null)
        setFileSize(null)
        resetAnalysisState()
        return
      }

      resetAnalysisState()

      const maxSizeBytes = 5 * 1024 * 1024
      if (selectedFile.size > maxSizeBytes) {
        setError(t("analyze.errors.fileTooLarge"))
        setFile(null)
        setFileName(null)
        setFileSize(null)
        return
      }

      const lowerName = selectedFile.name.toLowerCase()
      const isPdf = lowerName.endsWith(".pdf")
      const isTxt = lowerName.endsWith(".txt")
      const isDocx = lowerName.endsWith(".docx") || lowerName.endsWith(".doc")

      if (!isPdf && !isTxt && !isDocx) {
        setError(t("analyze.errors.unsupportedFileType"))
        setFile(null)
        setFileName(null)
        setFileSize(null)
        return
      }

      setFile(selectedFile)
      setFileName(selectedFile.name)
      setFileSize(selectedFile.size)

      setIsParsing(true)
      try {
        let text = ""

        if (isTxt) {
          text = await parseTxtFile(selectedFile)
        } else if (isDocx) {
          text = await parseDocxFile(selectedFile)
        } else if (isPdf) {
          text = await parsePdfFile(selectedFile)
        }

        const normalized = text.replace(/\r\n/g, "\n").trim()

        if (!normalized) {
          setError(
            t("analyze.errors.noReadableText")
          )
          setExtractedText("")
          return
        }

        const maxChars = 12000
        const finalText =
          normalized.length > maxChars
            ? `${normalized.slice(
                0,
                maxChars
              )}\n\n[Document truncated for AI analysis due to length.]`
            : normalized

        setExtractedText(finalText)
      } catch (parseError) {
        setExtractedText("")
        setError(
          parseError instanceof Error
            ? parseError.message
            : t("analyze.errors.extractFailed")
        )
      } finally {
        setIsParsing(false)
      }
    },
    [resetAnalysisState]
  )

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
          .from("document_analyses")
          .select(
            "id, original_filename, risk_score, analyzed_at, executive_summary, risky_clauses, recommendations"
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
          setDetailError(t("analyze.sidebar.recordNotFound"))
          return
        }

        // Cast to a loose type so TypeScript doesn't treat `data` as `never`.
        const row = data as {
          id: string
          original_filename: string
          risk_score?: number | null
          analyzed_at?: string | null
          executive_summary?: string | null
          risky_clauses?: Json | null
          recommendations?: Json | null
        }

        const detail: AnalysisDetail = {
          id: row.id,
          original_filename: row.original_filename,
          risk_score: row.risk_score ?? null,
          analyzed_at: row.analyzed_at ?? null,
          executive_summary: row.executive_summary ?? null,
          risky_clauses: (row.risky_clauses ?? null) as Json | null,
          recommendations: (row.recommendations ?? null) as Json | null,
        }

        setDetail(detail)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load analysis detail:", error)
        }
        setDetail(null)
        setDetailError(t("analyze.sidebar.recordNotFound"))
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

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null
    void handleFileSelected(selectedFile)
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0] ?? null
    void handleFileSelected(droppedFile)
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError(null)
    setSuccessMessage(null)
    setAnalysisContent("")
    setRiskScore(null)

    if (!file || !extractedText.trim()) {
      setError(
        t("analyze.errors.uploadAndWait")
      )
      return
    }

    setIsAnalyzing(true)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction, analysisFocus, outputLanguageName)
      const userPrompt = buildUserPrompt(
        jurisdiction,
        analysisFocus,
        extractedText
      )

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          featureType: "document_analysis",
        }),
      })

      if (!response.ok) {
        let message = `Failed to analyze document (status ${response.status})`

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

      setAnalysisContent(cleanMarkdown(content))
      const score = extractRiskScore(content)
      setRiskScore(score)

      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError(t("analyze.errors.mustBeLoggedInToSave"))
          return
        }

        await supabase.from("document_analyses").insert({
          user_id: user.id,
          original_file_url: `local://${file.name}`,
          original_filename: file.name,
          document_text: extractedText,
          risk_score: score ?? null,
          full_report: content,
          status: "completed",
        } as any)

        setSuccessMessage(t("analyze.result.saved"))
      } catch (saveError) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(
            "Failed to save document analysis:",
            saveError instanceof Error ? saveError.message : String(saveError)
          )
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("analyze.errors.analyzeFailed")
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  function handleDownloadPdf() {
    if (!analysisContent) return

    try {
      const cleaned = cleanMarkdown(analysisContent)
      const printWindow = window.open("", "_blank")
      if (!printWindow) return

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Document Analysis Report</title>
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
              h1 {
                font-size: 18pt;
                margin-bottom: 12px;
              }
            </style>
          </head>
          <body>
            <h1>Document Analysis Report</h1>
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

  const canAnalyze = !!file && !!extractedText.trim() && !isParsing

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("analyze.header.kicker")}
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {t("analyze.header.title")}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {t("analyze.header.subtitle")}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">{t("analyze.header.back")}</Link>
            </Button>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)]">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 px-4 py-8 text-center transition hover:border-primary/60 hover:bg-muted"
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                >
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={onFileInputChange}
                  />
                  <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {t("analyze.uploader.title")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("analyze.uploader.subtitle")}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      const input = document.getElementById(
                        "fileUpload"
                      ) as HTMLInputElement | null
                      input?.click()
                    }}
                    disabled={isParsing || isAnalyzing}
                  >
                    {t("analyze.uploader.chooseFile")}
                  </Button>

                  {fileName && fileSize != null && (
                    <div className="mt-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {fileName}
                      </span>{" "}
                      · {formatFileSize(fileSize)}
                      {isParsing && (
                        <span className="ml-2 inline-flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          {t("analyze.uploader.extracting")}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t("analyze.form.jurisdiction.label")}</Label>
                    <Select
                      value={jurisdiction}
                      onValueChange={(value) =>
                        setJurisdiction(value as Jurisdiction)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("analyze.form.jurisdiction.placeholder")} />
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

                  <div className="space-y-2">
                    <Label>{t("analyze.form.focus.label")}</Label>
                    <Select
                      value={analysisFocus}
                      onValueChange={(value) =>
                        setAnalysisFocus(value as AnalysisFocus)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("analyze.form.focus.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {ANALYSIS_FOCUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {(() => {
                              const translated = t(option.translationKey)
                              return translated === option.translationKey ? option.label : translated
                            })()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {t("analyze.form.focus.help")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extractedPreview">
                    {t("analyze.form.extractedPreview.label")}
                  </Label>
                  <Textarea
                    id="extractedPreview"
                    value={extractedText}
                    onChange={(event) => setExtractedText(event.target.value)}
                    rows={5}
                    placeholder={t("analyze.form.extractedPreview.placeholder")}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("analyze.form.extractedPreview.help")}
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={!canAnalyze || isAnalyzing}>
                    {(isAnalyzing || isParsing) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isAnalyzing ? t("analyze.form.actions.loading") : t("analyze.form.actions.submit")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {t("analyze.form.actions.note")}
                  </p>
                </div>
              </form>
            </Card>

            <Card className="flex min-h-[420px] flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{t("analyze.result.title")}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("analyze.result.subtitle")}
                  </p>
                </div>
                {analysisContent && (
                  <div className="flex flex-col items-end gap-2">
                    {typeof riskScore === "number" && (
                      <span className={getRiskBadgeClasses(riskScore)}>
                        {getRiskBadgeLabel(riskScore)}
                      </span>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPdf}
                      disabled={!analysisContent}
                    >
                      {t("analyze.result.downloadPdf")}
                    </Button>
                  </div>
                )}
              </div>

              {successMessage && (
                <p className="mt-3 text-xs font-medium text-emerald-600">
                  {successMessage}
                </p>
              )}

              <div className="mt-4 flex-1 rounded-md border bg-muted/40 p-4">
                {analysisContent ? (
                  <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {analysisContent}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("analyze.result.empty")}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        <Card className="h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">{t("analyze.sidebar.title")}</h2>
          {!selectedId ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("analyze.sidebar.empty")}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/activity">{t("analyze.sidebar.viewActivity")}</Link>
              </Button>
            </div>
          ) : detailLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("analyze.sidebar.loading")}</span>
            </div>
          ) : detailError ? (
            <p className="text-sm text-destructive">{detailError}</p>
          ) : detail ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{detail.original_filename}</p>
                <p className="text-xs text-muted-foreground">
                  {t("analyze.sidebar.riskScore")}{" "}
                  {detail.risk_score != null
                    ? `${detail.risk_score}/10`
                    : t("analyze.common.notSpecified")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("analyze.sidebar.analyzed")}{" "}
                  {detail.analyzed_at
                    ? new Date(detail.analyzed_at).toLocaleDateString()
                    : t("analyze.common.notAvailable")}
                </p>
              </div>
              {detail.executive_summary && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">{t("analyze.sidebar.executiveSummary")}</p>
                  <div className="max-h-40 overflow-y-auto rounded-md border bg-muted/40 p-3">
                    <pre className="whitespace-pre-wrap">
                      {String(detail.executive_summary)}
                    </pre>
                  </div>
                </div>
              )}
              {Array.isArray(detail.risky_clauses) && detail.risky_clauses.length > 0 && (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">{t("analyze.sidebar.riskyClauses")}</p>
                  <ul className="list-inside list-disc space-y-1 max-h-40 overflow-y-auto">
                    {detail.risky_clauses.map((clause, index) => (
                      <li key={index}>{String(clause)}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(detail.recommendations) &&
                detail.recommendations.length > 0 && (
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">{t("analyze.sidebar.recommendations")}</p>
                    <ul className="list-inside list-disc space-y-1 max-h-40 overflow-y-auto">
                      {detail.recommendations.map((rec, index) => (
                        <li key={index}>{String(rec)}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}

