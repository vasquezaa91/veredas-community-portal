import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    return signInWithPopup(auth, provider)
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    if (!auth) {
      setError('Firebase auth not initialized')
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        setCurrentUser(user)
        setError(null)
        setLoading(false)
      },
      (error) => {
        console.error('Auth state change error:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}