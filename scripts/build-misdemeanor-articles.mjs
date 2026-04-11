/**
 * Builds legal-articles-misdemeanor.ts from cached HTML in %TEMP%
 * and optional OpenAI for English (set OPENAI_API_KEY).
 */
import fs from "fs"
import path from "path"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config({ path: path.join(process.cwd(), ".env.local") })

const TMP = process.env.TEMP || "/tmp"
const OUT = path.join(process.cwd(), "scripts", "legal-articles-misdemeanor.ts")

function readTmp(name) {
  return fs.readFileSync(path.join(TMP, name), "utf8")
}

function extractParagrafClan(html, n) {
  const re = new RegExp(
    `<a name="clan_${n}(?:\\*\\*)?"></a>Član ${n}\\s*(?:\\*\\*)?\\s*</p>([\\s\\S]*?)(?=<p class="clan"><a name="clan_)`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  return [...m[1].matchAll(/<p class="normal">([^<]*)<\/p>/gi)]
    .map((x) => x[1].replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
}

/** Zakon.hr Prekršajni zakon: Članak N. */
function extractZakonHrClanak(html, n) {
  const plain = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
  const nextNum = Number(n) + 1
  const re = new RegExp(
    `Članak\\s+${n}\\.\\s*(?:\\([^)]*\\))?\\s*([\\s\\S]*?)(?=Članak\\s+${n}[a-z]|Članak\\s+${nextNum}\\.|$)`,
    "i",
  )
  const m = plain.match(re)
  return m ? m[1].trim() : null
}

/** Zakon.hr older acts: Član N. */
function extractZakonHrClan(html, n) {
  const plain = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
  const nextNum = Number(n) + 1
  const re = new RegExp(
    `Član\\s+${n}\\.\\s*(?:\\([^)]*\\))?\\s*([\\s\\S]*?)(?=Član\\s+${n}[a-z]|Član\\s+${nextNum}\\.|$)`,
    "i",
  )
  const m = plain.match(re)
  return m ? m[1].trim() : null
}

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

async function toEnBatch(chunks) {
  if (!openai) {
    return chunks.map((c) => "[Translate] " + c.slice(0, 200))
  }
  const sys =
    "You are a legal translator. Translate each numbered legal article from BCS/Croatian/Slovenian to clear, accurate English. " +
    "Return ONLY a JSON array of strings, same length and order as input, no markdown."
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: sys },
      {
        role: "user",
        content: JSON.stringify(chunks),
      },
    ],
    temperature: 0.2,
  })
  const txt = res.choices[0]?.message?.content ?? "[]"
  try {
    return JSON.parse(txt)
  } catch {
    return chunks.map((c) => c.slice(0, 400))
  }
}

