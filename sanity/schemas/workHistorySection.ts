import { defineType } from 'sanity'

export default defineType({
  name: 'workHistorySection',
  type: 'document',
  title: 'Work History Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'workItems',
      type: 'array',
      title: 'Work History Items',
      of: [
        {
          type: 'reference',
          to: [{ type: 'workHistory' }],
        },
      ],
    },
  ],
})

