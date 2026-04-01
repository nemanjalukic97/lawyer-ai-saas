import { NextRequest } from "next/server"

import { retrieveLegalContext } from "@/lib/legalRag"
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
    chunks: result.chunks.map((c) => ({
      law_name_local: c.law_name_local,
      article_num: c.article_num,
      paragraph_num: c.paragraph_num,
      similarity: c.similarity,
      text_preview: c.text.slice(0, 300),
    })),
  })
}
