export type ResearchJurisdictionId =
  | "serbia"
  | "croatia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "montenegro"
  | "slovenia"

export type StarterQuery = {
  query: string
  labelKey: string
  category: string
}

const DB_TO_UI_JURISDICTION: Record<string, string> = {
  bih_fbih: "bih_federation",
}

const UI_JURISDICTION_IDS = new Set([
  "all",
  "serbia",
  "croatia",
  "bih_rs",
  "bih_brcko",
  "montenegro",
  "slovenia",
  ...Object.values(DB_TO_UI_JURISDICTION),
])

export function toUiJurisdiction(dbId: string | null | undefined): string {
  if (!dbId) return "all"
  if (DB_TO_UI_JURISDICTION[dbId]) return DB_TO_UI_JURISDICTION[dbId]
  if (UI_JURISDICTION_IDS.has(dbId)) return dbId
  return "all"
}

export const DEFAULT_STARTER_QUERIES: StarterQuery[] = [
  { query: "otkazni rok", labelKey: "noticePeriod", category: "labor" },
  { query: "zastarelost potraživanja", labelKey: "limitation", category: "civil" },
  { query: "ugovor o delu", labelKey: "serviceContract", category: "labor" },
]

export const RESEARCH_STARTER_QUERIES: Record<
  ResearchJurisdictionId,
  StarterQuery[]
> = {
  serbia: DEFAULT_STARTER_QUERIES,
  croatia: [
    { query: "otkazni rok", labelKey: "noticePeriod", category: "labor" },
    { query: "zastara tražbine", labelKey: "limitation", category: "civil" },
    { query: "ugovor o djelu", labelKey: "serviceContract", category: "labor" },
  ],
  bih_fbih: [
    {
      query: "otkaz ugovora o radu",
      labelKey: "employmentTermination",
      category: "labor",
    },
    { query: "zastara potraživanja", labelKey: "limitation", category: "civil" },
    {
      query: "uknjižba nekretnine",
      labelKey: "propertyRegistration",
      category: "property",
    },
  ],
  bih_rs: [
    {
      query: "otkaz ugovora o radu",
      labelKey: "employmentTermination",
      category: "labor",
    },
    {
      query: "zastarjelost potraživanja",
      labelKey: "limitation",
      category: "civil",
    },
    { query: "ugovor o zajmu", labelKey: "loanAgreement", category: "commercial" },
  ],
  bih_brcko: [
    {
      query: "otkaz ugovora o radu",
      labelKey: "employmentTermination",
      category: "labor",
    },
    {
      query: "zastarjelost potraživanja",
      labelKey: "limitation",
      category: "civil",
    },
    { query: "ugovor o djelu", labelKey: "serviceContract", category: "labor" },
  ],
  montenegro: [
    { query: "otkazni rok", labelKey: "noticePeriod", category: "labor" },
    {
      query: "zastarjelost potraživanja",
      labelKey: "limitation",
      category: "civil",
    },
    { query: "ugovor o djelu", labelKey: "serviceContract", category: "labor" },
  ],
  slovenia: [
    { query: "odpovedni rok", labelKey: "noticePeriod", category: "labor" },
    { query: "zastaranje terjatev", labelKey: "limitation", category: "civil" },
    { query: "podjemna pogodba", labelKey: "serviceContract", category: "labor" },
  ],
}

export function getStarterQueries(
  jurisdiction: string | null | undefined,
): StarterQuery[] {
  if (!jurisdiction) return DEFAULT_STARTER_QUERIES
  if (jurisdiction in RESEARCH_STARTER_QUERIES) {
    return RESEARCH_STARTER_QUERIES[jurisdiction as ResearchJurisdictionId]
  }
  return DEFAULT_STARTER_QUERIES
}
