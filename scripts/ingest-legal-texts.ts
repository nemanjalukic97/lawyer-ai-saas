import { createHash } from "crypto"
import dotenv from "dotenv"
import OpenAI from "openai"

import { ADDITIONAL_LEGAL_ARTICLES } from "./legal-articles-append"
import { CRIMINAL_ARTICLES } from "./legal-articles-criminal"

dotenv.config({ path: ".env.local" })

export type LegalArticleInput = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num?: string
  text: string
  text_local?: string
  source_url?: string
  effective_date?: string
}

const SAMPLE_ARTICLES: LegalArticleInput[] = [
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "1",
    text: "This Law regulates employment relationships, rights, obligations and responsibilities arising from employment, between employees and employers, as well as other issues arising from employment relationships or relating to employment relationships, unless otherwise regulated by a special law.",
    text_local:
      "Ovim zakonom uređuju se prava, obaveze i odgovornosti iz radnog odnosa, odnosno po osnovu rada, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "7",
    text: "An employee, within the meaning of this Law, is a natural person who is employed by an employer and performs work for a salary.",
    text_local:
      "Zaposleni, u smislu ovog zakona, jeste fizičko lice koje je u radnom odnosu kod poslodavca.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "18",
    text: "Direct and indirect discrimination of a person seeking employment and an employee is prohibited on grounds of gender, date of birth, language, race, color of skin, nationality, social origin, citizenship, religion or belief, political or other opinion, financial status, membership in political and trade union organizations, health condition, disability, marital and family status, pregnancy, maternity, family obligations, sexual orientation, gender identity, expression of gender and sexual characteristics, level and type of education and other characteristics.",
    text_local:
      "Zabranjuje se neposredna i posredna diskriminacija lica koja traže zaposlenje, kao i zaposlenih, s obzirom na pol, rođenje, jezik, rasu, boju kože, starost, trudnoću, zdravstveno stanje, odnosno invalidnost, nacionalnu pripadnost, veroispovest, bračni status, porodične obaveze, seksualno opredeljenje, političko ili drugo uverenje, socijalno poreklo, imovinsko stanje, članstvo u političkim organizacijama, sindikatima ili neko drugo lično svojstvo.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "30",
    text: "An employment contract shall be concluded in writing before the employee commences work. If the employer fails to conclude an employment contract with the employee in writing before commencing work, it is considered that the employee has concluded an employment contract for an indefinite period.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku pre stupanja zaposlenog na rad. Ako poslodavac nije zaključio ugovor o radu sa zaposlenim u pisanom obliku pre stupanja na rad, smatra se da je zaposleni zasnovao radni odnos na neodređeno vreme.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "32",
    text: "The employment contract must contain: the name and registered seat of the employer; personal name of the employee, place of residence or temporary address of the employee; type and description of work the employee is to perform; place of work; type of employment (definite or indefinite); duration of employment for a fixed-term employment contract; date of commencement of work; working hours (full-time, part-time, reduced working hours); amount of basic salary in monetary terms; elements for determining basic salary, work performance, salary compensation, increased salary and other earnings of the employee; deadlines for payment of salary and other earnings; duration of daily and weekly working hours.",
    text_local:
      "Ugovor o radu sadrži: naziv i sedište poslodavca; lično ime zaposlenog, mesto prebivališta, odnosno boravišta zaposlenog; vrstu i opis poslova koje zaposleni treba da obavlja; mesto rada; vrstu radnog odnosa (na neodređeno ili određeno vreme); trajanje ugovora o radu na određeno vreme i osnov za zasnivanje radnog odnosa na određeno vreme; datum početka rada; radno vreme (puno, nepuno ili skraćeno); novčani iznos osnovne zarade na dan zaključenja ugovora o radu; elemente za utvrđivanje osnovne zarade, radnog učinka, naknade zarade, uvećane zarade i drugih primanja zaposlenog; rokove za isplatu zarade i drugih primanja zaposlenog; trajanje dnevnog i nedeljnog radnog vremena.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "1",
    text: "This Law regulates obligations relationships arising from contracts, torts, unjust enrichment, unauthorized management of another's affairs, and unilateral statements of will.",
    text_local:
      "Ovim zakonom uređuju se obligacioni odnosi koji nastaju iz ugovora, prouzrokovanja štete, sticanja bez osnova, poslovodstva bez naloga i jednostranih izjava volje.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "16",
    text: "Parties may regulate their obligations relationships in any manner within the limits of mandatory provisions, morality and public order.",
    text_local:
      "Strane mogu svoje obligacione odnose uređivati po svojoj volji, ali ne i protivno prinudnim propisima, javnom poretku i dobrim poslovnim običajima.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "26",
    text: "When a contract is concluded in a particular form required by law, the same form is required for any subsequent agreement to amend or supplement such contract.",
    text_local:
      "Kad je za zaključenje ugovora propisana posebna forma, ugovor je zaključen kad je ta forma ispunjena.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "124",
    text: "Whoever causes damage to another is obliged to repair it, unless it is proven that the damage occurred without fault on their part.",
    text_local:
      "Ko drugome prouzrokuje štetu, dužan je naknaditi je ako ne dokaže da je šteta nastala bez njegove krivice.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "262",
    text: "A contract is concluded when the contracting parties have agreed upon its essential elements. If according to the agreement of the parties a contract is to be concluded in a particular form, a contract shall be considered concluded only when it is done in that form.",
    text_local:
      "Ugovor je zaključen kad su se ugovorne strane saglasile o bitnim sastojcima ugovora. Ako je po sporazumu stranaka zaključenje ugovora uslovljeno određenom formom, ugovor se smatra zaključenim tek kad je forma ispunjena.",
  },
  ...(ADDITIONAL_LEGAL_ARTICLES as LegalArticleInput[]),
  ...(CRIMINAL_ARTICLES as LegalArticleInput[]),
]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function stableIdForArticle(article: LegalArticleInput): string {
  const key = [
    article.jurisdiction,
    article.law_name_local,
    article.article_num,
    article.paragraph_num ?? "",
  ].join("|")

  const bytes = createHash("sha256").update(key).digest()

  // Build UUID from first 16 bytes, setting version(4) + variant(RFC 4122).
  const b = bytes.subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80

  const hex = Buffer.from(b).toString("hex")
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function embed(article: LegalArticleInput): Promise<number[]> {
  const input = `${article.law_name_local} ${article.article_num}${
    article.paragraph_num ? " §" + article.paragraph_num : ""
  }: ${article.text_local ?? ""} ${article.text ?? ""}`

  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  })

  const embedding = res.data?.[0]?.embedding
  if (!embedding || embedding.length !== 1536) {
    throw new Error(
      `Unexpected embedding length: ${embedding ? embedding.length : "missing"}`,
    )
  }

  return embedding
}

