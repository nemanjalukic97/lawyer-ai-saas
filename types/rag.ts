export type RagSource = {
  law_name_local: string
  article_num: string
  paragraph_num: string | null
  text_preview: string
  similarity: number
}

export type RagValidation = {
  valid: boolean
  citedArticles: string[]
  invalidCitations: string[]
  missingCitations: string[]
}

export type RagMetadata = {
  confidence: "high" | "medium" | "low" | "none"
  topSimilarity: number
  hasStrongMatch: boolean
  chunksRetrieved: number
  answerMode: string
  validation: RagValidation | null
  sources: RagSource[]
}

