import React from 'react'

const ContactsPage = ({ windowWidth }) => {
  const contacts = [
    { title: 'Administración del Condominio', phone: '(506) 8820-3602', hours: 'Lun-Vie 9AM-5PM' },
    { title: 'Junta Directiva', phone: '(506) 7294-2280', hours: '24/7' },
    { title: 'Seguridad (ADT)', phone: '(506) 2211-6364', hours: '24/7' },
    { title: 'Mantenimiento', phone: '(506) 123-4575', hours: 'Lun-Vie 9AM-5PM' }
  ]

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: windowWidth < 640 ? '1.5rem' : '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: windowWidth < 640 ? '1.75rem' : '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        📞 Directorio de Contactos
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: windowWidth < 640 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: windowWidth < 640 ? '1rem' : '1rem' 
      }}>
        {contacts.map((contact, index) => (
          <div key={index} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
            <h3 style={{ color: '#1e293b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{contact.title}</h3>
            <p style={{ color: '#475569', margin: '0.25rem 0', fontWeight: 'bold' }}>{contact.phone}</p>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>{contact.hours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactsPage
