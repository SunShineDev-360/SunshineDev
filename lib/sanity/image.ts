import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktxsv9pz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export const urlFor = (source: any) => {
  return builder.image(source)
}

