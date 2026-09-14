import { getScriptVariants } from "./serbianTransliteration"

/**
 * Query → legal area heuristic map.
 *
 * Evidence-based phrases characteristic of each `law_category` / `legal_area`
 * in the corpus. Matched longest-phrase-first so multi-word institutes win
 * (e.g. "ugovor o djelu" → civil before any shorter token).
 *
 * Latin forms are listed; Cyrillic is matched at runtime via getScriptVariants.
 * Slovenian variants included where vocabulary differs (e.g. odpovedni rok).
 *
 * Deliberately omitted: ambiguous standalone tokens (e.g. "djelo" alone,
 * "zakon", "ugovor") that appear across multiple areas.
 */
export const QUERY_AREA_TERM_ENTRIES: readonly {
  phrase: string
  area: string
}[] = [
  // Labor
  { phrase: "ugovor o radu", area: "labor" },
  { phrase: "kolektivni ugovor", area: "labor" },
  { phrase: "otkazni rok", area: "labor" },
  { phrase: "odpovedni rok", area: "labor" },
  { phrase: "radni odnos", area: "labor" },
  { phrase: "radni odnosi", area: "labor" },
  { phrase: "poslodavac", area: "labor" },
  { phrase: "zaposleni", area: "labor" },
  { phrase: "zaposlenik", area: "labor" },
  { phrase: "otpremnina", area: "labor" },
  { phrase: "otkaz ugovora o radu", area: "labor" },
  { phrase: "otkaz ugovora", area: "labor" },

  // Civil (contract / obligational law)
  { phrase: "ugovor o djelu", area: "civil" },
  { phrase: "obligacionim odnosima", area: "civil" },
  { phrase: "obligacioni odnosi", area: "civil" },
  { phrase: "zakon o obligacionim", area: "civil" },
  { phrase: "naknada štete", area: "civil" },
  { phrase: "naknada stete", area: "civil" },
  { phrase: "kupoprodaj", area: "civil" },
  { phrase: "ništavost ugovora", area: "civil" },
  { phrase: "ništetnost ugovora", area: "civil" },
  { phrase: "zastara potraživanja", area: "civil" },
  { phrase: "zastara potrazivanja", area: "civil" },
  { phrase: "dužnik", area: "civil" },
  { phrase: "duznik", area: "civil" },

  // Commercial
  { phrase: "privredno društvo", area: "commercial" },
  { phrase: "privredno drustvo", area: "commercial" },
  { phrase: "trgovačko društvo", area: "commercial" },
  { phrase: "trgovacko drustvo", area: "commercial" },
  { phrase: "stečajni postupak", area: "commercial" },
  { phrase: "stečaj", area: "commercial" },
  { phrase: "likvidacija društva", area: "commercial" },

  // Criminal
  { phrase: "krivično djelo", area: "criminal" },
  { phrase: "krivicno djelo", area: "criminal" },
  { phrase: "kazneno djelo", area: "criminal" },
  { phrase: "krivično postup", area: "criminal" },
  { phrase: "kazneni postupak", area: "criminal" },
  { phrase: "kazneni zakon", area: "criminal" },
  { phrase: "optužen", area: "criminal" },
  { phrase: "optuzen", area: "criminal" },
  { phrase: "osuđen", area: "criminal" },
  { phrase: "osuden", area: "criminal" },

  // Family
  { phrase: "razvod braka", area: "family" },
  { phrase: "roditeljsko pravo", area: "family" },
  { phrase: "bračna stečevina", area: "family" },
  { phrase: "izdržavanje djeteta", area: "family" },
  { phrase: "alimentacij", area: "family" },

  // Inheritance
  { phrase: "nasljedno pravo", area: "inheritance" },
  { phrase: "nasledno pravo", area: "inheritance" },
  { phrase: "ostavinska rasprava", area: "inheritance" },
  { phrase: "testament", area: "inheritance" },

  // Property
  { phrase: "pravo vlasništva", area: "property" },
  { phrase: "pravo vlasnistva", area: "property" },
  { phrase: "razvrgnuće suvlasništva", area: "property" },
  { phrase: "razvrgnuće suvlasničke", area: "property" },
  { phrase: "dioba suvlasništva", area: "property" },
  { phrase: "suvlasnička zajednica", area: "property" },
  { phrase: "suvlasnički dio", area: "property" },
  { phrase: "suvlasnički deo", area: "property" },
  { phrase: "suvlasništvo", area: "property" },
  { phrase: "suvlasničk", area: "property" },
  { phrase: "suvlasnik", area: "property" },
  { phrase: "etažno vlasništvo", area: "property" },
  { phrase: "solastništvo", area: "property" },
  { phrase: "solastnik", area: "property" },
  { phrase: "etažna lastnina", area: "property" },
  { phrase: "hipotek", area: "property" },
  { phrase: "zemljišn", area: "property" },
  { phrase: "zemljisn", area: "property" },

  // Administrative
  { phrase: "upravni spor", area: "administrative" },
  { phrase: "upravni postupak", area: "administrative" },

  // Constitutional
  { phrase: "ustavni sud", area: "constitutional" },
  { phrase: "ustav republike", area: "constitutional" },

  // Procedural
  { phrase: "parnični postupak", area: "procedural" },
  { phrase: "vanparnični postupak", area: "procedural" },
] as const

/** Longest phrases first — critical for multi-word institute disambiguation. */
export const QUERY_AREA_TERMS = [...QUERY_AREA_TERM_ENTRIES].sort(
  (a, b) => b.phrase.length - a.phrase.length,
)

