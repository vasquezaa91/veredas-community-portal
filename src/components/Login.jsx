import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import FirebaseDiagnostic from './FirebaseDiagnostic'

const Login = ({ windowWidth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup, loginWithGoogle, error: authError } = useAuth()

  // Display auth context error if exists
  React.useEffect(() => {
    if (authError) {
      setError('Error de configuración: ' + authError)
    }
  }, [authError])

  async function handleSubmit(e) {
    e.preventDefault()

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      setError('')
      setLoading(true)
      if (isSignup) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
    } catch (error) {
      console.error('Authentication error:', error)
      let errorMessage = 'Error de autenticación'
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Credenciales inválidas. Esto puede deberse a:\n• Email o contraseña incorrectos\n• Configuración de Firebase incompleta\n• App ID de Firebase inválido'
          break
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado'
          break
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta'
          break
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado'
          break
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil'
          break
        case 'auth/invalid-email':
          errorMessage = 'Email inválido'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Intenta más tarde'
          break
        case 'auth/configuration-not-found':
        case 'auth/invalid-api-key':
          errorMessage = 'Error de configuración de Firebase. Verifica la configuración del proyecto.'
          break
        default:
          errorMessage = error.message || 'Error desconocido'
      }
      
      setError(errorMessage)
    }
    setLoading(false)
  }

  async function handleGoogleLogin() {
    try {
      setError('')
      setLoading(true)
      await loginWithGoogle()
    } catch (error) {
      console.error('Google authentication error:', error)
      let errorMessage = 'Error al autenticar con Google'
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Ventana cerrada por el usuario'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Popup bloqueado. Permite popups para este sitio'
          break
        case 'auth/invalid-credential':
          errorMessage = 'Error de credenciales de Google. Verifica la configuración de Firebase.'
          break
        case 'auth/configuration-not-found':
          errorMessage = 'Configuración de Google Auth no encontrada en Firebase'
          break
        default:
          errorMessage = error.message || 'Error desconocido con Google'
      }
      
      setError(errorMessage)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: windowWidth < 640 ? '1rem' : '2rem'
    }}>
      {/* Firebase Diagnostic Tool - Development Only */}
      {import.meta.env.DEV && (
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
          <FirebaseDiagnostic windowWidth={windowWidth} />
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: windowWidth < 640 ? '2rem' : '3rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            🏘️ Veredas del Cedro
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Portal de Residentes
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                boxSizing: 'border-box'
              }}
              placeholder="tu-email@ejemplo.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Procesando...' : (isSignup ? 'Crear Cuenta' : 'Iniciar Sesión')}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span>🔐</span>
            {loading ? 'Procesando...' : 'Continuar con Google'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isSignup ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login