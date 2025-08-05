import React, { useState } from 'react'
import { useAzureAI } from '../services/azureAI'

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

const AIAssistantPage = ({ windowWidth }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy tu Asistente de IA del Condominio Veredas del Cedro. Puedo ayudarte con información sobre las reglas del condominio, eventos, instalaciones y preguntas generales. ¿En qué puedo asistirte hoy?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const { sendMessage, testConnection, isLoading, isConfigured } = useAzureAI()

  const quickQuestions = [
    "¿Cómo reservo el rancho?",
    "¿Cuáles son las reglas sobre mascotas?",
    "¿Cuándo es la próxima reunión de la junta?",
    "¿A quién contacto para problemas de mantenimiento?",
    "¿Qué amenidades están disponibles?",
    "¿Qué días recogen la basura?",
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
        content: 'Me disculpo, pero estoy experimentando dificultades técnicas. Por favor intenta más tarde o contacta la junta directiva del condominio para asistencia.',
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
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: windowWidth < 640 ? '1.5rem' : '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: windowWidth < 640 ? '1.75rem' : '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          🤖 Asistente AI del Condominio
        </h2>
        <p style={{ color: '#6b7280' }}>
          Obtén respuestas instantáneas a tus preguntas sobre el condominio
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
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: windowWidth < 640 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: windowWidth < 640 ? '0.75rem' : '0.5rem' 
        }}>
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
          placeholder="Pregúntame cualquier cosa sobre el condominio..."
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
    </div>
  )
}

export default AIAssistantPage
