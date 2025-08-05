import React from 'react'

const HomePage = ({ windowWidth, navigation, setCurrentPage }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: windowWidth < 640 ? '2rem 1.5rem' : '3rem 2rem',
      marginBottom: '2rem',
      border: '1px solid #f3f4f6'
    }}>
      {/* Welcome Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ 
          fontSize: windowWidth < 640 ? '2rem' : windowWidth < 768 ? '2.25rem' : '2.5rem', 
          fontWeight: '700', 
          marginBottom: '1rem', 
          color: '#111827',
          letterSpacing: '-0.025em'
        }}>
          Bienvenido a Veredas del Cedro
        </h2>
        <p style={{ 
          color: '#6b7280', 
          fontSize: windowWidth < 640 ? '1rem' : '1.125rem',
          lineHeight: '1.7',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Tu portal del condominio para acceder a información, servicios y recursos importantes.
        </p>
      </div>
      
      {/* Modern Menu Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: windowWidth < 640 ? '1fr' : windowWidth < 768 ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: windowWidth < 640 ? '1rem' : '1.5rem',
        marginBottom: '3rem'
      }}>
        {navigation.slice(1).map((item, index) => (
          <div 
            key={item.id} 
            style={{
              backgroundColor: '#fafafa',
              border: '1px solid #f3f4f6',
              borderRadius: '12px',
              padding: windowWidth < 640 ? '1.5rem' : '2rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
              e.target.style.borderColor = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
              e.target.style.borderColor = '#f3f4f6'
            }}
            onClick={() => setCurrentPage(item.id)}
          >
            {/* Minimal Icon */}
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f9fafb',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              border: '1px solid #f3f4f6'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {index === 0 ? '📋' : index === 1 ? '🛡️' : index === 2 ? '📞' : index === 3 ? '🏢' : '🤖'}
              </span>
            </div>
            
            {/* Content */}
            <h3 style={{ 
              fontWeight: '600', 
              color: '#111827',
              marginBottom: '0.75rem',
              fontSize: '1.125rem',
              lineHeight: '1.5'
            }}>
              {item.title}
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '0.875rem',
              lineHeight: '1.6',
              margin: 0
            }}>
              {item.desc}
            </p>
            
            {/* Subtle Arrow */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              color: '#d1d5db',
              fontSize: '1.25rem'
            }}>
              →
            </div>
          </div>
        ))}
      </div>

      {/* Minimalist Info Section */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 0.5rem 0'
            }}>
              Contacto de Emergencia
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              margin: 0
            }}>
              Bomberos/Policía/Médicos: <strong>911</strong> • Seguridad: <strong>(555) 123-4569</strong>
            </p>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#fee2e2',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🚨</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
