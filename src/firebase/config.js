import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase configuration - Using your actual Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyDSUr-S1ZTNXuQyn6GWqMGkvTHsYvZ7yfs",
  authDomain: "veredas-auth.firebaseapp.com",
  projectId: "veredas-auth",
  storageBucket: "veredas-auth.appspot.com",
  messagingSenderId: "19406864023",
  // Temporary App ID - You need to get the real one from Firebase Console
  appId: "1:19406864023:web:app"
}

// Initialize Firebase
let app
let auth

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
} catch (error) {
  console.error('Error initializing Firebase:', error)
  throw new Error('Failed to initialize Firebase. Please check your configuration.')
}

export { auth }
export default app