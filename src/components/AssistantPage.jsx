import React from 'react'

const AssistantPage = ({ windowWidth }) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      padding: windowWidth < 640 ? '1.5rem' : '2rem', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
    }}>
      <h2 style={{ 
        fontSize: windowWidth < 640 ? '1.75rem' : '2rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        color: '#1f2937' 
      }}>
        🤖 Asistente IA
      </h2>
      
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
        
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: '#1f2937', 
          marginBottom: '1rem' 
        }}>
          Asistente Virtual del Condominio
        </h3>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6b7280', 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Próximamente tendrás acceso a nuestro asistente virtual inteligente que podrá ayudarte con:
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: windowWidth < 768 ? '1fr' : 'repeat(2, 1fr)', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              Consultas sobre Reglamentos
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
              Respuestas inmediatas sobre normas, políticas y procedimientos del condominio
            </p>
          </div>
          
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              Información de Servicios
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
              Detalles sobre reservas, horarios y disponibilidad de instalaciones
            </p>
          </div>
          
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              Contactos y Emergencias
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
              Acceso rápido a números importantes y procedimientos de emergencia
            </p>
          </div>
          
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
              Protocolos de Seguridad
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
              Guía sobre medidas de seguridad y procedimientos en situaciones especiales
            </p>
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>
            🔗 Integración con Azure AI
          </h4>
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#1e40af', 
            margin: 0,
            lineHeight: '1.5'
          }}>
            Esta funcionalidad estará potenciada por <strong>Microsoft Azure AI Services</strong> para 
            brindar respuestas precisas y actualizadas sobre todos los aspectos del condominio.
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '1rem'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#166534', 
            margin: 0 
          }}>
            <strong>💡 Mientras tanto:</strong> Puedes encontrar toda la información que necesitas 
            navegando por las secciones de Reglamento, Protocolos y Contactos.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AssistantPage