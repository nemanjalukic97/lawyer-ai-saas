/**
 * Apply official RS amendments to Закон о раду 1/16.
 * Order: 66/18, U-66/20, 119/21, 112/23, 39/24, U-53/25, 59/26.
 * Quoted-string edits require exactly one match in the stated window.
 * 66/18's period-to-semicolon on renumbered point 31) is not applied.
 * чл. 131 став 3 follows the December 2021 prijedlog reprint.
 */

import { ConsolidationStop, type ClanPart } from "./consolidate-rs-porodicni"

export type { ClanPart }

function countLiteral(haystack: string, needle: string): number {
  if (!needle) return 0
  let n = 0
  let from = 0
  while (true) {
    const i = haystack.indexOf(needle, from)
    if (i === -1) break
    n++
    from = i + needle.length
  }
  return n
}

function requireOnce(haystack: string, needle: string, ctx: string): void {
  const n = countLiteral(haystack, needle)
  if (n !== 1) {
    throw new ConsolidationStop(
      `STOP ${ctx}: quoted ${JSON.stringify(needle)} occurs ${n} time(s)`,
    )
  }
}

function articleIndex(parts: ClanPart[], articleNum: string): number {
  const i = parts.findIndex((p) => p.articleNum === articleNum)
  if (i < 0) {
    throw new ConsolidationStop(`STOP: article ${articleNum} is missing`)
  }
  return i
}

function getArticle(parts: ClanPart[], articleNum: string): ClanPart {
  return parts[articleIndex(parts, articleNum)]!
}

function headingOf(articleNum: string): string {
  return `Члан ${articleNum}.`
}

function findStavSpan(
  body: string,
  stav: number,
): { start: number; end: number; text: string } {
  const opener = new RegExp(`(?:^|\\n)[ \\t]*\\(${stav}\\)(?!\\d)`)
  const match = opener.exec(body)
  if (!match || match.index === undefined) {
    throw new ConsolidationStop(`STOP: stav (${stav}) not found`)
  }
  const start = match[0].startsWith("\n") ? match.index + 1 : match.index
  const after =
    start + (match[0].startsWith("\n") ? match[0].length - 1 : match[0].length)
  const next = /(?:^|\n)[ \t]*\(\d+\)(?!\d)/m.exec(body.slice(after))
  const end =
    next && next.index !== undefined
      ? after + (next[0].startsWith("\n") ? next.index : next.index)
      : body.length
  return { start, end, text: body.slice(start, end) }
}

function replaceLeadingUnnumberedStav(
  body: string,
  articleNum: string,
  replacement: string,
): string {
  if (/(?:^|\n)[ \t]*\(1\)(?!\d)/.test(body)) {
    return replaceStav(body, 1, replacement)
  }
  const heading = headingOf(articleNum)
  const at = body.indexOf(heading)
  if (at < 0) throw new ConsolidationStop(`STOP: heading ${heading} missing`)
  const after = at + heading.length
  const next = /(?:^|\n)[ \t]*\(2\)(?!\d)/.exec(body.slice(after))
  if (!next || next.index === undefined) {
    throw new ConsolidationStop(`STOP: чл. ${articleNum} has neither (1) nor (2)`)
  }
  const rel = next[0].startsWith("\n") ? next.index + 1 : next.index
  const before = body.slice(0, after).replace(/\s+$/, "")
  const rest = body.slice(after + rel).replace(/^\s+/, "")
  return [before, replacement.trim(), rest].filter(Boolean).join("\n\n")
}

function replaceStav(body: string, stav: number, replacement: string): string {
  const span = findStavSpan(body, stav)
  const before = body.slice(0, span.start).replace(/\s+$/, "")
  const after = body.slice(span.end).replace(/^\s+/, "")
  return [before, replacement.trim(), after].filter(Boolean).join("\n\n")
}

function insertAfterStav(body: string, stav: number, addition: string): string {
  const span = findStavSpan(body, stav)
  const before = body.slice(0, span.end).replace(/\s+$/, "")
  const after = body.slice(span.end).replace(/^\s+/, "")
  return [before, addition.trim(), after].filter(Boolean).join("\n\n")
}

