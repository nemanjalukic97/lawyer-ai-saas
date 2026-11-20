import type { HeadingStyle } from "./_tmp-a26-run.ts"

export type JurisdictionId =
  | "serbia"
  | "bih_fbih"
  | "bih_rs"
  | "bih_brcko"
  | "croatia"
  | "slovenia"
  | "montenegro"

export type RowSelection =
  | { kind: "snapshot-ids"; path: string }
  | { kind: "window-rows" }

export type JurisdictionConfig = {
  id: JurisdictionId
  commencementPhrases: readonly string[]
  headings: HeadingStyle
  rowSelection: RowSelection
  /** Chemicals cut, collision and gap sets, and citation genitives. Serbia only. */
  serbiaExtensions: boolean
  /** The named-article exception list stays on the Serbia entry only. */
  useSerbiaNamed: boolean
  expectedLaws: number | null
  articleFile: string
  insertFile: string
  planFile: string
  reportFile: string
  droppedFile: string
}

function files(id: JurisdictionId): Pick<JurisdictionConfig, "articleFile" | "insertFile" | "planFile" | "reportFile" | "droppedFile"> {
  return {
    articleFile: `${id}-article-file-rebuild.jsonl`,
    insertFile: `${id}-insert-rebuild.jsonl`,
    planFile: `${id}-a42-plan-rebuild.jsonl`,
    reportFile: `${id}-a42-report-rebuild.json`,
    droppedFile: `${id}-a42-dropped-rebuild.jsonl`,
  }
}

const windowRows: RowSelection = { kind: "window-rows" }

/**
 * Window rows are every row of a law in which at least half the rows have
 * text_local length from 1900 to 2100 characters. The short last window of
 * such a law is included. A law stored as real articles, including the RS
 * labour act, stays out of this bucket. Serbia does not use it: the proof
 * reads scripts/out/serbia-phase2-snapshot-ids.txt, the same input set as
 * the original cutter.
 *
 * headings "serbia" is line-start Članak, Члан and Član, and an inline hit
 * only for Cyrillic Члан after a numbered capital rubric. "clan" adds the
 * same inline guard for Član, Члан and Članak. "clen" adds a line-start
 * "N. člen" that is not followed by a letter. Every jurisdiction also turns
 * on letterBefore, lowerSuffix and starAfter: a missing line break before
 * Члан, a missing break after the digits, and "Члан N.*" are headings in
 * every stored text, not a Serbia special case.
 * Commencement is the last row whose text contains any configured phrase.
 * A law with none of the phrases stays is_excerpt false throughout.
 * Serbia's phrase is exactly "ступа на снагу".
 */
export const JURISDICTIONS: Record<JurisdictionId, JurisdictionConfig> = {
  serbia: {
    id: "serbia",
    commencementPhrases: ["ступа на снагу"],
    headings: "serbia",
    rowSelection: { kind: "snapshot-ids", path: "scripts/out/serbia-phase2-snapshot-ids.txt" },
    serbiaExtensions: true,
    useSerbiaNamed: true,
    expectedLaws: 2966,
    ...files("serbia"),
  },
  bih_fbih: {
    id: "bih_fbih",
    commencementPhrases: ["stupa na snagu"],
    headings: "clan",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("bih_fbih"),
  },
  bih_rs: {
    id: "bih_rs",
    commencementPhrases: ["ступа на снагу", "stupa na snagu"],
    headings: "clan",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("bih_rs"),
  },
  bih_brcko: {
    id: "bih_brcko",
    commencementPhrases: ["stupa na snagu"],
    headings: "clan",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("bih_brcko"),
  },
  croatia: {
    id: "croatia",
    commencementPhrases: ["stupa na snagu"],
    headings: "clan",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("croatia"),
  },
  slovenia: {
    id: "slovenia",
    commencementPhrases: ["začne veljati"],
    headings: "clen",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("slovenia"),
  },
  montenegro: {
    id: "montenegro",
    commencementPhrases: ["stupa na snagu"],
    headings: "clan",
    rowSelection: windowRows,
    serbiaExtensions: false,
    useSerbiaNamed: false,
    expectedLaws: null,
    ...files("montenegro"),
  },
}

/*
PLAN NOTES, not acted on in this task.

a. The long Serbia k values on the joined windows are repeated text in the
source, so the same sentence can enter the article file twice. Закон о
хемикалијама windows 228–229 repeat 186 characters. The judge-evaluation
pravilnik and the forest-seed pravilnik repeat rules of underscores. The
public-service catalogue repeats a requirements block. These have not been
matched to the 255 duplicate groups in live Serbia. That match is a later
test of its own, after the splits.

b. The 24,714 snapshot ids still live in Serbia are a separate future batch,
and they are the ones with the long repeats: k = 244 on the publisher's note,
k = 227 on the English anode sentence. When that batch is split, the question
returns for that batch. It does not touch bih_fbih, bih_rs or bih_brcko,
whose largest letter-bearing match is three characters inside one word.
*/
