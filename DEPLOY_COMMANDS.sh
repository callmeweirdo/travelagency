#!/bin/bash
# NaijaTravel Pro - Deployment Commands
# Run these commands to push to GitHub and deploy to Vercel

echo "🚀 NaijaTravel Pro Deployment Script"
echo "======================================"
echo ""

# Check if GitHub repo URL is set
if [ -z "$GITHUB_USERNAME" ]; then
    echo "⚠️  Please set your GitHub username:"
    echo "export GITHUB_USERNAME=your_username"
    echo ""
    exit 1
fi

GITHUB_REPO="https://github.com/$GITHUB_USERNAME/travelagency.git"

echo "📦 Step 1: Adding GitHub remote..."
git remote add origin $GITHUB_REPO 2>/dev/null || git remote set-url origin $GITHUB_REPO
echo "✅ Remote added: $GITHUB_REPO"
echo ""

echo "📤 Step 2: Pushing to GitHub..."
git branch -M main
git push -u origin main
echo "✅ Code pushed to GitHub"
echo ""

echo "🌐 Step 3: Vercel Deployment"
echo "Option A - Dashboard:"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import 'travelagency' repository"
echo "  3. Deploy!"
echo ""
echo "Option B - CLI:"
echo "  npm i -g vercel"
echo "  vercel --prod"
echo ""

echo "✨ Deployment Complete!"
echo "📁 Repository: $GITHUB_REPO"
echo ""
echo "Next steps:"
echo "1. Visit your GitHub repo"
echo "2. Connect Vercel"
echo "3. Add environment variables"
echo "4. Deploy!"
