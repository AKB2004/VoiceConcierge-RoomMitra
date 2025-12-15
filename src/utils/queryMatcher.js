import { cannedResponses, fallbackResponse } from '@/data/cannedResponses'
/**
 * @param {string} query - User's spoken/typed query
 * @returns {string} - Matched response or fallback message
 */
export function matchQuery(query) {
  if (!query || query.trim() === '') {
    return fallbackResponse
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Try to find a match
  for (const item of cannedResponses) {
    const hasMatch = item.keywords.some(keyword => 
      normalizedQuery.includes(keyword.toLowerCase())
    )

    if (hasMatch) {
      return item.response
    }
  }

  return fallbackResponse
}

export function fuzzyMatchQuery(query) {
  return matchQuery(query)
}