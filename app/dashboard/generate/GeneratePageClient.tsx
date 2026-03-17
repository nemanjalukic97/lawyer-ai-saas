"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { saveAs } from "file-saver"
import { Document as DocxDocument, Packer, Paragraph } from "docx"
import { useLanguage } from "@/components/LanguageProvider"

type DocumentType =
  | "nda"
  | "employment"
  | "power_of_attorney"
  | "sales"
  | "lease"
  | "service"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

type Language =
  | "serbian"
  | "croatian"
  | "bosnian"
  | "montenegrin"
  | "slovenian"
  | "english"

interface Option<T extends string> {
  value: T
  label: string
}

type DocumentDetail = {
  id: string
  title: string
  document_type: DocumentType
  jurisdiction: Jurisdiction
  status: string
  content: string
  created_at: string
}

type TemplateDetail = {
  id: string
  title: string
  contract_type: DocumentType | null
  document_type: "power_of_attorney" | "other" | null
  jurisdiction: Jurisdiction | null
  content: string
}

const DOCUMENT_TYPE_OPTIONS: Option<DocumentType>[] = [
  { value: "nda", label: "NDA (Non-Disclosure Agreement)" },
  { value: "employment", label: "Employment Contract" },
  { value: "power_of_attorney", label: "Power of Attorney" },
  { value: "sales", label: "Sales Contract" },
  { value: "lease", label: "Lease Agreement" },
  { value: "service", label: "Service Agreement" },
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

const LANGUAGE_OPTIONS: Option<Language>[] = [
  { value: "serbian", label: "Serbian" },
  { value: "croatian", label: "Croatian" },
  { value: "bosnian", label: "Bosnian" },
  { value: "montenegrin", label: "Montenegrin" },
  { value: "slovenian", label: "Slovenian" },
  { value: "english", label: "English" },
]

type FieldConfig = {
  name: string
  label: string
  type?: "text" | "date"
  translationKey?: string
}

const BASE_FIELDS: FieldConfig[] = [
  {
    name: "party1",
    label: "Party 1 Name",
    translationKey: "generate.form.fields.party1",
  } as FieldConfig,
  {
    name: "party2",
    label: "Party 2 Name",
    translationKey: "generate.form.fields.party2",
  } as FieldConfig,
  {
    name: "date",
    label: "Date",
    type: "date",
    translationKey: "generate.form.fields.date",
  } as FieldConfig,
]

const ADDITIONAL_FIELDS: Record<DocumentType, FieldConfig[]> = {
  employment: [
    { name: "jobTitle", label: "Job Title" },
    { name: "salary", label: "Salary" },
    { name: "employmentStartDate", label: "Start Date", type: "date" },
  ],
  nda: [
    {
      name: "confidentialDescription",
      label: "Confidential Information Description",
      translationKey: "generate.form.fields.confidentialDescription",
    },
    {
      name: "ndaDuration",
      label: "Duration",
      translationKey: "generate.form.fields.ndaDuration",
    },
  ],
  lease: [
    { name: "propertyAddress", label: "Property Address" },
    { name: "monthlyRent", label: "Monthly Rent" },
    { name: "leaseDuration", label: "Duration" },
  ],
  sales: [
    {
      name: "itemDescription",
      label: "Item/Property Description",
    },
    { name: "purchasePrice", label: "Purchase Price" },
  ],
  service: [
    { name: "serviceDescription", label: "Service Description" },
    { name: "paymentAmount", label: "Payment Amount" },
  ],
  power_of_attorney: [
    {
      name: "authorizedActions",
      label: "Authorized Actions Description",
    },
  ],
}

type FormValues = Record<string, string>

function humanizeDocumentType(documentType: DocumentType): string {
  const option = DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === documentType)
  return option?.label ?? "Legal Document"
}

function labelForJurisdiction(jurisdiction: Jurisdiction): string {
  const option = JURISDICTION_OPTIONS.find((opt) => opt.value === jurisdiction)
  return option?.label ?? jurisdiction
}

function labelForLanguage(language: Language): string {
  const option = LANGUAGE_OPTIONS.find((opt) => opt.value === language)
  return option?.label ?? language
}

function buildFileNameBase(documentType: DocumentType, jurisdiction: Jurisdiction): string {
  const documentLabel = humanizeDocumentType(documentType)
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)

  const raw = `${documentLabel}_${jurisdictionLabel}`

  return raw
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
}

function buildSystemPrompt(jurisdiction: Jurisdiction, documentType: DocumentType): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const documentLabel = humanizeDocumentType(documentType)

  return [
    `You are a specialized legal AI assistant for ${jurisdictionLabel}.`,
    `Generate a professional ${documentLabel} that complies with ${jurisdictionLabel} law.`,
    "Use formal legal language.",
    "Include all mandatory sections.",
    "Format as a proper legal document with title, preamble, numbered articles, and signature blocks.",
    "Insert [PARTY NAME], [DATE] and similar placeholders where needed.",
  ].join(" ")
}

