import { type SchemaTypeDefinition } from 'sanity'

import footer from '../schemas/footer'
import hero from '../schemas/hero'
import navbar from '../schemas/navbar'
import project from '../schemas/project'
import projectsSection from '../schemas/projectsSection'
import siteSettings from '../schemas/siteSettings'
import skill from '../schemas/skill'
import skillsSection from '../schemas/skillsSection'
import workHistory from '../schemas/workHistory'
import workHistorySection from '../schemas/workHistorySection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    navbar,
    hero,
    skill,
    skillsSection,
    workHistory,
    workHistorySection,
    project,
    projectsSection,
    footer,
    siteSettings,
  ],
}
