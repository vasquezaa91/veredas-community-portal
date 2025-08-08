#!/bin/bash

# Quick Firebase Setup Script for Veredas App
# This script helps you get the correct Firebase App ID

echo "🔥 Firebase Setup Helper for Veredas Community Portal"
echo "=================================================="
echo ""

echo "📋 Current Firebase Project Details:"
echo "  Project ID: veredas-auth"
echo "  Project Number: 19406864023"
echo "  API Key: AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs"
echo ""

echo "❌ ISSUE: auth/invalid-credential error"
echo "🔍 CAUSE: Missing or incorrect App ID in Firebase configuration"
echo ""

echo "✅ SOLUTION STEPS:"
echo ""
echo "1. Open Firebase Console:"
echo "   https://console.firebase.google.com/project/veredas-auth/settings/general"
echo ""
echo "2. Scroll to 'Your apps' section"
echo ""
echo "3. If NO web app exists:"
echo "   - Click 'Add app' button"
echo "   - Choose Web (</> icon)"
echo "   - App name: 'Veredas Community Portal'"
echo "   - Don't enable hosting (unless you want it)"
echo "   - Click 'Register app'"
echo ""
echo "4. Copy the COMPLETE config object that looks like:"
echo "   const firebaseConfig = {"
echo "     apiKey: \"AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs\","
echo "     authDomain: \"veredas-auth.firebaseapp.com\","
echo "     projectId: \"veredas-auth\","
echo "     storageBucket: \"veredas-auth.appspot.com\","
echo "     messagingSenderId: \"19406864023\","
echo "     appId: \"1:19406864023:web:XXXXXXXXXX\"  ← THIS IS WHAT YOU NEED!"
echo "   };"
echo ""
echo "5. Replace the appId in: src/firebase/config.js"
echo ""
echo "6. Enable Authentication:"
echo "   https://console.firebase.google.com/project/veredas-auth/authentication/providers"
echo "   - Enable 'Email/Password' provider"
echo "   - Enable 'Google' provider (optional)"
echo ""
echo "7. Test the app:"
echo "   - Run: npm run dev"
echo "   - Open: http://localhost:5174"
echo "   - Check the Firebase Diagnostic tool on the login page"
echo ""

echo "🔧 Alternative: Use Firebase CLI"
echo ""
echo "If you have Firebase CLI installed:"
echo "  firebase projects:list"
echo "  firebase apps:list --project veredas-auth"
echo "  firebase apps:sdkconfig web --project veredas-auth"
echo ""

echo "💡 Need help? Check the diagnostic tool in your app!"
echo "   It will show you exactly what's wrong with your configuration."
echo ""

# Check if we're in the right directory
if [ -f "package.json" ] && [ -f "src/firebase/config.js" ]; then
    echo "✅ You're in the correct project directory"
    echo "📁 Current directory: $(pwd)"
else
    echo "⚠️  You might not be in the correct project directory"
    echo "📁 Current directory: $(pwd)"
    echo "   Navigate to your veredas-app folder first"
fi

echo ""
echo "🚀 Once you update the App ID, your authentication should work!"
