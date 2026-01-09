/**
 * Migration script to upload images and create homePage document in Sanity
 * Run with: npx tsx scripts/migrate-homepage.ts
 * 
 * This script will:
 * 1. Upload all images (avatar, skills icons, project images)
 * 2. Create a homePage document with all content consolidated
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'
import { SKILL_DATA, FRONTEND_SKILL, BACKEND_SKILL, FULLSTACK_SKILL, OTHER_SKILL, WORK_HISTORY, PROJECTS } from '../constants'

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
      console.warn(`⚠️  Image not found: ${fullPath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const stats = fs.statSync(fullPath)
    const fileSizeInMB = stats.size / (1024 * 1024)
    
    // Detect content type
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'image/png'
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    if (ext === '.webp') contentType = 'image/webp'
    if (ext === '.svg') contentType = 'image/svg+xml'

    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
      contentType: contentType,
    })

    console.log(`  ✓ Uploaded: ${filename} (${fileSizeInMB.toFixed(2)} MB) -> ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`  ✗ Failed to upload ${filename}:`, error)
    return null
  }
}

async function uploadAllImages() {
  console.log('\n📸 Uploading Images...\n')
  
  const imageMap: Record<string, string | null> = {}
  
  // Upload avatar
  console.log('Avatar:')
  const avatarId = await uploadImage('avatar.png', 'avatar.png')
  imageMap['avatar'] = avatarId

  // Upload all skill images
  console.log('\nSkills:')
  const allSkills = [...SKILL_DATA, ...FRONTEND_SKILL, ...BACKEND_SKILL, ...FULLSTACK_SKILL, ...OTHER_SKILL]
  const uniqueSkills = Array.from(new Map(allSkills.map(s => [s.skill_name, s])).values())
  
  for (const skill of uniqueSkills) {
    const imageId = await uploadImage(`skills/${skill.image}`, skill.image)
    imageMap[`skill_${skill.skill_name}`] = imageId
  }

  // Upload project images
  console.log('\nProjects:')
  for (const project of PROJECTS) {
    const imagePath = project.image.replace(/^\//, '') // Remove leading slash
    const imageId = await uploadImage(imagePath, path.basename(imagePath))
    imageMap[`project_${project.title}`] = imageId
  }

  return imageMap
}

async function createHomePageDocument(imageMap: Record<string, string | null>) {
  console.log('\n📄 Creating Home Page Document...\n')

  // Prepare hero section
  const hero = {
    badgeText: 'Fullstack Developer Portfolio',
    mainHeading: 'Providing the best project experience.',
    highlightedText: 'the best',
    description: "I'm a Full Stack Software Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
    buttonText: 'Learn more',
    avatar: imageMap['avatar'] ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageMap['avatar'],
      },
      alt: 'work icons',
    } : undefined,
  }

  // Prepare skills section
  const allSkills = [
    ...SKILL_DATA.map(s => ({ ...s, category: 'general' as const })),
    ...FRONTEND_SKILL.map(s => ({ ...s, category: 'frontend' as const })),
    ...BACKEND_SKILL.map(s => ({ ...s, category: 'backend' as const })),
    ...FULLSTACK_SKILL.map(s => ({ ...s, category: 'fullstack' as const })),
    ...OTHER_SKILL.map(s => ({ ...s, category: 'other' as const })),
  ]
  
  // Remove duplicates
  const uniqueSkills = Array.from(new Map(allSkills.map(s => [s.skill_name, s])).values())
  
  const skills = uniqueSkills.map(skill => {
    const imageId = imageMap[`skill_${skill.skill_name}`]
    return {
      _type: 'skillItem',
      name: skill.skill_name,
      width: skill.width,
      height: skill.height,
      category: skill.category,
      image: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        alt: skill.skill_name,
      } : undefined,
    }
  })

  const skillsSection = {
    badgeText: 'My Skills',
    mainHeading: 'Technologies I work with',
    subHeading: 'A comprehensive overview of my technical expertise',
    skills: skills,
  }

  // Prepare work history section
  const workHistorySection = {
    title: 'Work History',
    workItems: WORK_HISTORY.map(work => ({
      _type: 'workItem',
      period: work.period,
      role: work.role,
      company: work.company,
      description: work.description,
      skills: work.skills || [],
    })),
  }

  // Prepare projects section
  const projectsSection = {
    title: 'My Projects',
    projects: PROJECTS.map(project => {
      const imageId = imageMap[`project_${project.title}`]
      return {
        _type: 'projectItem',
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
    }),
  }

  // Create the complete homePage document
  const homePageDoc = {
    _type: 'homePage',
    _id: 'homePage',
    hero: hero,
    skillsSection: skillsSection,
    workHistorySection: workHistorySection,
    projectsSection: projectsSection,
  }

  try {
    // Try to create or update
    try {
      await client.create(homePageDoc)
      console.log('  ✓ Created homePage document')
    } catch (error: any) {
      if (error.statusCode === 409) {
        // Document already exists, update it
        await client.createOrReplace(homePageDoc)
        console.log('  ✓ Updated homePage document')
      } else {
        throw error
      }
    }
    return true
  } catch (error) {
    console.error('  ✗ Failed to create/update homePage:', error)
    return false
  }
}

function showUploadSummary() {
  console.log('📊 Upload Summary:\n')
  
  const allSkills = [...SKILL_DATA, ...FRONTEND_SKILL, ...BACKEND_SKILL, ...FULLSTACK_SKILL, ...OTHER_SKILL]
  const uniqueSkills = Array.from(new Map(allSkills.map(s => [s.skill_name, s])).values())
  
  console.log('Images to upload:')
  console.log(`  - Avatar: 1 image (avatar.png)`)
  console.log(`  - Skills: ${uniqueSkills.length} icons`)
  console.log(`  - Projects: ${PROJECTS.length} images`)
  console.log(`  Total: ${1 + uniqueSkills.length + PROJECTS.length} images\n`)
  
  console.log('Content to create:')
  console.log('  - 1 homePage document with:')
  console.log('    • Hero section (badge, heading, description, button, avatar)')
  console.log(`    • Skills section (${uniqueSkills.length} skills)`)
  console.log(`    • Work History section (${WORK_HISTORY.length} work items)`)
  console.log(`    • Projects section (${PROJECTS.length} projects)\n`)
}

async function main() {
  console.log('🚀 Home Page Migration Script\n')
  console.log('=' .repeat(50))
  
  showUploadSummary()
  
  // Check if token is available
  if (!token) {
    console.log('\n⚠️  No SANITY_API_WRITE_TOKEN found.')
    console.log('   To proceed with upload, set SANITY_API_WRITE_TOKEN in your .env file')
    console.log('   Get one from: https://sanity.io/manage\n')
    process.exit(0)
  }
  
  const proceed = process.argv.includes('--yes') || process.argv.includes('-y')
  
  if (!proceed) {
    console.log('⚠️  This script will upload images and create/update the homePage document.')
    console.log('   Run with --yes or -y flag to proceed, or review the summary above.\n')
    process.exit(0)
  }

  try {
    // Upload all images
    const imageMap = await uploadAllImages()
    
    // Create homePage document
    const success = await createHomePageDocument(imageMap)
    
    if (success) {
      console.log('\n✅ Migration completed successfully!')
      console.log('\n📝 Next steps:')
      console.log('   1. Deploy the schema: npx sanity schema deploy')
      console.log('   2. Visit your Sanity Studio to verify the content')
      console.log('   3. Update your page.tsx to use the new homePage query')
    } else {
      console.log('\n❌ Migration completed with errors. Please check the output above.')
      process.exit(1)
    }
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

main()

