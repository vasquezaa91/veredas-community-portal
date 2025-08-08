# 🔥 Getting Your Complete Firebase Configuration

## Current Status
You have provided:
- ✅ **Project Name**: veredas-auth
- ✅ **Project ID**: veredas-auth  
- ✅ **Project Number**: 19406864023
- ✅ **API Key**: AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs
- ❓ **App ID**: Need to get the complete one

## Steps to Get Complete Configuration

### Method 1: Firebase Console (Recommended)

1. **Open Firebase Console**
   ```
   https://console.firebase.google.com/project/veredas-auth/settings/general
   ```

2. **Scroll to "Your apps" section**
   - If you see a web app (</> icon), click on it
   - If no web app exists, click "Add app" → Choose Web (</> icon)

3. **Register/Configure Web App**
   - App nickname: `Veredas Community Portal`
   - Don't check "Set up Firebase Hosting" (unless you want it)
   - Click "Register app"

4. **Copy the Configuration**
   You'll see something like:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs",
     authDomain: "veredas-auth.firebaseapp.com",
     projectId: "veredas-auth",
     storageBucket: "veredas-auth.appspot.com",
     messagingSenderId: "19406864023",
     appId: "1:19406864023:web:abcdef123456"  // ← This is what we need!
   };
   ```

### Method 2: Using Firebase CLI

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# List your projects
firebase projects:list

# Get app config
firebase apps:sdkconfig web --project veredas-auth
```

## After Getting the App ID

1. **Update Configuration**
   Replace the `appId` in `/src/firebase/config.js` with the correct one

2. **Enable Authentication**
   - Go to Firebase Console → Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider (optional)

3. **Test the Setup**
   - Open your app: http://localhost:5174
   - Check browser console for Firebase test results
   - Try creating a test account

## Common App ID Formats

The App ID typically looks like:
- `1:19406864023:web:abc123def456ghi789`
- `1:19406864023:web:veredas-auth-123abc`

## Troubleshooting

If you see errors like:
- `Firebase App named '[DEFAULT]' already exists`
- `Invalid configuration object`
- `Auth domain not authorized`

These usually mean:
1. Wrong App ID format
2. Missing authentication setup in Firebase Console
3. Domain not added to authorized domains

## Next Steps After Getting App ID

1. ✅ Replace App ID in config
2. ✅ Enable Email/Password auth in Firebase Console  
3. ✅ Test login functionality
4. ✅ Add your domain to authorized domains (for production)

---

**Quick Links:**
- [Firebase Console](https://console.firebase.google.com/project/veredas-auth)
- [Authentication Settings](https://console.firebase.google.com/project/veredas-auth/authentication/providers)
- [App Settings](https://console.firebase.google.com/project/veredas-auth/settings/general)
