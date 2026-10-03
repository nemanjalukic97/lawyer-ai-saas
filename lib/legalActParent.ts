import pg from "pg"
import { supabaseAdmin } from "./supabase/admin"
import {
  matchParentLawName,
  normaliseLawName,
  parseEnablingParents,
} from "./legalActParentParse"

export {
  matchParentLawName,
  normaliseLawName,
  parseEnablingParents,
} from "./legalActParentParse"
export type { ParsedParent } from "./legalActParentParse"

/**
 * Enabling-clause citations: a subordinate act names the statute it elaborates
 * in its own opening ("На основу члана … Закона о …").
 *
 * This module does not score, merge, or reorder search results.
 * `lookupImplementingActs` is a follow-on read for the research response.
 * Ingest calls `linkIngestedActs` after it has already written legal_articles.
 *
 * The table is owner-applied (supabase/migrations/20261002200000_legal_act_parent.sql).
 * Until that migration exists, both calls no-op.
 */

let tableAvailable: boolean | null = null

function tableMissing(error: { code?: string; message?: string }): boolean {
  const code = error.code ?? ""
  const msg = error.message ?? ""
  return (
    code === "42P01" ||
    code === "PGRST205" ||
    /legal_act_parent/i.test(msg) ||
    /does not exist/i.test(msg) ||
    /schema cache/i.test(msg)
  )
}

export type ImplementingAct = { name: string; rows: number }

/**
 * Acts shown before "i još N". The page renders `top` and, when
 * `total` is larger, the remainder. Six is enough for one line; a
 * longer tail (cultural-goods decisions) is the count, not more names.
 */
export const IMPLEMENTING_ACTS_TOP = 6

/** Payload cap. `total` stays the full child count; nothing reads past `top`. */
export const IMPLEMENTING_ACTS_CAP = 50

export type ImplementingActGroup = {
  jurisdiction: string
  statute: string
  /** True child count, including names omitted by the cap on `acts`. */
  total: number
  top: ImplementingAct[]
  /** At most 50, same order as the full list (row count descending, then localeCompare). */
  acts: ImplementingAct[]
}

/**
 * Acts whose resolved parent is one of the statutes in `hits`.
 * Names and row counts only. Does not return article text.
 * `acts` is the first 50. `total` is the full count. `top` is the
 * first six, which is what the page prints before "i još N".
 *
 * One aggregate per statute. Child names stay in the database: the
 * previous count sent them in a PostgREST `.in()` filter and overflowed
 * the request headers on the largest statutes.
 */
const IMPLEMENTING_ACTS_AGGREGATE_SQL = `
SELECT c.child_law_name_local AS name,
       count(a.law_name_local)::int AS rows
  FROM (
    SELECT DISTINCT child_law_name_local
      FROM legal_act_parent
     WHERE jurisdiction = $1
       AND parent_law_name_local = $2
  ) c
  LEFT JOIN legal_articles a
    ON a.jurisdiction = $1
   AND a.law_name_local = c.child_law_name_local
 GROUP BY c.child_law_name_local
 ORDER BY count(a.law_name_local) DESC, c.child_law_name_local ASC
`

let pool: pg.Pool | null = null

function dbPool(): pg.Pool {
  if (pool) return pool
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error("DATABASE_URL is missing")
  pool = new pg.Pool({
    connectionString,
    max: 4,
    ssl: { rejectUnauthorized: false },
  })
  return pool
}

function isMissingTable(err: unknown): boolean {
  const code = err && typeof err === "object" && "code" in err ? String(err.code) : ""
  const message = err instanceof Error ? err.message : String(err)
  return code === "42P01" || /legal_act_parent/i.test(message) || /does not exist/i.test(message)
}

async function aggregateImplementingActs(
  jurisdiction: string,
  statute: string,
): Promise<ImplementingAct[]> {
  const result = await dbPool().query<{ name: string; rows: number }>(
    IMPLEMENTING_ACTS_AGGREGATE_SQL,
    [jurisdiction, statute],
  )
  return result.rows
    .map((row) => ({ name: row.name, rows: Number(row.rows) }))
    .sort((a, b) => b.rows - a.rows || a.name.localeCompare(b.name))
}

