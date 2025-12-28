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
}) {
  return client.fetch<QueryResult>(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  })
}

