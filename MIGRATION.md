# Sanity CMS Migration Guide

## Overview
This project has been integrated with Sanity CMS. All content (navbar, hero, skills, work history, projects, footer) can now be edited through the Sanity Studio.

## Setup Complete ✅

1. **Schemas Created**: All 10 content types are defined in `sanity/schemas/`
2. **Studio Configured**: Accessible at `http://localhost:3000/studio`
3. **Components Updated**: All components now fetch data from Sanity with fallbacks
4. **Migration Script**: Ready to upload images and create content

## Running the Migration

To migrate all existing content (images and data) from constants to Sanity:

1. **Ensure environment variables are set** in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ktxsv9pz
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_WRITE_TOKEN=your_write_token_here
   ```
   
   **Important**: You need a **write token** (not read-only) to create documents and upload images.
   - Get a write token from: https://sanity.io/manage
   - Go to your project → API → Tokens → Create new token
   - Select "Editor" or "Admin" permissions
   - Use `SANITY_API_WRITE_TOKEN` for migration (or `SANITY_API_READ_TOKEN` for read-only access)

2. **Run the migration script**:
   ```bash
   npm run migrate:sanity
   ```

This will:
- Upload all images from `/public/` to Sanity
- Create all skill documents
- Create all work history items
- Create all projects
- Create navbar, hero, footer documents
- Create section documents (skills, work history, projects)
- Create site settings document linking everything together

## What Gets Migrated

### Images
- Logo: `public/logo.png`
- Avatar: `public/avatar.png`
- Skills: All images from `public/skills/` (html.png, css.png, js.png, etc.)
- Projects: All images from `public/projects/` (project-1.png, project-2.png, project-3.png)

### Content
- **Navbar**: Name, navigation links, social links, source code link
- **Hero**: Badge text, heading, description, button text, avatar
- **Skills**: All skills from `SKILL_DATA` with images and categories
- **Work History**: All work history items from `WORK_HISTORY`
- **Projects**: All projects from `PROJECTS` with images
- **Footer**: Footer columns and copyright text

## After Migration

Once the migration is complete:
1. Visit `http://localhost:3000/studio` to see all your content
2. Edit any content through the Studio interface
3. Changes will be reflected on your site (with revalidation)

## Manual Migration (Alternative)

If you prefer to migrate content manually:
1. Open Sanity Studio at `http://localhost:3000/studio`
2. Upload images through the Studio interface
3. Create documents for each content type
4. Link them together in Site Settings

## Notes

- The migration script is idempotent - you can run it multiple times
- If documents already exist, they will be updated
- Images are uploaded to Sanity's CDN for optimized delivery
- All components have fallbacks to constants if Sanity data is unavailable

