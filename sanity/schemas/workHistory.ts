import { defineType } from 'sanity'

export default defineType({
  name: 'workHistory',
  type: 'document',
  title: 'Work History Item',
  fields: [
    {
      name: 'period',
      type: 'string',
      title: 'Period',
      description: 'e.g., "2022-2024"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'string' }],
    },
  ],
})

