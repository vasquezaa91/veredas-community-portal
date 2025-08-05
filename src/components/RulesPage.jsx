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
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
          <li>Máximo 2 mascotas por hogar</li>
          <li>Los perros deben estar con correa en todo momento</li>
          <li>Los desechos de mascotas deben limpiarse inmediatamente</li>
          <li>No se permiten animales agresivos</li>
        </ul>
        <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Reglas para el uso del Rancho</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
          <li>La reserva debe realizarse con al menos 24 horas de anticipación</li>
          <li>El uso está limitado a 50 personas máximo por evento</li>
          <li>El horario de uso es de 8:00 AM a 07:00 PM</li>
          <li>El área debe quedar completamente limpia después del evento</li>
          <li>No se permite música a alto volumen después de las 6:00 PM</li>
          <li>Los residentes son responsables de los daños causados durante su evento</li>
          <li>Las cancelaciones deben hacerse con 48 horas de anticipación</li>
          <li>No se permiten decoraciones permanentes en las instalaciones</li>
        </ul>
        <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Normas para el Uso de la Cancha</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Horario de uso: 6:00 AM a 8:00 PM todos los días</li>
          <li>Máximo 2 horas consecutivas por grupo</li>
          <li>Uso exclusivo de calzado deportivo apropiado</li>
          <li>Prohibido el uso de tacones o zapatos con suela dura</li>
          <li>Los niños menores de 6 años deben estar acompañados por un adulto</li>
          <li>Mantener la cancha limpia y ordenada después del uso</li>
          <li>Reportar cualquier daño o problema inmediatamente a la administración</li>
          <li>Respetar el turno de otros residentes</li>
        </ul>

        {/* AI Assistant Note */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>
            🤖 ¿Tienes dudas sobre las reglas?
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#166534', margin: 0 }}>
            Para consultas adicionales sobre reglamentos o situaciones específicas, visita nuestro <strong>Asistente AI</strong> que puede ayudarte con cualquier pregunta relacionada con las normas del condominio.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RulesPage
