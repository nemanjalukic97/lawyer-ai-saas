import { NextRequest } from "next/server"

export const maxDuration = 60

import { legislationChunkPreview, retrieveLegalContext } from "@/lib/legalRag"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await req.json()) as {
    query: string
    jurisdiction: string
    category?: string
    k?: number
  }

  const result = await retrieveLegalContext(
    body.query,
    body.jurisdiction,
    { category: body.category, k: body.k },
  )

  return Response.json({
    chunksRetrieved: result.chunks.length,
    confidence: result.confidence,
    topSimilarity: result.topSimilarity,
    hasStrongMatch: result.hasStrongMatch,
    areaInference: result.areaInference
      ? {
          inferredArea: result.areaInference.inferredArea,
          applied: result.areaInference.applied,
          skippedReason: result.areaInference.skippedReason,
          source: result.areaInference.source ?? null,
        }
      : null,
    chunks: result.chunks.map((c) => {
      const { preview, fromLocal } = legislationChunkPreview(c, 300)
      return {
        law_name_local: c.law_name_local,
        article_num: c.article_num,
        paragraph_num: c.paragraph_num,
        similarity: c.similarity,
        text_preview: preview,
        previewIsLocal: fromLocal,
      }
    }),
  })
}
