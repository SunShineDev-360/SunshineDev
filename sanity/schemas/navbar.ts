import { defineType } from 'sanity'

export default defineType({
  name: 'navbar',
  type: 'document',
  title: 'Navbar',
  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
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
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'React icon component name (e.g., RxInstagramLogo)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'link',
              type: 'url',
              title: 'Link',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'sourceCodeLink',
      type: 'url',
      title: 'Source Code Link',
    },
  ],
})

