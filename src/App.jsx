import React, { useState } from 'react'
import { useAzureAI } from './services/azureAI'

// Add CSS animations
const styles = document.createElement('style')
styles.textContent = `
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform scale(1);
    }
  }
`
document.head.appendChild(styles)

// AI Assistant Chat Component
const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy tu Asistente de IA de la Comunidad Veredas. Puedo ayudarte con información sobre las reglas de la comunidad, eventos, instalaciones y preguntas generales. ¿En qué puedo asistirte hoy?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const { sendMessage, testConnection, isLoading, isConfigured } = useAzureAI()

  const quickQuestions = [
    "¿Cuáles son los horarios de la piscina?",
    "¿Cómo reservo el salón social?",
    "¿Cuáles son las reglas sobre mascotas?",
    "¿Cuándo es la próxima reunión de la junta?",
    "¿A quién contacto para problemas de mantenimiento?",
    "¿Qué amenidades están disponibles?"
  ]

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')

    try {
      const response = await sendMessage(message)
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString(),
        source: response.isError ? 'fallback' : 'azure_ai',
        isError: response.isError
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Me disculpo, pero estoy experimentando dificultades técnicas. Por favor intenta más tarde o contacta la oficina de la comunidad para asistencia.',
        timestamp: new Date().toLocaleTimeString(),
        source: 'error',
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          🤖 Asistente AI de la Comunidad
        </h2>
        <p style={{ color: '#6b7280' }}>
          Obtén respuestas instantáneas a tus preguntas sobre la comunidad
        </p>
      </div>

      {/* Estado de IA */}
      <div style={{ backgroundColor: isConfigured ? '#dbeafe' : '#fef3c7', border: `1px solid ${isConfigured ? '#3b82f6' : '#f59e0b'}`, borderRadius: '8px', padding: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>{isConfigured ? '✅' : '⚠️'}</span>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: isConfigured ? '#1e40af' : '#92400e', fontWeight: 'bold' }}>
                {isConfigured ? 'Agente de IA Conectado' : 'Advertencia de Configuración de IA'}
              </h3>
              <p style={{ margin: 0, color: isConfigured ? '#1e40af' : '#92400e', fontSize: '0.9rem' }}>
                {isConfigured 
                  ? `ID del Agente: ${import.meta.env.VITE_AZURE_AI_AGENT_ID || 'Cargando...'} | Estado: Listo`
                  : 'Las variables de entorno de IA están faltando o incompletas'
                }
              </p>
            </div>
          </div>
          <button
            onClick={async () => {
              console.log('🧪 Testing IA connection...')
              const result = await testConnection()
              console.log('Test result:', result)
              alert(result.success ? `✅ ${result.message}` : `❌ ${result.error}`)
            }}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            🧪 Probar Conexión
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
          💡 Preguntas Rápidas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem' }}>
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              style={{
                textAlign: 'left',
                padding: '0.75rem',
                fontSize: '0.9rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0f2fe'
                e.target.style.borderColor = '#0284c7'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8fafc'
                e.target.style.borderColor = '#e2e8f0'
              }}
            >
              ❓ {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ 
        height: '400px', 
        overflowY: 'auto', 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px', 
        padding: '1rem', 
        marginBottom: '1rem',
        backgroundColor: '#fafafa'
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem'
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                backgroundColor: message.type === 'user' ? '#3b82f6' : '#ffffff',
                color: message.type === 'user' ? 'white' : '#374151',
                border: message.type === 'assistant' ? '1px solid #e5e7eb' : 'none',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {message.type === 'assistant' && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6' }}>
                    🤖 Asistente de IA
                    {message.source && (
                      <span style={{ marginLeft: '0.5rem', color: message.isError ? '#dc2626' : '#16a34a' }}>
                        ({message.isError ? 'Respuesta de Respaldo' : 'IA Conectada'})
                      </span>
                    )}
                  </span>
                </div>
              )}
              <p style={{ margin: '0 0 0.5rem 0', lineHeight: '1.5' }}>{message.content}</p>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
              maxWidth: '70%',
              padding: '0.75rem 1rem',
              borderRadius: '1rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  🤖 Asistente de IA
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out 0s infinite both' }}></div>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out 0.16s infinite both' }}></div>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out 0.32s infinite both' }}></div>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>Pensando...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pregúntame cualquier cosa sobre la comunidad..."
          style={{
            flex: 1,
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '0.75rem',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            minHeight: '50px'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          rows={2}
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isLoading}
          style={{
            backgroundColor: !inputMessage.trim() || isLoading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: !inputMessage.trim() || isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (inputMessage.trim() && !isLoading) {
              e.target.style.backgroundColor = '#2563eb'
            }
          }}
          onMouseLeave={(e) => {
            if (inputMessage.trim() && !isLoading) {
              e.target.style.backgroundColor = '#3b82f6'
            }
          }}
        >
          {isLoading ? '⏳' : '➤'}
        </button>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem', textAlign: 'center' }}>
        Presiona Enter para enviar, Shift+Enter para nueva línea
      </p>

      {/* Integration Info */}
      <div style={{ marginTop: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>
          Estado de Integración de IA
        </h3>
        <div style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>✅ Estado:</strong> Conectado al Agente de IA
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>🔗 ID del Agente:</strong> asst_nqpsnLPXFRSBwc9HlnO60hlb
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>🚀 Características:</strong> Chat en tiempo real, contexto comunitario, respuestas de respaldo
          </p>
          <p style={{ margin: 0 }}>
            <strong>🎯 Especialización:</strong> Asistencia de la Comunidad Veredas (reglas, amenidades, contactos, eventos)
          </p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigation = [
    { id: 'home', title: 'Inicio', desc: 'Resumen de la comunidad' },
    { id: 'rules', title: 'Reglas de la Comunidad', desc: 'Normas y reglamentos' },
    { id: 'protocols', title: 'Protocolos de Seguridad', desc: 'Procedimientos de emergencia' },
    { id: 'contacts', title: 'Directorio de Contactos', desc: 'Contactos importantes' },
    { id: 'general', title: 'Información General', desc: 'Instalaciones de la comunidad' },
    { id: 'events', title: 'Calendario de Eventos', desc: 'Próximos eventos' },
    { id: 'bookings', title: 'Reservas de Instalaciones', desc: 'Reservar amenidades' },
    { id: 'ai-assistant', title: 'Asistente AI', desc: 'Obtén ayuda y respuestas' }
  ]

  const cardColors = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#6366f1']

  const renderPage = () => {
    switch(currentPage) {
      case 'ai-assistant':
        return <AIAssistantPage />
      case 'rules':
        return (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              📋 Reglas y Reglamentos de la Comunidad
            </h2>
            <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
              <h3 style={{ color: '#374151', fontSize: '1.3rem', marginBottom: '1rem' }}>Normas Generales</h3>
              <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
                <li>Horas de silencio: 10 PM - 7 AM diariamente</li>
                <li>Límite de velocidad: 25 km/h dentro de la comunidad</li>
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
      case 'protocols':
        return (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              🛡️ Protocolos de Seguridad
            </h2>
            <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#dc2626', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>🚨 Contactos de Emergencia</h3>
                <p style={{ color: '#7f1d1d', margin: 0 }}>Bomberos/Policía/Médicos: 911<br />Seguridad: (555) 123-4569</p>
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
      case 'contacts':
        return (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              📞 Directorio de Contactos
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { title: 'Oficina de la Comunidad', phone: '(555) 123-4568', hours: 'Lun-Vie 9AM-5PM' },
                { title: 'Seguridad de Emergencia', phone: '(555) 123-4569', hours: '24/7' },
                { title: 'Mantenimiento', phone: '(555) 123-4572', hours: 'Lun-Vie 8AM-5PM' },
                { title: 'Piscina y Recreación', phone: '(555) 123-4575', hours: 'Diario 6AM-10PM' }
              ].map((contact, index) => (
                <div key={index} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                  <h3 style={{ color: '#1e293b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{contact.title}</h3>
                  <p style={{ color: '#475569', margin: '0.25rem 0', fontWeight: 'bold' }}>{contact.phone}</p>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>{contact.hours}</p>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              ¡Bienvenido a la Comunidad Veredas!
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Tu portal comunitario para acceder a reglas, protocolos, contactos y más.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {navigation.slice(1).map((item, index) => (
                <div 
                  key={item.id} 
                  style={{
                    backgroundColor: cardColors[index] + '10',
                    border: `1px solid ${cardColors[index]}30`,
                    borderRadius: '8px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  onClick={() => setCurrentPage(item.id)}
                >
                  <h3 style={{ 
                    fontWeight: 'bold', 
                    color: cardColors[index],
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
        )
    }
  }

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 
            style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => setCurrentPage('home')}
          >
            Portal de la Comunidad Veredas
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  backgroundColor: currentPage === item.id ? '#3b82f6' : 'transparent',
                  color: 'white',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = '#1e40af'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {renderPage()}
        
        <div style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p style={{ margin: 0 }}>
            ✅ Compatible con Node.js v21.1.0 • IA Integrada • Navegación Completa
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
