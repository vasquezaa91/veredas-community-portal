#!/bin/bash

# Veredas Community Portal - GitHub Setup Script
# Run this script after creating your GitHub repository

echo "🚀 Setting up GitHub repository for Veredas Community Portal..."

# Replace YOUR_USERNAME with your actual GitHub username
# Replace YOUR_REPO_NAME with your repository name (suggested: veredas-community-portal)

read -p "Enter your GitHub username: " username
read -p "Enter your repository name: " repo_name

echo "📡 Adding remote origin..."
git remote add origin https://github.com/$username/$repo_name.git

echo "📤 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your Veredas Community Portal is now on GitHub!"
echo "🌐 Repository URL: https://github.com/$username/$repo_name"
echo ""
echo "Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Set up GitHub Pages for live deployment (optional)"
echo "3. Add collaborators if needed"
echo "4. Create issues for future features"
