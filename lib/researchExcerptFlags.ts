/**
 * Card predicate. is_excerpt arrives on the search row from match_legal_articles.
 * Once all seven jurisdictions are re-split, drop the text comparison and keep is_excerpt alone.
 */
export function showsExcerptCard(item: {
  is_excerpt?: boolean
  text: string
  text_local: string | null
}): boolean {
  return item.is_excerpt !== false && item.text === item.text_local
}