/** Soft compatibility across umbrella / sibling areas. */
export const INFERRED_AREA_ALIASES: Readonly<Record<string, readonly string[]>> =
  {
    civil: ["commercial", "property"],
    commercial: ["civil"],
    property: ["civil"],
    inheritance: ["civil"],
  }

function normalizeForMatch(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase()
}

function phraseMatchesQuery(query: string, phrase: string): boolean {
  const q = normalizeForMatch(query)
  if (!q) return false

  for (const variant of getScriptVariants(phrase)) {
    const needle = normalizeForMatch(variant)
    if (needle && q.includes(needle)) return true
  }
  return false
}

/**
 * Venue / conflict-of-jurisdiction phrases. Used to open a procedural case-law
 * channel — not to infer `legal_area` (stečaj + "sud nadležan" must stay
 * commercial for statutes).
 *
 * Tight on purpose: bare "nadležan" / "надлежан" / "pristojen" are omitted so
 * labor "nadležni sud za radne sporove" does not fire.
 * Latin BCS is listed; Cyrillic is matched via getScriptVariants.
 */
export const VENUE_JURISDICTION_PHRASES: readonly string[] = [
  "sukob stvarne nadležnosti",
  "sukob mjesne nadležnosti",
  "sukob nadležnosti",
  "sukob nadleznosti",
  "određivanje nadležnosti",
  "odredivanje nadleznosti",
  "prenošenje nadležnosti",
  "prenosenje nadleznosti",
  "prenos pristojnosti",
  "drugi stvarno nadležni sud",
  "stvarno nenadležan",
  "stvarno nenadlezan",
  "mjesno nenadležan",
  "mjesno nenadlezan",
  "stvarne nadležnosti",
  "stvarna nadležnost",
  "stvarno nadležan",
  "stvarno nadležni",
  "stvarno nadlezan",
  "mjesna nadležnost",
  "mjesne nadležnosti",
  "mjesno nadležan",
  "mjesno nadlezan",
  "nadležnost suda",
  "nadleznost suda",
  "koji je sud nadležan",
  "koji je sud nadlezan",
  "koji sud je nadležan",
  "koji sud je nadlezan",
  "katero sodišče je pristojno",
  "katero sodisce je pristojno",
  "which court has jurisdiction",
  "conflict of jurisdiction",
  "spor o pristojnosti",
  "stvarna pristojnost",
  "krajevna pristojnost",
  "zahtjev za izuzeće",
  "zahtjev za izuzece",
  "delegacij",
  "izločitev",
  "izuzeće",
  "izuzece",
]

const VENUE_JURISDICTION_PHRASES_LONGEST_FIRST = [
  ...VENUE_JURISDICTION_PHRASES,
].sort((a, b) => b.length - a.length)

/**
 * True when the query is about venue, delegation, recusal, or conflict of
 * jurisdiction — not when a merits query merely mentions a competent court.
 */
export function isVenueJurisdictionQuery(query: string): boolean {
  const normalized = query.trim().replace(/\s+/g, " ")
  if (normalized.length < 2) return false

  for (const phrase of VENUE_JURISDICTION_PHRASES_LONGEST_FIRST) {
    if (phraseMatchesQuery(normalized, phrase)) return true
  }
  return false
}

/**
 * Court of BiH / BiH-institutions matter. When true, bih_fbih / bih_rs /
 * bih_brcko retrieval may return parallel state statutes tagged
 * applies_before = 'state_court'.
 *
 * Tight on purpose (same discipline as the Gr venue gate): bare "sud",
 * "BiH", "državna služba", and statute names ("KZ BiH", "ZKP BiH") are
 * omitted. Naming a state code is not a Court of BiH matter.
 * Latin BCS is listed; Cyrillic is matched via getScriptVariants.
 */
export const STATE_COURT_MATTER_PHRASES: readonly string[] = [
  "pred Sudom Bosne i Hercegovine",
  "Sud Bosne i Hercegovine",
  "Sudu Bosne i Hercegovine",
  "Suda Bosne i Hercegovine",
  "Sudom Bosne i Hercegovine",
  "institucijama Bosne i Hercegovine",
  "institucije Bosne i Hercegovine",
  "državna služba u institucijama",
  "drzavna sluzba u institucijama",
  "pred Sudom BiH",
  "institucijama BiH",
  "institucije BiH",
  "Sudom BiH",
  "Sudu BiH",
  "Suda BiH",
  "Sud BiH",
]

const STATE_COURT_MATTER_PHRASES_LONGEST_FIRST = [
  ...STATE_COURT_MATTER_PHRASES,
].sort((a, b) => b.length - a.length)

export function isStateCourtMatterQuery(query: string): boolean {
  const normalized = query.trim().replace(/\s+/g, " ")
  if (normalized.length < 2) return false

  for (const phrase of STATE_COURT_MATTER_PHRASES_LONGEST_FIRST) {
    if (phraseMatchesQuery(normalized, phrase)) return true
  }
  return false
}

/**
 * Infer a single legal area from the search query.
 * Returns null when there is no clear signal (ranking unchanged).
 */
export function inferLegalAreaFromQuery(query: string): string | null {
  const normalized = query.trim().replace(/\s+/g, " ")
  if (normalized.length < 2) return null

  for (const { phrase, area } of QUERY_AREA_TERMS) {
    if (phraseMatchesQuery(normalized, phrase)) {
      return area
    }
  }
  return null
}

export function areasCompatibleWithInference(
  inferred: string,
  actual: string,
): boolean {
  const inf = inferred.trim().toLowerCase()
  const act = actual.trim().toLowerCase()
  if (!inf || !act) return false
  if (act === inf) return true
  return (INFERRED_AREA_ALIASES[inf] ?? []).includes(act)
}
