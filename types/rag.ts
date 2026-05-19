export type CaseLawSource = {
  court: string
  case_number: string
  decision_date: string | null
  legal_question: string
  court_position: string
  reasoning: string
  headnote: string | null
  outcome: string | null
  keywords: string[] | null
  related_articles: string[] | null
  similarity: number
}

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
  caseLawSources: CaseLawSource[]
  caseLawConfidence: "high" | "medium" | "low" | "none"
}

