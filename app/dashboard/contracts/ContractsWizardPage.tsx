"use client"

import { useEffect, useMemo, useState } from "react"
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
import { saveAs } from "file-saver"
import { Document as DocxDocument, Packer, Paragraph } from "docx"

type ContractType =
  | "employment"
  | "service"
  | "sales"
  | "lease"
  | "nda"
  | "partnership"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

interface Option<T extends string> {
  value: T
  label: string
}

const CONTRACT_TYPE_OPTIONS: Option<ContractType>[] = [
  { value: "employment", label: "Employment Contract" },
  { value: "service", label: "Service Agreement" },
  { value: "sales", label: "Sales Contract" },
  { value: "lease", label: "Lease/Rental Agreement" },
  { value: "nda", label: "NDA" },
  { value: "partnership", label: "Partnership Agreement" },
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

type EmploymentDetails = {
  employerName: string
  employeeName: string
  jobTitle: string
  startDate: string
  salary: string
  workLocation: string
  contractDuration: string
}

type ServiceAgreementDetails = {
  clientName: string
  serviceProviderName: string
  serviceDescription: string
  paymentAmount: string
  paymentSchedule: string
  startDate: string
  endDate: string
}

type SalesContractDetails = {
  sellerName: string
  buyerName: string
  itemDescription: string
  purchasePrice: string
  paymentTerms: string
  deliveryDate: string
}

type LeaseAgreementDetails = {
  landlordName: string
  tenantName: string
  propertyAddress: string
  monthlyRent: string
  depositAmount: string
  leaseStartDate: string
  leaseDuration: string
}

type NdaDetails = {
  disclosingParty: string
  receivingParty: string
  purpose: string
  confidentialInfoDescription: string
  duration: string
}

type PartnershipAgreementDetails = {
  partner1Name: string
  partner2Name: string
  businessPurpose: string
  profitSplit: string
  startDate: string
}

type ContractDetails =
  | { type: "employment"; data: EmploymentDetails }
  | { type: "service"; data: ServiceAgreementDetails }
  | { type: "sales"; data: SalesContractDetails }
  | { type: "lease"; data: LeaseAgreementDetails }
  | { type: "nda"; data: NdaDetails }
  | { type: "partnership"; data: PartnershipAgreementDetails }

type WizardStep = 1 | 2 | 3 | 4 | 5

type ValidationErrors = Record<string, string>

type ContractDetail = {
  id: string
  title: string
  contract_type: ContractType
  jurisdiction: Jurisdiction
  status: string
  content: string
  created_at: string
}

function labelForContractType(contractType: ContractType): string {
  const option = CONTRACT_TYPE_OPTIONS.find((opt) => opt.value === contractType)
  return option?.label ?? "Contract"
}

function labelForJurisdiction(jurisdiction: Jurisdiction): string {
  const option = JURISDICTION_OPTIONS.find((opt) => opt.value === jurisdiction)
  return option?.label ?? jurisdiction
}

function buildFileNameBase(contractType: ContractType, jurisdiction: Jurisdiction): string {
  const contractLabel = labelForContractType(contractType)
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)

  const raw = `${contractLabel}_${jurisdictionLabel}`

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

function buildSystemPrompt(jurisdiction: Jurisdiction, contractType: ContractType): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const contractLabel = labelForContractType(contractType)

  return [
    `You are a legal AI specialized in contract law for ${jurisdictionLabel}.`,
    `Generate a professional ${contractLabel} that complies with ${jurisdictionLabel} law.`,
    "STRUCTURE:",
    "- Title in CAPITAL LETTERS",
    "- Preamble with parties, date, location",
    "- Numbered Articles covering all key terms",
    "- Article on Dispute Resolution (specify jurisdiction)",
    "- Article on Force Majeure",
    "- Article on Amendments",
    "- Article on Final Provisions",
    "- Signature blocks for all parties",
    "Use formal legal language. Include all mandatory sections required by the applicable law.",
  ].join(" ")
}

