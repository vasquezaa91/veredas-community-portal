import React, { useState } from 'react'
import AIAssistantPage from './components/AIAssistantPage'
import RulesPage from './components/RulesPage'
import ProtocolsPage from './components/ProtocolsPage'
import ContactsPage from './components/ContactsPage'
import HomePage from './components/HomePage'
import BookingsPage from './components/BookingsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  // Handle window resize for responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Close mobile menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigation = [
    { id: 'home', title: 'Inicio', desc: 'Resumen del condominio' },
    { id: 'rules', title: 'Reglas del Condominio', desc: 'Normas y reglamentos' },
    { id: 'protocols', title: 'Protocolos de Seguridad', desc: 'Procedimientos de emergencia' },
    { id: 'contacts', title: 'Directorio de Contactos', desc: 'Contactos importantes' },
    { id: 'bookings', title: 'Reservas de Instalaciones', desc: 'Reservar amenidades' },
    { id: 'ai-assistant', title: 'Asistente AI', desc: 'Obtén ayuda y respuestas' }
  ]

  const renderPage = () => {
    switch(currentPage) {
      case 'ai-assistant':
        return <AIAssistantPage windowWidth={windowWidth} />
      case 'rules':
        return <RulesPage windowWidth={windowWidth} />
      case 'protocols':
        return <ProtocolsPage windowWidth={windowWidth} />
      case 'contacts':
        return <ContactsPage windowWidth={windowWidth} />
      case 'bookings':
        return <BookingsPage windowWidth={windowWidth} />
      default:
        return <HomePage windowWidth={windowWidth} navigation={navigation} setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{
        backgroundColor: '#ffffff',
        color: '#1f2937',
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 
            style={{ 
              margin: 0, 
              fontSize: windowWidth < 640 ? '1.1rem' : '1.4rem',
              fontWeight: '600', 
              cursor: 'pointer',
              color: '#1f2937',
              letterSpacing: '-0.025em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            onClick={() => setCurrentPage('home')}
          >
            {windowWidth < 640 ? 'Veredas' : 'Veredas del Cedro'}
          </h1>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: windowWidth < 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '6px',
              color: '#6b7280'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f9fafb'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div style={{ 
            display: windowWidth >= 768 ? 'flex' : 'none',
            gap: '0.25rem',
            flexWrap: 'wrap',
            justifyContent: 'flex-end'
          }}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  backgroundColor: currentPage === item.id ? '#f3f4f6' : 'transparent',
                  color: currentPage === item.id ? '#1f2937' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: currentPage === item.id ? '600' : '500',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#6b7280'
                  }
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div style={{
          display: (windowWidth < 768 && isMobileMenuOpen) ? 'block' : 'none',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsMobileMenuOpen(false)
                }}
                style={{
                  backgroundColor: currentPage === item.id ? '#f3f4f6' : 'transparent',
                  color: currentPage === item.id ? '#1f2937' : '#6b7280',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: currentPage === item.id ? '600' : '500',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#6b7280'
                  }
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main style={{ 
        padding: windowWidth < 640 ? '1rem' : '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        paddingBottom: '80px' 
      }}>
        {renderPage()}
      </main>
      
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1f2937',
        color: '#e5e7eb',
        padding: windowWidth < 640 ? '0.75rem' : '1rem',
        textAlign: 'center',
        borderTop: '1px solid #374151',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: windowWidth < 640 ? '0.8rem' : '0.9rem', 
          fontWeight: '400' 
        }}>
          © 2025 Condominio Veredas del Cedro
        </p>
      </footer>
    </div>
  )
}

export default App
