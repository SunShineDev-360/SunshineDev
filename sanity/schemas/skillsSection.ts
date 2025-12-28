import { defineType } from 'sanity'

export default defineType({
  name: 'skillsSection',
  type: 'document',
  title: 'Skills Section',
  fields: [
    {
      name: 'badgeText',
      type: 'string',
      title: 'Badge Text',
    },
    {
      name: 'mainHeading',
      type: 'string',
      title: 'Main Heading',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subHeading',
      type: 'string',
      title: 'Sub Heading',
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [
        {
          type: 'reference',
          to: [{ type: 'skill' }],
        },
      ],
    },
  ],
})

