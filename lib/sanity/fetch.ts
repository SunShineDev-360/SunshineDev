import { client } from './client'

export async function sanityFetch<QueryResult>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string
  params?: Record<string, any>
  revalidate?: number | false
  tags?: string[]
}): Promise<QueryResult | null> {
  try {
    const result = await client.fetch<QueryResult>(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate,
        tags,
      },
    })
    return result ?? null
  } catch (error) {
    // In production/build time, log but don't throw to allow fallbacks
    if (process.env.NODE_ENV === 'development') {
      console.error('Sanity fetch error:', error)
    }
    // Return null instead of throwing to allow graceful fallbacks
    return null
  }
}

