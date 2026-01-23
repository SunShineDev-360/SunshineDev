'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {revalidateAction} from './sanity/actions/revalidate'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    actions: (prev) => {
      // Find the index of the duplicate action
      const duplicateIndex = prev.findIndex(
        (action) => action.action === 'duplicate'
      );
      
      // Insert revalidateAction after duplicate (before delete)
      if (duplicateIndex !== -1) {
        return [
          ...prev.slice(0, duplicateIndex + 1),
          revalidateAction,
          ...prev.slice(duplicateIndex + 1),
        ];
      }
      
      // Fallback: add at the end
      return [...prev, revalidateAction];
    },
  },
})
