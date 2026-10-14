/**
 * A provision is apparatus when the whole text is a commencement, a repeal,
 * or a transitional clause. Anything else is operative. The patterns are the
 * census that counted 202, 19 and 10 in Montenegro.
 */

export type ProvisionKind = "commencement" | "repeal" | "transitional" | "operative"

/** Drop a leading article label so the clause itself is what gets tested. */
export function provisionBody(text: string): string {
  let body = text.replace(/\s+/g, " ").trim()
  body = body.replace(/^(?:Član|Члан|Clan)\s+\d+[a-zA-Z]?\s*/iu, "")
  body = body.replace(/^Samostalni član\s*/i, "")
  return body.trim()
}

const FORCE_CLAUSE =
  /(?:ovaj|ova|ovo)\s+(?:zakon|propis|uredba|pravilnik|odluka|zakonik|kodeks)\s+stupa na snagu|(?:овај|ова|ово)\s+\S+\s+ступа на снагу/iu

const NUMBERED_ITEM = /(?:^|\s)\d+\)/

const REPEAL_LATIN =
  /^danom (?:stupanja|početka|pocetka)[\s\S]{0,120}prestaje da važi\s+(?:zakon|član|clan|odredb)/i

const REPEAL_CYRILLIC =
  /^даном (?:ступања|почетка)[\s\S]{0,120}престаје да важи\s+(?:закон|члан|одредб)/u

const REPEAL_ARTICLE =
  /^одредба\s+члана\b[\s\S]{0,160}prestaje da važi/i

const TRANSITIONAL_OPEN =
  /^(?:odredbe|odredba)\s+(?:člana|clana|члана)\b/iu

const TRANSITIONAL_FUTURE =
  /primjenjivaće se|primjenjivace se|примењиваће се/iu

export function provisionKind(text: string): ProvisionKind {
  const body = provisionBody(text)
  if (!body) return "operative"
  const forceAt = body.search(FORCE_CLAUSE)
  if (forceAt >= 0 && forceAt < 180 && body.length <= 450 && !NUMBERED_ITEM.test(body)) {
    return "commencement"
  }
  if (
    body.length <= 500 &&
    (REPEAL_LATIN.test(body) || REPEAL_CYRILLIC.test(body) || REPEAL_ARTICLE.test(body))
  ) {
    return "repeal"
  }
  if (body.length <= 450 && TRANSITIONAL_OPEN.test(body) && TRANSITIONAL_FUTURE.test(body)) {
    return "transitional"
  }
  return "operative"
}

export function isApparatusProvision(text: string): boolean {
  return provisionKind(text) !== "operative"
}
