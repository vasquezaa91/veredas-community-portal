import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const FirebaseTestComponent = () => {
  const [testResults, setTestResults] = useState([])
  const { currentUser, error } = useAuth()

  useEffect(() => {
    const runTests = () => {
      const results = []

      // Test 1: Firebase Config
      try {
        import('../firebase/config.js').then((config) => {
          results.push({
            test: 'Firebase Config Import',
            status: 'success',
            message: 'Firebase configuration imported successfully'
          })
          
          // Test 2: Auth Object
          if (config.auth) {
            results.push({
              test: 'Auth Object',
              status: 'success',
              message: 'Firebase Auth object is available'
            })
          } else {
            results.push({
              test: 'Auth Object',
              status: 'error',
              message: 'Firebase Auth object is null or undefined'
            })
          }
          
          setTestResults([...results])
        }).catch((err) => {
          results.push({
            test: 'Firebase Config Import',
            status: 'error',
            message: `Error importing Firebase: ${err.message}`
          })
          setTestResults([...results])
        })
      } catch (err) {
        results.push({
          test: 'Firebase Config Import',
          status: 'error',
          message: `Error: ${err.message}`
        })
        setTestResults([...results])
      }

      // Test 3: Auth Context
      if (error) {
        results.push({
          test: 'Auth Context',
          status: 'error',
          message: `Auth Context Error: ${error}`
        })
      } else {
        results.push({
          test: 'Auth Context',
          status: 'success',
          message: 'Auth Context is working properly'
        })
      }

      // Test 4: User State
      results.push({
        test: 'User Authentication',
        status: currentUser ? 'success' : 'info',
        message: currentUser ? `User logged in: ${currentUser.email}` : 'No user currently logged in'
      })

      setTestResults(results)
    }

    runTests()
  }, [currentUser, error])

  // Don't show when user is authenticated (to avoid clutter)
  if (import.meta.env.PROD || currentUser) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      fontSize: '0.875rem',
      zIndex: 1000
    }}>
      <h4 style={{ 
        margin: '0 0 0.75rem 0', 
        fontSize: '0.875rem', 
        fontWeight: '600',
        color: '#1f2937'
      }}>
        🔥 Firebase Status
      </h4>
      
      {testResults.map((result, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem',
          padding: '0.25rem 0'
        }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.125rem 0.375rem',
            borderRadius: '0.25rem',
            backgroundColor: 
              result.status === 'success' ? '#dcfce7' :
              result.status === 'error' ? '#fef2f2' : '#f0f9ff',
            color:
              result.status === 'success' ? '#166534' :
              result.status === 'error' ? '#dc2626' : '#1e40af'
          }}>
            {result.status === 'success' ? '✅' : 
             result.status === 'error' ? '❌' : 'ℹ️'}
          </span>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>
              {result.test}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>
              {result.message}
            </div>
          </div>
        </div>
      ))}
      
      <div style={{
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        Development mode only
      </div>
    </div>
  )
}

export default FirebaseTestComponent
