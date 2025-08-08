import React from 'react'

const SimpleTestPage = ({ windowWidth }) => {
  console.log('SimpleTestPage rendering with windowWidth:', windowWidth)
  
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#1f2937', marginBottom: '1rem' }}>
        🎉 ¡Funciona!
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
        El usuario está autenticado y la aplicación funciona correctamente.
      </p>
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '6px'
      }}>
        <strong style={{ color: '#166534' }}>✅ Auth funcionando</strong>
        <br />
        <span style={{ color: '#166534', fontSize: '0.875rem' }}>
          WindowWidth: {windowWidth}px
        </span>
      </div>
    </div>
  )
}

export default SimpleTestPage