export async function lookupImplementingActs(
  hits: Array<{ jurisdiction: string; law_name_local: string }>,
): Promise<ImplementingActGroup[]> {
  if (tableAvailable === false || hits.length === 0) return []

  const statutes = new Map<string, { jurisdiction: string; statute: string }>()
  for (const hit of hits) {
    const statute = hit.law_name_local.trim()
    if (!statute) continue
    statutes.set(`${hit.jurisdiction}\0${statute}`, {
      jurisdiction: hit.jurisdiction,
      statute,
    })
  }
  if (statutes.size === 0) return []

  let rows: Array<{ jurisdiction: string; statute: string; acts: ImplementingAct[] }>
  try {
    rows = await Promise.all(
      [...statutes.values()].map(async (entry) => ({
        ...entry,
        acts: await aggregateImplementingActs(entry.jurisdiction, entry.statute),
      })),
    )
  } catch (err) {
    if (isMissingTable(err)) {
      tableAvailable = false
      return []
    }
    throw err
  }
  tableAvailable = true

  const groups: ImplementingActGroup[] = []
  for (const row of rows) {
    if (row.acts.length === 0) continue
    groups.push({
      jurisdiction: row.jurisdiction,
      statute: row.statute,
      total: row.acts.length,
      top: row.acts.slice(0, IMPLEMENTING_ACTS_TOP),
      acts: row.acts.slice(0, IMPLEMENTING_ACTS_CAP),
    })
  }
  return groups
}

export type IngestedArticle = {
  jurisdiction: string
  law_name_local: string
  article_num: string
  paragraph_num?: string | null
  text_local?: string | null
}

function articleOrder(articleNum: string): number {
  const match = /^(\d+)/.exec(articleNum)
  return match ? Number(match[1]) : 1_000_000
}

function paragraphOrder(paragraphNum: string | null | undefined): number {
  if (!paragraphNum) return 0
  const match = /^(\d+)/.exec(paragraphNum)
  return match ? Number(match[1]) : 1_000_000
}

/**
 * Replace citation rows for each act in `articles`, using that act's first
 * chunk. A missing table is ignored so ingest still runs before the owner
 * applies the migration.
 */
export async function linkIngestedActs(articles: IngestedArticle[]): Promise<void> {
  if (tableAvailable === false || articles.length === 0) return

  const firstByLaw = new Map<string, IngestedArticle>()
  for (const article of articles) {
    const key = `${article.jurisdiction}\0${article.law_name_local}`
    const current = firstByLaw.get(key)
    const articleRank = articleOrder(article.article_num)
    const paragraphRank = paragraphOrder(article.paragraph_num)
    if (!current) {
      firstByLaw.set(key, article)
      continue
    }
    const currentArticle = articleOrder(current.article_num)
    const currentParagraph = paragraphOrder(current.paragraph_num)
    if (
      articleRank < currentArticle ||
      (articleRank === currentArticle && paragraphRank < currentParagraph)
    ) {
      firstByLaw.set(key, article)
    }
  }

  for (const article of firstByLaw.values()) {
    if (article.law_name_local === "Untitled 1") continue
    // A later article is not the enabling clause. Leaving the rows in
    // place keeps a partial re-ingest from wiping a citation that was
    // parsed from article 1.
    if (articleOrder(article.article_num) !== 1) continue
    const parents = parseEnablingParents(article.text_local ?? "")
    const { error: deleteError } = await supabaseAdmin
      .from("legal_act_parent" as never)
      .delete()
      .eq("jurisdiction", article.jurisdiction)
      .eq("child_law_name_local", article.law_name_local)
    if (deleteError) {
      if (tableMissing(deleteError)) {
        tableAvailable = false
        return
      }
      throw new Error(deleteError.message || "legal_act_parent_delete_failed")
    }
    tableAvailable = true
    if (parents.length === 0) continue

    const laws = await lawNamesForJurisdiction(article.jurisdiction)
    const payload = parents.map((parent) => ({
      jurisdiction: article.jurisdiction,
      child_law_name_local: article.law_name_local,
      parent_ordinal: parent.ordinal,
      parent_name_parsed: parent.parentNameParsed,
      parent_law_name_local: matchParentLawName(parent.parentNameParsed, laws),
    }))
    const { error: insertError } = await supabaseAdmin
      .from("legal_act_parent" as never)
      .insert(payload as never)
    if (insertError) {
      if (tableMissing(insertError)) {
        tableAvailable = false
        return
      }
      throw new Error(insertError.message || "legal_act_parent_insert_failed")
    }
  }
}

const lawsCache = new Map<string, Map<string, string[]>>()

async function lawNamesForJurisdiction(
  jurisdiction: string,
): Promise<Map<string, string[]>> {
  const cached = lawsCache.get(jurisdiction)
  if (cached) return cached
  const map = new Map<string, string[]>()
  const seen = new Set<string>()
  let from = 0
  for (;;) {
    const { data, error } = await supabaseAdmin
      .from("legal_articles")
      .select("law_name_local")
      .eq("jurisdiction", jurisdiction)
      .order("id")
      .range(from, from + 999)
    if (error) throw new Error(error.message || "legal_articles_names_failed")
    const page = (data ?? []) as Array<{ law_name_local: string }>
    for (const row of page) {
      const name = row.law_name_local
      if (seen.has(name)) continue
      seen.add(name)
      const key = normaliseLawName(name)
      const list = map.get(key) ?? []
      list.push(name)
      map.set(key, list)
    }
    if (page.length < 1000) break
    from += 1000
  }
  lawsCache.set(jurisdiction, map)
  return map
}
