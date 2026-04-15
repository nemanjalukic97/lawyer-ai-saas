import OpenAI from "openai"
import { supabaseAdmin } from "./supabase/admin"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type LegalChunk = {
  id: string
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num: string | null
  text: string
  text_local: string | null
  source_url: string | null
  similarity: number
}

export type CitationValidation = {
  valid: boolean
  citedArticles: string[]
  invalidCitations: string[]
  missingCitations: string[]
}

export type RagResult = {
  chunks: LegalChunk[]
  contextBlock: string
  hasStrongMatch: boolean
  topSimilarity: number
  confidence: "high" | "medium" | "low"
}

export type AnswerMode = "extracted" | "analytical" | "auto" | "drafting"

const SIMILARITY_THRESHOLDS = {
  HIGH: 0.65,
  MEDIUM: 0.30,
  LOW_RETRY: 0.22,
}

const RPC_TIMEOUT_MS = 5000

const MAX_CONTEXT_CHARS = 12000

async function embedQuery(text: string): Promise<number[]> {
  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })

    const embedding = res.data?.[0]?.embedding
    if (!embedding) throw new Error("missing embedding")
    return embedding
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new Error(`Embedding failed: ${reason}`)
  }
}

async function runMatchLegalArticlesRpc(args: {
  embedding: number[]
  jurisdiction: string
  category: string | null
  matchCount: number
  similarityThreshold: number
}): Promise<LegalChunk[]> {
  const rpcCall = supabaseAdmin.rpc("match_legal_articles", {
    query_embedding: args.embedding,
    filter_jurisdiction: args.jurisdiction,
    filter_category: args.category,
    match_count: args.matchCount,
    similarity_threshold: args.similarityThreshold,
  })

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("RAG RPC timeout after 5000ms")),
      RPC_TIMEOUT_MS,
    ),
  )

  const { data, error } = (await Promise.race([
    rpcCall,
    timeoutPromise,
  ])) as { data: LegalChunk[] | null; error: { message: string } | null }

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as LegalChunk[]
}

export async function matchLegalArticles(args: {
  query: string
  jurisdiction: string
  category?: string | null
  matchCount?: number
  similarityThreshold?: number
  retryIfEmpty?: boolean
}): Promise<{
  chunks: LegalChunk[]
  usedThreshold: number
  retried: boolean
}> {
  const embedding = await embedQuery(args.query)

  const initialThreshold =
    args.similarityThreshold ?? SIMILARITY_THRESHOLDS.MEDIUM
  const shouldRetry =
    args.retryIfEmpty !== false && initialThreshold > SIMILARITY_THRESHOLDS.LOW_RETRY

  let usedThreshold = initialThreshold
  let retried = false

  let data = await runMatchLegalArticlesRpc({
    embedding,
    jurisdiction: args.jurisdiction,
    category: args.category ?? null,
    matchCount: args.matchCount ?? 6,
    similarityThreshold: initialThreshold,
  })

  if (data.length === 0 && shouldRetry) {
    // eslint-disable-next-line no-console
    console.log(
      `[RAG] no results at threshold ${initialThreshold}, retrying with 0.40`,
    )
    retried = true
    usedThreshold = SIMILARITY_THRESHOLDS.LOW_RETRY
    data = await runMatchLegalArticlesRpc({
      embedding,
      jurisdiction: args.jurisdiction,
      category: args.category ?? null,
      matchCount: args.matchCount ?? 6,
      similarityThreshold: SIMILARITY_THRESHOLDS.LOW_RETRY,
    })
  }

  return { chunks: data, usedThreshold, retried }
}

function deduplicateChunks(chunks: LegalChunk[]): LegalChunk[] {
  const map = new Map<string, LegalChunk>()

  for (const chunk of chunks) {
    const key = `${chunk.law_name}-${chunk.article_num}`
    const existing = map.get(key)
    if (!existing || chunk.similarity > existing.similarity) {
      map.set(key, chunk)
    }
  }

  return Array.from(map.values()).sort((a, b) => b.similarity - a.similarity)
}

function truncateContextBlock(text: string): string {
  if (text.length > MAX_CONTEXT_CHARS) {
    return (
      text.slice(0, MAX_CONTEXT_CHARS) +
      "\n\n[Context truncated to fit token limits. \n    Additional provisions may exist in the database.]"
    )
  }
  return text
}