function replaceQuoted(
  body: string,
  from: string,
  to: string,
  ctx: string,
): string {
  requireOnce(body, from, ctx)
  return body.replace(from, to)
}

function replaceArticleInner(
  body: string,
  articleNum: string,
  inner: string,
): string {
  const heading = headingOf(articleNum)
  const idx = body.indexOf(heading)
  if (idx < 0) {
    throw new ConsolidationStop(`STOP: heading ${heading} missing`)
  }
  return body.slice(0, idx) + heading + "\n\n" + inner.trim()
}

function insertAfterLiteral(
  window: string,
  anchor: string,
  words: string,
  ctx: string,
): string {
  requireOnce(window, anchor, ctx)
  const addition =
    words.startsWith(" ") || words.startsWith(",") ? words : ` ${words}`
  return window.replace(anchor, anchor + addition)
}

function applyInStav(
  body: string,
  stav: number,
  edit: (window: string) => string,
): string {
  const span = findStavSpan(body, stav)
  return body.slice(0, span.start) + edit(span.text) + body.slice(span.end)
}

function renumberStav(body: string, from: number, to: number, ctx: string): string {
  const re = new RegExp(`(^|\\n)([ \\t]*)\\(${from}\\)(?!\\d)`, "g")
  const n = [...body.matchAll(re)].length
  if (n !== 1) {
    throw new ConsolidationStop(`STOP ${ctx}: stav (${from}) occurs ${n} time(s)`)
  }
  return body.replace(re, `$1$2(${to})`)
}

function renamePoint(body: string, from: string, to: string, ctx: string): string {
  const re = new RegExp(`(^|\\n)([ \\t]*)${from}\\)(?!\\d)`, "g")
  const n = [...body.matchAll(re)].length
  if (n !== 1) {
    throw new ConsolidationStop(`STOP ${ctx}: point ${from}) occurs ${n} time(s)`)
  }
  return body.replace(re, `$1$2${to})`)
}

function insertAfterPoint(
  body: string,
  point: string,
  line: string,
  ctx: string,
): string {
  const re = new RegExp(`(?:^|\\n)[ \\t]*${point}\\)(?!\\d)`)
  const match = re.exec(body)
  if (!match || match.index === undefined) {
    throw new ConsolidationStop(`STOP ${ctx}: point ${point}) missing`)
  }
  const start = match[0].startsWith("\n") ? match.index + 1 : match.index
  const after =
    start + (match[0].startsWith("\n") ? match[0].length - 1 : match[0].length)
  const next = /(?:^|\n)[ \t]*\d+\)(?!\d)/.exec(body.slice(after))
  const end =
    next && next.index !== undefined
      ? after + (next[0].startsWith("\n") ? next.index : next.index)
      : body.length
  const before = body.slice(0, end).replace(/\s+$/, "")
  const afterText = body.slice(end).replace(/^\s+/, "")
  return [before, line.trim(), afterText].filter(Boolean).join("\n\n")
}

function deletePointInStav(body: string, stav: number, point: string, ctx: string): string {
  const span = findStavSpan(body, stav)
  const re = new RegExp(`(?:^|\\n)[ \\t]*${point}\\)(?!\\d)`)
  const match = re.exec(span.text)
  if (!match || match.index === undefined) {
    throw new ConsolidationStop(`STOP ${ctx}: point ${point}) missing in stav ${stav}`)
  }
  const second = re.exec(span.text.slice(match.index + match[0].length))
  if (second) {
    throw new ConsolidationStop(`STOP ${ctx}: point ${point}) is not unique in stav ${stav}`)
  }
  const start = match[0].startsWith("\n") ? match.index + 1 : match.index
  const after =
    start + (match[0].startsWith("\n") ? match[0].length - 1 : match[0].length)
  const next = /(?:^|\n)[ \t]*\d+\)(?!\d)/.exec(span.text.slice(after))
  const end =
    next && next.index !== undefined
      ? after + (next[0].startsWith("\n") ? next.index : next.index)
      : span.text.length
  const nextWindow = (span.text.slice(0, start) + span.text.slice(end))
    .replace(/\n{3,}/g, "\n\n")
    .trim()
  return body.slice(0, span.start) + nextWindow + body.slice(span.end)
}

