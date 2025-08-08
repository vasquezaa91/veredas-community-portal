import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const DebugInfo = () => {
  const { currentUser, error } = useAuth()
  
  if (import.meta.env.PROD) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '4px',
      fontSize: '0.75rem',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <div>🔍 Debug Info:</div>
      <div>User: {currentUser ? '✅ Authenticated' : '❌ Not authenticated'}</div>
      <div>Email: {currentUser?.email || 'None'}</div>
      <div>Error: {error || 'None'}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  )
}

export default DebugInfo
