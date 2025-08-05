import React from 'react'

const ProtocolsPage = ({ windowWidth }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: windowWidth < 640 ? '1.5rem' : '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: windowWidth < 640 ? '1.75rem' : '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🛡️ Protocolos de Seguridad
      </h2>
      <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#dc2626', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>🚨 Contactos de Emergencia</h3>
          <p style={{ color: '#7f1d1d', margin: 0 }}>Bomberos/Policía/Cruz Roja: 911<br />Seguridad: (506) 2211-6364</p>
        </div>
        <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Procedimientos de Seguridad</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Todas las entradas son monitoreadas 24/7</li>
          <li>Reportar actividad sospechosa inmediatamente</li>
          <li>Mantener información de residentes actualizada</li>
          <li>Seguir protocolos de registro de visitantes</li>
        </ul>
      </div>
    </div>
  )
}

export default ProtocolsPage
