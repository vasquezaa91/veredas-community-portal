# 🚨 Fixing auth/invalid-credential Error

## What's Happening

You're getting the `auth/invalid-credential` error because the **App ID** in your Firebase configuration is incomplete or incorrect.

### Current App ID (INCORRECT):
```javascript
appId: "1:19406864023:web:app"
```

### Expected Format (CORRECT):
```javascript
appId: "1:19406864023:web:abc123def456ghi789"
```

## Why This Happens

1. **Missing Web App**: Your Firebase project doesn't have a web app registered yet
2. **Incorrect App ID**: The App ID format is incomplete
3. **Authentication Not Enabled**: Email/Password auth might not be enabled in Firebase Console

## 🔧 Step-by-Step Fix

### Step 1: Register Web App in Firebase
1. Go to: https://console.firebase.google.com/project/veredas-auth/settings/general
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → Choose **Web** (</> icon)
4. App name: `Veredas Community Portal`
5. **Don't check** "Set up Firebase Hosting" (unless you want it)
6. Click **"Register app"**

### Step 2: Get Complete Configuration
You'll see a config object like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs",
  authDomain: "veredas-auth.firebaseapp.com",
  projectId: "veredas-auth",
  storageBucket: "veredas-auth.appspot.com",
  messagingSenderId: "19406864023",
  appId: "1:19406864023:web:COMPLETE_APP_ID_HERE"  // ← Copy this!
};
```

### Step 3: Update Your Config
Replace the `appId` in `src/firebase/config.js` with the complete one from Step 2.

### Step 4: Enable Authentication
1. Go to: https://console.firebase.google.com/project/veredas-auth/authentication/providers
2. Click on **"Email/Password"** provider
3. Enable **"Email/Password"**
4. Save

### Step 5: Test
1. Open your app: http://localhost:5174
2. Use the **Firebase Diagnostic Tool** on the login page
3. Try creating a test account

## 🔍 Using the Diagnostic Tool

I've added a Firebase Diagnostic Tool to your login page that will:
- ✅ Check if your Firebase config is valid
- ❌ Identify what's causing the `auth/invalid-credential` error
- 💡 Provide specific solutions

## 🚀 Alternative: Firebase CLI Method

If you have Firebase CLI installed:
```bash
# Login to Firebase
firebase login

# List your projects
firebase projects:list

# Get the complete config
firebase apps:sdkconfig web --project veredas-auth
```

## Common Error Codes & Solutions

| Error Code | Cause | Solution |
|------------|-------|----------|
| `auth/invalid-credential` | Wrong/missing App ID | Get correct App ID from Console |
| `auth/configuration-not-found` | Auth not enabled | Enable Email/Password in Console |
| `auth/invalid-api-key` | Wrong API key | Verify API key in Console |
| `auth/project-not-found` | Wrong Project ID | Verify project exists |

## 📋 Checklist

- [ ] Web app registered in Firebase Console
- [ ] Complete App ID copied to `src/firebase/config.js`
- [ ] Email/Password auth enabled in Firebase Console
- [ ] Firebase Diagnostic Tool shows all green ✅
- [ ] Test account creation works

## 🆘 Still Having Issues?

1. **Run the diagnostic tool** in your app - it will tell you exactly what's wrong
2. **Check browser console** for detailed error messages
3. **Verify Firebase Console settings** match your project requirements
4. **Run the fix script**: `./fix-firebase.sh` for detailed instructions

---

**Quick Links:**
- [Firebase Console](https://console.firebase.google.com/project/veredas-auth)
- [Authentication Settings](https://console.firebase.google.com/project/veredas-auth/authentication/providers)
- [Project Settings](https://console.firebase.google.com/project/veredas-auth/settings/general)

The diagnostic tool in your app will guide you through each step! 🎯
