import { defineType } from 'sanity'

export default defineType({
  name: 'projectsSection',
  type: 'document',
  title: 'Projects Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'projects',
      type: 'array',
      title: 'Projects',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
})

