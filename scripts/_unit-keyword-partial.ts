/**
 * Keyword partial-coverage unit checks (no network).
 */
import {
  KEYWORD_EXACT_PHRASE_SCORE,
  KEYWORD_PARTIAL_COVERAGE_FLOOR,
  KEYWORD_STEM_PHRASE_SCORE,
  buildKeywordIlikePatterns,
  extractKeywordContentTokens,
  isKeywordStopword,
  keywordPartialContiguityBonus,
  keywordPartialCoverageStep,
  scoreKeywordPartialFromCoverage,
  scoreKeywordPatternMatch,
} from "../lib/keywordVariants"

const LATIN = "rok za tužbu radi utvrđivanja očinstva"
const ART_141A =
  "Тужба дјетета за утврђивање очинства\n\nЧлан 141а.\n\nТужбу ради утврђивања очинства дијете може поднијети без обзира на године живота."
const ART_142 =
  "Тужба мајке за утврђивање очинства\n\nЧлан 142.\n\nТужбу ради утврђивања очинства може поднијети мајка до навршених 18 година живота дјетета."
const ART_143 =
  "Тужба органа старатељства за утврђивање очинства\n\nЧлан 143.\n\nУ случају кад је мајка означила одређено лице за оца дјетета пред матичарем, а касније, занемарујући интересе дјетета, не покрене поступак за утврђивање очинства у року од годину дана од дана рођења дјетета, орган старатељства може тужбом покренути поступак за утврђивање очинства најкасније до навршене двије године живота дјетета."

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg)
}

function assertScore(got: number | undefined, expect: number, label: string) {
  assert(
    got != null && Math.abs(got - expect) < 1e-12,
    `${label} ${got}`,
  )
}

for (let n = 1; n <= 16; n++) {
  const step = keywordPartialCoverageStep(n)
  const bonus = keywordPartialContiguityBonus(n)
  assert(bonus < step, `contiguity_bonus < coverage_step for n=${n}`)
}

const n4 = {
  fullContig: scoreKeywordPartialFromCoverage(4, 4, true),
  fullNon: scoreKeywordPartialFromCoverage(4, 4, false),
  threeContig: scoreKeywordPartialFromCoverage(3, 4, true),
  threeNon: scoreKeywordPartialFromCoverage(3, 4, false),
}
assertScore(n4.fullContig?.score, 0.6175, "4/4 contig")
assertScore(n4.fullNon?.score, 0.6, "4/4 non-contig")
assertScore(n4.threeContig?.score, 0.5825, "3/4 contig")
assertScore(n4.threeNon?.score, 0.565, "3/4 non-contig")
assertScore(scoreKeywordPartialFromCoverage(2, 4, false)?.score, 0.53, "2/4 floor")
assert(
  n4.fullNon!.score > n4.threeContig!.score,
  "4/4 non-contig must outrank 3/4 contig",
)

const maxPartial =
  scoreKeywordPartialFromCoverage(2, 2, true)?.score ?? 0
assert(maxPartial + 0.05 < 0.9, `partial max after area boost ${maxPartial + 0.05}`)
assert(maxPartial < KEYWORD_STEM_PHRASE_SCORE, "partial must stay below stem")
for (const n of [2, 3, 4, 5, 6, 18, 21, 40, 43]) {
  const full = scoreKeywordPartialFromCoverage(n, n, true)?.score ?? 0
  assert(
    full > 0.6006 && full < 0.636,
    `full contiguous n=${n} ${full} outside (0.6006, 0.6360)`,
  )
}
assert(
  KEYWORD_STEM_PHRASE_SCORE < KEYWORD_EXACT_PHRASE_SCORE,
  "stem must stay below exact",
)
assert(KEYWORD_PARTIAL_COVERAGE_FLOOR === 0.5, "floor")

assert(isKeywordStopword("za") && isKeywordStopword("за"), "stop za")
assert(isKeywordStopword("radi") && isKeywordStopword("ради"), "stop radi")
assert(!isKeywordStopword("rok") && !isKeywordStopword("рок"), "rok is content")

const tokens = extractKeywordContentTokens(LATIN).map((t) => t.surface)
assert(
  JSON.stringify(tokens) === JSON.stringify(["rok", "tužbu", "utvrđivanja", "očinstva"]),
  `content tokens ${JSON.stringify(tokens)}`,
)

const patterns = buildKeywordIlikePatterns(LATIN)
assert(
  patterns.tokenFetchGroups.every((g) =>
    g.every((p) => !p.includes("%rok%") && !p.includes("%рок%")),
  ),
  "rok must not be a fetch ILIKE",
)
assert(patterns.tokenFetchGroups.length === 3, "tužbu, utvrđivanja, očinstva")

const hits = {
  "141а": scoreKeywordPatternMatch(ART_141A, patterns),
  "142": scoreKeywordPatternMatch(ART_142, patterns),
  "143": scoreKeywordPatternMatch(ART_143, patterns),
}
for (const [art, hit] of Object.entries(hits)) {
  assert(hit != null, `${art} must match`)
  assert(hit!.channel === "keyword_partial", `${art} channel ${hit!.channel}`)
  assert(hit!.score < KEYWORD_STEM_PHRASE_SCORE, `${art} score ${hit!.score}`)
}

const phraseHit = scoreKeywordPatternMatch(
  "foo rok za tužbu radi utvrđivanja očinstva bar",
  patterns,
)
assert(phraseHit?.channel === "keyword_exact", "full phrase is exact")
assert(phraseHit?.score === KEYWORD_EXACT_PHRASE_SCORE, "exact score")

console.log(
  JSON.stringify(
    {
      ok: true,
      contentTokens: tokens,
      tokenFetchGroups: patterns.tokenFetchGroups,
      maxPartial,
      n4: {
        fullContig: n4.fullContig?.score,
        fullNon: n4.fullNon?.score,
        threeContig: n4.threeContig?.score,
        threeNon: n4.threeNon?.score,
      },
      hits,
    },
    null,
    2,
  ),
)