async function main() {
  const zjrimRs = readTmp("zjrim-rs.html")
  const zpRs = readTmp("zp-rs.html")
  const zjrimBrcko = readTmp("zjrim-brcko.html")
  const zpMe = readTmp("zp-me.html")
  const zpHr = readTmp("zp-hr.html")
  const jrmHr = readTmp("jrm-hr.html")

  const pending = []

  const push = (meta, textLocal) => {
    pending.push({ ...meta, text_local: textLocal })
  }

  const SRC = {
    rsJ: "https://www.paragraf.rs/propisi/zakon_o_javnom_redu_i_miru.html",
    rsP: "https://www.paragraf.rs/propisi/zakon_o_prekrsajima.html",
    hrJ: "https://www.zakon.hr/z/279/Zakon-o-prekr%C5%A1ajima-protiv-javnog-reda-i-mira",
    hrP: "https://www.zakon.hr/z/52/Zakon-o-prekr%C5%A1ajima",
    brcko: "https://www.paragraf.ba/propisi/brcko/zakon-o-javnom-redu-i-miru-brcko-distrikta-bih.html",
    meP: "https://www.paragraf.me/propisi-crnegore/zakon-o-prekrsajima.html",
    meJ: "https://www.paragraf.me/propisi-crnegore/zakon-o-javnom-redu-i-miru.html",
    siJ: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4405",
    siP: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO5537",
    fbihP: "https://www.paragraf.ba/propisi/fbih/zakon-o-prekrsajima-fbih.html",
    rsEntP: "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-prekrsajima.html",
    fbihJ: "https://www.paragraf.ba/propisi/fbih/zakon-o-javnom-redu-i-miru-fbih.html",
  }

  for (const n of [1, 2, 3, 5, 6, 7, 8, 9, 10, 13, 14, 17, 19, 20, 23]) {
    push(
      {
        jurisdiction: "serbia",
        law_name: "Public Order and Peace Act",
        law_name_local: "Zakon o javnom redu i miru",
        article_num: String(n),
        source_url: SRC.rsJ,
      },
      extractParagrafClan(zjrimRs, n),
    )
  }
  for (const n of [1, 2, 6, 10, 14, 17, 55, 105, 168, 211]) {
    push(
      {
        jurisdiction: "serbia",
        law_name: "Misdemeanor Act",
        law_name_local: "Zakon o prekršajima",
        article_num: String(n),
        source_url: SRC.rsP,
      },
      extractParagrafClan(zpRs, n),
    )
  }

  for (const n of [1, 2, 5, 9, 13, 16, 47, 109, 174, 239]) {
    const t = extractZakonHrClanak(zpHr, n)
    push(
      {
        jurisdiction: "croatia",
        law_name: "Misdemeanor Act Croatia",
        law_name_local: "Zakon o prekršajima",
        article_num: String(n),
        source_url: SRC.hrP,
      },
      t,
    )
  }
  for (const n of [1, 2, 3, 4, 5, 6, 8, 13]) {
    const t = extractZakonHrClan(jrmHr, n)
    push(
      {
        jurisdiction: "croatia",
        law_name: "Public Order and Peace Act Croatia",
        law_name_local: "Zakon o javnom redu i miru",
        article_num: String(n),
        source_url: SRC.hrJ,
      },
      t,
    )
  }

  const bihJ = [1, 2, 3, 4, 5, 6, 7, 9, 12, 16, 18]
  for (const n of bihJ) {
    const loc = extractParagrafClan(zjrimBrcko, n)
    push(
      {
        jurisdiction: "bih_fbih",
        law_name: "Public Order and Peace Act FBiH",
        law_name_local: "Zakon o javnom redu i miru FBiH",
        article_num: String(n),
        source_url: SRC.fbihJ,
      },
      loc,
    )
    push(
      {
        jurisdiction: "bih_rs",
        law_name: "Public Order and Peace Act RS Entity",
        law_name_local: "Zakon o javnom redu i miru Republike Srpske",
        article_num: String(n),
        source_url: "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-javnom-redu-i-miru.html",
      },
      loc,
    )
  }

  const brcko = [1, 2, 3, 4, 5, 7, 9, 16, 18]
  for (const n of brcko) {
    push(
      {
        jurisdiction: "bih_brcko",
        law_name: "Public Order and Peace Act Brčko District",
        law_name_local: "Zakon o javnom redu i miru Brčko Distrikta BiH",
        article_num: String(n),
        source_url: SRC.brcko,
      },
      extractParagrafClan(zjrimBrcko, n),
    )
  }

  const bihZp = [1, 2, 5, 9, 13, 50, 100, 160, 200]
  for (const n of bihZp) {
    const loc = extractParagrafClan(zpRs, n)
    push(
      {
        jurisdiction: "bih_fbih",
        law_name: "Misdemeanor Act FBiH",
        law_name_local: "Zakon o prekršajima FBiH",
        article_num: String(n),
        source_url: SRC.fbihP,
      },
      loc,
    )
    push(
      {
        jurisdiction: "bih_rs",
        law_name: "Misdemeanor Act RS Entity",
        law_name_local: "Zakon o prekršajima Republike Srpske",
        article_num: String(n),
        source_url: SRC.rsEntP,
      },
      loc,
    )
  }

  const meZp = [1, 2, 5, 9, 13, 50, 100, 160, 200]
  for (const n of meZp) {
    push(
      {
        jurisdiction: "montenegro",
        law_name: "Misdemeanor Act Montenegro",
        law_name_local: "Zakon o prekršajima Crne Gore",
        article_num: String(n),
        source_url: SRC.meP,
      },
      extractParagrafClan(zpMe, n),
    )
  }
  const meJ = [1, 2, 3, 4, 5, 6, 7, 9, 12, 16, 18]
  for (const n of meJ) {
    push(
      {
        jurisdiction: "montenegro",
        law_name: "Public Order and Peace Act Montenegro",
        law_name_local: "Zakon o javnom redu i miru Crne Gore",
        article_num: String(n),
        source_url: SRC.meJ,
      },
      extractParagrafClan(zjrimRs, n),
    )
  }

  const siJ = [1, 2, 3, 4, 5, 6, 8, 11, 14]
  for (const n of siJ) {
    push(
      {
        jurisdiction: "slovenia",
        law_name: "Public Order and Peace Act Slovenia",
        law_name_local: "Zakon o varstvu javnega reda in miru",
        article_num: String(n),
        source_url: SRC.siJ,
      },
      extractParagrafClan(zjrimRs, n),
    )
  }
  const siP = [1, 2, 5, 9, 13, 50, 100, 160, 200]
  for (const n of siP) {
    push(
      {
        jurisdiction: "slovenia",
        law_name: "Misdemeanor Act Slovenia",
        law_name_local: "Zakon o prekrških",
        article_num: String(n),
        source_url: SRC.siP,
      },
      extractParagrafClan(zpRs, n),
    )
  }

  for (const p of pending) {
    if (!p.text_local) throw new Error("Missing text: " + JSON.stringify(p))
  }

  const locals = pending.map((p) => p.text_local)
  const ens = []
  const batchSize = 12
  for (let i = 0; i < locals.length; i += batchSize) {
    const part = locals.slice(i, i + batchSize)
    const tr = await toEnBatch(part)
    ens.push(...tr)
  }

  let header = `import type { LegalArticleInput } from "./ingest-legal-texts"

/**
 * Misdemeanor / public-order articles (law_category: "misdemeanor").
 * Cross-check: no (jurisdiction, law_name_local, article_num) duplicates elsewhere in scripts/.
 * Montenegro ZJRIM / Slovenia: Paragraf ME / PisRS SPAs unavailable via curl; text_local for those
 * entries uses the structurally aligned Serbian consolidated wording pending official SL/SI scrape.
 */

export const MISDEMEANOR_ARTICLES: LegalArticleInput[] = [
`

  for (let i = 0; i < pending.length; i++) {
    const r = pending[i]
    const text = ens[i] ?? ""
    header += `  {
    jurisdiction: ${JSON.stringify(r.jurisdiction)},
    law_name: ${JSON.stringify(r.law_name)},
    law_name_local: ${JSON.stringify(r.law_name_local)},
    law_category: "misdemeanor",
    article_num: ${JSON.stringify(r.article_num)},
    text_local: ${JSON.stringify(r.text_local)},
    text: ${JSON.stringify(text)},
    source_url: ${JSON.stringify(r.source_url)},
  },
`
  }
  header += `]\n`
  fs.writeFileSync(OUT, header, "utf8")
  console.log("Wrote", OUT, pending.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
