import React, { useState } from 'react'
import { auth } from '../firebase/config'

const FirebaseDiagnostic = ({ windowWidth }) => {
  const [diagnosticResults, setDiagnosticResults] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostic = async () => {
    setIsRunning(true)
    const results = {
      timestamp: new Date().toLocaleString(),
      tests: []
    }

    // Test 1: Firebase Config Validation
    try {
      const config = auth.app.options
      results.tests.push({
        name: 'Firebase Configuration',
        status: 'success',
        details: {
          projectId: config.projectId,
          apiKey: config.apiKey ? '***' + config.apiKey.slice(-4) : 'Missing',
          authDomain: config.authDomain,
          appId: config.appId
        },
        message: 'Firebase config loaded successfully'
      })
    } catch (error) {
      results.tests.push({
        name: 'Firebase Configuration',
        status: 'error',
        message: `Config error: ${error.message}`,
        details: { error: error.message }
      })
    }

    // Test 2: Auth Domain Check
    try {
      const authDomain = auth.app.options.authDomain
      if (authDomain && authDomain.includes('firebaseapp.com')) {
        results.tests.push({
          name: 'Auth Domain',
          status: 'success',
          message: `Auth domain is valid: ${authDomain}`,
          details: { authDomain }
        })
      } else {
        results.tests.push({
          name: 'Auth Domain',
          status: 'warning',
          message: 'Auth domain format may be incorrect',
          details: { authDomain }
        })
      }
    } catch (error) {
      results.tests.push({
        name: 'Auth Domain',
        status: 'error',
        message: `Auth domain error: ${error.message}`
      })
    }

    // Test 3: App ID Format Check
    try {
      const appId = auth.app.options.appId
      const appIdPattern = /^1:\d+:web:[a-zA-Z0-9]+$/
      
      if (appIdPattern.test(appId)) {
        results.tests.push({
          name: 'App ID Format',
          status: 'success',
          message: 'App ID format is correct',
          details: { appId }
        })
      } else {
        results.tests.push({
          name: 'App ID Format',
          status: 'error',
          message: 'App ID format is incorrect - this is likely causing auth/invalid-credential',
          details: { 
            appId,
            expectedFormat: '1:PROJECT_NUMBER:web:APP_IDENTIFIER',
            solution: 'Get the correct App ID from Firebase Console'
          }
        })
      }
    } catch (error) {
      results.tests.push({
        name: 'App ID Format',
        status: 'error',
        message: `App ID error: ${error.message}`
      })
    }

    // Test 4: Auth Methods Check
    try {
      const authMethods = {
        signInWithEmailAndPassword: typeof auth.signInWithEmailAndPassword === 'function',
        createUserWithEmailAndPassword: typeof auth.createUserWithEmailAndPassword === 'function',
        signOut: typeof auth.signOut === 'function'
      }
      
      results.tests.push({
        name: 'Auth Methods',
        status: 'success',
        message: 'All auth methods are available',
        details: authMethods
      })
    } catch (error) {
      results.tests.push({
        name: 'Auth Methods',
        status: 'error',
        message: `Auth methods error: ${error.message}`
      })
    }

    setDiagnosticResults(results)
    setIsRunning(false)
  }

  if (import.meta.env.PROD) {
    return null // Don't show in production
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: windowWidth < 640 ? '1.5rem' : '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🔍 Firebase Diagnostic Tool
      </h3>

      <p style={{
        color: '#6b7280',
        marginBottom: '1.5rem',
        fontSize: '0.875rem'
      }}>
        Run this diagnostic to identify the cause of auth/invalid-credential errors.
      </p>

      <button
        onClick={runDiagnostic}
        disabled={isRunning}
        style={{
          backgroundColor: isRunning ? '#9ca3af' : '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        {isRunning ? 'Running Diagnostic...' : 'Run Firebase Diagnostic'}
      </button>

      {diagnosticResults && (
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '1rem'
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: '#1f2937'
          }}>
            Diagnostic Results - {diagnosticResults.timestamp}
          </h4>

          {diagnosticResults.tests.map((test, index) => (
            <div key={index} style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: 
                test.status === 'success' ? '#f0fdf4' :
                test.status === 'warning' ? '#fffbeb' : '#fef2f2',
              border: `1px solid ${
                test.status === 'success' ? '#bbf7d0' :
                test.status === 'warning' ? '#fed7aa' : '#fecaca'
              }`,
              borderRadius: '4px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span>
                  {test.status === 'success' ? '✅' :
                   test.status === 'warning' ? '⚠️' : '❌'}
                </span>
                <strong style={{
                  color: 
                    test.status === 'success' ? '#166534' :
                    test.status === 'warning' ? '#d97706' : '#dc2626'
                }}>
                  {test.name}
                </strong>
              </div>
              
              <p style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.875rem',
                color: 
                  test.status === 'success' ? '#166534' :
                  test.status === 'warning' ? '#d97706' : '#dc2626'
              }}>
                {test.message}
              </p>

              {test.details && (
                <details style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  <summary style={{ cursor: 'pointer', marginBottom: '0.25rem' }}>
                    Show Details
                  </summary>
                  <pre style={{
                    backgroundColor: 'white',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    overflow: 'auto',
                    margin: 0
                  }}>
                    {JSON.stringify(test.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}

          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '4px'
          }}>
            <h5 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '0.5rem'
            }}>
              💡 Quick Fix for auth/invalid-credential:
            </h5>
            <ol style={{
              fontSize: '0.75rem',
              color: '#1e40af',
              margin: 0,
              paddingLeft: '1rem'
            }}>
              <li>Go to Firebase Console → Project Settings</li>
              <li>Find "Your apps" section</li>
              <li>Copy the complete App ID (1:NUMBER:web:IDENTIFIER)</li>
              <li>Replace it in src/firebase/config.js</li>
              <li>Enable Email/Password auth in Authentication settings</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default FirebaseDiagnostic
