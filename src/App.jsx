import React from 'react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '1rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          Veredas Community Portal
        </h1>
      </nav>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            Welcome to Veredas Community!
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Your community portal for accessing rules, protocols, contacts, and more.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            {[
              { title: 'Community Rules', desc: 'Guidelines and regulations', color: '#3b82f6' },
              { title: 'Safety Protocols', desc: 'Emergency procedures', color: '#10b981' },
              { title: 'Contact Directory', desc: 'Important contacts', color: '#ef4444' },
              { title: 'General Information', desc: 'Community facilities', color: '#8b5cf6' },
              { title: 'Events Calendar', desc: 'Upcoming events', color: '#f59e0b' },
              { title: 'AI Assistant', desc: 'Get help and answers', color: '#6366f1' }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: item.color + '10',
                border: `1px solid ${item.color}30`,
                borderRadius: '8px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <h3 style={{ 
                  fontWeight: 'bold', 
                  color: item.color,
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>
            ✅ Node.js v21.1.0 Compatible • No External Dependencies • Pure React
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
