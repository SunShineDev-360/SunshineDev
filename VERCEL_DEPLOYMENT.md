# Vercel Deployment Guide

## Required Environment Variables

For the application to work correctly on Vercel, you must configure the following environment variables in your Vercel project settings:

### Required Variables

1. **NEXT_PUBLIC_SANITY_PROJECT_ID**
   - Value: `ktxsv9pz`
   - Purpose: Identifies your Sanity project
   - Required for: Fetching content from Sanity CMS

2. **NEXT_PUBLIC_SANITY_DATASET**
   - Value: `production`
   - Purpose: Specifies which Sanity dataset to use
   - Required for: Fetching content from Sanity CMS

### Optional Variables

3. **SANITY_API_READ_TOKEN**
   - Purpose: Required only if your Sanity dataset is set to "private"
   - How to get:
     1. Go to https://sanity.io/manage
     2. Select your project (ktxsv9pz)
     3. Navigate to: API → Tokens → Create new token
     4. Select "Viewer" or "Editor" permissions
     5. Copy the token and add it to Vercel

## How to Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Add each variable:
   - Enter the **Name** (e.g., `NEXT_PUBLIC_SANITY_PROJECT_ID`)
   - Enter the **Value** (e.g., `ktxsv9pz`)
   - Select which environments to apply to:
     - ☑ Production
     - ☑ Preview
     - ☑ Development
5. Click **Save**
6. **Important**: After adding/updating environment variables, you must **redeploy** your application for changes to take effect

## Verification Checklist

After deployment, verify:

- [ ] Environment variables are set in Vercel dashboard
- [ ] Application has been redeployed after setting variables
- [ ] Build logs show no errors
- [ ] Homepage loads correctly (not showing 404)
- [ ] Sanity content displays (or fallback content shows if no Sanity data)

## Troubleshooting 404 Errors

If you still see a 404 error:

1. **Check Build Logs**: Vercel Dashboard → Deployments → Latest → View Logs
   - Look for build errors
   - Check for missing environment variables

2. **Verify Project Structure**:
   - ✅ `/app/page.tsx` exists (App Router)
   - ✅ `package.json` has correct build command: `npm run build`

3. **Verify Framework Detection**:
   - Vercel should auto-detect Next.js
   - Check Settings → General → Framework Preset shows "Next.js"

4. **Check Root Directory**:
   - If your project is in a subdirectory, set Root Directory in Vercel settings
   - This project is at root level, so no change needed

## Build Configuration

The project uses:
- **Framework**: Next.js 14 (App Router)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (Next.js default)
- **Node Version**: Check Vercel settings (should auto-detect from package.json)

## Notes

- The application includes fallback content, so it will work even if Sanity CMS is unavailable
- All data fetching is wrapped in error handling to prevent crashes
- The page will always render, using fallback constants if Sanity data is unavailable