function buildUserPrompt(
  documentType: DocumentType,
  jurisdiction: Jurisdiction,
  language: Language,
  formValues: FormValues
): string {
  const documentLabel = humanizeDocumentType(documentType)
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const languageLabel = labelForLanguage(language)

  const lines: string[] = []

  lines.push(
    `Generate a ${documentLabel} for ${jurisdictionLabel} in ${languageLabel} with these details:`
  )
  lines.push("")

  lines.push(`Party 1: ${formValues.party1 || "[PARTY 1]"}`)
  lines.push(`Party 2: ${formValues.party2 || "[PARTY 2]"}`)
  lines.push(`Date: ${formValues.date || "[DATE]"}`)

  const additionalFields = ADDITIONAL_FIELDS[documentType]

  additionalFields.forEach((field) => {
    const value = formValues[field.name]
    if (value && value.trim()) {
      lines.push(`${field.label}: ${value}`)
    }
  })

  return lines.join("\n")
}

type Props = {
  selectedId: string | null
  templateId?: string | null
}

export default function GeneratePageClient({ selectedId, templateId }: Props) {
  const supabase = useMemo(() => createClient(), [])
  const { t } = useLanguage()

  const [documentType, setDocumentType] = useState<DocumentType>("nda")
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("serbia")
  const [language, setLanguage] = useState<Language>("serbian")

  const [formValues, setFormValues] = useState<FormValues>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedContent, setGeneratedContent] = useState<string>("")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [loadedTemplateTitle, setLoadedTemplateTitle] = useState<string | null>(
    null
  )

  const [detail, setDetail] = useState<DocumentDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadTemplate() {
      if (!templateId) return

      try {
        const { data, error } = await supabase
          .from("templates")
          .select(
            "id, title, contract_type, document_type, jurisdiction, content"
          )
          .eq("id", templateId)
          .is("deleted_at", null)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!isMounted || !data) return

        const template: TemplateDetail = {
          id: data.id,
          title: data.title,
          contract_type: (data.contract_type as DocumentType | null) ?? null,
          document_type:
            (data.document_type as TemplateDetail["document_type"]) ?? null,
          jurisdiction: (data.jurisdiction as Jurisdiction | null) ?? null,
          content: data.content,
        }

        if (template.document_type === "power_of_attorney") {
          setDocumentType("power_of_attorney")
        } else if (template.contract_type) {
          setDocumentType(template.contract_type)
        }
        if (template.jurisdiction) {
          setJurisdiction(template.jurisdiction)
        }
        setLoadedTemplateTitle(template.title)
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load template:", error)
        }
      }
    }

    void loadTemplate()

    return () => {
      isMounted = false
    }
  }, [supabase, templateId])

  const additionalFields = useMemo(
    () => ADDITIONAL_FIELDS[documentType],
    [documentType]
  )

  function handleFieldChange(name: string, value: string) {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError(null)
    setIsGenerating(true)
    setGeneratedContent("")
    setSaveSuccess(false)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction, documentType)
      const userPrompt = buildUserPrompt(
        documentType,
        jurisdiction,
        language,
        formValues
      )

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          featureType: "document_generation",
        }),
      })

      if (!response.ok) {
        let message = `Failed to generate document (status ${response.status})`

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
      setGeneratedContent(content)

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user && content) {
          const documentTypeLabel = humanizeDocumentType(documentType)
          const jurisdictionLabel = labelForJurisdiction(jurisdiction)

          await supabase.from("documents").insert({
            user_id: user.id,
            title: `${documentTypeLabel} - ${jurisdictionLabel}`,
            document_type: documentType,
            jurisdiction,
            content,
            content_html: null,
            status: "draft",
            ai_generated: true,
            generation_params: {
              language,
              formValues,
            },
          } as any)

          setSaveSuccess(true)
        }
      } catch (saveError) {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(
            "Failed to save generated document:",
            saveError instanceof Error ? saveError.message : String(saveError)
          )
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate document. Please try again."
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const baseAndAdditionalFields: FieldConfig[] = useMemo(
    () => [...BASE_FIELDS, ...additionalFields],
    [additionalFields]
  )

  function handleDownloadPdf() {
    if (!generatedContent) return

    try {
      const cleaned = cleanMarkdown(generatedContent)

      const printWindow = window.open("", "_blank")
      if (!printWindow) return

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Legal Document</title>
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
    } catch (downloadError) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(
          "Failed to download PDF:",
          downloadError instanceof Error
            ? downloadError.message
            : String(downloadError)
        )
      }
    }
  }

  async function handleDownloadDocx() {
    if (!generatedContent) return

    try {
      const paragraphs = generatedContent
        .split(/\r?\n\r?\n/)
        .map((chunk) => chunk.trim())
        .filter(Boolean)

      const doc = new DocxDocument({
        sections: [
          {
            properties: {},
            children:
              paragraphs.length > 0
                ? paragraphs.map(
                    (text) =>
                      new Paragraph({
                        text,
                      })
                  )
                : [new Paragraph({ text: generatedContent })],
          },
        ],
      })

      const blob = await Packer.toBlob(doc)
      const baseName =
        buildFileNameBase(documentType, jurisdiction) || "document"
      saveAs(blob, `${baseName}.docx`)
    } catch (downloadError) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(
          "Failed to download DOCX:",
          downloadError instanceof Error
            ? downloadError.message
            : String(downloadError)
        )
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
          .from("documents")
          .select(
            "id, title, document_type, jurisdiction, status, content, created_at"
          )
          .eq("id", selectedId)
          .is("deleted_at", null)
          .maybeSingle()

        // Temporary debug logs
        // eslint-disable-next-line no-console
        console.log("GeneratePageClient.loadDetail selectedId:", selectedId)
        // eslint-disable-next-line no-console
        console.log("GeneratePageClient.loadDetail data:", data)
        // eslint-disable-next-line no-console
        console.log("GeneratePageClient.loadDetail error:", error)

        if (error) {
          throw error
        }

        if (!isMounted) return

        if (!data) {
          setDetail(null)
          setDetailError("Record not found")
          return
        }

        const detail: DocumentDetail = {
          id: data.id,
          title: data.title,
          document_type: data.document_type,
          jurisdiction: data.jurisdiction,
          status: data.status,
          content: data.content,
          created_at: data.created_at,
        }

        setDetail(detail)
      } catch (error) {
        if (!isMounted) return
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("Failed to load document detail:", error)
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
                {t("generate.header.kicker")}
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {t("generate.header.title")}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {t("generate.header.subtitle")}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">{t("generate.header.back")}</Link>
            </Button>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)]">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>{t("generate.form.documentType.label")}</Label>
                    <Select
                      value={documentType}
                      onValueChange={(value) =>
                        setDocumentType(value as DocumentType)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            "generate.form.documentType.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {DOCUMENT_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("generate.form.jurisdiction.label")}</Label>
                    <Select
                      value={jurisdiction}
                      onValueChange={(value) =>
                        setJurisdiction(value as Jurisdiction)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            "generate.form.jurisdiction.placeholder"
                          )}
                        />
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

                  <div className="space-y-2">
                    <Label>{t("generate.form.language.label")}</Label>
                    <Select
                      value={language}
                      onValueChange={(value) => setLanguage(value as Language)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t(
                            "generate.form.language.placeholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("generate.form.details.title")}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    {baseAndAdditionalFields.map((field) => (
                      <div key={field.name} className="space-y-1.5">
                        <Label htmlFor={field.name}>
                          {field.translationKey
                            ? t(field.translationKey)
                            : field.label}
                        </Label>
                        <Input
                          id={field.name}
                          type={field.type ?? "text"}
                          value={formValues[field.name] ?? ""}
                          onChange={(event) =>
                            handleFieldChange(field.name, event.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {t("generate.form.details.help")}
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isGenerating
                      ? t("generate.form.actions.generating")
                      : t("generate.form.actions.generate")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {t("generate.form.actions.note")}
                  </p>
                </div>
              </form>
            </Card>

            <Card className="flex min-h-[420px] flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {t("generate.result.title")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("generate.result.subtitle")}
                  </p>
                </div>
                {generatedContent && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPdf}
                      disabled={!generatedContent}
                    >
                      {t("generate.result.downloadPdf")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadDocx}
                      disabled={!generatedContent}
                    >
                      {t("generate.result.downloadDocx")}
                    </Button>
                  </div>
                )}
              </div>

              {saveSuccess && (
                <p className="mt-3 text-xs font-medium text-emerald-600">
                  {t("generate.result.saved")}
                </p>
              )}

              <div className="mt-4 flex-1 rounded-md border bg-muted/40 p-4">
                {generatedContent ? (
                  <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm font-serif leading-relaxed text-foreground">
                    {generatedContent.replace(/\\n/g, "\n")}
                  </pre>
                ) : loadedTemplateTitle ? (
                  <p className="text-sm text-muted-foreground">
                    {t("generate.result.templateLoaded.prefix")}{" "}
                    <span className="font-medium">{loadedTemplateTitle}</span>.{" "}
                    {t("generate.result.templateLoaded.suffix")}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("generate.result.empty")}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        <Card className="h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            {t("generate.sidebar.title")}
          </h2>
          {!selectedId ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("generate.sidebar.empty")}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/activity">
                  {t("generate.sidebar.viewActivity")}
                </Link>
              </Button>
            </div>
          ) : detailLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{t("generate.sidebar.loading")}</span>
            </div>
          ) : detailError ? (
            <p className="text-sm text-destructive">{detailError}</p>
          ) : detail ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{detail.title}</p>
                <p className="text-xs text-muted-foreground">
                  {humanizeDocumentType(detail.document_type)} ·{" "}
                  {labelForJurisdiction(detail.jurisdiction)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("generate.sidebar.status")} {detail.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("generate.sidebar.created")}{" "}
                  {new Date(detail.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Content</p>
                <div className="max-h-64 overflow-y-auto rounded-md border bg-muted/40 p-3">
                  <pre className="whitespace-pre-wrap">{detail.content}</pre>
                </div>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  )
}

