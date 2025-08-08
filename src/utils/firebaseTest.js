// Simple Firebase connectivity test
import { auth } from '../firebase/config'

export const testFirebaseConnection = () => {
  try {
    // Test if Firebase auth is properly initialized
    if (!auth) {
      throw new Error('Firebase auth is not initialized')
    }

    // Test if we can access auth methods
    if (typeof auth.onAuthStateChanged !== 'function') {
      throw new Error('Firebase auth methods are not available')
    }

    console.log('✅ Firebase connection test passed')
    console.log('Auth object:', auth)
    console.log('Current user:', auth.currentUser)
    
    return {
      success: true,
      message: 'Firebase is properly configured'
    }
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error)
    return {
      success: false,
      message: error.message
    }
  }
}

// Test function to be called in development
if (import.meta.env.DEV) {
  // Run test after a short delay to ensure Firebase is initialized
  setTimeout(() => {
    testFirebaseConnection()
  }, 1000)
}