function buildUserPrompt(
  contractType: ContractType | null,
  jurisdiction: Jurisdiction | null,
  details: ContractDetails | null,
  additionalInstructions: string
): string {
  if (!contractType || !jurisdiction || !details) {
    return ""
  }

  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const contractLabel = labelForContractType(contractType)

  const lines: string[] = []

  lines.push(
    `Contract type: ${contractLabel}. Jurisdiction: ${jurisdictionLabel}.`
  )

  switch (details.type) {
    case "employment": {
      const d = details.data
      lines.push(
        `Employer: ${d.employerName}. Employee: ${d.employeeName}. Job title: ${d.jobTitle}. Salary: ${d.salary}. Start date: ${d.startDate}. Work location: ${d.workLocation}. Contract duration: ${d.contractDuration}.`
      )
      break
    }
    case "service": {
      const d = details.data
      lines.push(
        `Client: ${d.clientName}. Service provider: ${d.serviceProviderName}. Service description: ${d.serviceDescription}. Payment amount: ${d.paymentAmount}. Payment schedule: ${d.paymentSchedule}. Start date: ${d.startDate}. End date: ${d.endDate}.`
      )
      break
    }
    case "sales": {
      const d = details.data
      lines.push(
        `Seller: ${d.sellerName}. Buyer: ${d.buyerName}. Item description: ${d.itemDescription}. Purchase price: ${d.purchasePrice}. Payment terms: ${d.paymentTerms}. Delivery date: ${d.deliveryDate}.`
      )
      break
    }
    case "lease": {
      const d = details.data
      lines.push(
        `Landlord: ${d.landlordName}. Tenant: ${d.tenantName}. Property address: ${d.propertyAddress}. Monthly rent: ${d.monthlyRent}. Deposit amount: ${d.depositAmount}. Lease start date: ${d.leaseStartDate}. Lease duration: ${d.leaseDuration}.`
      )
      break
    }
    case "nda": {
      const d = details.data
      lines.push(
        `Disclosing party: ${d.disclosingParty}. Receiving party: ${d.receivingParty}. Purpose: ${d.purpose}. Confidential information: ${d.confidentialInfoDescription}. Duration: ${d.duration}.`
      )
      break
    }
    case "partnership": {
      const d = details.data
      lines.push(
        `Partner 1: ${d.partner1Name}. Partner 2: ${d.partner2Name}. Business purpose: ${d.businessPurpose}. Profit split: ${d.profitSplit}%. Start date: ${d.startDate}.`
      )
      break
    }
  }

  if (additionalInstructions.trim()) {
    lines.push("")
    lines.push("Additional instructions from lawyer:")
    lines.push(additionalInstructions.trim())
  }

  return lines.join("\n")
}

function initialDetailsForType(contractType: ContractType): ContractDetails {
  switch (contractType) {
    case "employment":
      return {
        type: "employment",
        data: {
          employerName: "",
          employeeName: "",
          jobTitle: "",
          startDate: "",
          salary: "",
          workLocation: "",
          contractDuration: "",
        },
      }
    case "service":
      return {
        type: "service",
        data: {
          clientName: "",
          serviceProviderName: "",
          serviceDescription: "",
          paymentAmount: "",
          paymentSchedule: "",
          startDate: "",
          endDate: "",
        },
      }
    case "sales":
      return {
        type: "sales",
        data: {
          sellerName: "",
          buyerName: "",
          itemDescription: "",
          purchasePrice: "",
          paymentTerms: "",
          deliveryDate: "",
        },
      }
    case "lease":
      return {
        type: "lease",
        data: {
          landlordName: "",
          tenantName: "",
          propertyAddress: "",
          monthlyRent: "",
          depositAmount: "",
          leaseStartDate: "",
          leaseDuration: "",
        },
      }
    case "nda":
      return {
        type: "nda",
        data: {
          disclosingParty: "",
          receivingParty: "",
          purpose: "",
          confidentialInfoDescription: "",
          duration: "",
        },
      }
    case "partnership":
      return {
        type: "partnership",
        data: {
          partner1Name: "",
          partner2Name: "",
          businessPurpose: "",
          profitSplit: "",
          startDate: "",
        },
      }
  }
}

type ContractsWizardPageProps = {
  selectedId: string | null
}

