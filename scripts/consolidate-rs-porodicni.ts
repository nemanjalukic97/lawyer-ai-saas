/**
 * Apply official RS amendments to Породични закон 17/23.
 * Order: 27/24, then U-4/24, then 61/25. Quoted-string edits require exactly
 * one match in the stated window. Throws STOP rather than guessing.
 */

export type ClanPart = {
  articleNum: string
  body: string
}

export class ConsolidationStop extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ConsolidationStop"
  }
}

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

/** Stav opener at line start. `(1)` must not match `(10)`. */
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
  const after = start + (match[0].startsWith("\n") ? match[0].length - 1 : match[0].length)
  const next = /(?:^|\n)[ \t]*\(\d+\)(?!\d)/m.exec(body.slice(after))
  const end =
    next && next.index !== undefined
      ? after + (next[0].startsWith("\n") ? next.index : next.index)
      : body.length
  return { start, end, text: body.slice(start, end) }
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

function deleteStav(body: string, stav: number): string {
  const span = findStavSpan(body, stav)
  const before = body.slice(0, span.start).replace(/\s+$/, "")
  const after = body.slice(span.end).replace(/^\s+/, "")
  return [before, after].filter(Boolean).join("\n\n")
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

function applyQuotedInStav(
  body: string,
  stav: number,
  quoted: string,
  replaceFn: (window: string) => string,
  ctx: string,
): string {
  const span = findStavSpan(body, stav)
  requireOnce(span.text, quoted, ctx)
  const nextWindow = replaceFn(span.text)
  return (
    body.slice(0, span.start) + nextWindow + body.slice(span.end)
  )
}

export function applyPorodicniConsolidation(input: ClanPart[]): ClanPart[] {
  const parts = input.map((p) => ({ ...p }))

  // --- 27/24 ---
  {
    const a = getArticle(parts, "74")
    a.body = replaceStav(
      a.body,
      1,
      "(1) У току поступка мирења, орган старатељства ће на захтјев једног родитеља рјешењем уредити одржавање личних односа дјетета и родитеља са којим дијете не живи.",
    )
    a.body = replaceStav(
      a.body,
      3,
      "(3) Рјешење из става 1. овог члана остаје на снази до друге одлуке органа старатељства донесене усљед битно промијењених околности или до одлуке суда којом ће бити одлучено о одржавању личних односа дјетета и родитеља са којим дијете не живи.",
    )
  }
  {
    const a = getArticle(parts, "75")
    a.body = replaceStav(
      a.body,
      1,
      "(1) У току поступка у брачним споровима, суд може по службеној дужности одредити привремену мјеру у погледу вршења родитељског права и уређења личних односа између дјетета и родитеља са којим дијете не живи, ако о тим питањима не постоји сагласност родитеља, а чијим доношењем престаје да важи рјешење органа старатељства којим је одлучено о истом питању у поступку мирења.",
    )
    a.body = replaceStav(
      a.body,
      4,
      "(4) Привремена мјера из ст. 1. и 2. овог члана остаје на снази до доношења друге одлуке суда усљед битно промијењених околности или до правоснажног окончања поступка о тим питањима.",
    )
  }
  {
    const a = getArticle(parts, "86")
    a.body = replaceStav(
      a.body,
      5,
      "(5) Приједлог за одржавање личних односа са дјететом могу поднијети лица из става 3. овог члана и дијете, а о приједлогу одлучује суд рјешењем у ванпарничном поступку, којим одређује начин одржавања личних односа, а у складу са најбољим интересом дјетета.",
    )
  }
  {
    const a = getArticle(parts, "101")
    a.body = applyQuotedInStav(
      a.body,
      1,
      "права",
      (window) =>
        window.replace("права", "права и одржавању личних односа са дјететом"),
      "27/24 чл. 4 / чл. 101 st. 1",
    )
  }
  {
    const a = getArticle(parts, "102")
    a.body = replaceStav(
      a.body,
      2,
      "(2) У случају несагласности између родитеља о питањима која битно утичу на живот дјетета, без обзира на то да ли родитељи родитељско право врше заједнички или један родитељ самостално, на захтјев једног од родитеља рјешење о питањима која битно утичу на живот дјетета доноси орган старатељства, водећи рачуна о најбољем интересу дјетета.",
    )
  }
  {
    const a = getArticle(parts, "104")
    a.body = replaceStav(
      a.body,
      1,
      "(1) Тужбу за уређење родитељског права и уређење одржавања личних односа са дјететом могу поднијети дијете и родитељи дјетета.",
    )
  }
  {
    const a = getArticle(parts, "109")
    a.body = replaceQuoted(
      a.body,
      "У поступку",
      "(1) У поступку",
      "27/24 чл. 7 / чл. 109 prefix (1)",
    )
    a.body = insertAfterStav(
      a.body,
      1,
      "(2) У поступку за уређење вршења родитељског права и одржавања личних односа са дјететом, суд може одредити привремене мјере из члана 75. овог закона.",
    )
  }
  {
    const a = getArticle(parts, "120")
    a.body = replaceStav(
      a.body,
      3,
      "(3) Орган старатељства дужан је да сваких шест мјесеци испита своју одлуку о избору лица, хранитељске породице, установе социјалне заштите или друге установе у коју је дијете смјештено, односно да суду предложи враћање дјетета у његову породицу ако сматра да је то у најбољем интересу дјетета.",
    )
  }
  {
    const a = getArticle(parts, "150")
    a.body = insertAfterStav(
      a.body,
      2,
      "(3) Лице које себе сматра оцем дјетета рођеног у браку може оспоравати очинство мушкарцу који се према овом закону сматра оцем дјетета, ако истовремено тражи да се утврди његово очинство.\n\n(4) Тужба ради оспоравања очинства из става 3. овог члана може се поднијети у року од шест мјесеци од дана сазнања за чињеницу на основу које се може закључити да је то лице отац дјетета, али најкасније до навршених десет година живота дјетета.",
    )
  }
  {
    const a = getArticle(parts, "161")
    a.body = replaceStav(
      a.body,
      3,
      "(3) Суд је дужан да пресудом у спору о материнству и очинству одлучи о вршењу родитељског права, издржавању малољетног дјетета и одржавању личних односа између дјетета и родитеља са којим дијете не живи.",
    )
  }
  {
    const a = getArticle(parts, "162")
    const heading = headingOf("162")
    const idx = a.body.indexOf(heading)
    if (idx < 0) throw new ConsolidationStop("STOP: heading Члан 162. missing")
    const prefix = a.body.slice(0, idx)
    const rest = a.body.slice(idx + heading.length).trim()
    if (rest.startsWith("(1)") || rest.startsWith("(2)")) {
      throw new ConsolidationStop("STOP: чл. 162 already numbered")
    }
    a.body =
      prefix +
      heading +
      "\n\n(1) Против другостепене одлуке у споровима ради утврђивања и оспоравања очинства и материнства увијек је дозвољена ревизија.\n\n(2) " +
      rest
  }
  {
    const a = getArticle(parts, "237")
    a.body = replaceQuoted(
      a.body,
      "родитеља",
      "старатеља",
      "27/24 чл. 12 / чл. 237",
    )
  }
  {
    const a = getArticle(parts, "267")
    a.body = replaceQuoted(a.body, "264.", "265.", "27/24 чл. 13 / чл. 267")
  }
  {
    const a = getArticle(parts, "270")
    a.body = replaceStav(
      a.body,
      3,
      "(3) Ако је брак између мајке и очуха, односно маћехе и оца дјетета поништен или разведен или поништен, обавеза издржавања према пасторцима престаје.",
    )
  }
  {
    const a = getArticle(parts, "283")
    a.body = replaceArticleInner(
      a.body,
      "283",
      "Право на издржавање престаје ако лице које то право користи закључи брак, заснује ванбрачну заједницу или ако суд утврди да је постало недостојно тог права.",
    )
  }
  {
    const a = getArticle(parts, "292")
    a.body = replaceQuoted(
      a.body,
      "просјечне",
      "просјечне мјесечне",
      "27/24 чл. 16 / чл. 292",
    )
  }
  {
    const after299 = articleIndex(parts, "299")
    parts.splice(after299 + 1, 0, {
      articleNum: "299а",
      body:
        "Ревизија\n\nЧлан 299а.\n\nПротив другостепене одлуке у споровима ради издржавања малољетне дјеце или пунољетне дјеце над којима је продужено родитељско право, увијек је дозвољена ревизија.",
    })
  }
  {
    const a = getArticle(parts, "315")
    a.body = replaceQuoted(
      a.body,
      "чл. 327. до 336. овог закона",
      "чл. 317. до 326. овог закона",
      "27/24 чл. 18 / чл. 315",
    )
  }
  {
    const a = getArticle(parts, "318")
    a.body = replaceQuoted(
      a.body,
      "чл. 329. до 336. овог закона",
      "чл. 319. до 326. овог закона",
      "27/24 чл. 19 / чл. 318",
    )
  }
  {
    const a = getArticle(parts, "332")
    a.body = replaceQuoted(a.body, "341.", "331.", "27/24 чл. 20 / чл. 332")
  }
  {
    const a = getArticle(parts, "333")
    a.body = replaceQuoted(a.body, "312.", "302.", "27/24 чл. 21 / чл. 333 st. 1")
    // st. 3 «341.»→«331.» and «342.»→«332.» not applied — see divergence log.
  }
  {
    const a = getArticle(parts, "334")
    a.body = replaceQuoted(
      a.body,
      "управљају",
      "управљају и располажу",
      "27/24 чл. 22 / чл. 334",
    )
  }
  {
    const a = getArticle(parts, "335")
    a.body = replaceStav(
      a.body,
      3,
      "(3) Непокретности, права веће вриједности и вредније ствари из имовине малољетника могу се отуђити или оптеретити само ради издржавања, лијечења, васпитања или образовања малољетног дјетета и само ако су исцрпљене све могућности лица која су по закону дужна да издржавају дијете.",
    )
    a.body = replaceStav(
      a.body,
      4,
      "(4) Имовином малољетног дјетета из става 3. овог члана родитељи могу располагати само уз претходну сагласност органа старатељства.",
    )
  }
  {
    const a = getArticle(parts, "342")
    const phrase =
      ", осим у случају када су правоснажно расправљени прије ступања на снагу овог закона"
    a.body = replaceQuoted(a.body, phrase, "", "27/24 чл. 24 / чл. 342")
  }
  {
    const a = getArticle(parts, "344")
    a.body = replaceQuoted(
      a.body,
      "одредбама овог закона",
      "одредбама раније важећег закона",
      "27/24 чл. 25 / чл. 344",
    )
  }
  {
    const a = getArticle(parts, "346")
    a.body =
      "Важење правоснажне одлуке органа старатељства о уређењу вршења родитељског права или одржавању личних односа са дјететом\n\nЧлан 346.\n\n(1) Уколико је орган старатељства донио правоснажну одлуку о уређењу вршења родитељског права или одржавању личних односа са дјететом, лица која су законом овлашћена захтијевати измјену такве одлуке могу покренути поступак за уређење ових питања пред судом усљед битно промијењених околности, у складу са одредбама овог закона.\n\n(2) Правоснажна одлука органа старатељства, донесена на основу раније важећег закона, а којом се уређује вршење родитељског права или одржавање личних односа са дјететом остаје на снази до правоснажности одлуке суда којом се одлучује о истом питању."
  }

  // --- U-4/24 ---
  {
    const i = articleIndex(parts, "141")
    parts.splice(i, 1)
  }
  {
    const a = getArticle(parts, "149")
    a.body = deleteStav(a.body, 2)
  }

  // --- 61/25 ---
  {
    const after140 = articleIndex(parts, "140")
    parts.splice(after140 + 1, 0, {
      articleNum: "141а",
      body:
        "Тужба дјетета за утврђивање очинства\n\nЧлан 141а.\n\nТужбу ради утврђивања очинства дијете може поднијети без обзира на године живота.",
    })
  }
  {
    const a = getArticle(parts, "149")
    a.body = replaceArticleInner(
      a.body,
      "149",
      "(1) Дијете може оспоравати да му је отац лице које се по овом закону сматра његовим оцем, осим у случају када је очинство утврђено правоснажном судском пресудом.\n\n(2) Тужбу из става 1. овог члана дијете може поднијети без обзира на године живота.",
    )
  }

  return parts
}

export function porodicniInventory(parts: ClanPart[]): {
  count: number
  highest: string
  nums: string[]
  lettered: string[]
  omittedStruck: string[]
  added: string[]
} {
  const nums = parts.map((p) => p.articleNum)
  return {
    count: parts.length,
    highest: nums.at(-1) ?? "",
    nums,
    lettered: nums.filter((n) => /[^\d]/.test(n)),
    omittedStruck: nums.includes("141") ? [] : ["141"],
    added: nums.filter((n) => n === "141а" || n === "299а"),
  }
}
