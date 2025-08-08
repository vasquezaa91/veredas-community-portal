import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '2rem'
        }}>
          <h2 style={{ color: '#dc2626', fontSize: '1.5rem', marginBottom: '1rem' }}>
            🚨 Algo salió mal
          </h2>
          <p style={{ color: '#7f1d1d', marginBottom: '1rem' }}>
            Ha ocurrido un error en la aplicación. Por favor, recarga la página.
          </p>
          
          {import.meta.env.DEV && (
            <details style={{ 
              backgroundColor: 'white', 
              padding: '1rem', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Detalles del error (modo desarrollo)
              </summary>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                overflow: 'auto',
                color: '#dc2626'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Recargar página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
