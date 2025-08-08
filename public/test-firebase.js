// Test script to validate Firebase configuration
// Run this in the browser console to check if Firebase is working

console.log('🔥 Testing Firebase Configuration...')

// Test 1: Check if Firebase is imported correctly
try {
  import('./src/firebase/config.js').then((firebaseModule) => {
    console.log('✅ Firebase module imported successfully')
    console.log('Auth object:', firebaseModule.auth)
    
    // Test 2: Check auth state
    if (firebaseModule.auth) {
      firebaseModule.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('✅ User is signed in:', user.email)
        } else {
          console.log('ℹ️ No user signed in')
        }
      })
      console.log('✅ Auth state listener attached')
    } else {
      console.error('❌ Auth object is null')
    }
  }).catch((error) => {
    console.error('❌ Error importing Firebase:', error)
  })
} catch (error) {
  console.error('❌ Error testing Firebase:', error)
}

// Instructions for getting the correct App ID
console.log(`
📋 To get your correct App ID:

1. Go to: https://console.firebase.google.com/project/veredas-auth/settings/general
2. Scroll to "Your apps" section
3. If no web app exists:
   - Click "Add app" (</> icon)
   - Enter app name: "Veredas Community Portal"
   - Register app
4. Copy the complete config object
5. Replace the config in src/firebase/config.js

Current config status: ${window.location.hostname === 'localhost' ? '🟡 Development' : '🔴 Production'}
`)
