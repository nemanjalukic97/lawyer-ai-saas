"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageProvider"

type ContractType = "nda" | "employment" | "sales" | "lease" | "service" | "other"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

export type TemplateSummary = {
  id: string
  title: string
  description: string | null
  contract_type: ContractType | null
  document_type: "power_of_attorney" | "other" | null
  jurisdiction: Jurisdiction | null
  template_category: string | null
  content: string
}

const DOCUMENT_TYPE_FILTERS = [
  { value: "all", translationKey: "templates.filters.documentType.all" },
  { value: "nda", translationKey: "templates.documentTypes.nda" },
  { value: "employment", translationKey: "templates.documentTypes.employment" },
  {
    value: "power_of_attorney",
    translationKey: "templates.documentTypes.power_of_attorney",
  },
  { value: "sales", translationKey: "templates.documentTypes.sales" },
  { value: "lease", translationKey: "templates.documentTypes.lease" },
  { value: "service", translationKey: "templates.documentTypes.service" },
] as const

const JURISDICTION_OPTIONS: { value: "all" | Jurisdiction; translationKey: string }[] = [
  { value: "all", translationKey: "templates.filters.jurisdiction.all" },
  { value: "serbia", translationKey: "templates.jurisdictions.serbia" },
  { value: "croatia", translationKey: "templates.jurisdictions.croatia" },
  { value: "bih_fbih", translationKey: "templates.jurisdictions.bih_fbih" },
  { value: "bih_rs", translationKey: "templates.jurisdictions.bih_rs" },
  { value: "bih_brcko", translationKey: "templates.jurisdictions.bih_brcko" },
  { value: "montenegro", translationKey: "templates.jurisdictions.montenegro" },
  { value: "slovenia", translationKey: "templates.jurisdictions.slovenia" },
]

function translationKeyForType(
  contractType: ContractType | null,
  documentType: TemplateSummary["document_type"]
): string {
  if (documentType === "power_of_attorney") return "templates.documentTypes.power_of_attorney"
  switch (contractType) {
    case "nda":
      return "templates.documentTypes.nda"
    case "employment":
      return "templates.documentTypes.employment"
    case "sales":
      return "templates.documentTypes.salesAgreement"
    case "lease":
      return "templates.documentTypes.leaseAgreement"
    case "service":
      return "templates.documentTypes.serviceAgreement"
    default:
      return "templates.documentTypes.legalDocument"
  }
}

function getDocumentTypeKey(template: TemplateSummary): string {
  if (template.document_type === "power_of_attorney") {
    return "power_of_attorney"
  }
  switch (template.contract_type) {
    case "nda":
      return "nda"
    case "employment":
      return "employment"
    case "sales":
      return "sales"
    case "lease":
      return "lease"
    case "service":
      return "service"
    default:
      return "other"
  }
}

type Props = {
  templates: TemplateSummary[]
}

