# Migration Status

## Current Status: ⚠️ Requires Write Token

The migration script is ready but requires a **write token** with create/update permissions to upload images and create content.

### What's Needed

1. **Get a Write Token**:
   - Visit: https://sanity.io/manage
   - Select your project (ktxsv9pz)
   - Go to: API → Tokens → Create new token
   - Select "Editor" or "Admin" permissions
   - Copy the token

2. **Add to `.env.local`**:
   ```bash
   SANITY_API_WRITE_TOKEN=your_write_token_here
   ```

3. **Run Migration**:
   ```bash
   npm run migrate:sanity
   ```

### Alternative: Manual Migration via Studio

If you prefer to migrate manually:

1. Start the dev server: `npm run dev`
2. Open Sanity Studio: http://localhost:3000/studio
3. Manually create documents and upload images through the Studio interface

### What Will Be Migrated

Once you have the write token, the migration will:

- ✅ Upload all images (logo, avatar, skills, projects)
- ✅ Create all skill documents (13 skills)
- ✅ Create all work history items (4 items)
- ✅ Create all projects (3 projects)
- ✅ Create navbar, hero, footer documents
- ✅ Create section documents (skills, work history, projects)
- ✅ Create site settings document linking everything together

### Current Error

The migration script is currently failing with:
```
Insufficient permissions; permission "create" required
```

This is because the token being used is read-only. You need a write token to proceed.

