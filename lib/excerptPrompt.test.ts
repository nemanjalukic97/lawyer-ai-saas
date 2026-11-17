/**
 * Run: npx tsx --test lib/excerptPrompt.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import dotenv from "dotenv"
import type { LegalChunk, RagResult } from "./legalRag"

dotenv.config({ path: ".env.local" })

function chunk(fields: {
  law: string
  article: string
  paragraph?: string | null
  is_excerpt?: boolean
  text?: string
}): LegalChunk {
  const text = fields.text ?? "Tekst odredbe."
  return {
    id: "1",
    jurisdiction: "serbia",
    law_name: fields.law,
    law_name_local: fields.law,
    law_category: "labor",
    article_num: fields.article,
    paragraph_num: fields.paragraph ?? null,
    is_excerpt: fields.is_excerpt,
    text,
    text_local: text,
    source_url: null,
    similarity: 0.9,
  }
}

function rag(chunks: LegalChunk[]): RagResult {
  return {
    chunks,
    contextBlock: "",
    hasStrongMatch: true,
    topSimilarity: 0.9,
    confidence: "high",
  }
}

test("an excerpt chunk is labelled with the law and no article number", async () => {
  const { joinLegalChunksRaw } = await import("./legalRag")
  const raw = joinLegalChunksRaw([
    chunk({
      law: "СТРАТЕГИЈУ за социјално укључивање Рома и Ромкиња",
      article: "258",
      paragraph: "4",
      is_excerpt: true,
      text: "програме социјалног становања за Роме",
    }),
  ])
  assert.match(raw, /EXCERPT: no article number/)
  assert.doesNotMatch(raw, /ARTICLE:/)
  assert.doesNotMatch(raw, /258/)
  assert.doesNotMatch(raw, /§/)
})

test("a real article keeps its number", async () => {
  const { joinLegalChunksRaw } = await import("./legalRag")
  const raw = joinLegalChunksRaw([
    chunk({
      law: "ЗАКОН о раду",
      article: "2",
      paragraph: "1",
      is_excerpt: false,
      text: "Члан 2.\nОвај закон ступа на снагу.",
    }),
  ])
  assert.match(raw, /ARTICLE: 2 §1/)
  assert.doesNotMatch(raw, /EXCERPT:/)
})

test("extracted mode allows a law-name citation for an excerpt and forbids inventing a number", async () => {
  const { buildRagSystemPrompt } = await import("./legalRag")
  const withExcerpt = buildRagSystemPrompt(
    "base",
    rag([chunk({ law: "ZAKON O ADMINISTRATIVNIM TAKSAMA", article: "27", is_excerpt: true })]),
    "montenegro",
    "Serbian",
    "extracted",
  )
  assert.match(withExcerpt, /EXCERPT BLOCKS HAVE NO ARTICLE NUMBER/)
  assert.match(withExcerpt, /\(Law Name Local\)/)
  assert.match(withExcerpt, /Do not invent an article number/)
  assert.match(withExcerpt, /EXCERPT SOURCES/)

  const realOnly = buildRagSystemPrompt(
    "base",
    rag([chunk({ law: "ЗАКОН о раду", article: "2", is_excerpt: false })]),
    "serbia",
    "Serbian",
    "extracted",
  )
  assert.doesNotMatch(realOnly, /EXCERPT BLOCKS HAVE NO ARTICLE NUMBER/)
})

test("the detector matches Serbian citation forms", async () => {
  const { extractArticleReferences } = await import("./legalRag")
  assert.deepEqual(extractArticleReferences("Члан 26"), ["26"])
  assert.deepEqual(extractArticleReferences("(Član 26, Zakon)"), ["26"])
  assert.deepEqual(extractArticleReferences("Člen 5"), ["5"])
  assert.deepEqual(extractArticleReferences("Čl. 5"), ["5"])
  assert.deepEqual(extractArticleReferences("Чл. 12"), ["12"])
  assert.deepEqual(extractArticleReferences("Article 5 and Art. 7"), ["5", "7"])
  assert.deepEqual(extractArticleReferences("Artikkel 3"), ["3"])
})

test("a Cyrillic number is rejected for an excerpt and accepted for a real article", async () => {
  const { validateCitations } = await import("./legalRag")
  const law = "ZAKON O ADMINISTRATIVNIM TAKSAMA"
  const excerpt = chunk({ law, article: "585", is_excerpt: true })
  const real = chunk({ law, article: "585", is_excerpt: false })
  const numbered = `(Члан 585, ${law})`

  const rejected = validateCitations(numbered, [excerpt], "extracted")
  assert.equal(rejected.valid, false)
  assert.deepEqual(rejected.invalidCitations, ["585"])

  const accepted = validateCitations(numbered, [real], "extracted")
  assert.equal(accepted.valid, true)
  assert.deepEqual(accepted.invalidCitations, [])

  const lawOnly = validateCitations(`(${law})`, [excerpt], "extracted")
  assert.equal(lawOnly.valid, true)
  assert.deepEqual(lawOnly.citedArticles, [])
})
