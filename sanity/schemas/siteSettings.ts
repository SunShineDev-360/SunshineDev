import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The title displayed in the browser tab',
      initialValue: 'SunshineDev',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'navbar',
      type: 'reference',
      title: 'Navbar',
      to: [{ type: 'navbar' }],
    },
    {
      name: 'hero',
      type: 'reference',
      title: 'Hero Section',
      to: [{ type: 'hero' }],
    },
    {
      name: 'skillsSection',
      type: 'reference',
      title: 'Skills Section',
      to: [{ type: 'skillsSection' }],
    },
    {
      name: 'workHistorySection',
      type: 'reference',
      title: 'Work History Section',
      to: [{ type: 'workHistorySection' }],
    },
    {
      name: 'projectsSection',
      type: 'reference',
      title: 'Projects Section',
      to: [{ type: 'projectsSection' }],
    },
    {
      name: 'footer',
      type: 'reference',
      title: 'Footer',
      to: [{ type: 'footer' }],
    },
  ],
})

