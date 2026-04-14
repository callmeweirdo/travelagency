# GitHub & Vercel Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `travelagency`
3. Make it Public or Private
4. **DO NOT** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repo, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/travelagency.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your `travelagency` GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add Environment Variables:
   ```
   NEXTAUTH_SECRET=your-random-secret-key
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```
5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 4: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

### Required for Basic Functionality:

- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your Vercel deployment URL

### Required for Full Functionality:

- `DATABASE_URL` - PostgreSQL connection string
- `PAYSTACK_SECRET_KEY` - From Paystack dashboard
- `PAYSTACK_PUBLIC_KEY` - From Paystack dashboard
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `RESEND_API_KEY` - For email notifications

## Current Project Status

- ✅ **Git**: Initialized, 3 commits ready to push
- ✅ **Build**: Ready for production
- ✅ **Phase 1**: Foundation 100% complete
- ✅ **Phase 2**: Core Features 60% complete
- 🔄 **Next**: Booking flow & payments

## Repository Contents

```
travelagency/
├── src/
│   ├── app/              # Next.js pages & API routes
│   ├── components/ui/    # shadcn/ui components
│   ├── lib/              # Utilities, auth, prisma
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── docs/                 # Documentation
├── package.json
├── next.config.js
└── README.md
```

## Quick Resume (After Setup)

```bash
git clone https://github.com/YOUR_USERNAME/travelagency.git
cd travelagency
npm install
cp .env.example .env.local
npm run dev
```

## Support

- Check `docs/PROJECT_STATE.json` for current status
- Check `docs/RESUME.md` for quick resume guide
- Check `docs/TODO.md` for pending tasks
