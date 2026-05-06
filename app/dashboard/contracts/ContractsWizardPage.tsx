"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

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
import { FilePen, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { saveAs } from "file-saver"
import { Document as DocxDocument, Packer, Paragraph } from "docx"
import { useLanguage } from "@/components/LanguageProvider"
import { RagSourcesPanel } from "@/components/RagSourcesPanel"
import type { RagMetadata } from "@/types/rag"
import { logActivity } from "@/lib/activity/logActivity"
import ContractsListPanel from "./ContractsListPanel"

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

type LocalizedOption<T extends string> = Option<T> & { translationKey: string }

const CONTRACT_TYPE_OPTIONS: LocalizedOption<ContractType>[] = [
  { value: "employment", label: "Employment Contract", translationKey: "contracts.contractTypes.employment" },
  { value: "service", label: "Service Agreement", translationKey: "contracts.contractTypes.service" },
  { value: "sales", label: "Sales Contract", translationKey: "contracts.contractTypes.sales" },
  { value: "lease", label: "Lease/Rental Agreement", translationKey: "contracts.contractTypes.lease" },
  { value: "nda", label: "NDA", translationKey: "contracts.contractTypes.nda" },
  { value: "partnership", label: "Partnership Agreement", translationKey: "contracts.contractTypes.partnership" },
]

const JURISDICTION_OPTIONS: LocalizedOption<Jurisdiction>[] = [
  { value: "serbia", label: "Serbia", translationKey: "contracts.jurisdictions.serbia" },
  { value: "croatia", label: "Croatia", translationKey: "contracts.jurisdictions.croatia" },
  { value: "bih_fbih", label: "Bosnia & Herzegovina - Federation", translationKey: "contracts.jurisdictions.bih_fbih" },
  { value: "bih_rs", label: "Bosnia & Herzegovina - Republika Srpska", translationKey: "contracts.jurisdictions.bih_rs" },
  { value: "bih_brcko", label: "Bosnia & Herzegovina - Brcko District", translationKey: "contracts.jurisdictions.bih_brcko" },
  { value: "montenegro", label: "Montenegro", translationKey: "contracts.jurisdictions.montenegro" },
  { value: "slovenia", label: "Slovenia", translationKey: "contracts.jurisdictions.slovenia" },
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

function buildSystemPrompt(
  jurisdiction: Jurisdiction,
  contractType: ContractType,
  outputLanguageName: string
): string {
  const jurisdictionLabel = labelForJurisdiction(jurisdiction)
  const contractLabel = labelForContractType(contractType)

  return [
    `You are a legal AI specialized in contract law for ${jurisdictionLabel}.`,
    `Generate a professional ${contractLabel} that complies with ${jurisdictionLabel} law.`,
    `Write the contract in ${outputLanguageName}.`,
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

function matchContractType(input: string): ContractType | null {
  const s = input.toLowerCase().trim()
  if (!s) return null
  if (["employment", "ugovor o radu", "radni ugovor", "zaposlenje"].includes(s)) return "employment"
  if (["service", "service agreement", "ugovor o uslugama", "usluge"].includes(s)) return "service"
  if (["sales", "sales contract", "ugovor o prodaji", "prodaja", "kupoprodaja"].includes(s)) return "sales"
  if (["lease", "lease agreement", "rental", "ugovor o najmu", "najam", "zakup"].includes(s)) return "lease"
  if (["nda", "non-disclosure", "tajnost", "povjerljivost", "poverljivost"].includes(s)) return "nda"
  if (["partnership", "partnership agreement", "ugovor o partnerstvu", "ortakluk"].includes(s)) return "partnership"
  return null
}

function matchJurisdiction(input: string): Jurisdiction | null {
  const s = input.toLowerCase().trim()
  if (!s) return null
  if (["serbia", "srbija", "srb"].includes(s)) return "serbia"
  if (["croatia", "hrvatska", "hr"].includes(s)) return "croatia"
  if (["bih_fbih", "fbih", "federacija", "federation"].includes(s)) return "bih_fbih"
  if (["bih_rs", "rs", "republika srpska", "republika srpska bosna"].includes(s)) return "bih_rs"
  if (["bih_brcko", "brcko", "brčko", "brcko district"].includes(s)) return "bih_brcko"
  if (["montenegro", "crna gora", "me"].includes(s)) return "montenegro"
  if (["slovenia", "slovenija", "si"].includes(s)) return "slovenia"
  return null
}

type ContractsWizardPageProps = {
  selectedId: string | null
  prefillMatterId?: string | null
}

export default function ContractsWizardPage({
  selectedId,
  prefillMatterId,
}: ContractsWizardPageProps) {
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
  const [currentStep, setCurrentStep] = useState<WizardStep>(1)
  const [contractType, setContractType] = useState<ContractType | null>(null)
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction | null>(null)
  const [matterId, setMatterId] = useState<string>(prefillMatterId ?? "")
  const [matterOptions, setMatterOptions] = useState<
    Array<{ id: string; title: string; matter_number: string }>
  >([])
  const [details, setDetails] = useState<ContractDetails | null>(null)
  const [additionalInstructions, setAdditionalInstructions] = useState("")
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [ragData, setRagData] = useState<RagMetadata | null>(null)
  const searchParams = useSearchParams()
  const prefillAppliedRef = useRef(false)
  const [showPrefillBanner, setShowPrefillBanner] = useState(false)
  const prefillKey = useMemo(() => searchParams.toString(), [searchParams])

  const [detail, setDetail] = useState<ContractDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    if (prefillAppliedRef.current) return
    if (!prefillKey) return

    const rawContractType = searchParams.get("contractType") ?? ""
    const rawJurisdiction = searchParams.get("jurisdiction") ?? ""
    const rawClientName = searchParams.get("clientName") ?? ""

    const matchedType = matchContractType(rawContractType)
    const matchedJurisdiction = matchJurisdiction(rawJurisdiction)

    if (!matchedType && !matchedJurisdiction && !rawClientName) return

    if (matchedType) {
      setContractType(matchedType)
      const initialDetails = initialDetailsForType(matchedType)
      if (rawClientName) {
        const nameField =
          matchedType === "employment"
            ? "employeeName"
            : matchedType === "service"
              ? "clientName"
              : matchedType === "sales"
                ? "buyerName"
                : matchedType === "lease"
                  ? "tenantName"
                  : matchedType === "nda"
                    ? "receivingParty"
                    : "partner1Name"
        ;(initialDetails.data as Record<string, string>)[nameField] = rawClientName
      }
      setDetails(initialDetails)
    }

    if (matchedJurisdiction) {
      setJurisdiction(matchedJurisdiction)
    }

    if (matchedType && matchedJurisdiction) {
      setCurrentStep(3)
    } else if (matchedType) {
      setCurrentStep(2)
    }

    prefillAppliedRef.current = true
    setShowPrefillBanner(true)
  }, [prefillKey, searchParams])

  const uiLabelForContractType = useCallback(
    (value: ContractType): string => {
      const option = CONTRACT_TYPE_OPTIONS.find((opt) => opt.value === value)
      if (!option) return "Contract"
      const translated = t(option.translationKey)
      return translated === option.translationKey ? option.label : translated
    },
    [t]
  )

  const uiLabelForJurisdiction = useCallback(
    (value: Jurisdiction): string => {
      const option = JURISDICTION_OPTIONS.find((opt) => opt.value === value)
      if (!option) return value
      const translated = t(option.translationKey)
      return translated === option.translationKey ? option.label : translated
    },
    [t]
  )

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
          setDetailError(t("contracts.sidebar.recordNotFound"))
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
        setDetailError(t("contracts.sidebar.recordNotFound"))
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
        errors.contractType = t("contracts.validation.selectContractType")
      }
    }

    if (currentStep === 2) {
      if (!jurisdiction) {
        errors.jurisdiction = t("contracts.validation.selectJurisdiction")
      }
    }

    if (currentStep === 3) {
      if (!contractType || !details) {
        errors.details = t("contracts.validation.completeDetails")
      } else {
        const data = details.data as Record<string, string>
        Object.entries(data).forEach(([key, value]) => {
          if (!value || !value.trim()) {
            errors[key] = t("contracts.validation.requiredField")
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

  function handleDetailsChange(field: string, value: string) {
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

    const contractLabel = uiLabelForContractType(contractType)
    const jurisdictionLabel = uiLabelForJurisdiction(jurisdiction)
    const data = details.data as Record<string, string>

    return {
      contractLabel,
      jurisdictionLabel,
      labels: (() => {
        const map: Record<string, string> = {}
        if (!details) return map
        switch (details.type) {
          case "employment":
            map.employerName = t("contracts.fields.employerName")
            map.employeeName = t("contracts.fields.employeeName")
            map.jobTitle = t("contracts.fields.jobTitle")
            map.startDate = t("contracts.fields.startDate")
            map.salary = t("contracts.fields.salary")
            map.workLocation = t("contracts.fields.workLocation")
            map.contractDuration = t("contracts.fields.contractDuration")
            break
          case "service":
            map.clientName = t("contracts.fields.clientName")
            map.serviceProviderName = t("contracts.fields.serviceProviderName")
            map.serviceDescription = t("contracts.fields.serviceDescription")
            map.paymentAmount = t("contracts.fields.paymentAmount")
            map.paymentSchedule = t("contracts.fields.paymentSchedule")
            map.startDate = t("contracts.fields.startDate")
            map.endDate = t("contracts.fields.endDate")
            break
          case "sales":
            map.sellerName = t("contracts.fields.sellerName")
            map.buyerName = t("contracts.fields.buyerName")
            map.itemDescription = t("contracts.fields.itemDescription")
            map.purchasePrice = t("contracts.fields.purchasePrice")
            map.paymentTerms = t("contracts.fields.paymentTerms")
            map.deliveryDate = t("contracts.fields.deliveryDate")
            break
          case "lease":
            map.landlordName = t("contracts.fields.landlordName")
            map.tenantName = t("contracts.fields.tenantName")
            map.propertyAddress = t("contracts.fields.propertyAddress")
            map.monthlyRent = t("contracts.fields.monthlyRent")
            map.depositAmount = t("contracts.fields.depositAmount")
            map.leaseStartDate = t("contracts.fields.leaseStartDate")
            map.leaseDuration = t("contracts.fields.leaseDuration")
            break
          case "nda":
            map.disclosingParty = t("contracts.fields.disclosingParty")
            map.receivingParty = t("contracts.fields.receivingParty")
            map.purpose = t("contracts.fields.purpose")
            map.confidentialInfoDescription = t("contracts.fields.confidentialInfoDescription")
            map.duration = t("contracts.fields.duration")
            break
          case "partnership":
            map.partner1Name = t("contracts.fields.partner1Name")
            map.partner2Name = t("contracts.fields.partner2Name")
            map.businessPurpose = t("contracts.fields.businessPurpose")
            map.profitSplit = t("contracts.fields.profitSplit")
            map.startDate = t("contracts.fields.startDate")
            break
        }
        return map
      })(),
      fields: Object.entries(data),
    }
  }, [contractType, jurisdiction, details, t, uiLabelForContractType, uiLabelForJurisdiction])

  async function handleGenerate() {
    if (!contractType || !jurisdiction || !details) {
      setGenerateError(t("contracts.validation.completePreviousSteps"))
      return
    }

    setRagData(null)
    resetErrors()
    setIsGenerating(true)
    setGeneratedContent("")
    setGenerateError(null)
    setSaveSuccess(false)

    try {
      const systemPrompt = buildSystemPrompt(jurisdiction, contractType, outputLanguageName)
      const userPrompt = buildUserPrompt(
        contractType,
        jurisdiction,
        details,
        additionalInstructions
      )

      const selectedContractType = labelForContractType(contractType)

      const contractCategoryMap: Record<string, string> = {
        "Employment Contract": "labor",
        "Sales Contract": "civil",
        "NDA": "confidentiality",
        "Service Agreement": "civil",
        "Lease/Rental Agreement": "civil",
        "Partnership Agreement": "commercial",
      }

      const mappedCategory = contractCategoryMap[
        selectedContractType
      ] ?? "civil"

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          featureType: "contract_generation",
          jurisdiction: jurisdiction,
          category: mappedCategory,
          outputLanguage: outputLanguageName,
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

      const data = (await response.json()) as {
        content?: string
        rag?: RagMetadata
      }
      const content = data.content ?? ""
      if (data.rag) setRagData(data.rag)
      setGeneratedContent(content)
      setCurrentStep(5)
    } catch (error) {
      setGenerateError(
        error instanceof Error
          ? error.message
          : t("contracts.errors.generateFailed")
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
        setSaveError(t("contracts.errors.mustBeLoggedInToSave"))
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .is("deleted_at", null)
        .maybeSingle()

      const lawFirmId =
        profile && typeof profile.law_firm_id === "string"
          ? profile.law_firm_id
          : null

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

      type ContractInsert = {
        user_id: string
        law_firm_id?: string | null
        title: string
        contract_type: ContractType
        jurisdiction: Jurisdiction
        content: string
        party_names: Record<string, string> | null
        matter_id?: string | null
        status: "draft" | string
        ai_generated: boolean
      }

      const matterIdToSave =
        matterId && matterId.trim() !== "" && matterId !== "none" ? matterId : null

      const newContract: ContractInsert = {
        user_id: user.id,
        law_firm_id: lawFirmId,
        title: titleParts.join(" "),
        contract_type: contractType,
        jurisdiction,
        content: generatedContent,
        party_names: Object.keys(partyNames).length ? partyNames : null,
        matter_id: matterIdToSave,
        status: "draft",
        ai_generated: true,
      }

      const { data: inserted, error: insErr } = await supabase
        .from("contracts")
        .insert(newContract)
        .select("id, title")
        .single()

      if (insErr) {
        const message =
          insErr && typeof insErr === "object" && "message" in insErr
            ? String((insErr as { message?: unknown }).message ?? "")
            : ""
        throw new Error(message || t("contracts.errors.saveFailed"))
      }

      if (inserted?.id) {
        void logActivity(
          supabase,
          "contract.created",
          "contract",
          inserted.id,
          inserted.title ?? newContract.title,
          {
            contract_type: contractType,
            jurisdiction,
            matter_id: matterIdToSave,
            ai_generated: true,
          }
        )
      }

      setSaveSuccess(true)
    } catch (error) {
      const msg =
        error && typeof error === "object"
          ? (error as { message?: unknown }).message
          : null
      setSaveError(
        typeof msg === "string" && msg.trim()
          ? msg
          : error instanceof Error
            ? error.message
            : t("contracts.errors.saveFailed")
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
      { id: 1, label: t("contracts.steps.step1.title") },
      { id: 2, label: t("contracts.steps.step2.title") },
      { id: 3, label: t("contracts.steps.step3.title") },
      { id: 4, label: t("contracts.steps.step4.title") },
      { id: 5, label: t("contracts.steps.step5.title") },
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
            {t("contracts.steps.step1.lead")
              .replace("{current}", String(1))
              .replace("{total}", String(totalSteps))}
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
                    "rounded-lg border border-border/40 p-4 cursor-pointer hover:border-primary/40 hover:bg-muted/20 transition-all text-left w-full",
                    isSelected ? "ring-2 ring-primary border-primary" : "",
                  ].join(" ")}
                >
                  <span className="text-sm font-semibold block">
                    {t(option.translationKey) || option.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {t("contracts.steps.step1.hint")}
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
            {t("contracts.steps.step2.lead")
              .replace("{current}", String(2))
              .replace("{total}", String(totalSteps))}
          </p>
          <div className="max-w-md space-y-4">
            <Label>{t("contracts.form.jurisdiction.label")}</Label>
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
                <SelectValue placeholder={t("contracts.form.jurisdiction.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {JURISDICTION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {t(option.translationKey) || option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <Label>{t("matters.title")}</Label>
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
              <p className="text-xs text-muted-foreground">{t("matters.select.help")}</p>
            </div>
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
          { name: "employerName", label: t("contracts.fields.employerName") },
          { name: "employeeName", label: t("contracts.fields.employeeName") },
          { name: "jobTitle", label: t("contracts.fields.jobTitle") },
          { name: "startDate", label: t("contracts.fields.startDate"), type: "date" },
          { name: "salary", label: t("contracts.fields.salary") },
          { name: "workLocation", label: t("contracts.fields.workLocation") },
          { name: "contractDuration", label: t("contracts.fields.contractDuration") }
        )
      } else if (details?.type === "service") {
        fieldConfigs.push(
          { name: "clientName", label: t("contracts.fields.clientName") },
          { name: "serviceProviderName", label: t("contracts.fields.serviceProviderName") },
          { name: "serviceDescription", label: t("contracts.fields.serviceDescription") },
          { name: "paymentAmount", label: t("contracts.fields.paymentAmount") },
          { name: "paymentSchedule", label: t("contracts.fields.paymentSchedule") },
          { name: "startDate", label: t("contracts.fields.startDate"), type: "date" },
          { name: "endDate", label: t("contracts.fields.endDate"), type: "date" }
        )
      } else if (details?.type === "sales") {
        fieldConfigs.push(
          { name: "sellerName", label: t("contracts.fields.sellerName") },
          { name: "buyerName", label: t("contracts.fields.buyerName") },
          { name: "itemDescription", label: t("contracts.fields.itemDescription") },
          { name: "purchasePrice", label: t("contracts.fields.purchasePrice") },
          { name: "paymentTerms", label: t("contracts.fields.paymentTerms") },
          { name: "deliveryDate", label: t("contracts.fields.deliveryDate"), type: "date" }
        )
      } else if (details?.type === "lease") {
        fieldConfigs.push(
          { name: "landlordName", label: t("contracts.fields.landlordName") },
          { name: "tenantName", label: t("contracts.fields.tenantName") },
          { name: "propertyAddress", label: t("contracts.fields.propertyAddress") },
          { name: "monthlyRent", label: t("contracts.fields.monthlyRent") },
          { name: "depositAmount", label: t("contracts.fields.depositAmount") },
          { name: "leaseStartDate", label: t("contracts.fields.leaseStartDate"), type: "date" },
          { name: "leaseDuration", label: t("contracts.fields.leaseDuration") }
        )
      } else if (details?.type === "nda") {
        fieldConfigs.push(
          { name: "disclosingParty", label: t("contracts.fields.disclosingParty") },
          { name: "receivingParty", label: t("contracts.fields.receivingParty") },
          { name: "purpose", label: t("contracts.fields.purpose") },
          { name: "confidentialInfoDescription", label: t("contracts.fields.confidentialInfoDescription") },
          { name: "duration", label: t("contracts.fields.duration") }
        )
      } else if (details?.type === "partnership") {
        fieldConfigs.push(
          { name: "partner1Name", label: t("contracts.fields.partner1Name") },
          { name: "partner2Name", label: t("contracts.fields.partner2Name") },
          { name: "businessPurpose", label: t("contracts.fields.businessPurpose") },
          { name: "profitSplit", label: t("contracts.fields.profitSplit") },
          { name: "startDate", label: t("contracts.fields.startDate"), type: "date" }
        )
      }

      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("contracts.steps.step3.lead")
              .replace("{current}", String(3))
              .replace("{total}", String(totalSteps))}
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
                    handleDetailsChange(field.name, event.target.value)
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
            {t("contracts.steps.step4.lead")
              .replace("{current}", String(4))
              .replace("{total}", String(totalSteps))}
          </p>

          <Card className="border-dashed bg-muted/40 p-4">
            {summary ? (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">{t("contracts.summary.contractType")}:</span>{" "}
                  {summary.contractLabel}
                </p>
                <p>
                  <span className="font-medium">{t("contracts.summary.jurisdiction")}:</span>{" "}
                  {summary.jurisdictionLabel}
                </p>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t("contracts.summary.keyDetails")}
                  </p>
                  <ul className="space-y-0.5 text-sm">
                    {summary.fields.map(([key, value]) => (
                      <li key={key}>
                        <span className="font-medium">
                          {summary.labels[key] && summary.labels[key] !== `contracts.fields.${key}`
                            ? summary.labels[key]
                            : key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (c) => c.toUpperCase())}
                          :
                        </span>{" "}
                        {value || t("contracts.common.emptyValue")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("contracts.summary.completeEarlierSteps")}
              </p>
            )}
          </Card>

          <div className="space-y-2">
            <Label htmlFor="additionalInstructions">
              {t("contracts.form.additionalInstructions.label")}
            </Label>
            <Textarea
              id="additionalInstructions"
              value={additionalInstructions}
              onChange={(event) => setAdditionalInstructions(event.target.value)}
              placeholder={t("contracts.form.additionalInstructions.placeholder")}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {t("contracts.form.additionalInstructions.help")}
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
              {isGenerating
                ? t("contracts.actions.generating")
                : t("contracts.actions.generate")}
            </Button>
            <p className="text-xs text-muted-foreground">
              {t("contracts.actions.note")}
            </p>
          </div>
        </div>
      )
    }

    // Step 5
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t("contracts.steps.step5.lead")
            .replace("{current}", String(5))
            .replace("{total}", String(totalSteps))}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadPdf}
            disabled={!generatedContent}
          >
            {t("contracts.actions.downloadPdf")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadDocx}
            disabled={!generatedContent}
          >
            {t("contracts.actions.downloadDocx")}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={!generatedContent}
          >
            {t("contracts.actions.saveToContracts")}
          </Button>
        </div>

        {saveSuccess && (
          <p className="text-xs font-medium text-emerald-600">
            {t("contracts.messages.saved")}
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
              {t("contracts.preview.empty")}
            </p>
          )}
        </div>
        {ragData && <RagSourcesPanel ragData={ragData} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background px-4 py-10">
      <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-8">
        <header className="mb-8 pb-6 border-b border-border/40 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest text-muted-foreground/40 uppercase mb-2">
              {t("contracts.header.kicker")}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("contracts.header.title")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground/70 max-w-2xl">
              {t("contracts.header.subtitle")}
            </p>
          </div>
          <div className="shrink-0 mt-1">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">{t("contracts.header.back")}</Link>
            </Button>
          </div>
        </header>

        <Card className="rounded-xl border border-border/40 bg-muted/10 p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15">
            <FilePen className="h-5 w-5 text-purple-400" />
          </div>
          {showPrefillBanner && (
            <div className="mb-4 flex items-center justify-between rounded-md border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
              <span>
                Pre-filled from intake submission. Review and adjust before generating.
              </span>
              <button
                type="button"
                onClick={() => setShowPrefillBanner(false)}
                className="ml-4 text-muted-foreground hover:text-foreground"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          )}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  {t("contracts.section.stepsTitle")}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {t("contracts.section.stepsSubtitle")}
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
                      {t("contracts.nav.back")}
                    </Button>
                    {currentStep < 4 && (
                      <Button type="button" size="sm" onClick={handleNext}>
                        {t("contracts.nav.next")}
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("contracts.nav.stepOf")
                      .replace("{current}", String(currentStep))
                      .replace("{total}", String(totalSteps))}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-md border bg-muted/30 p-4">
                <h2 className="text-sm font-semibold">{t("contracts.preview.title")}</h2>
                <p className="text-xs text-muted-foreground">
                  {t("contracts.preview.subtitle")}
                </p>
                <div className="mt-2 rounded-md border bg-background p-3">
                  {generatedContent ? (
                    <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm font-serif leading-relaxed text-foreground">
                      {generatedContent}
                    </pre>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {t("contracts.preview.empty")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-8">
        <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-border/40 bg-muted/10 p-6">
          <h2 className="text-base font-semibold">Contracts</h2>
          <p className="text-xs text-muted-foreground/60 mt-0.5">
            Browse and manage your generated contracts
          </p>
          <div className="mt-4 min-w-0">
            <ContractsListPanel />
          </div>
        </div>

          <Card className="space-y-4 p-6">
            <h2 className="text-lg font-semibold">{t("contracts.sidebar.title")}</h2>
            {!selectedId ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
                  <FilePen className="h-5 w-5 text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground/60">
                  Select a contract to view details
                </p>
              </div>
            ) : detailLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t("contracts.sidebar.loading")}</span>
              </div>
            ) : detailError ? (
              <p className="text-sm text-destructive">{detailError}</p>
            ) : detail ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">{detail.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {uiLabelForContractType(detail.contract_type)} ·{" "}
                    {uiLabelForJurisdiction(detail.jurisdiction)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("contracts.sidebar.status")} {detail.status}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("contracts.sidebar.created")}{" "}
                    {new Date(detail.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {t("contracts.sidebar.content")}
                  </p>
                  <div className="max-h-64 overflow-y-auto rounded-md border bg-muted/40 p-3">
                    <pre className="whitespace-pre-wrap">{detail.content}</pre>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  )
}

