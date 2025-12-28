/**
 * Migration script to upload images and create content in Sanity
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { SKILL_DATA, SOCIALS, NAV_LINKS, LINKS, WORK_HISTORY, PROJECTS, FOOTER_DATA } from '../constants'
import { FaYoutube, FaFacebook } from 'react-icons/fa'
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from 'react-icons/rx'

// Map icon components to their string names
const iconNameMap = new Map([
  [FaYoutube, 'FaYoutube'],
  [FaFacebook, 'FaFacebook'],
  [RxDiscordLogo, 'RxDiscordLogo'],
  [RxGithubLogo, 'RxGithubLogo'],
  [RxInstagramLogo, 'RxInstagramLogo'],
  [RxTwitterLogo, 'RxTwitterLogo'],
  [RxLinkedinLogo, 'RxLinkedinLogo'],
])

function getIconName(icon: any): string {
  if (!icon) return ''
  return iconNameMap.get(icon) || icon.name || icon.displayName || ''
}

// Use write token if available, otherwise fall back to read token
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.error('❌ Error: SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN must be set')
  console.error('   For migration, you need a write token with create/update permissions')
  console.error('   Get one from: https://sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ktxsv9pz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: token,
})

async function uploadImage(imagePath: string, filename: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
      contentType: 'image/png',
    })

    console.log(`✓ Uploaded: ${filename} (${asset._id})`)
    return asset._id
  } catch (error) {
    console.error(`✗ Failed to upload ${filename}:`, error)
    return null
  }
}

async function migrateSkills() {
  console.log('\n📦 Migrating Skills...')
  const skillIds: string[] = []

  for (const skill of SKILL_DATA) {
    const imageId = await uploadImage(`skills/${skill.image}`, skill.image)
    
    const skillDoc = {
      _type: 'skill',
      name: skill.skill_name,
      width: skill.width,
      height: skill.height,
      category: 'general', // Default category
      image: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        alt: skill.skill_name,
      } : undefined,
    }

    try {
      const result = await client.create(skillDoc)
      skillIds.push(result._id)
      console.log(`  ✓ Created skill: ${skill.skill_name}`)
    } catch (error) {
      console.error(`  ✗ Failed to create skill ${skill.skill_name}:`, error)
    }
  }

  return skillIds
}

async function migrateWorkHistory() {
  console.log('\n📦 Migrating Work History...')
  const workHistoryIds: string[] = []

  for (const work of WORK_HISTORY) {
    const workDoc = {
      _type: 'workHistory',
      period: work.period,
      role: work.role,
      company: work.company,
      description: work.description,
      skills: work.skills || [],
    }

    try {
      const result = await client.create(workDoc)
      workHistoryIds.push(result._id)
      console.log(`  ✓ Created work history: ${work.role} at ${work.company}`)
    } catch (error) {
      console.error(`  ✗ Failed to create work history:`, error)
    }
  }

  return workHistoryIds
}

async function migrateProjects() {
  console.log('\n📦 Migrating Projects...')
  const projectIds: string[] = []

  for (const project of PROJECTS) {
    const imagePath = project.image.replace(/^\//, '') // Remove leading slash
    const imageId = await uploadImage(imagePath, path.basename(imagePath))
    
    const projectDoc = {
      _type: 'project',
      title: project.title,
      description: project.description,
      link: project.link,
      image: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        alt: project.title,
      } : undefined,
    }

    try {
      const result = await client.create(projectDoc)
      projectIds.push(result._id)
      console.log(`  ✓ Created project: ${project.title}`)
    } catch (error) {
      console.error(`  ✗ Failed to create project ${project.title}:`, error)
    }
  }

  return projectIds
}

async function migrateNavbar() {
  console.log('\n📦 Migrating Navbar...')
  
  const logoId = await uploadImage('logo.png', 'logo.png')
  
  const navbarDoc = {
    _type: 'navbar',
    name: 'John Doe',
    navLinks: NAV_LINKS.map(link => ({
      title: link.title,
      link: link.link,
    })),
    socialLinks: SOCIALS.map(social => ({
      name: social.name,
      iconName: getIconName(social.icon) || 'RxInstagramLogo',
      link: social.link,
    })),
    sourceCodeLink: LINKS.sourceCode,
    logo: logoId ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: logoId,
      },
      alt: 'Logo',
    } : undefined,
  }

  try {
    const result = await client.create(navbarDoc)
    console.log(`  ✓ Created navbar`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create navbar:`, error)
    return null
  }
}

async function migrateHero() {
  console.log('\n📦 Migrating Hero...')
  
  const avatarId = await uploadImage('avatar.png', 'avatar.png')
  
  const heroDoc = {
    _type: 'hero',
    badgeText: 'Fullstack Developer Portfolio',
    mainHeading: 'Providing the best project experience.',
    highlightedText: 'the best',
    description: "I'm a Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    buttonText: 'Learn more',
    avatar: avatarId ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: avatarId,
      },
      alt: 'Avatar',
    } : undefined,
  }

  try {
    const result = await client.create(heroDoc)
    console.log(`  ✓ Created hero section`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create hero:`, error)
    return null
  }
}

async function migrateSkillsSection(skillIds: string[]) {
  console.log('\n📦 Migrating Skills Section...')
  
  const skillsSectionDoc = {
    _type: 'skillsSection',
    badgeText: 'My Skills',
    mainHeading: 'Technologies I work with',
    subHeading: 'A comprehensive overview of my technical expertise',
    skills: skillIds.map(id => ({
      _type: 'reference',
      _ref: id,
    })),
  }

  try {
    const result = await client.create(skillsSectionDoc)
    console.log(`  ✓ Created skills section`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create skills section:`, error)
    return null
  }
}

async function migrateWorkHistorySection(workHistoryIds: string[]) {
  console.log('\n📦 Migrating Work History Section...')
  
  const workHistorySectionDoc = {
    _type: 'workHistorySection',
    title: 'Work Experience',
    workItems: workHistoryIds.map(id => ({
      _type: 'reference',
      _ref: id,
    })),
  }

  try {
    const result = await client.create(workHistorySectionDoc)
    console.log(`  ✓ Created work history section`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create work history section:`, error)
    return null
  }
}

async function migrateProjectsSection(projectIds: string[]) {
  console.log('\n📦 Migrating Projects Section...')
  
  const projectsSectionDoc = {
    _type: 'projectsSection',
    title: 'My Projects',
    projects: projectIds.map(id => ({
      _type: 'reference',
      _ref: id,
    })),
  }

  try {
    const result = await client.create(projectsSectionDoc)
    console.log(`  ✓ Created projects section`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create projects section:`, error)
    return null
  }
}

async function migrateFooter() {
  console.log('\n📦 Migrating Footer...')
  
  const footerDoc = {
    _type: 'footer',
    columns: FOOTER_DATA.map(column => ({
      title: column.title,
      links: column.data.map(link => ({
        name: link.name,
        iconName: getIconName(link.icon),
        link: link.link,
      })),
    })),
    copyrightText: 'John Doe 2024 Inc. All rights reserved.',
  }

  try {
    const result = await client.create(footerDoc)
    console.log(`  ✓ Created footer`)
    return result._id
  } catch (error) {
    console.error(`  ✗ Failed to create footer:`, error)
    return null
  }
}

async function migrateSiteSettings(
  navbarId: string | null,
  heroId: string | null,
  skillsSectionId: string | null,
  workHistorySectionId: string | null,
  projectsSectionId: string | null,
  footerId: string | null
) {
  console.log('\n📦 Migrating Site Settings...')
  
  const siteSettingsDoc: any = {
    _type: 'siteSettings',
    _id: 'siteSettings',
  }

  if (navbarId) {
    siteSettingsDoc.navbar = {
      _type: 'reference',
      _ref: navbarId,
    }
  }
  if (heroId) {
    siteSettingsDoc.hero = {
      _type: 'reference',
      _ref: heroId,
    }
  }
  if (skillsSectionId) {
    siteSettingsDoc.skillsSection = {
      _type: 'reference',
      _ref: skillsSectionId,
    }
  }
  if (workHistorySectionId) {
    siteSettingsDoc.workHistorySection = {
      _type: 'reference',
      _ref: workHistorySectionId,
    }
  }
  if (projectsSectionId) {
    siteSettingsDoc.projectsSection = {
      _type: 'reference',
      _ref: projectsSectionId,
    }
  }
  if (footerId) {
    siteSettingsDoc.footer = {
      _type: 'reference',
      _ref: footerId,
    }
  }

  try {
    // Try to create or update
    try {
      await client.create(siteSettingsDoc)
      console.log(`  ✓ Created site settings`)
    } catch (error: any) {
      if (error.statusCode === 409) {
        // Document already exists, update it
        await client.createOrReplace(siteSettingsDoc)
        console.log(`  ✓ Updated site settings`)
      } else {
        throw error
      }
    }
  } catch (error) {
    console.error(`  ✗ Failed to create/update site settings:`, error)
  }
}

async function main() {
  console.log('🚀 Starting Sanity migration...\n')

  try {
    // Migrate individual items first
    const skillIds = await migrateSkills()
    const workHistoryIds = await migrateWorkHistory()
    const projectIds = await migrateProjects()

    // Migrate sections
    const navbarId = await migrateNavbar()
    const heroId = await migrateHero()
    const skillsSectionId = await migrateSkillsSection(skillIds)
    const workHistorySectionId = await migrateWorkHistorySection(workHistoryIds)
    const projectsSectionId = await migrateProjectsSection(projectIds)
    const footerId = await migrateFooter()

    // Finally, create site settings
    await migrateSiteSettings(
      navbarId,
      heroId,
      skillsSectionId,
      workHistorySectionId,
      projectsSectionId,
      footerId
    )

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()