export function TemplatesPageClient({ templates }: Props) {
  const router = useRouter()
  const { t } = useLanguage()

  const [typeFilter, setTypeFilter] =
    useState<(typeof DOCUMENT_TYPE_FILTERS)[number]["value"]>("all")
  const [jurisdictionFilter, setJurisdictionFilter] =
    useState<(typeof JURISDICTION_OPTIONS)[number]["value"]>("all")
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(
    templates.length ? templates[0]?.id ?? null : null
  )

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedId) ?? null,
    [templates, selectedId]
  )

  const filteredTemplates = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return templates.filter((template) => {
      if (typeFilter !== "all") {
        const key = getDocumentTypeKey(template)
        if (key !== typeFilter) return false
      }

      if (jurisdictionFilter !== "all") {
        if (template.jurisdiction !== jurisdictionFilter) return false
      }

      if (searchTerm) {
        const haystack = [
          template.title,
          template.description ?? "",
          template.content.slice(0, 400),
        ]
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(searchTerm)) return false
      }

      return true
    })
  }, [templates, typeFilter, jurisdictionFilter, search])

  function handleUseTemplate(id: string) {
    router.push(`/dashboard/generate?templateId=${encodeURIComponent(id)}`)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="flex-1 space-y-6">
          <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
                {t("templates.header.kicker")}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t("templates.header.title")}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
                {t("templates.header.subtitle")}
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/generate">{t("templates.actions.goToGenerator")}</Link>
              </Button>
            </div>
          </header>

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15">
            <FileText className="h-5 w-5 text-indigo-400" />
          </div>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/40 bg-muted/10 p-4 mb-6">
              <div className="grid w-full gap-3 md:grid-cols-[minmax(0,1.1fr),minmax(0,1.1fr),minmax(0,1.2fr)]">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("templates.filters.documentType.label")}
                  </p>
                  <Select
                    value={typeFilter}
                    onValueChange={(value) =>
                      setTypeFilter(
                        value as (typeof DOCUMENT_TYPE_FILTERS)[number]["value"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("templates.filters.documentType.all")} />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_TYPE_FILTERS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.translationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("templates.filters.jurisdiction.label")}
                  </p>
                  <Select
                    value={jurisdictionFilter}
                    onValueChange={(value) =>
                      setJurisdictionFilter(
                        value as (typeof JURISDICTION_OPTIONS)[number]["value"]
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("templates.filters.jurisdiction.all")} />
                    </SelectTrigger>
                    <SelectContent>
                      {JURISDICTION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.translationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("templates.filters.search.label")}
                  </p>
                  <Input
                    placeholder={t("templates.filters.search.placeholder")}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredTemplates.map((template) => (
                (() => {
                  const uiTitle = template.title
                  const uiDesc = template.description
                  return (
                <Card
                  key={template.id}
                  className="group rounded-xl border border-border/40 bg-muted/10 p-5 hover:border-border/70 hover:bg-muted/20 transition-all"
                  onClick={() => setSelectedId(template.id)}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-foreground">
                        {uiTitle}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                        {t(translationKeyForType(template.contract_type, template.document_type))}
                      </span>
                      {template.jurisdiction && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
                          {t(`templates.jurisdictions.${template.jurisdiction}`)}
                        </span>
                      )}
                    </div>
                    {uiDesc && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {uiDesc}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelectedId(template.id)
                      }}
                    >
                      {t("templates.actions.preview")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleUseTemplate(template.id)
                      }}
                    >
                      {t("templates.actions.useTemplate")}
                    </Button>
                  </div>
                </Card>
                  )
                })()
              ))}

              {filteredTemplates.length === 0 && (
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {t("templates.list.empty")}
                  </p>
                </Card>
              )}
            </div>
          </section>
        </div>

        <aside className="mt-2 w-full max-w-md flex-shrink-0 lg:mt-0 lg:w-96">
          <Card className="h-full space-y-4 p-6">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {t("templates.preview.title")}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("templates.preview.subtitle")}
                </p>
              </div>
              {selectedTemplate && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleUseTemplate(selectedTemplate.id)}
                >
                  {t("templates.actions.useTemplate")}
                </Button>
              )}
            </div>

            <div className="h-[480px] rounded-md border bg-muted/40 p-3 text-xs">
              {selectedTemplate ? (
                <div className="flex h-full flex-col gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {selectedTemplate.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        translationKeyForType(
                          selectedTemplate.contract_type,
                          selectedTemplate.document_type
                        )
                      )}{" "}
                      ·{" "}
                      {selectedTemplate.jurisdiction
                        ? t(`templates.jurisdictions.${selectedTemplate.jurisdiction}`)
                        : t("templates.common.notSpecified")}
                    </p>
                    {selectedTemplate.description && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selectedTemplate.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto rounded border bg-background/60 p-3">
                    <pre className="whitespace-pre-wrap">
                      {selectedTemplate.content.replace(/\\n/g, "\n")}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
                  {t("templates.preview.empty")}
                </div>
              )}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

