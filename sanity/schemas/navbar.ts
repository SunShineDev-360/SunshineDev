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
              title: 'Icon Name',
              description: 'React icon component name (e.g., RxInstagramLogo). Leave empty if using uploaded icon image.',
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link',
              description: 'URL (e.g., https://example.com) or email link (e.g., mailto:email@example.com)',
              validation: (Rule: any) =>
                Rule.required().custom((value: string) => {
                  if (!value) return true; // Required validation handles empty
                  // Check if it's a mailto: link
                  if (value.startsWith('mailto:')) {
                    const email = value.replace('mailto:', '');
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                      return 'Invalid email format. Use: mailto:email@example.com';
                    }
                    return true;
                  }
                  // Otherwise validate as URL
                  try {
                    new URL(value);
                    return true;
                  } catch {
                    return 'Invalid URL format. Use: https://example.com or mailto:email@example.com';
                  }
                }),
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