export default function ContractsWizardPage({ selectedId }: ContractsWizardPageProps) {
  const supabase = useMemo(() => createClient(), [])
  const [currentStep, setCurrentStep] = useState<WizardStep>(1)
  const [contractType, setContractType] = useState<ContractType | null>(null)
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction | null>(null)
  const [details, setDetails] = useState<ContractDetails | null>(null)
  const [additionalInstructions, setAdditionalInstructions] = useState("")
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState<string | null>(null)

  const [detail, setDetail] = useState<ContractDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

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
          .from("contracts")
          .select(
            "id, title, contract_type, jurisdiction, status, content, created_at"
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

        const detail: ContractDetail = {
          id: data.id,
          title: data.title,
          contract_type: data.contract_type,
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
          console.error("Failed to load contract detail:", error)
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

  const totalSteps = 5

  function resetErrors() {
    setValidationErrors({})
    setGenerateError(null)
    setSaveError(null)
  }

  function validateCurrentStep(): boolean {
    const errors: ValidationErrors = {}

    if (currentStep === 1) {
      if (!contractType) {
        errors.contractType = "Please select a contract type."
      }
    }

    if (currentStep === 2) {
      if (!jurisdiction) {
        errors.jurisdiction = "Please select a jurisdiction."
      }
    }

    if (currentStep === 3) {
      if (!contractType || !details) {
        errors.details = "Please complete the contract details."
      } else {
        const data = details.data as Record<string, string>
        Object.entries(data).forEach(([key, value]) => {
          if (!value || !value.trim()) {
            errors[key] = "This field is required."
          }
        })
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleNext() {
    resetErrors()
    if (!validateCurrentStep()) return

    if (currentStep === 1 && contractType && !details) {
      setDetails(initialDetailsForType(contractType))
    }

    setCurrentStep((prev) => (prev < totalSteps ? ((prev + 1) as WizardStep) : prev))
  }

  function handleBack() {
    resetErrors()
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev))
  }

  function handleDetailsChange<K extends keyof EmploymentDetails | keyof ServiceAgreementDetails | keyof SalesContractDetails | keyof LeaseAgreementDetails | keyof NdaDetails | keyof PartnershipAgreementDetails>(
    field: K,
    value: string
  ) {
    setDetails((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        data: {
          ...(prev.data as Record<string, string>),
          [field]: value,
        },
      } as ContractDetails
    })
  }

  const summary = useMemo(() => {
    if (!contractType || !jurisdiction || !details) return null

    const contractLabel = labelForContractType(contractType)
    const jurisdictionLabel = labelForJurisdiction(jurisdiction)
    const data = details.data as Record<string, string>

    return {
      contractLabel,
      jurisdictionLabel,
      fields: Object.entries(data),
    }
  }, [contractType, jurisdiction, details])

  async function handleGenerate() {
    if (!contractType || !jurisdiction || !details) {
      setGenerateError("Please complete the previous steps before generating.")
      return
    }

    resetErrors()
    setIsGenerating(true)
    setGeneratedContent("")
    setGenerateError(null)
    setSaveSuccess(false)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction, contractType)
      const userPrompt = buildUserPrompt(
        contractType,
        jurisdiction,
        details,
        additionalInstructions
      )

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          featureType: "contract_generation",
        }),
      })

      if (!response.ok) {
        let message = `Failed to generate contract (status ${response.status})`

        try {
          const data = (await response.json()) as { error?: string }
          if (data?.error) {
            message = data.error
          }
        } catch {
          // ignore JSON parse errors
        }

        throw new Error(message)
      }

      const data = (await response.json()) as { content?: string }
      const content = data.content ?? ""
      setGeneratedContent(content)
      setCurrentStep(5)
    } catch (error) {
      setGenerateError(
        error instanceof Error
          ? error.message
          : "Failed to generate contract. Please try again."
      )
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleSave() {
    if (!generatedContent || !contractType || !jurisdiction || !details) return

    setSaveError(null)
    setSaveSuccess(false)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setSaveError("You must be logged in to save contracts.")
        return
      }

      const label = labelForContractType(contractType)
      const data = details.data as Record<string, string>
      const partyNames: Record<string, string> = {}

      if ("employerName" in data && data.employerName) {
        partyNames.employer = data.employerName
      }
      if ("employeeName" in data && data.employeeName) {
        partyNames.employee = data.employeeName
      }
      if ("clientName" in data && data.clientName) {
        partyNames.client = data.clientName
      }
      if ("serviceProviderName" in data && data.serviceProviderName) {
        partyNames.serviceProvider = data.serviceProviderName
      }
      if ("sellerName" in data && data.sellerName) {
        partyNames.seller = data.sellerName
      }
      if ("buyerName" in data && data.buyerName) {
        partyNames.buyer = data.buyerName
      }
      if ("landlordName" in data && data.landlordName) {
        partyNames.landlord = data.landlordName
      }
      if ("tenantName" in data && data.tenantName) {
        partyNames.tenant = data.tenantName
      }
      if ("disclosingParty" in data && data.disclosingParty) {
        partyNames.disclosingParty = data.disclosingParty
      }
      if ("receivingParty" in data && data.receivingParty) {
        partyNames.receivingParty = data.receivingParty
      }
      if ("partner1Name" in data && data.partner1Name) {
        partyNames.partner1 = data.partner1Name
      }
      if ("partner2Name" in data && data.partner2Name) {
        partyNames.partner2 = data.partner2Name
      }

      const titleParts = [label]
      const parties = Object.values(partyNames)
      if (parties.length >= 2) {
        titleParts.push(`- ${parties[0]} & ${parties[1]}`)
      }

      await supabase.from("contracts").insert({
        user_id: user.id,
        title: titleParts.join(" "),
        contract_type: contractType,
        jurisdiction,
        content: generatedContent,
        party_names: Object.keys(partyNames).length ? partyNames : null,
        status: "draft",
        ai_generated: true,
      } as any)

      setSaveSuccess(true)
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to save contract. Please try again."
      )
    }
  }

  function handleDownloadPdf() {
    if (!generatedContent || !contractType || !jurisdiction) return

    try {
      const cleaned = cleanMarkdown(generatedContent)
      const baseName = buildFileNameBase(contractType, jurisdiction) || "contract"

      const printWindow = window.open("", "_blank")
      if (!printWindow) return

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>${baseName}</title>
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
        console.error(
          "Failed to download PDF:",
          error instanceof Error ? error.message : String(error)
        )
      }
    }
  }

  async function handleDownloadDocx() {
    if (!generatedContent || !contractType || !jurisdiction) return

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
      const baseName = buildFileNameBase(contractType, jurisdiction) || "contract"
      saveAs(blob, `${baseName}.docx`)
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(
          "Failed to download DOCX:",
          error instanceof Error ? error.message : String(error)
        )
      }
    }
  }

  function renderStepIndicator() {
    const steps = [
      { id: 1, label: "Contract type" },
      { id: 2, label: "Jurisdiction" },
      { id: 3, label: "Details" },
      { id: 4, label: "Review & generate" },
      { id: 5, label: "Download & save" },
    ] as const

    return (
      <ol className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isCompleted = currentStep > step.id

          return (
            <li key={step.id} className="flex items-center gap-2">
              <div
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[11px]",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/40 text-muted-foreground",
                ].join(" ")}
              >
                {step.id}
              </div>
              <span
                className={
                  isActive
                    ? "text-foreground"
                    : isCompleted
                      ? "text-muted-foreground"
                      : "text-muted-foreground/80"
                }
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-1 h-px w-6 bg-border" />
              )}
            </li>
          )
        })}
      </ol>
    )
  }

  function renderStepContent() {
    if (currentStep === 1) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Step 1 of {totalSteps}. Choose the type of contract you want to draft.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CONTRACT_TYPE_OPTIONS.map((option) => {
              const isSelected = contractType === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setContractType(option.value)
                    setDetails(initialDetailsForType(option.value))
                    setValidationErrors((prev) => {
                      const next = { ...prev }
                      delete next.contractType
                      return next
                    })
                  }}
                  className={[
                    "flex flex-col items-start rounded-md border p-3 text-left text-sm transition",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-muted/60",
                  ].join(" ")}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    AI will tailor clauses to this contract type.
                  </span>
                </button>
              )
            })}
          </div>
          {validationErrors.contractType && (
            <p className="text-sm text-destructive" role="alert">
              {validationErrors.contractType}
            </p>
          )}
        </div>
      )
    }

    if (currentStep === 2) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Step 2 of {totalSteps}. Select the jurisdiction that will govern this contract.
          </p>
          <div className="max-w-xs space-y-2">
            <Label>Jurisdiction</Label>
            <Select
              value={jurisdiction ?? undefined}
              onValueChange={(value) => {
                setJurisdiction(value as Jurisdiction)
                setValidationErrors((prev) => {
                  const next = { ...prev }
                  delete next.jurisdiction
                  return next
                })
              }}
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
          {validationErrors.jurisdiction && (
            <p className="text-sm text-destructive" role="alert">
              {validationErrors.jurisdiction}
            </p>
          )}
        </div>
      )
    }

    if (currentStep === 3) {
      const data = details?.data as Record<string, string> | null

      const fieldConfigs: { name: string; label: string; type?: "date" }[] = []

      if (details?.type === "employment") {
        fieldConfigs.push(
          { name: "employerName", label: "Employer Name" },
          { name: "employeeName", label: "Employee Name" },
          { name: "jobTitle", label: "Job Title" },
          { name: "startDate", label: "Start Date", type: "date" },
          { name: "salary", label: "Salary" },
          { name: "workLocation", label: "Work Location" },
          { name: "contractDuration", label: "Contract Duration" }
        )
      } else if (details?.type === "service") {
        fieldConfigs.push(
          { name: "clientName", label: "Client Name" },
          { name: "serviceProviderName", label: "Service Provider Name" },
          { name: "serviceDescription", label: "Service Description" },
          { name: "paymentAmount", label: "Payment Amount" },
          { name: "paymentSchedule", label: "Payment Schedule" },
          { name: "startDate", label: "Start Date", type: "date" },
          { name: "endDate", label: "End Date", type: "date" }
        )
      } else if (details?.type === "sales") {
        fieldConfigs.push(
          { name: "sellerName", label: "Seller Name" },
          { name: "buyerName", label: "Buyer Name" },
          { name: "itemDescription", label: "Item Description" },
          { name: "purchasePrice", label: "Purchase Price" },
          { name: "paymentTerms", label: "Payment Terms" },
          { name: "deliveryDate", label: "Delivery Date", type: "date" }
        )
      } else if (details?.type === "lease") {
        fieldConfigs.push(
          { name: "landlordName", label: "Landlord Name" },
          { name: "tenantName", label: "Tenant Name" },
          { name: "propertyAddress", label: "Property Address" },
          { name: "monthlyRent", label: "Monthly Rent" },
          { name: "depositAmount", label: "Deposit Amount" },
          { name: "leaseStartDate", label: "Lease Start Date", type: "date" },
          { name: "leaseDuration", label: "Lease Duration" }
        )
      } else if (details?.type === "nda") {
        fieldConfigs.push(
          { name: "disclosingParty", label: "Disclosing Party" },
          { name: "receivingParty", label: "Receiving Party" },
          { name: "purpose", label: "Purpose" },
          {
            name: "confidentialInfoDescription",
            label: "Confidential Info Description",
          },
          { name: "duration", label: "Duration" }
        )
      } else if (details?.type === "partnership") {
        fieldConfigs.push(
          { name: "partner1Name", label: "Partner 1 Name" },
          { name: "partner2Name", label: "Partner 2 Name" },
          { name: "businessPurpose", label: "Business Purpose" },
          { name: "profitSplit", label: "Profit Split %" },
          { name: "startDate", label: "Start Date", type: "date" }
        )
      }

      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Step 3 of {totalSteps}. Fill in the key parties and commercial terms. AI will handle the boilerplate and jurisdiction-specific clauses.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {fieldConfigs.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type ?? "text"}
                  value={data?.[field.name] ?? ""}
                  onChange={(event) =>
                    handleDetailsChange(field.name as any, event.target.value)
                  }
                />
                {validationErrors[field.name] && (
                  <p className="text-xs text-destructive">
                    {validationErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {validationErrors.details && (
            <p className="text-sm text-destructive" role="alert">
              {validationErrors.details}
            </p>
          )}
        </div>
      )
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Step 4 of {totalSteps}. Review the summary and add any special instructions before generating the contract.
          </p>

          <Card className="border-dashed bg-muted/40 p-4">
            {summary ? (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Contract type:</span>{" "}
                  {summary.contractLabel}
                </p>
                <p>
                  <span className="font-medium">Jurisdiction:</span>{" "}
                  {summary.jurisdictionLabel}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Key details
                  </p>
                  <ul className="space-y-0.5 text-sm">
                    {summary.fields.map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (c) => c.toUpperCase())}
                          :
                        </span>{" "}
                        {value || "—"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Complete the earlier steps to see a structured summary of your contract inputs.
              </p>
            )}
          </Card>

          <div className="space-y-2">
            <Label htmlFor="additionalInstructions">
              Additional instructions (optional)
            </Label>
            <Textarea
              id="additionalInstructions"
              value={additionalInstructions}
              onChange={(event) => setAdditionalInstructions(event.target.value)}
              placeholder="E.g. Include a 3-month probation period, add non-compete clause limited to 12 months and Serbia only, specify arbitration in Belgrade, etc."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              These instructions will be added to the AI prompt but you must always review the final wording before use.
            </p>
          </div>

          {generateError && (
            <p className="text-sm text-destructive" role="alert">
              {generateError}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !summary}
            >
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isGenerating ? "Generating contract..." : "Generate contract"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Uses your plan&apos;s AI quota. Output is a draft only and does not constitute legal advice.
            </p>
          </div>
        </div>
      )
    }

    // Step 5
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Step 5 of {totalSteps}. Download the contract or save it into your Legantis workspace.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadPdf}
            disabled={!generatedContent}
          >
            Download PDF
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadDocx}
            disabled={!generatedContent}
          >
            Download DOCX
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={!generatedContent}
          >
            Save to contracts
          </Button>
        </div>

        {saveSuccess && (
          <p className="text-xs font-medium text-emerald-600">
            Contract saved to your workspace.
          </p>
        )}
        {saveError && (
          <p className="text-sm text-destructive" role="alert">
            {saveError}
          </p>
        )}

        <div className="mt-2 rounded-md border bg-muted/40 p-4">
          {generatedContent ? (
            <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm font-serif leading-relaxed text-foreground">
              {generatedContent}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              Generate a contract in the previous step to see the AI draft here.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Legantis · Contract drafting
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                AI contract drafting wizard
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Step-by-step contract builder for employment, services, sales, leases, NDAs, and partnerships across the Balkans.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Back to dashboard</Link>
            </Button>
          </header>

          <Card className="border-border/80 p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Contract drafting steps
                </h2>
                <p className="text-xs text-muted-foreground">
                  Move through each step to capture parties, commercial terms, and jurisdiction before generating the final draft.
                </p>
              </div>
              {renderStepIndicator()}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.15fr)]">
              <div className="space-y-6">
                {renderStepContent()}

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                    >
                      Back
                    </Button>
                    {currentStep < 4 && (
                      <Button type="button" size="sm" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-md border bg-muted/30 p-4">
                <h2 className="text-sm font-semibold">Contract preview</h2>
                <p className="text-xs text-muted-foreground">
                  Live preview of the generated contract. This is a draft only and must be reviewed by a qualified lawyer before use.
                </p>
                <div className="mt-2 rounded-md border bg-background p-3">
                  {generatedContent ? (
                    <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm font-serif leading-relaxed text-foreground">
                      {generatedContent}
                    </pre>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Once you generate a contract, the full text will appear here. You can then download it as PDF/DOCX or save it to your Legantis contracts.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="h-fit space-y-4 p-6">
          <h2 className="text-lg font-semibold">Contract details</h2>
          {!selectedId ? (
            <p className="text-sm text-muted-foreground">
              Select a contract from recent activity to see details here.
            </p>
          ) : detailLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading contract…</span>
            </div>
          ) : detailError ? (
            <p className="text-sm text-destructive">{detailError}</p>
          ) : detail ? (
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{detail.title}</p>
                <p className="text-xs text-muted-foreground">
                  {labelForContractType(detail.contract_type)} ·{" "}
                  {labelForJurisdiction(detail.jurisdiction)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Status: {detail.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  Created {new Date(detail.created_at).toLocaleDateString()}
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