export function formatContextBlock(chunks: LegalChunk[]): string {
  const jurisdiction = (chunks[0]?.jurisdiction ?? "").toUpperCase()

  const formattedChunks = chunks.map((chunk) => {
    const paragraphSuffix = chunk.paragraph_num ? " §" + chunk.paragraph_num : ""
    return `[LAW: ${chunk.law_name_local} | ARTICLE: ${chunk.article_num}${paragraphSuffix}]\n${chunk.text}`
  })

  const joined = formattedChunks.join("\n\n---\n\n")
  const block = `LEGAL PROVISIONS (${jurisdiction}):\n\n${joined}`
  return truncateContextBlock(block)
}

export function extractArticleReferences(text: string): string[] {
  const matches: string[] = []
  for (const match of text.matchAll(
    /\b(?:Član|Člen|Čl\.|Art\.|Article|Artikkel)\s+(\d+)/gi,
  )) {
    const value = (match[1] ?? "").trim()
    if (value) matches.push(value)
  }

  return Array.from(new Set(matches)).sort((a, b) => a.localeCompare(b))
}

function normalizeArticleNumber(raw: string): string {
  const trimmed = raw.trim().toLowerCase()
  const normalized = trimmed.replace(/^0+(\d)/, "$1")
  return normalized === "" ? trimmed : normalized
}

export function validateCitations(
  aiResponse: string,
  chunks: LegalChunk[],
  mode?: string,
): CitationValidation {
  if (mode === "drafting") {
    return {
      valid: true,
      citedArticles: [],
      invalidCitations: [],
      missingCitations: [],
    }
  }
  if (chunks.length === 0) {
    return {
      valid: true,
      citedArticles: [],
      invalidCitations: [],
      missingCitations: [],
    }
  }

  const citedArticles = extractArticleReferences(aiResponse).filter((cited) => {
    const n = Number.parseInt(cited, 10)
    if (!Number.isFinite(n) || n < 1 || n > 9) return true

    const re = new RegExp(
      String.raw`\b(?:Član|Člen|Article)\b[\s\S]{0,20}\b${n}\b`,
      "i",
    )
    return re.test(aiResponse)
  })

  const validArticleNumbers = new Set<string>()
  for (const chunk of chunks) {
    validArticleNumbers.add(normalizeArticleNumber(chunk.article_num))
  }

  const normalizedCited = citedArticles.map((c) => normalizeArticleNumber(c))

  const invalidCitations = citedArticles.filter(
    (_cited, idx) => !validArticleNumbers.has(normalizedCited[idx] ?? ""),
  )

  const aiLower = aiResponse.toLowerCase()
  const missingCitations = chunks
    .map((c) => c.article_num)
    .filter((articleNum) => !aiLower.includes(articleNum.toLowerCase()))

  const valid = citedArticles.length > 0 && invalidCitations.length === 0

  return {
    valid,
    citedArticles,
    invalidCitations,
    missingCitations,
  }
}

export async function retrieveLegalContext(
  query: string,
  jurisdiction: string,
  options?: {
    category?: string
    k?: number
    similarityThreshold?: number
  },
): Promise<RagResult> {
  const { chunks: rawChunks } = await matchLegalArticles({
    query,
    jurisdiction,
    category: options?.category ?? null,
    matchCount: options?.k ?? 6,
    similarityThreshold: options?.similarityThreshold,
    retryIfEmpty: true,
  })

  const chunks = deduplicateChunks(rawChunks)

  const topSimilarity = chunks[0]?.similarity ?? 0
  const hasStrongMatch = topSimilarity >= SIMILARITY_THRESHOLDS.HIGH

  const confidence: RagResult["confidence"] =
    topSimilarity >= SIMILARITY_THRESHOLDS.HIGH
      ? "high"
      : topSimilarity >= SIMILARITY_THRESHOLDS.MEDIUM
      ? "medium"
      : "low"

  const contextBlock = formatContextBlock(chunks)

  return {
    chunks,
    contextBlock,
    hasStrongMatch,
    topSimilarity,
    confidence,
  }
}

