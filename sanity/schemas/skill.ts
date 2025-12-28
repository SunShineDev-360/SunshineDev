import { defineType } from 'sanity'

export default defineType({
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Skill Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Skill Image',
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
      name: 'width',
      type: 'number',
      title: 'Width',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'height',
      type: 'number',
      title: 'Height',
      validation: (Rule: any) => Rule.required(),
    },
    {
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
      validation: (Rule: any) => Rule.required(),
    },
  ],
})

