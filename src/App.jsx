import React, { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import RulesPage from './components/RulesPage'
import ProtocolsPage from './components/ProtocolsPage'
import ContactsPage from './components/ContactsPage'
import BookingsPage from './components/BookingsPage'
import AssistantPage from './components/AssistantPage'
import Login from './components/Login'
import FirebaseTestComponent from './components/FirebaseTestComponent'
import ErrorBoundary from './components/ErrorBoundary'
import DebugInfo from './components/DebugInfo'
import SimpleTestPage from './components/SimpleTestPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Import Firebase test in development
if (import.meta.env.DEV) {
  import('./utils/firebaseTest.js')
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentUser, logout, error } = useAuth()

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Show error if there's an auth configuration issue
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#fef2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#dc2626', 
            marginBottom: '1rem' 
          }}>
            Error de Configuración
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            {error}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Por favor, verifica la configuración de Firebase.
          </p>
        </div>
      </div>
    )
  }

  // If user is not authenticated, show login page
  if (!currentUser) {
    return <Login windowWidth={windowWidth} />
  }

  const navigation = [
    { id: 'home', label: 'Inicio', icon: '🏠', title: 'Inicio', desc: 'Página principal del portal' },
    { 
      id: 'rules', 
      label: 'Reglamento', 
      icon: '📋', 
      title: 'Reglamento del Condominio',
      desc: 'Normas, políticas y regulaciones de la comunidad'
    },
    { 
      id: 'protocols', 
      label: 'Protocolos', 
      icon: '🚨', 
      title: 'Protocolos de Seguridad',
      desc: 'Procedimientos de emergencia y medidas de seguridad'
    },
    { 
      id: 'contacts', 
      label: 'Contactos', 
      icon: '📞', 
      title: 'Directorio de Contactos',
      desc: 'Números importantes y servicios de emergencia'
    },
    { 
      id: 'bookings', 
      label: 'Reservas', 
      icon: '🏢', 
      title: 'Reserva de Instalaciones',
      desc: 'Sistema de reservas para áreas comunes y salones'
    },
    { 
      id: 'assistant', 
      label: 'Asistente IA', 
      icon: '🤖', 
      title: 'Asistente Virtual',
      desc: 'Ayuda inteligente para consultas del condominio'
    }
  ]

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage windowWidth={windowWidth} navigation={navigation} setCurrentPage={setCurrentPage} />
      case 'rules':
        return <RulesPage windowWidth={windowWidth} />
      case 'protocols':
        return <ProtocolsPage windowWidth={windowWidth} />
      case 'contacts':
        return <ContactsPage windowWidth={windowWidth} />
      case 'bookings':
        return <BookingsPage windowWidth={windowWidth} />
      case 'assistant':
        return <AssistantPage windowWidth={windowWidth} />
      default:
        return <HomePage windowWidth={windowWidth} navigation={navigation} setCurrentPage={setCurrentPage} />
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: windowWidth < 640 ? '1rem' : '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ fontSize: '2rem' }}>🏘️</div>
            <div>
              <h1 style={{
                fontSize: windowWidth < 640 ? '1.25rem' : '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Condominio Veredas del Cedro
              </h1>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                Portal de Residentes
              </p>
            </div>
          </div>

          {/* User Info & Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* User email for desktop */}
            {windowWidth >= 768 && (
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280'
              }}>
                {currentUser?.email}
              </div>
            )}
            
            {/* Logout button for desktop */}
            {windowWidth >= 768 && (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            )}

            {/* Mobile menu button */}
            {windowWidth < 768 && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  color: '#6b7280'
                }}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        {windowWidth >= 768 && (
          <nav style={{
            borderTop: '1px solid #e5e7eb',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              overflowX: 'auto'
            }}>
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: currentPage === item.id ? '#eff6ff' : 'white',
                    color: currentPage === item.id ? '#3b82f6' : '#6b7280',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    borderBottom: currentPage === item.id ? '2px solid #3b82f6' : '2px solid transparent',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Mobile Navigation */}
        {windowWidth < 768 && isMobileMenuOpen && (
          <nav style={{
            borderTop: '1px solid #e5e7eb',
            backgroundColor: 'white'
          }}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsMobileMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: 'none',
                  background: currentPage === item.id ? '#eff6ff' : 'white',
                  color: currentPage === item.id ? '#3b82f6' : '#6b7280',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {/* Mobile logout button */}
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '1rem',
                border: 'none',
                backgroundColor: '#dc2626',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🚪</span>
              Cerrar Sesión
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: windowWidth < 640 ? '1.5rem 1rem' : '2rem'
      }}>
        <ErrorBoundary>
          {renderPage()}
        </ErrorBoundary>
      </main>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
        <FirebaseTestComponent />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