export async function checkExisting(): Promise<number> {
  const { supabaseAdmin } = await import("../lib/supabase/admin")
  const { data, error } = await supabaseAdmin
    .from("legal_articles")
    .select("jurisdiction")

  if (error) throw error

  const counts = new Map<string, number>()
  for (const row of data ?? []) {
    const j = (row as { jurisdiction?: string }).jurisdiction ?? "unknown"
    counts.set(j, (counts.get(j) ?? 0) + 1)
  }

  const entries = [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))
  for (const [jurisdiction, count] of entries) {
    // eslint-disable-next-line no-console
    console.log(`${jurisdiction}: ${count}`)
  }

  return (data ?? []).length
}

export async function ingest() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY env var.")
  }

  const existingTotal = await checkExisting()
  // eslint-disable-next-line no-console
  console.log(`Existing total: ${existingTotal}`)

  const jurisdictionSet = new Set<string>()
  const succeededByJurisdiction = new Map<string, number>()
  let succeeded = 0

  for (const article of SAMPLE_ARTICLES) {
    jurisdictionSet.add(article.jurisdiction)

    try {
      const embedding = await embed(article)
      const id = stableIdForArticle(article)

      const payload = {
        id,
        jurisdiction: article.jurisdiction,
        law_name: article.law_name,
        law_name_local: article.law_name_local,
        law_category: article.law_category,
        article_num: article.article_num,
        paragraph_num: article.paragraph_num ?? null,
        text: article.text,
        text_local: article.text_local ?? null,
        embedding,
        source_url: article.source_url ?? null,
        effective_date: article.effective_date ?? null,
      }

      const { supabaseAdmin } = await import("../lib/supabase/admin")
      const { error } = await supabaseAdmin
        .from("legal_articles")
        .upsert(payload, { onConflict: "id", ignoreDuplicates: true })

      if (error) throw error

      succeeded += 1
      succeededByJurisdiction.set(
        article.jurisdiction,
        (succeededByJurisdiction.get(article.jurisdiction) ?? 0) + 1,
      )
      // eslint-disable-next-line no-console
      console.log(
        `✓ ${article.jurisdiction} / ${article.law_name_local} / ${article.article_num}`,
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: ${article.jurisdiction} / ${article.law_name_local} / ${article.article_num}`,
        err,
      )
    }

    await sleep(200)
  }

  const jurisdictionOrder = [...succeededByJurisdiction.keys()].sort((a, b) =>
    a.localeCompare(b),
  )
  // eslint-disable-next-line no-console
  console.log("✅ Ingest summary (succeeded per jurisdiction):")
  for (const j of jurisdictionOrder) {
    // eslint-disable-next-line no-console
    console.log(`  ${j}: ${succeededByJurisdiction.get(j) ?? 0}`)
  }
  // eslint-disable-next-line no-console
  console.log(`✅ Total: ${succeeded} articles (${jurisdictionSet.size} jurisdictions)`)
}

async function testRetrieval() {
  // eslint-disable-next-line no-console
  console.log("\n🔍 Testing retrieval after ingestion...\n")

  const testCases = [
    {
      query: "Can an employer terminate an employment contract?",
      jurisdiction: "serbia",
      category: "labor",
    },
    {
      query: "What is the mandatory content of a contract?",
      jurisdiction: "croatia",
      category: "civil",
    },
    {
      query: "Working hours limits for employees",
      jurisdiction: "bih_fbih",
      category: "labor",
    },
  ]

  for (const tc of testCases) {
    const { retrieveLegalContext } = await import("../lib/legalRag")
    const result = await retrieveLegalContext(tc.query, tc.jurisdiction, {
      category: tc.category,
      k: 3,
    })

    // eslint-disable-next-line no-console
    console.log(`Query: "${tc.query}"`)
    // eslint-disable-next-line no-console
    console.log(
      `Jurisdiction: ${tc.jurisdiction} | Confidence: ${result.confidence} | Chunks: ${result.chunks.length}`,
    )

    result.chunks.forEach((c) => {
      // eslint-disable-next-line no-console
      console.log(
        `  → ${c.law_name_local}, ${c.article_num} (${(c.similarity * 100).toFixed(1)}%)`,
      )
    })
    // eslint-disable-next-line no-console
    console.log("")
  }
}

async function main() {
  await ingest()
  await testRetrieval()
}

// Allow running directly with `npx tsx scripts/ingest-legal-texts.ts`
if (process.argv[1]?.includes("ingest-legal-texts")) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exitCode = 1
  })
}

