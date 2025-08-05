import React, { useState, useEffect } from 'react'

const BookingsPage = ({ windowWidth }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedFacility, setSelectedFacility] = useState('rancho')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    residentName: '',
    residentUnit: '',
    email: '',
    phone: '',
    guests: 1,
    notes: ''
  })

  // Facilities configuration
  const facilities = [
    {
      id: 'rancho',
      name: 'Rancho/Salón de Eventos',
      icon: '🏢',
      description: 'Espacio para eventos y celebraciones',
      capacity: '50 personas',
      availability: ['morning', 'afternoon', 'evening', 'full-day']
    }
  ]

  // Time slots configuration
  const timeSlots = {
    'morning': { label: 'Mañana', time: '8:00 AM - 12:00 PM', value: 'morning' },
    'afternoon': { label: 'Tarde', time: '1:00 PM - 5:00 PM', value: 'afternoon' },
    'evening': { label: 'Noche', time: '6:00 PM - 10:00 PM', value: 'evening' },
    'full-day': { label: 'Día Completo', time: '8:00 AM - 10:00 PM', value: 'full-day' }
  }

  // Calendar helper functions
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isDateDisabled = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  // Mock data for development
  const getMockReservations = (date, facility) => {
    const dateStr = formatDate(date)
    return [
      {
        id: '1',
        facility: 'rancho',
        date: dateStr,
        timeSlot: 'afternoon',
        residentName: 'Juan Pérez',
        residentUnit: 'Casa 15',
        status: 'confirmed'
      },
      {
        id: '2',
        facility: 'rancho',
        date: dateStr,
        timeSlot: 'evening',
        residentName: 'María González',
        residentUnit: 'Casa 8',
        status: 'pending'
      }
    ].filter(r => r.facility === facility && r.date === dateStr)
  }

  // Fetch reservations (mock for now)
  const fetchReservations = (date, facility) => {
    setLoading(true)
    setTimeout(() => {
      setReservations(getMockReservations(date, facility))
      setLoading(false)
    }, 500)
  }

  // Check if time slot is available
  const isTimeSlotAvailable = (timeSlot) => {
    return !reservations.some(r => 
      r.facility === selectedFacility && 
      r.date === formatDate(selectedDate) && 
      r.timeSlot === timeSlot &&
      r.status !== 'cancelled'
    )
  }

  // Load reservations when date or facility changes
  useEffect(() => {
    fetchReservations(selectedDate, selectedFacility)
  }, [selectedDate, selectedFacility])

  const selectedFacilityData = facilities.find(f => f.id === selectedFacility)
  const calendarDays = generateCalendarDays()
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const handleSubmitBooking = (e) => {
    e.preventDefault()
    if (!selectedTimeSlot) {
      alert('Por favor seleccione un horario')
      return
    }
    
    // Mock booking creation
    setLoading(true)
    setTimeout(() => {
      const newReservation = {
        id: Date.now().toString(),
        facility: selectedFacility,
        date: formatDate(selectedDate),
        timeSlot: selectedTimeSlot,
        residentName: bookingData.residentName,
        residentUnit: bookingData.residentUnit,
        status: 'pending'
      }
      
      setReservations(prev => [...prev, newReservation])
      setShowBookingForm(false)
      setBookingData({
        residentName: '',
        residentUnit: '',
        email: '',
        phone: '',
        guests: 1,
        notes: ''
      })
      setSelectedTimeSlot('')
      setLoading(false)
      alert('¡Reserva creada exitosamente! Será confirmada en las próximas 24 horas.')
    }, 1000)
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: windowWidth < 640 ? '1.5rem' : '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: windowWidth < 640 ? '1.75rem' : '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🏢 Reservas de Instalaciones
      </h2>
      
      {/* Facility Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Instalación Disponible
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          {facilities.map((facility) => (
            <div
              key={facility.id}
              style={{
                padding: '1.5rem',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                backgroundColor: '#eff6ff',
                maxWidth: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {facility.icon}
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                {facility.name}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {facility.description}
              </p>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                <p style={{ margin: '0.25rem 0' }}><strong>Capacidad:</strong> {facility.capacity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar and Time Slots */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: windowWidth < 768 ? '1fr' : '1fr 1fr', 
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Calendar */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            Seleccionar Fecha
          </h3>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
            {/* Calendar Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: '#6b7280'
                }}
              >
                ←
              </button>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h4>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: '#6b7280'
                }}
              >
                →
              </button>
            </div>

            {/* Days of week */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '0.25rem',
              marginBottom: '0.5rem'
            }}>
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} style={{ 
                  textAlign: 'center', 
                  fontSize: '0.75rem', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  padding: '0.5rem 0'
                }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
              {calendarDays.map((day, index) => {
                const isSelected = day.toDateString() === selectedDate.toDateString()
                const isCurrentMonth = day.getMonth() === selectedDate.getMonth()
                const isDisabled = isDateDisabled(day)
                
                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled && setSelectedDate(day)}
                    disabled={isDisabled}
                    style={{
                      padding: '0.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                      color: isSelected ? 'white' : isCurrentMonth ? '#1f2937' : '#d1d5db',
                      fontSize: '0.875rem',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled ? 0.5 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            Horarios Disponibles
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedFacilityData?.availability.map(slot => {
              const timeSlotData = timeSlots[slot]
              const isAvailable = isTimeSlotAvailable(slot)
              const isSelected = selectedTimeSlot === slot

              return (
                <button
                  key={slot}
                  onClick={() => isAvailable && setSelectedTimeSlot(slot)}
                  disabled={!isAvailable}
                  style={{
                    padding: '1rem',
                    border: isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? '#eff6ff' : isAvailable ? '#ffffff' : '#f9fafb',
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    opacity: isAvailable ? 1 : 0.6
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {timeSlotData.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    {timeSlotData.time}
                  </div>
                  {!isAvailable && (
                    <div style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.25rem' }}>
                      No disponible
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {selectedTimeSlot && (
            <button
              onClick={() => setShowBookingForm(true)}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              Reservar {timeSlots[selectedTimeSlot].label}
            </button>
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: windowWidth < 640 ? '1rem' : '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: windowWidth < 640 ? '1.5rem' : '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Confirmar Reserva
            </h3>
            
            <form onSubmit={handleSubmitBooking}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                  Nombre del Residente *
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.residentName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, residentName: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                  Número de Casa/Unidad *
                </label>
                <input
                  type="text"
                  required
                  value={bookingData.residentUnit}
                  onChange={(e) => setBookingData(prev => ({ ...prev, residentUnit: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={bookingData.email}
                  onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingData.phone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Procesando...' : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Current Reservations */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Reservas del Día Seleccionado
        </h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
            Cargando reservas...
          </div>
        ) : reservations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reservations.map((reservation) => (
              <div key={reservation.id} style={{
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                      {timeSlots[reservation.timeSlot]?.label} - {selectedFacilityData?.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      {reservation.residentName} - {reservation.residentUnit}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                      {timeSlots[reservation.timeSlot]?.time}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    borderRadius: '4px',
                    backgroundColor: reservation.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                    color: reservation.status === 'confirmed' ? '#166534' : '#92400e'
                  }}>
                    {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#6b7280',
            border: '1px dashed #d1d5db',
            borderRadius: '8px'
          }}>
            No hay reservas para esta fecha
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
          📋 Instrucciones de Reserva
        </h4>
        <ul style={{ fontSize: '0.85rem', color: '#1e40af', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Las reservas deben realizarse con al menos 24 horas de anticipación</li>
          <li>Todas las reservas están sujetas a confirmación por la administración</li>
          <li>El pago debe realizarse al momento de confirmar la reserva</li>
          <li>Las cancelaciones deben hacerse con 48 horas de anticipación</li>
        </ul>
      </div>
    </div>
  )
}

export default BookingsPage
