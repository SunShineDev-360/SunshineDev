import { defineType } from 'sanity'

export default defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  fields: [
    {
      name: 'columns',
      type: 'array',
      title: 'Footer Columns',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Column Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      type: 'string',
                      title: 'Link Name',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'icon',
                      type: 'image',
                      title: 'Icon Image',
                      description: 'Upload a custom icon image (SVG, PNG, etc.)',
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
                      name: 'iconName',
                      type: 'string',
                      title: 'Icon Name (Optional)',
                      description: 'React icon component name (e.g., FaYoutube). Leave empty if using uploaded icon image.',
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
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'string',
      title: 'Copyright Text',
      description: 'e.g., "John Doe 2024 Inc. All rights reserved."',
    },
  ],
})

