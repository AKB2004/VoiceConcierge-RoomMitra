import { cannedResponses, fallbackResponse } from '@/data/cannedResponses'

/**
 * Matches user query to predefined Q&A responses
 * Uses keyword-based matching with case-insensitive search
 * 
 * @param {string} query - User's spoken/typed query
 * @returns {string} - Matched response or fallback message
 */
export function matchQuery(query) {
  if (!query || query.trim() === '') {
    return fallbackResponse
  }

  // Normalize query: lowercase and remove extra spaces
  const normalizedQuery = query.toLowerCase().trim()

  // Try to find a match
  for (const item of cannedResponses) {
    // Check if ANY keyword matches in the query
    const hasMatch = item.keywords.some(keyword => 
      normalizedQuery.includes(keyword.toLowerCase())
    )

    if (hasMatch) {
      return item.response
    }
  }

  // No match found, return fallback
  return fallbackResponse
}

/**
 * Alternative: Fuzzy matching (more advanced - optional bonus)
 * You can implement this for bonus points
 * 
 * This would use Levenshtein distance or similar algorithms
 * to match queries even with typos or variations
 */
export function fuzzyMatchQuery(query) {
  // TODO: Implement fuzzy matching for bonus points
  // Could use libraries like 'fuse.js' for better matching
  return matchQuery(query)
}