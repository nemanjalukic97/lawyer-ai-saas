"use client"

import Link from "next/link"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { useLanguage } from "@/components/LanguageProvider"
import { saveAs } from "file-saver"
import { Document as DocxDocument, Packer, Paragraph } from "docx"
import { logActivity } from "@/lib/activity/logActivity"

type Jurisdiction =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

type LocalizedOption<T extends string> = {
  value: T
  label: string
  translationKey: string
}

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

type ChangeType = "addition" | "deletion" | "replacement"

export type RedlineChange = {
  id: string
  type: ChangeType
  original: string
  suggested: string
  reason: string
  accepted: boolean | null
  position: number
}

type WizardStep = 1 | 2 | 3

type RedlineSessionRow = {
  id: string
  original_filename: string
  original_content: string
  redlined_content: string
  changes: unknown
  status: string
  created_at: string
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
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
      console.error("Failed to parse PDF:", error)
    }
    throw new Error(
      "We couldn't reliably extract text from this PDF. Please try uploading a DOCX version instead."
    )
  }
}

function extractJson(raw: string): string {
  let cleaned = raw.trim()
  cleaned = cleaned.replace(/^```json\s*/i, "")
  cleaned = cleaned.replace(/^```\s*/i, "")
  cleaned = cleaned.replace(/```\s*$/i, "")
  cleaned = cleaned.trim()
  const start = cleaned.indexOf("[")
  const end = cleaned.lastIndexOf("]")
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON array found in response")
  }
  return cleaned.slice(start, end + 1)
}

function normalizeChange(raw: any, index: number): RedlineChange | null {
  if (!raw || typeof raw !== "object") return null

  const type = raw.type as ChangeType
  if (type !== "addition" && type !== "deletion" && type !== "replacement") return null

  const original = typeof raw.original === "string" ? raw.original : ""
  const suggested = typeof raw.suggested === "string" ? raw.suggested : ""
  const reason = typeof raw.reason === "string" ? raw.reason : ""
  const position = typeof raw.position === "number" ? raw.position : Number(raw.position)
  if (!Number.isFinite(position)) return null

  const id =
    typeof raw.id === "string" && raw.id.trim()
      ? raw.id.trim()
      : typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `change_${index}_${Math.random().toString(16).slice(2)}`

  return {
    id,
    type,
    original,
    suggested,
    reason,
    position: Math.trunc(position),
    accepted: null,
  }
}

function findBestInsertionPoint(text: string, addition: RedlineChange): number {
  const position = addition.position ?? 0
  const afterPosition = text.slice(position)
  const doubleNewline = afterPosition.indexOf("\n\n")
  if (doubleNewline !== -1 && doubleNewline < 200) {
    return position + doubleNewline + 2
  }

  const singleNewline = afterPosition.indexOf("\n")
  if (singleNewline !== -1 && singleNewline < 150) {
    return position + singleNewline + 1
  }

  const periodSpace = afterPosition.search(/\.\s/)
  if (periodSpace !== -1 && periodSpace < 200) {
    return position + periodSpace + 2
  }

  return Math.min(position, text.length)
}

function applyAcceptedChangesSafely(
  originalText: string,
  changes: RedlineChange[]
): string {
  try {
    const acceptedChanges = changes
      .filter((c) => c.accepted === true)
      .filter((c) => c.type === "replacement" || c.type === "deletion")
      .filter((c) => c.original && c.original.length > 0)

    type Span = { start: number; end: number; replacement: string }
    const spans: Span[] = []

    for (const change of acceptedChanges) {
      const original = change.original ?? ""
      if (!original) continue

      const idx = originalText.indexOf(original)
      if (idx === -1) continue

      const alreadyCovered = spans.some(
        (s) => idx < s.end && idx + original.length > s.start
      )
      if (alreadyCovered) continue

      spans.push({
        start: idx,
        end: idx + original.length,
        replacement: change.type === "replacement" ? (change.suggested ?? "") : "",
      })
    }

    spans.sort((a, b) => a.start - b.start)

    let result = ""
    let cursor = 0
    for (const span of spans) {
      result += originalText.slice(cursor, span.start)
      result += span.replacement
      cursor = span.end
    }
    result += originalText.slice(cursor)

    const acceptedAdditions = changes
      .filter((c) => c.accepted === true)
      .filter((c) => c.type === "addition")
      .filter((c) => c.suggested && c.suggested.length > 0)
      .slice()
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

    for (const addition of acceptedAdditions) {
      const insertAt = findBestInsertionPoint(result, addition)
      const suggested = addition.suggested ?? ""
      result = result.slice(0, insertAt) + " " + suggested + result.slice(insertAt)
    }

    return result
  } catch {
    return originalText
  }
}

type Segment =
  | { kind: "text"; text: string }
  | {
      kind: "addition"
      text: string
      state: "pending" | "accepted" | "rejected"
      fromReplacement?: boolean
    }
  | {
      kind: "deletion"
      text: string
      state: "pending" | "accepted" | "rejected"
      fromReplacement?: boolean
    }

function buildPreviewSegments(
  originalText: string,
  changes: RedlineChange[]
): Segment[] {
  const stateFor = (c: RedlineChange): "pending" | "accepted" | "rejected" =>
    c.accepted == null ? "pending" : c.accepted ? "accepted" : "rejected"

  const coveredSpans: Array<{ start: number; end: number; change: RedlineChange }> = []

  for (const change of changes) {
    if (change.type === "addition") continue
    if (!change.original) continue

    const idx = originalText.indexOf(change.original)
    if (idx === -1) continue

    const alreadyCovered = coveredSpans.some(
      (s) => idx < s.end && idx + change.original.length > s.start
    )
    if (alreadyCovered) continue

    coveredSpans.push({
      start: idx,
      end: idx + change.original.length,
      change,
    })
  }

  coveredSpans.sort((a, b) => a.start - b.start)

  const segments: Segment[] = []
  /** 0-based index in `originalText` of the first character covered by the segment, or `null` for in-preview-only additions. */
  const firstOrig: (number | null)[] = []
  let cursor = 0

  for (const span of coveredSpans) {
    if (span.start > cursor) {
      const text = originalText.slice(cursor, span.start)
      segments.push({
        kind: "text",
        text,
      })
      firstOrig.push(cursor)
    }

    const change = span.change
    const state = stateFor(change)

    if (state === "rejected") {
      segments.push({
        kind: "text",
        text: change.original,
      })
      firstOrig.push(span.start)
    } else if (change.type === "replacement") {
      segments.push({
        kind: "deletion",
        text: change.original,
        fromReplacement: true,
        state,
      })
      firstOrig.push(span.start)
      if (change.suggested) {
        segments.push({
          kind: "addition",
          text: change.suggested,
          fromReplacement: true,
          state,
        })
        firstOrig.push(null)
      }
    } else if (change.type === "deletion") {
      if (state === "accepted") {
        // Accepted deletion: hide it from preview
      } else {
        segments.push({
          kind: "deletion",
          text: change.original,
          fromReplacement: false,
          state,
        })
        firstOrig.push(span.start)
      }
    }

    cursor = span.end
  }

  if (cursor < originalText.length) {
    segments.push({
      kind: "text",
      text: originalText.slice(cursor),
    })
    firstOrig.push(cursor)
  }

  const additions = changes
    .filter((c) => c.type === "addition")
    .filter((c) => c.accepted !== false)
    .filter((c) => c.suggested && c.suggested.length > 0)
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  function clampInsertForAcceptedDeletions(insertAt: number): number {
    let at = Math.min(insertAt, originalText.length)
    for (const span of coveredSpans) {
      if (stateFor(span.change) === "accepted" && span.change.type === "deletion") {
        if (at >= span.start && at < span.end) {
          at = span.end
        }
      }
    }
    return Math.min(at, originalText.length)
  }

  type SplicePoint =
    | { kind: "append" }
    | { kind: "after"; atIndex: number }
    | { kind: "inText"; atIndex: number; offset: number }

  function findSplicePointForOriginalOffset(insertAt: number): SplicePoint {
    if (insertAt >= originalText.length) {
      return { kind: "append" }
    }

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      const fo = firstOrig[i]
      if (seg.kind === "text" && fo !== null) {
        const a = fo
        const b = a + seg.text.length
        if (insertAt < b) {
          if (insertAt < a) continue
          return { kind: "inText", atIndex: i, offset: insertAt - a }
        }
        if (insertAt === b) {
          let j = i + 1
          while (j < segments.length) {
            const at = segments[j]
            if (at.kind === "addition" && at.fromReplacement !== true) {
              j++
            } else {
              break
            }
          }
          if (j < segments.length) {
            const nfo = firstOrig[j]
            if (segments[j].kind === "text" && nfo !== null) {
              return { kind: "inText", atIndex: j, offset: 0 }
            }
          }
          return { kind: "inText", atIndex: i, offset: seg.text.length }
        }
        continue
      }
      if (seg.kind === "deletion" && fo !== null) {
        const a = fo
        const b = a + seg.text.length
        if (insertAt >= a && insertAt <= b) {
          return { kind: "after", atIndex: i + 1 }
        }
        continue
      }
    }
    return { kind: "append" }
  }

  for (const addition of additions) {
    const insertAt = clampInsertForAcceptedDeletions(findBestInsertionPoint(originalText, addition))
    const point = findSplicePointForOriginalOffset(insertAt)

    const additionSeg: Segment = {
      kind: "addition",
      text: ` ${addition.suggested}`,
      fromReplacement: false,
      state: stateFor(addition),
    }

    if (point.kind === "append") {
      segments.push(additionSeg)
      firstOrig.push(null)
      continue
    }
    if (point.kind === "after") {
      segments.splice(point.atIndex, 0, additionSeg)
      firstOrig.splice(point.atIndex, 0, null)
      continue
    }

    const targetSeg = segments[point.atIndex]
    if (targetSeg.kind !== "text") {
      segments.splice(point.atIndex + 1, 0, additionSeg)
      firstOrig.splice(point.atIndex + 1, 0, null)
      continue
    }

    const beforeText = targetSeg.text.slice(0, point.offset)
    const afterText = targetSeg.text.slice(point.offset)
    const fo0 = firstOrig[point.atIndex]
    const replacement: Segment[] = []
    const replacementOrig: (number | null)[] = []
    if (beforeText) {
      replacement.push({ kind: "text", text: beforeText })
      replacementOrig.push(fo0)
    }
    replacement.push(additionSeg)
    replacementOrig.push(null)
    if (afterText) {
      replacement.push({ kind: "text", text: afterText })
      replacementOrig.push(fo0 !== null ? fo0 + beforeText.length : null)
    }
    segments.splice(point.atIndex, 1, ...replacement)
    firstOrig.splice(point.atIndex, 1, ...replacementOrig)
  }

  return segments
}

function docxFromText(text: string): DocxDocument {
  const paragraphs = text
    .split(/\r?\n\r?\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  return new DocxDocument({
    sections: [
      {
        properties: {},
        children:
          paragraphs.length > 0
            ? paragraphs.map((p) => new Paragraph({ text: p }))
            : [new Paragraph({ text })],
      },
    ],
  })
}

function typeBadgeClasses(type: ChangeType): string {
  if (type === "addition") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  if (type === "deletion") return "bg-red-500/10 text-red-700 dark:text-red-300"
  return "bg-amber-500/10 text-amber-700 dark:text-amber-300"
}

export default function RedlinePageClient({ selectedId }: { selectedId: string | null }) {
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
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileSize, setFileSize] = useState<number | null>(null)
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("serbia")
  const [instructions, setInstructions] = useState("")
  const [isParsing, setIsParsing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [originalText, setOriginalText] = useState("")
  const [changes, setChanges] = useState<RedlineChange[]>([])
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [sessions, setSessions] = useState<RedlineSessionRow[]>([])
  const [sessionsLoading, setSessionsLoading] = useState(false)
  const [sessionsError, setSessionsError] = useState<string | null>(null)
  const [sessionsPage, setSessionsPage] = useState(1)

  const SESSIONS_PER_PAGE = 5
  const totalSessionPages = Math.max(
    1,
    Math.ceil(sessions.length / SESSIONS_PER_PAGE)
  )
  const visibleSessions = sessions.slice(
    (sessionsPage - 1) * SESSIONS_PER_PAGE,
    sessionsPage * SESSIONS_PER_PAGE
  )

  const acceptedCount = useMemo(
    () => changes.filter((c) => c.accepted === true).length,
    [changes]
  )

  const finalizedText = useMemo(
    () => applyAcceptedChangesSafely(originalText, changes),
    [originalText, changes]
  )

  const previewSegments = useMemo(
    () => buildPreviewSegments(originalText, changes),
    [originalText, changes]
  )

  const loadSessions = useCallback(async () => {
    setSessionsLoading(true)
    setSessionsError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setSessions([])
        return
      }

      const { data, error } = await supabase
        .from("redline_sessions")
        .select("id, original_filename, original_content, redlined_content, changes, status, created_at")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      setSessions((data ?? []) as unknown as RedlineSessionRow[])
    } catch (e) {
      setSessionsError(e instanceof Error ? e.message : "Failed to load sessions.")
    } finally {
      setSessionsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    void loadSessions()
  }, [loadSessions])

  useEffect(() => {
    if (!selectedId) return
    const match = sessions.find((s) => s.id === selectedId)
    if (!match) return

    setCurrentStep(2)
    setFile(null)
    setFileName(match.original_filename)
    setFileSize(null)
    setOriginalText(match.original_content ?? "")
    const parsed =
      typeof match.changes === "string"
        ? (() => {
            try {
              return JSON.parse(extractJson(match.changes))
            } catch {
              return null
            }
          })()
        : Array.isArray(match.changes)
          ? (match.changes as unknown[])
          : null

    const normalized = (parsed ?? [])
      .map((raw, i) => {
        const c = normalizeChange(raw, i)
        if (!c) return null
        const accepted =
          typeof (raw as any)?.accepted === "boolean" ? Boolean((raw as any).accepted) : null
        return { ...c, accepted }
      })
      .filter(Boolean) as RedlineChange[]

    setChanges(normalized)
  }, [selectedId, sessions])

  const handleFileSelected = useCallback(
    async (selectedFile: File | null) => {
      setError(null)
      setChanges([])
      setOriginalText("")
      setCurrentStep(1)

      if (!selectedFile) {
        setFile(null)
        setFileName(null)
        setFileSize(null)
        return
      }

      const maxSizeBytes = 5 * 1024 * 1024
      if (selectedFile.size > maxSizeBytes) {
        setError("File is too large (max 5MB).")
        setFile(null)
        setFileName(null)
        setFileSize(null)
        return
      }

      const lowerName = selectedFile.name.toLowerCase()
      const isPdf = lowerName.endsWith(".pdf")
      const isDocx = lowerName.endsWith(".docx") || lowerName.endsWith(".doc")

      if (!isPdf && !isDocx) {
        setError("Unsupported file type. Upload a PDF or DOCX.")
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
        if (isDocx) text = await parseDocxFile(selectedFile)
        else if (isPdf) text = await parsePdfFile(selectedFile)

        const normalized = text.replace(/\r\n/g, "\n").trim()
        if (!normalized) {
          setError("No readable text could be extracted from this file.")
          setOriginalText("")
          return
        }

        const maxChars = 12000
        const finalText =
          normalized.length > maxChars
            ? `${normalized.slice(0, maxChars)}\n\n[Document truncated for AI analysis due to length.]`
            : normalized

        setOriginalText(finalText)
      } catch (parseError) {
        setOriginalText("")
        setError(
          parseError instanceof Error ? parseError.message : "Failed to extract text from file."
        )
      } finally {
        setIsParsing(false)
      }
    },
    []
  )

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

  async function handleAnalyze(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!fileName || !originalText.trim()) {
      setError("Upload a contract and wait for extraction to finish.")
      return
    }

    setIsAnalyzing(true)
    try {
      const base = [
        'You are a contract redlining AI. You MUST respond with ONLY a raw JSON array. No markdown, no code blocks, no explanation, no text before or after the array. Your entire response must be parseable by JSON.parse(). Start your response with [ and end with ].',
        "Analyze the provided contract and produce AI-suggested changes as a JSON array of change objects.",
        "Return ONLY valid JSON (no markdown, no prose outside JSON).",
        "Each change object MUST include: type, original, suggested, reason, position.",
        'type must be one of: "addition", "deletion", "replacement".',
        "position must be a 0-based character index into the provided original contract text.",
        "For each change, set 'position' to the exact 0-based character index in the original text where the change should be applied. To find the correct position: - For additions to a specific clause, find that clause's text in the original and set position to the index where the new text should be inserted AFTER that clause ends. - For replacements, set position to the index where the original text starts. - For deletions, set position to the index where the text to delete starts. - NEVER use position 0 unless the change truly belongs at the very start of the document. - Find positions by searching for the nearest surrounding text in the original contract.",
        "Write all 'reason' fields in the same language as the contract text. If the contract is in Bosnian/Serbian/Croatian, write reasons in Bosnian/Serbian/Croatian. If in Slovenian, write in Slovenian. Match the language of the document.",
        'For "addition": original must be "" and suggested must be non-empty.',
        'For "deletion": suggested must be "" and original must be non-empty.',
        'For "replacement": both original and suggested must be non-empty.',
        "Focus on: legal clarity, missing clauses, risk reduction, jurisdiction-specific requirements.",
        instructions.trim()
          ? "Prioritize the lawyer's redlining instructions."
          : "If no instructions are provided, use best-practice legal redlining.",
      ].join(" ")

      const userPrompt = [
        `Jurisdiction: ${jurisdiction}.`,
        instructions.trim() ? `Redlining instructions: ${instructions.trim()}` : "",
        "",
        "CONTRACT TEXT:",
        originalText,
        "",
        "IMPORTANT: For each suggested change, carefully find where in the above text it belongs. Set position to the character index of the nearest relevant sentence or clause. For example, if adding a clause about severance pay after Član 6, find the character index where Član 6 ends and use that as the position.",
      ]
        .filter(Boolean)
        .join("\n")

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: base,
          userPrompt,
          featureType: "document_analysis",
          jurisdiction,
          outputLanguage: outputLanguageName,
        }),
      })

      if (!response.ok) {
        let message = `Failed to analyze & redline (status ${response.status})`
        try {
          const data = (await response.json()) as { error?: string }
          if (data?.error) message = data.error
        } catch {
          // ignore
        }
        throw new Error(message)
      }

      const data = (await response.json()) as { content?: string }
      const content = data.content ?? ""
      let arr: unknown[]
      try {
        const jsonString = extractJson(content)
        const parsed = JSON.parse(jsonString)
        if (!Array.isArray(parsed)) {
          throw new Error("No JSON array found in response")
        }
        type ChangeObject = {
          type: "addition" | "deletion" | "replacement"
          position: number
          [key: string]: unknown
        }

        const validChanges = (parsed as ChangeObject[]).filter(
          (c: ChangeObject) => !(c.type === "addition" && c.position === 0)
        )

        arr = validChanges
      } catch {
        throw new Error(
          "AI could not parse the document. Please try again or simplify your instructions."
        )
      }

      const normalized = arr
        .map((raw, i) => normalizeChange(raw, i))
        .filter(Boolean) as RedlineChange[]

      setChanges(normalized)
      setCurrentStep(2)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to analyze & redline.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  async function handleDownloadDocx() {
    try {
      const doc = docxFromText(finalizedText)
      const blob = await Packer.toBlob(doc)
      const nameBase = (fileName ?? "redlined").replace(/\.[^.]+$/, "")
      saveAs(blob, `${nameBase}_redlined.docx`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to download DOCX.")
    }
  }

  async function handleSaveSession() {
    setSaveSuccess(false)
    setSaveError(null)
    setError(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setSaveError("You must be logged in to save.")
        return
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("law_firm_id")
        .eq("id", user.id)
        .is("deleted_at", null)
        .maybeSingle()

      const lawFirmId =
        profile && typeof (profile as any).law_firm_id === "string"
          ? String((profile as any).law_firm_id)
          : null

      const payload = {
        user_id: user.id,
        law_firm_id: lawFirmId,
        original_filename: fileName ?? "contract",
        original_content: originalText,
        redlined_content: finalizedText,
        changes,
        status: "completed",
      }

      const { data: inserted, error } = await supabase
        .from("redline_sessions")
        .insert(payload as any)
        .select()
        .single()

      if (error) {
        console.error("Save error:", error)
        setSaveError(error.message)
        return
      }

      const insertedRow = inserted as unknown as
        | { id: string; original_filename?: string | null }
        | null

      if (insertedRow?.id) {
        void logActivity(
          supabase as any,
          "redline.created",
          "redline",
          insertedRow.id,
          insertedRow.original_filename ?? payload.original_filename
        )
      }

      await loadSessions()
      setCurrentStep(3)
      setSaveSuccess(true)
      setSessionsPage(1)
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save session."
      console.error("Save error:", message)
      setSaveError(message)
    }
  }

  function renderStepIndicator() {
    const steps = [
      { id: 1, label: t("redline.upload.label") },
      { id: 2, label: t("redline.changes.replacements") },
      { id: 3, label: t("redline.actions.download") },
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

  const canAnalyze = !!fileName && !!originalText.trim() && !isParsing

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("nav.actions")}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
              {t("redline.header.title")}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {t("redline.header.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">{t("contracts.header.back")}</Link>
          </Button>
        </header>

        <Card className="border-border/80 p-6">
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

          {currentStep === 1 && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1.2fr)]">
              <Card className="p-6">
                <form onSubmit={handleAnalyze} className="space-y-6">
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 px-4 py-8 text-center transition hover:border-primary/60 hover:bg-muted"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                  >
                    <input
                      id="fileUpload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={onFileInputChange}
                    />
                    <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      {t("redline.upload.label")}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF or DOCX (max 5MB)
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
                                return translated === option.translationKey
                                  ? option.label
                                  : translated
                              })()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">
                      {t("redline.instructions.label")}
                    </Label>
                    <Textarea
                      id="instructions"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={4}
                      placeholder={t("redline.instructions.placeholder")}
                    />
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
                      {isAnalyzing
                        ? t("redline.messages.analyzing")
                        : t("redline.actions.analyze")}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {t("analyze.form.actions.note")}
                    </p>
                  </div>
                </form>
              </Card>

              <Card className="flex min-h-[420px] flex-col p-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    {t("analyze.form.extractedPreview.label")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("analyze.form.extractedPreview.help")}
                  </p>
                </div>
                <div className="mt-4 flex-1 rounded-md border bg-muted/40 p-4">
                  {originalText ? (
                    <pre className="max-h-[560px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {originalText}
                    </pre>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {t("analyze.form.extractedPreview.placeholder")}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {t("redline.changes.replacements")}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {acceptedCount} / {changes.length} accepted
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setChanges((prev) => prev.map((c) => ({ ...c, accepted: true })))
                        }
                        disabled={changes.length === 0}
                      >
                        {t("redline.actions.acceptAll")}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setChanges((prev) => prev.map((c) => ({ ...c, accepted: false })))
                        }
                        disabled={changes.length === 0}
                      >
                        {t("redline.actions.rejectAll")}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setCurrentStep(3)}
                        disabled={changes.length === 0}
                      >
                        {t("redline.actions.download")}
                      </Button>
                    </div>
                  </div>

                  {changes.length === 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {t("redline.messages.noChanges")}
                    </p>
                  ) : (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Original</h3>
                        <div className="rounded-md border bg-muted/40 p-4">
                          <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {originalText}
                          </pre>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Redlined preview</h3>
                        <div className="rounded-md border bg-muted/40 p-4">
                          <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {previewSegments.map((seg, idx) => {
                              if (seg.kind === "text") return <span key={idx}>{seg.text}</span>
                              if (seg.kind === "addition") {
                                if (seg.state === "rejected") return null
                                const opacity = "opacity-100"
                                if (seg.fromReplacement) {
                                  return (
                                    <span
                                      key={idx}
                                      style={{
                                        backgroundColor: "#86efac",
                                        borderBottom: "2px solid #16a34a",
                                        color: "#14532d",
                                        padding: "0 2px",
                                      }}
                                    >
                                      {seg.text}
                                    </span>
                                  )
                                }
                                return (
                                  <span
                                    key={idx}
                                    className={["rounded-sm px-0.5", opacity].join(" ")}
                                    style={{
                                      backgroundColor: "rgba(34, 197, 94, 0.15)",
                                      borderBottom: "2px solid #16a34a",
                                      color: "inherit",
                                    }}
                                  >
                                    {seg.text}
                                  </span>
                                )
                              }
                              if (seg.state === "rejected") return null
                              if (seg.state === "accepted" && seg.fromReplacement) return null
                              const opacity = "opacity-100"
                              if (seg.fromReplacement) {
                                return (
                                  <span
                                    key={idx}
                                    style={{
                                      display: "inline",
                                      backgroundColor: "#fca5a5",
                                      textDecoration: "line-through",
                                      textDecorationColor: "#dc2626",
                                      color: "#7f1d1d",
                                      marginRight: "4px",
                                      padding: "2px",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {seg.text}
                                  </span>
                                )
                              }
                              return (
                                <span
                                  key={idx}
                                  className={["rounded-sm px-0.5", opacity].join(" ")}
                                  style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                                    textDecoration: "line-through",
                                    color: seg.fromReplacement ? "#ef4444" : "inherit",
                                    marginRight: seg.fromReplacement ? "2px" : undefined,
                                  }}
                                >
                                  {seg.text}
                                </span>
                              )
                            })}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                    {t("contracts.nav.back")}
                  </Button>
                  <Button type="button" size="sm" onClick={() => setCurrentStep(3)}>
                    {t("redline.actions.download")}
                  </Button>
                </div>
              </div>

              <Card className="h-fit space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">{t("redline.changes.title")}</h2>
                  <span className="text-xs text-muted-foreground">
                    {acceptedCount} / {changes.length}
                  </span>
                </div>

                <p className="mb-2 text-xs text-muted-foreground">
                  {changes.length} {t("redline.changes.total")} —{" "}
                  {t("redline.changes.scrollHint")}
                </p>

                <div
                  className="flex flex-col gap-3 overflow-y-auto pr-2"
                  style={{ maxHeight: "480px" }}
                >
                  {[...changes]
                    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                    .map((c) => (
                    <div key={c.id} className="rounded-md border bg-muted/20 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={[
                                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                typeBadgeClasses(c.type),
                              ].join(" ")}
                            >
                              {c.type === "addition"
                                ? t("redline.changes.addition")
                                : c.type === "deletion"
                                  ? t("redline.changes.deletion")
                                  : t("redline.changes.replacement")}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {t("redline.changes.position")} {c.position}
                            </span>
                          </div>
                          {c.reason && (
                            <p className="mt-2 text-xs text-muted-foreground">
                              {c.reason}
                            </p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={c.accepted === true ? "default" : "outline"}
                            onClick={() =>
                              setChanges((prev) =>
                                prev.map((x) => (x.id === c.id ? { ...x, accepted: true } : x))
                              )
                            }
                          >
                            ✓
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant={c.accepted === false ? "default" : "outline"}
                            onClick={() =>
                              setChanges((prev) =>
                                prev.map((x) => (x.id === c.id ? { ...x, accepted: false } : x))
                              )
                            }
                          >
                            ✗
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.1fr)]">
              <Card className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {t("redline.actions.download")}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {acceptedCount} / {changes.length} accepted
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={handleDownloadDocx}>
                      {t("redline.actions.download")}
                    </Button>
                    <Button type="button" size="sm" onClick={handleSaveSession}>
                      {t("redline.actions.saveSession")}
                    </Button>
                  </div>
                </div>

                {saveSuccess && (
                  <p className="mt-3 text-sm font-medium text-emerald-600">
                    Session saved successfully!
                  </p>
                )}
                {saveError && (
                  <p className="mt-3 text-sm text-destructive" role="alert">
                    {saveError}
                  </p>
                )}

                {error && (
                  <p className="mt-4 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Original</h3>
                    <div className="rounded-md border bg-muted/40 p-4">
                      <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {originalText}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Final (accepted applied)</h3>
                    <div className="rounded-md border bg-muted/40 p-4">
                      <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {finalizedText}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
                    {t("contracts.nav.back")}
                  </Button>
                </div>
              </Card>

              <Card className="h-fit space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">{t("redline.sessions.title")}</h2>
                  <Button type="button" variant="outline" size="sm" onClick={() => void loadSessions()}>
                    Refresh
                  </Button>
                </div>

                {sessionsError && (
                  <p className="text-sm text-destructive">{sessionsError}</p>
                )}

                {sessionsLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading…</span>
                  </div>
                ) : sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("redline.sessions.empty")}</p>
                ) : (
                  <div className="space-y-2">
                    {visibleSessions.map((s) => (
                      <div
                        key={s.id}
                        className="w-full rounded-md border bg-muted/20 px-3 py-2 text-left"
                      >
                        {(() => {
                          const parsed = Array.isArray(s.changes)
                            ? (s.changes as unknown[])
                            : typeof s.changes === "string"
                              ? (() => {
                                  try {
                                    const json = extractJson(String(s.changes))
                                    const p = JSON.parse(json)
                                    return Array.isArray(p) ? (p as unknown[]) : []
                                  } catch {
                                    return []
                                  }
                                })()
                              : []
                          const changeCount = parsed.length

                          return (
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {s.original_filename}
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {new Date(s.created_at).toLocaleDateString()} · {changeCount}{" "}
                                  {t("redline.sessions.changes")}
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFile(null)
                                  setFileName(s.original_filename)
                                  setFileSize(null)
                                  setOriginalText(s.original_content ?? "")

                                  const normalized = parsed
                                    .map((raw, i) => {
                                      const c = normalizeChange(raw, i)
                                      if (!c) return null
                                      const accepted =
                                        typeof (raw as any)?.accepted === "boolean"
                                          ? Boolean((raw as any).accepted)
                                          : null
                                      return { ...c, accepted }
                                    })
                                    .filter(Boolean) as RedlineChange[]

                                  setChanges(normalized)
                                  setCurrentStep(2)
                                }}
                              >
                                {t("redline.actions.loadSession")}
                              </Button>
                            </div>
                          )
                        })()}
                      </div>
                    ))}
                  </div>
                )}

                {sessions.length > 0 && totalSessionPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSessionsPage((p) => p - 1)}
                      disabled={sessionsPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {sessionsPage} of {totalSessionPages}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSessionsPage((p) => p + 1)}
                      disabled={sessionsPage === totalSessionPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          )}
        </Card>

        <Card className="border-border/80 p-6">
          <h2 className="text-lg font-semibold">{t("nav.redline")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("redline.header.subtitle")}
          </p>
        </Card>
      </div>
    </div>
  )
}

