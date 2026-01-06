import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  description: 'Complete content for the home page including Hero, Skills, Work History, and Projects sections',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        defineField({
          name: 'badgeText',
          type: 'string',
          title: 'Badge Text',
          initialValue: 'Fullstack Developer Portfolio',
        }),
        defineField({
          name: 'mainHeading',
          type: 'string',
          title: 'Main Heading',
          initialValue: 'Providing the best project experience.',
        }),
        defineField({
          name: 'highlightedText',
          type: 'string',
          title: 'Highlighted Text',
          description: 'Text that will be highlighted in the heading',
          initialValue: 'the best',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          initialValue: "I'm a Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
        }),
        defineField({
          name: 'buttonText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Learn more',
        }),
        defineField({
          name: 'avatar',
          type: 'image',
          title: 'Avatar Image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              initialValue: 'work icons',
            }),
          ],
        }),
      ],
    }),

    // Skills Section
    defineField({
      name: 'skillsSection',
      type: 'object',
      title: 'Skills Section',
      fields: [
        defineField({
          name: 'badgeText',
          type: 'string',
          title: 'Badge Text',
        }),
        defineField({
          name: 'mainHeading',
          type: 'string',
          title: 'Main Heading',
          initialValue: 'My Skills',
        }),
        defineField({
          name: 'subHeading',
          type: 'string',
          title: 'Sub Heading',
        }),
        defineField({
          name: 'skills',
          type: 'array',
          title: 'Skills',
          of: [
            {
              type: 'object',
              name: 'skillItem',
              title: 'Skill Item',
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  title: 'Skill Name',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Skill Image/Icon',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }),
                  ],
                }),
                defineField({
                  name: 'width',
                  type: 'number',
                  title: 'Width',
                  initialValue: 80,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'height',
                  type: 'number',
                  title: 'Height',
                  initialValue: 80,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'category',
                  type: 'string',
                  title: 'Category',
                  options: {
                    list: [
                      { title: 'General', value: 'general' },
                      { title: 'Frontend', value: 'frontend' },
                      { title: 'Backend', value: 'backend' },
                      { title: 'Fullstack', value: 'fullstack' },
                      { title: 'Other', value: 'other' },
                    ],
                    layout: 'radio',
                  },
                  validation: (rule) => rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Work History Section
    defineField({
      name: 'workHistorySection',
      type: 'object',
      title: 'Work History Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Work History',
        }),
        defineField({
          name: 'workItems',
          type: 'array',
          title: 'Work History Items',
          of: [
            {
              type: 'object',
              name: 'workItem',
              title: 'Work Item',
              fields: [
                defineField({
                  name: 'period',
                  type: 'string',
                  title: 'Period',
                  description: 'e.g., "2022-2024"',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'role',
                  type: 'string',
                  title: 'Role',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'company',
                  type: 'string',
                  title: 'Company',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'skills',
                  type: 'array',
                  title: 'Skills',
                  of: [{ type: 'string' }],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // Projects Section
    defineField({
      name: 'projectsSection',
      type: 'object',
      title: 'Projects Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'My Projects',
        }),
        defineField({
          name: 'projects',
          type: 'array',
          title: 'Projects',
          of: [
            {
              type: 'object',
              name: 'projectItem',
              title: 'Project Item',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                  title: 'Project Title',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'image',
                  type: 'image',
                  title: 'Project Image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                    }),
                  ],
                }),
                defineField({
                  name: 'link',
                  type: 'url',
                  title: 'Project Link',
                  validation: (rule) => rule.required(),
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.mainHeading',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Complete home page content',
      }
    },
  },
})