export function getAnswerMode(
  featureType: string,
  confidence: RagResult["confidence"],
): AnswerMode {
  if (featureType === "contract_generation") return "drafting"
  if (featureType === "document_generation") return "drafting"
  if (confidence === "low") return "extracted"
  if (featureType === "case_prediction") return "extracted"
  if (featureType === "document_analysis") return "extracted"
  return "auto"
}

export function buildRagSystemPrompt(
  basePrompt: string,
  ragResult: RagResult,
  jurisdiction: string,
  outputLanguage: string,
  answerMode: AnswerMode = "auto",
): string {
  const confidenceWarning =
    ragResult.confidence === "high"
      ? ""
      : ragResult.confidence === "medium"
      ? "⚠️ CONFIDENCE: MEDIUM — The retrieved provisions \nmay not directly address this specific question.\nOnly cite articles that are genuinely relevant to \nthe legal question asked. If an article is about \na completely different topic (e.g. administrative \nlaw, criminal law, trade secrets) and the question \nis about contract validity, do NOT cite it.\nState clearly which aspects are and are not covered \nby the retrieved provisions."
      : "⚠️ CONFIDENCE: LOW — The retrieved provisions have weak relevance \n   to this query. Do NOT provide a definitive legal conclusion. State \n   explicitly that the directly applicable provision may not be in \n   the database yet."

  const extractedBlock = `=== ANSWER FORMAT (EXTRACTED MODE) ===

CRITICAL — MANDATORY CITATION FORMAT:
Every sentence that states a legal fact or legal 
rule MUST end with a citation in this exact format:
(Član X, Law Name Local) — for Serbian/Bosnian/Croatian
(Člen X, Law Name Local) — for Slovenian

EXAMPLES OF CORRECT RESPONSES:
✓ 'Ugovor o prodaji mora biti zaključen u pisanoj 
   formi (Član 26, Zakon o obligacionim odnosima).'
✓ 'Kupac je dužan da plati cenu u roku određenom 
   ugovorom (Član 488, Zakon o obligacionim odnosima).'
✓ 'Predmet ugovora mora biti u prometu (Član 458, 
   Zakon o obligacionim odnosima).'

EXAMPLES OF WRONG RESPONSES (NO CITATION = INVALID):
✗ 'Ugovor o prodaji mora biti zaključen u pisanoj formi.'
✗ 'Ne postoji zakonski zahtev za notarsku overu.'
✗ 'Tužilac ima pravo na naknadu štete.'

If you cannot find a retrieved article that supports 
a legal claim, DO NOT make that claim.
Every legal sentence needs its own citation.
General statements without citations are forbidden.
IMPORTANT: Every single legal claim in EVERY section must 
include a citation in this format: (Član X, Law Name)
If you cannot cite a retrieved article for a claim, 
do not make that claim.

RULE 5 — RELEVANCE CHECK:
Before citing any article, verify it is actually 
relevant to the specific legal question asked.
Do NOT cite an article just because it was retrieved.
Only cite articles whose content directly answers 
the question.
If no retrieved article is directly relevant to a 
specific claim, do not make that claim.

STEP 1 — IDENTIFY:
State which articles apply. Format:
"Primenjuju se: Član X (Law Name), Član Y (Law Name)"

STEP 2 — QUOTE:
Quote the exact relevant sentence(s) with citation.
Format: "..." (Član X, Law Name)

STEP 3 — LEGAL ANALYSIS:
Every sentence that states a legal fact MUST end with 
a citation: (Član X, Law Name)
Never write a legal conclusion without citing its source.

STEP 4 — APPLY TO FACTS:
Apply the cited articles to the specific case facts.
Every application must reference the cited article.

STEP 5 — CONCLUSION:
One sentence with at least one citation.

STEP 6 — SOURCES:
List ALL articles cited above:
- Član X — Law Name Local`

  const analyticalBlock = `=== ANSWER FORMAT (ANALYTICAL MODE) ===

CRITICAL — MANDATORY CITATION FORMAT:
Every sentence that states a legal fact or legal 
rule MUST end with a citation in this exact format:
(Član X, Law Name Local) — for Serbian/Bosnian/Croatian
(Člen X, Law Name Local) — for Slovenian

EXAMPLES OF CORRECT RESPONSES:
✓ 'Ugovor o prodaji mora biti zaključen u pisanoj 
   formi (Član 26, Zakon o obligacionim odnosima).'
✓ 'Kupac je dužan da plati cenu u roku određenom 
   ugovorom (Član 488, Zakon o obligacionim odnosima).'
✓ 'Predmet ugovora mora biti u prometu (Član 458, 
   Zakon o obligacionim odnosima).'

EXAMPLES OF WRONG RESPONSES (NO CITATION = INVALID):
✗ 'Ugovor o prodaji mora biti zaključen u pisanoj formi.'
✗ 'Ne postoji zakonski zahtev za notarsku overu.'
✗ 'Tužilac ima pravo na naknadu štete.'

If you cannot find a retrieved article that supports 
a legal claim, DO NOT make that claim.
Every legal sentence needs its own citation.
General statements without citations are forbidden.
RULE 5 — RELEVANCE CHECK:
Before citing any article, verify it is actually 
relevant to the specific legal question asked.
Do NOT cite an article just because it was retrieved.
Only cite articles whose content directly answers 
the question.
If no retrieved article is directly relevant to a 
specific claim, do not make that claim.
Structure your answer as:

APPLICABLE PROVISION:
[Quote the most relevant sentence(s) from the retrieved article(s)]

LEGAL ANALYSIS:
[Explain what this means in context. Cite articles inline using 
the format: (Article X, Law Name)]

CONCLUSION:
[One sentence summary of the legal position]

SOURCES:
[List every article cited: law name local, article number, 
paragraph if applicable]`

  const draftingBlock = `=== DOCUMENT DRAFTING MODE ===

You are drafting a legal document, NOT analyzing a case.

DRAFTING RULES:
1. Write proper contract clauses based on the 
   legal provisions in the LEGAL KNOWLEDGE BASE above.
2. Do NOT cite article numbers inline in contract 
   clauses — contracts do not contain citations.
3. DO include a LEGAL BASIS section at the end 
   listing which laws this contract is based on:
   Format: "Pravni osnov: [Law Name], [Law Name]"
4. Ensure all clauses comply with the retrieved 
   legal provisions.
5. Write in the language specified by outputLanguage.
6. Structure the document professionally with 
   numbered clauses.`

  const useExtractedFormat =
    ragResult.confidence === "low" ||
    answerMode === "extracted" ||
    (answerMode === "auto" && ragResult.confidence !== "high")

  let answerFormatBlock: string
  if (answerMode === "drafting") {
    answerFormatBlock = draftingBlock
  } else if (useExtractedFormat) {
    answerFormatBlock = extractedBlock
  } else {
    answerFormatBlock = analyticalBlock
  }

  return (
    basePrompt +
    `\n\n"""\n\n=== LEGAL KNOWLEDGE BASE (${jurisdiction.toUpperCase()}) ===\n\n${ragResult.contextBlock}\n\n=== MANDATORY RULES — READ BEFORE ANSWERING ===\n\nRULE 1 — CITATION REQUIRED:\nEvery legal claim must cite its source in this exact format:\n  \"(Article X, {law_name_local})\"\nExample: \"The employer must provide a written contract \n(Article 30, Zakon o radu)\"\n\nRULE 2 — NO EXTERNAL KNOWLEDGE:\nYou are ONLY permitted to use the legal provisions listed above.\nNEVER recall, infer, or generate articles from your training data.\nNEVER cite an article not present in the LEGAL KNOWLEDGE BASE above.\nIf you cannot answer from the provided provisions, respond with:\n  \"The applicable provision was not found in the loaded legal \n   database for ${jurisdiction}.\"\n\nRULE 3 — NO SEMANTIC DRIFT:\nDo not reinterpret, expand, or generalize beyond what is explicitly \nwritten in the provision text. Only restate or closely paraphrase \nwhat is written. Do not add meaning that is not present.\n\nRULE 4 — LANGUAGE:\nWrite your entire response in ${outputLanguage}.\nCitation references may use the local law name regardless of \noutput language.\n\n${confidenceWarning}\n\n${answerFormatBlock}\n\"\"\"`
  )
}

