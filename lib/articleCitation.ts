const SINGLE_ARTICLE_NUM = /^\d+(?:\.\d+)*\p{L}{0,2}$/u
const ROMAN_ARTICLE_NUM = /^(?=[IVXLCDM]{1,6}$)M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$/u

type ArticleCitation = {
  article: (n: string) => string
  range: (n: string) => string
  part: (n: string) => string
}

const CLAN_CITATION: ArticleCitation = {
  article: (n) => `Član ${n}`,
  range: (n) => `Čl. ${n}`,
  part: (n) => `(${n}. dio)`,
}

const ARTICLE_CITATION: Record<string, ArticleCitation> = {
  montenegro: CLAN_CITATION,
  bih_rs: CLAN_CITATION,
  bih_fbih: CLAN_CITATION,
  bih_brcko: CLAN_CITATION,
  croatia: {
    article: (n) => `Članak ${n}`,
    range: (n) => `Čl. ${n}`,
    part: (n) => `(${n}. dio)`,
  },
  serbia: {
    article: (n) => `Члан ${n}`,
    range: (n) => `Чл. ${n}`,
    part: (n) => `(${n}. део)`,
  },
  slovenia: {
    article: (n) => `${n}. člen`,
    range: (n) => `${n}. čl.`,
    part: (n) => `(${n}. del)`,
  },
}

export function articleCitationLabel(
  jurisdiction: string,
  articleNum: string,
  paragraphNum: string | null,
): string {
  const format = ARTICLE_CITATION[jurisdiction] ?? CLAN_CITATION
  const single = SINGLE_ARTICLE_NUM.test(articleNum) || ROMAN_ARTICLE_NUM.test(articleNum)
  const head = single ? format.article(articleNum) : format.range(articleNum)
  if (!paragraphNum) return head
  return `${head} ${format.part(paragraphNum)}`
}