function deletePhrase(body: string, phrase: string, ctx: string): string {
  requireOnce(body, phrase, ctx)
  return body
    .replace(phrase, "")
    .replace(/[ \t]+([.,;])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
}

function cleanBlock(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function articleBody(articleNum: string, inner: string): string {
  return cleanBlock(`${headingOf(articleNum)}\n\n${inner}`)
}

function insertArticlesAfter(
  parts: ClanPart[],
  afterNum: string,
  articles: ClanPart[],
): void {
  const i = articleIndex(parts, afterNum)
  parts.splice(i + 1, 0, ...articles)
}

function replaceSectionTitle(parts: ClanPart[], from: string, to: string, ctx: string): void {
  const hits = parts.filter((p) => p.body.includes(from))
  if (hits.length !== 1) {
    throw new ConsolidationStop(
      `STOP ${ctx}: section title occurs in ${hits.length} article(s)`,
    )
  }
  const hit = hits[0]!
  requireOnce(hit.body, from, ctx)
  hit.body = hit.body.replace(from, to)
}

function deleteArticleKeepPrefix(parts: ClanPart[], articleNum: string): void {
  const i = articleIndex(parts, articleNum)
  const article = parts[i]!
  const heading = headingOf(articleNum)
  const at = article.body.indexOf(heading)
  const prefix = at > 0 ? article.body.slice(0, at).trim() : ""
  parts.splice(i, 1)
  if (prefix && parts[i]) {
    parts[i]!.body = `${prefix}\n\n${parts[i]!.body}`
  }
}

function assertRad(parts: ClanPart[]): void {
  const nums = parts.map((p) => p.articleNum)
  const expected = [
    "126а",
    "267а",
    "268а",
    "271а",
    "271б",
    "271в",
    "271г",
    "271д",
    "271ђ",
    "271е",
  ]
  if (nums.includes("122")) {
    throw new ConsolidationStop("STOP: чл. 122 is still present")
  }
  for (const n of expected) {
    if (!nums.includes(n)) throw new ConsolidationStop(`STOP: чл. ${n} missing`)
  }
  if (nums.length !== 282) {
    throw new ConsolidationStop(`STOP: article count ${nums.length}, expected 282`)
  }
  const dup = nums.filter((n, i) => nums.indexOf(n) !== i)
  if (dup.length) {
    throw new ConsolidationStop(`STOP: duplicate articles ${dup.join(", ")}`)
  }
  const highest = nums.reduce((h, n) => {
    const v = parseInt(n, 10)
    return Number.isFinite(v) && v > h ? v : h
  }, 0)
  if (highest !== 273) {
    throw new ConsolidationStop(`STOP: highest numeric ${highest}, expected 273`)
  }

  const a131 = getArticle(parts, "131").body
  const st3 = findStavSpan(a131, 3).text
  if (!st3.includes("овим законом, колективним уговором,")) {
    throw new ConsolidationStop("STOP: чл. 131 став 3 landing missing")
  }
  if (!st3.includes("другим законом")) {
    throw new ConsolidationStop("STOP: чл. 131 другим законом was removed")
  }
  if (st3.includes("другим законом, колективним") || st3.includes("другим колективним")) {
    throw new ConsolidationStop("STOP: чл. 131 insertion landed on the second законом")
  }

  const st179 = findStavSpan(getArticle(parts, "179").body, 3).text
  if (/(?:^|\n)[ \t]*5\)/.test(st179)) {
    throw new ConsolidationStop("STOP: чл. 179 став 3 still has tačka 5)")
  }

  const phrase152 =
    "од органа који је покренуо кривични поступак, односно одредио притвор"
  const phrase153 =
    "на терет органа који је покренуо кривични поступак, односно одредио притвор"
  if (getArticle(parts, "152").body.includes(phrase152)) {
    throw new ConsolidationStop("STOP: чл. 152 phrase still present")
  }
  if (getArticle(parts, "153").body.includes(phrase153)) {
    throw new ConsolidationStop("STOP: чл. 153 phrase still present")
  }
  const a49 = getArticle(parts, "49").body
  if (
    !a49.includes("три мјесеца за лица са завршеним средњим образовањем") ||
    !a49.includes("први пут запошљавају у својој стручној спреми или звању")
  ) {
    throw new ConsolidationStop("STOP: чл. 49 is not the 59/26 text")
  }
}

export function applyRadConsolidation(input: ClanPart[]): ClanPart[] {
  const parts = input.map((p) => ({ ...p }))

  // --- 66/18. чл. 121 and чл. 123 are replaced wholesale by 119/21. ---
  {
    const a = getArticle(parts, "121")
    a.body = replaceStav(
      a.body,
      3,
      "(3) Плата из става 1. овог члана је плата прије опорезивања порезом на доходак.",
    )
    a.body = insertAfterStav(
      a.body,
      3,
      "(4) Бруто плата је плата из става 3. овог члана увећана за доприносе.",
    )
  }
  {
    const a = getArticle(parts, "123")
    a.body = renumberStav(a.body, 6, 7, "66/18 чл. 2 / чл. 123")
    a.body = renumberStav(a.body, 5, 6, "66/18 чл. 2 / чл. 123")
    a.body = renumberStav(a.body, 4, 5, "66/18 чл. 2 / чл. 123")
    a.body = renumberStav(a.body, 3, 4, "66/18 чл. 2 / чл. 123")
    a.body = insertAfterStav(
      a.body,
      2,
      "(3) У елементима за одређивање плате из ст. 1. и 2. овог члана садржан је порез на доходак.",
    )
  }
  {
    const a = getArticle(parts, "194")
    a.body = applyInStav(a.body, 2, (window) =>
      replaceQuoted(
        window,
        "нето просјечне мјесечне плате радника исплаћене",
        "просјечне мјесечне плате након опорезивања исплаћене раднику",
        "66/18 чл. 3 / чл. 194 st. 2",
      ),
    )
  }
  {
    const a = getArticle(parts, "264")
    a.body = applyInStav(a.body, 1, (window) => {
      let next = renamePoint(window, "30", "31", "66/18 чл. 4 renumber")
      next = insertAfterPoint(
        next,
        "29",
        "30) ако са радником уговори плату која није утврђена у складу са чл. 121. и 123. овог закона;",
        "66/18 чл. 4 new 30",
      )
      next = insertAfterPoint(
        next,
        "31",
        "32) уколико не поступи у складу са одредбом члана 271а. овог закона.",
        "66/18 чл. 4 new 32",
      )
      return next
    })
  }
  insertArticlesAfter(parts, "271", [
    {
      articleNum: "271а",
      body: articleBody(
        "271а",
        "У року од 30 дана од дана ступања на снагу овог закона послодавци који са радницима имају закључене уговоре о раду на износ плате након опорезивања (нето плате) дужни су ускладити постојеће уговоре о раду са одредбама чл. 121. и 123. овог закона тако да постојеће износе плата увећају за износ пореза на доходак у складу са одредбама закона којим се опорезује доходак.",
      ),
    },
    {
      articleNum: "271б",
      body: articleBody(
        "271б",
        "У року од 30 дана од дана ступања на снагу овог закона доносиоци свих подзаконских аката донесених на основу овог закона дужни су ускладити њихове одредбе са одредбама чл. 121. и 123. овог закона.",
      ),
    },
  ])

  // --- U-66/20. Point 5) is omitted. Later acts do not put it back. ---
  {
    const a = getArticle(parts, "179")
    a.body = deletePointInStav(a.body, 3, "5", "U-66/20 / чл. 179 st. 3 t. 5)")
  }

  // --- 119/21 ---
  {
    const a = getArticle(parts, "120")
    a.body = replaceLeadingUnnumberedStav(
      a.body,
      "120",
      "(1) Радник остварује право на бруто плату, у складу са законом и колективним уговором.",
    )
    a.body = applyInStav(a.body, 6, (window) =>
      insertAfterLiteral(window, "у складу са", "колективним уговором,", "119/21 чл. 1 / чл. 120 st. 6"),
    )
  }
  {
    const a = getArticle(parts, "121")
    a.body = replaceArticleInner(
      a.body,
      "121",
      "(1) Плата из члана 120. став 1. овог закона састоји се од основне плате и увећања плате прописаних овим законом, колективним уговором и уговором о раду, пореза на доходак и доприноса.\n\n(2) Законом, колективним уговором или уговором о раду може се одредити другачији начин одређивања плате који не може бити неповољнији за радника од начина обрачуна плате из става 1. овог члана.\n\n(3) Плата из става 1. овог члана умањена за порез на доходак и доприносе је нето плата радника.",
    )
  }
  replaceSectionTitle(
    parts,
    "2. Плата за обављени рад и вријеме проведено на раду",
    "2. Основна плата",
    "119/21 чл. 3",
  )
  deleteArticleKeepPrefix(parts, "122")
  {
    const a = getArticle(parts, "123")
    a.body = replaceArticleInner(
      a.body,
      "123",
      "(1) Основна плата одређује се на основу услова потребних за рад на пословима за које је радник закључио уговор о раду утврђених колективним уговором, општим актом и времена проведеног на раду.\n\n(2) Елементи за одређивање плате из става 1. овог члана су коефицијенти сложености посла и цијена рада, уколико законом и колективним уговором није другачије уређено.\n\n(3) Уколико цијена рада за подручје, област или грану није утврђена актима из става 2. овог члана, цијену рада одлуком утврђује Влада Републике Српске на приједлог Економско-социјалног савјета Републике Српске, а на основу захтјева заинтересоване стране.\n\n(4) Ако Економско-социјални савјет не достави приједлог одлуке из става 3. овог члана у року од 15 дана од дана пријема захтјева заинтересоване стране, одлуку о цијени рада доноси Влада Републике Српске у наредном року од 15 дана.\n\n(5) Уговором о раду може да се утврди основна плата у већем износу од основне плате утврђене на основу елемената из колективног уговора или општег акта.",
    )
  }
  {
    const a = getArticle(parts, "124")
    a.body = replaceStav(
      a.body,
      1,
      "(1) Плата из члана 123. овог закона увећава се за 0,3% за сваку годину радног стажа уколико другим законом, колективним уговором или уговором о раду није другачије одређено.",
    )
    a.body = applyInStav(a.body, 2, (window) => {
      let next = insertAfterLiteral(
        window,
        "у складу са",
        "колективним уговором,",
        "119/21 чл. 6 / чл. 124 st. 2 у складу са",
      )
      next = insertAfterLiteral(
        next,
        "по основу",
        "радног учинка,",
        "119/21 чл. 6 / чл. 124 st. 2 по основу",
      )
      return next
    })
    a.body = replaceQuoted(
      a.body,
      "Општим",
      "Колективним уговором, општим",
      "119/21 чл. 6 / чл. 124 former st. 3",
    )
    a.body = renumberStav(a.body, 3, 4, "119/21 чл. 6 / чл. 124")
    a.body = insertAfterStav(
      a.body,
      2,
      "(3) Радни учинак из става 2. овог члана одређује се на основу квалитета и обима обављеног посла, као и доприноса радника пословном резултату послодавца који се утврђује колективним уговором, општим актима, уговором о раду или другим актима послодавца.",
    )
  }
  {
    const a = getArticle(parts, "125")
    a.body = replaceQuoted(a.body, "основне", "бруто", "119/21 чл. 7 / чл. 125")
    a.body = insertAfterLiteral(a.body, "законом", "колективним уговором,", "119/21 чл. 7 / чл. 125")
  }
  {
    const a = getArticle(parts, "126")
    a.body = applyInStav(a.body, 1, (window) =>
      insertAfterLiteral(window, "утврђеним", "колективним уговором,", "119/21 чл. 8 / чл. 126 st. 1"),
    )
    a.body = applyInStav(a.body, 3, (window) =>
      replaceQuoted(
        window,
        "приликом сваке исплате",
        "у року прописаном ставом 1. овог члана",
        "119/21 чл. 8 / чл. 126 st. 3",
      ),
    )
    a.body = insertAfterStav(
      a.body,
      4,
      "(5) Министар доноси правилник којим се прописује садржај писменог обрачуна плате из става 3. овог члана.",
    )
  }
  {
    const a = getArticle(parts, "128")
    a.body = insertAfterStav(
      a.body,
      2,
      "(3) Најнижа плата која се исплаћује раднику из става 2. овог члана увећава се по основу радног стажа.",
    )
  }
  {
    const a = getArticle(parts, "129")
    a.body = insertAfterLiteral(a.body, "законом", "колективним уговором,", "119/21 чл. 10 / чл. 129")
  }
  {
    const a = getArticle(parts, "130")
    a.body = applyInStav(a.body, 1, (window) =>
      insertAfterLiteral(window, "Законом,", "колективним уговором", "119/21 чл. 11 / чл. 130 st. 1"),
    )
    a.body = applyInStav(a.body, 2, (window) =>
      replaceQuoted(
        window,
        "Законом",
        "Законом, колективним уговором,",
        "119/21 чл. 11 / чл. 130 st. 2",
      ),
    )
  }
  {
    const a = getArticle(parts, "131")
    a.body = applyInStav(a.body, 3, (window) => {
      const anchor = "законом,"
      const first = window.indexOf(anchor)
      if (first < 0) {
        throw new ConsolidationStop("STOP 119/21 чл. 12: први „законом,“ није у ставу 3")
      }
      if (window.indexOf(anchor, first + anchor.length) !== -1) {
        throw new ConsolidationStop("STOP 119/21 чл. 12: „законом,“ није јединствено у ставу 3")
      }
      if (!window.includes("другим законом")) {
        throw new ConsolidationStop("STOP 119/21 чл. 12: „другим законом“ није у ставу 3")
      }
      return (
        window.slice(0, first + anchor.length) +
        " колективним уговором," +
        window.slice(first + anchor.length)
      )
    })
  }
  {
    const a = getArticle(parts, "132")
    a.body = applyInStav(a.body, 1, (window) =>
      insertAfterLiteral(window, "утврђена", "колективним уговором,", "119/21 чл. 13 / чл. 132 st. 1 t. 7"),
    )
  }
  {
    const a = getArticle(parts, "133")
    a.body = insertAfterLiteral(a.body, "у складу са", "колективним уговором,", "119/21 чл. 14 / чл. 133")
  }
  {
    const a = getArticle(parts, "194")
    a.body = applyInStav(a.body, 2, (window) =>
      replaceQuoted(
        window,
        "просјечне мјесечне плате након опорезивања исплаћене раднику",
        "нето просјечне мјесечне плате радника исплаћене",
        "119/21 чл. 15 / чл. 194 st. 2",
      ),
    )
  }
  {
    const a = getArticle(parts, "264")
    a.body = applyInStav(a.body, 1, (window) =>
      insertAfterLiteral(window, "роковима", "и не уручи писмени обрачун плате", "119/21 чл. 16 / чл. 264 t. 29"),
    )
  }
  insertArticlesAfter(parts, "268", [
    {
      articleNum: "268а",
      body: articleBody(
        "268а",
        "Министар ће у року од 60 дана од дана ступања на снагу овог закона донијети Правилник о садржају писменог обрачуна плате (члан 126. став 5).",
      ),
    },
  ])
  insertArticlesAfter(parts, "271б", [
    {
      articleNum: "271в",
      body: articleBody(
        "271в",
        "Доносиоци свих подзаконских аката донесених на основу овог закона дужни су, у року од 30 дана од дана ступања на снагу овог закона, ускладити њихове одредбе са одредбама чл. 120. и 121. овог закона.",
      ),
    },
    {
      articleNum: "271г",
      body: articleBody(
        "271г",
        "Послодавци који са радницима имају закључене уговоре о раду на износ плате прије опорезивања дужни су да, у року од 30 дана од дана ступања на снагу овог закона, постојеће уговоре о раду ускладе са одредбама овог закона на начин да постојећи износ плате прије опорезивања увећају за износ доприноса у складу са прописима о доприносима који су важили до 31. децембра 2021. године.",
      ),
    },
    {
      articleNum: "271д",
      body: articleBody(
        "271д",
        "До закључивања колективних уговора, радницима ће се исплаћивати плата према важећим уговорима о раду закљученим између радника и послодаваца.",
      ),
    },
  ])

  // --- 112/23 ---
  {
    const a = getArticle(parts, "112")
    a.body = replaceArticleInner(
      a.body,
      "112",
      "(1) За вријеме коришћења породиљског одсуства жена има право на накнаду плате у висини просјечне плате коју је остварила у току посљедњих 18 мјесеци прије почињања породиљског одсуства.\n\n(2) Уколико жена није остварила плату за свих посљедњих 18 мјесеци, приликом обрачуна просјечне плате из става 1. овог члана за сваки мјесец за који није остварила плату узима се износ најниже плате у Републици.\n\n(3) Одредбе ст. 1. и 2. овог члана сходно се примјењују и на друга лица која, у складу са овим законом, имају право на накнаду плате за вријеме одсуствовања са посла због његе и старања о дјетету.\n\n(4) Накнада плате из ст. 1. и 2. овог члана остварује се на терет Јавног фонда за дјечју заштиту Републике Српске.",
    )
  }

  // --- 39/24 ---
  insertArticlesAfter(parts, "126", [
    {
      articleNum: "126а",
      body: articleBody(
        "126а",
        "(1) Изузетно од члана 126. овог закона, у случају када је раднику онемогућена исплата плате путем текућег рачуна која није заснована на правоснажној судској, управној или другој одлуци надлежног орган, послодавац плату и друга лична примања радника исплаћује у готовом новцу, путем поште.\n\n(2) Послодавац је дужан да прије исплате плате из става 1. овог члана достави писмено обавјештење Пореској управи о начину и разлогу исплате и подацима о раднику којем се врши исплата плате у готовом новцу, a начин исплате плате уредиће се инструктивним актом министарства надлежног за област финансија.",
      ),
    },
  ])
  insertArticlesAfter(parts, "267", [
    {
      articleNum: "267а",
      body: articleBody(
        "267а",
        "Новчаном казном од 200.000 КМ казниће се за прекршај послодавац који исплати плату у готовом новцу  супротно члану 126а. овог закона.",
      ),
    },
  ])

  // --- U-53/25. The phrases are omitted. The articles stay. ---
  {
    const a = getArticle(parts, "152")
    a.body = applyInStav(a.body, 2, (window) =>
      deletePhrase(
        window,
        "од органа који је покренуо кривични поступак, односно одредио притвор",
        "U-53/25 / чл. 152 st. 2",
      ),
    )
  }
  {
    const a = getArticle(parts, "153")
    a.body = deletePhrase(
      a.body,
      "на терет органа који је покренуо кривични поступак, односно одредио притвор",
      "U-53/25 / чл. 153 t. 1)",
    )
    a.body = replaceQuoted(
      a.body,
      "ненадлежности,;",
      "ненадлежности;",
      "U-53/25 / чл. 153 orphaned comma",
    )
  }

  // --- 59/26 ---
  {
    const a = getArticle(parts, "49")
    a.body = replaceArticleInner(
      a.body,
      "49",
      "Ако посебним законом није другачије прописано, приправнички стаж траје:\n\n1) три мјесеца за лица са завршеним средњим образовањем,\n\n2) шест мјесеци за лица са завршеним високим образовањем, под условом да се ова лица први пут запошљавају у својој стручној спреми или звању.",
    )
  }
  insertArticlesAfter(parts, "271д", [
    {
      articleNum: "271ђ",
      body: articleBody(
        "271ђ",
        "Поступци у вези са остваривањем права на приправнички стаж и трајање приправничког стажа, који су започети прије ступања на снагу овог закона, окончаће се према прописима који су важили до дана ступања на снагу овог закона.",
      ),
    },
    {
      articleNum: "271е",
      body: articleBody(
        "271е",
        "У року до 30 дана од дана ступања на снагу овог закона доносиоци свих подзаконских аката донесених на основу овог закона дужни су ускладити своје подзаконске акте  са одредбом члана 49. овог закона.",
      ),
    },
  ])

  assertRad(parts)
  return parts
}
