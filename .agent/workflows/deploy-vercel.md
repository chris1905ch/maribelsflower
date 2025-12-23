---
description: Deploy the application to Vercel
---

# Deploying to Vercel

Since you have already pushed your code to GitHub, the best way to deploy is through the Vercel dashboard for automatic updates.

## Option 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **New Project**: Click the **"Add New..."** button and select **"Project"**.
3. **Import Repository**: 
   - Find your repository `maribelsflower` in the list.
   - Click **"Import"**.
4. **Configure Project**:
   - Framework Preset: Select **"Other"** (it should detect HTML automatically).
   - Root Directory: `./`
   - No build settings are needed for this static site.
5. **Deploy**: Click **"Deploy"**.

Your site will be live in seconds, and every time you `git push`, Vercel will update it automatically!

## Option 2: Vercel CLI (Command Line)

If you prefer the terminal, follow these steps:

1. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```
2. **Login**:
   ```powershell
   vercel login
   ```
3. **Deploy**:
   Run this command in the root of your project:
   ```powershell
   vercel
   ```
4. **Production**:
   To deploy to your live domain:
   ```powershell
   vercel --prod
   ```
