import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  type: 'document',
  title: 'Hero Section',
  fields: [
    {
      name: 'badgeText',
      type: 'string',
      title: 'Badge Text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainHeading',
      type: 'string',
      title: 'Main Heading',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'highlightedText',
      type: 'string',
      title: 'Highlighted Text',
      description: 'Text that will be highlighted in the heading',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
    },
    {
      name: 'avatar',
      type: 'image',
      title: 'Avatar Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
  ],
})

