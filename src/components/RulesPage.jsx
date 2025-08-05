import React from 'react'

const RulesPage = ({ windowWidth }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: windowWidth < 640 ? '1.5rem' : '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: windowWidth < 640 ? '1.75rem' : '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        📋 Reglas y Reglamentos del Condominio
      </h2>
      <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
        <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Normas Generales</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
          <li>Horas de silencio: 10 PM - 7 AM diariamente</li>
          <li>Límite de velocidad: 25 km/h dentro del condominio</li>
          <li>Los visitantes deben registrarse en la entrada principal</li>
          <li>Todos los vehículos deben tener registro vigente</li>
        </ul>
        <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Políticas de Mascotas</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Máximo 2 mascotas por hogar</li>
          <li>Los perros deben estar con correa en todo momento</li>
          <li>Los desechos de mascotas deben limpiarse inmediatamente</li>
          <li>No se permiten animales agresivos</li>
        </ul>
      </div>
    </div>
  )
}

export default RulesPage
