import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { 
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const Bookings = () => {
  const [selectedFacility, setSelectedFacility] = useState('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const facilities = [
    {
      id: 'clubhouse',
      name: 'Clubhouse',
      capacity: 75,
      hourlyRate: 25,
      description: 'Perfect for parties, meetings, and events',
      amenities: ['Tables and chairs', 'Sound system', 'Kitchen access', 'Projector available'],
      rules: ['No smoking', 'Clean up required', '48-hour advance booking', 'Security deposit required']
    },
    {
      id: 'pool',
      name: 'Pool Area (Private)',
      capacity: 25,
      hourlyRate: 50,
      description: 'Exclusive pool access for private events',
      amenities: ['Pool chairs', 'Umbrellas', 'BBQ grill access'],
      rules: ['Lifeguard required for parties', 'No glass containers', 'Music until 9 PM only']
    },
    {
      id: 'tennis',
      name: 'Tennis Court',
      capacity: 4,
      hourlyRate: 15,
      description: 'Regulation tennis court with lighting',
      amenities: ['Court lighting', 'Equipment storage', 'Bench seating'],
      rules: ['Proper tennis attire', 'Court shoes only', 'Maximum 2-hour bookings']
    },
    {
      id: 'bbq',
      name: 'BBQ Area',
      capacity: 20,
      hourlyRate: 20,
      description: 'Outdoor dining area with grills',
      amenities: ['4 BBQ grills', 'Picnic tables', 'Trash disposal'],
      rules: ['Bring own charcoal', 'Clean grills after use', 'No open flames']
    },
    {
      id: 'gym',
      name: 'Fitness Center',
      capacity: 15,
      hourlyRate: 30,
      description: 'Private access to fitness facilities',
      amenities: ['Cardio equipment', 'Free weights', 'Sound system', 'Mirrors'],
      rules: ['Personal trainer sessions only', 'Liability waiver required', 'Equipment sanitization required']
    }
  ]

  const bookings = [
    {
      id: 1,
      title: 'Johnson Birthday Party',
      start: new Date(2025, 7, 15, 18, 0), // August 15, 2025, 6:00 PM
      end: new Date(2025, 7, 15, 22, 0),   // August 15, 2025, 10:00 PM
      facility: 'clubhouse',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Smith Tennis Match',
      start: new Date(2025, 7, 18, 9, 0),
      end: new Date(2025, 7, 18, 11, 0),
      facility: 'tennis',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'HOA Meeting',
      start: new Date(2025, 7, 20, 19, 0),
      end: new Date(2025, 7, 20, 21, 0),
      facility: 'clubhouse',
      status: 'confirmed'
    },
    {
      id: 4,
      title: 'Wilson Family BBQ',
      start: new Date(2025, 7, 22, 16, 0),
      end: new Date(2025, 7, 22, 20, 0),
      facility: 'bbq',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Personal Training',
      start: new Date(2025, 7, 25, 7, 0),
      end: new Date(2025, 7, 25, 8, 0),
      facility: 'gym',
      status: 'confirmed'
    }
  ]

  const filteredBookings = selectedFacility === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.facility === selectedFacility)

  const myBookings = [
    {
      id: 1,
      facility: 'Tennis Court',
      date: '2025-08-28',
      time: '9:00 AM - 11:00 AM',
      status: 'confirmed',
      cost: '$30'
    },
    {
      id: 2,
      facility: 'BBQ Area',
      date: '2025-09-05',
      time: '5:00 PM - 8:00 PM',
      status: 'pending',
      cost: '$60'
    }
  ]

  const bookingGuidelines = [
    'Bookings must be made at least 48 hours in advance',
    'Maximum booking duration is 4 hours (except gym: 2 hours)',
    'Cancellations must be made 24 hours before event',
    'Security deposit may be required for some facilities',
    'Residents are responsible for cleanup after use',
    'Noise restrictions apply after 9:00 PM'
  ]

  const eventStyleGetter = (event) => {
    const facilityColors = {
      clubhouse: { backgroundColor: '#3B82F6', color: 'white' },
      pool: { backgroundColor: '#06B6D4', color: 'white' },
      tennis: { backgroundColor: '#10B981', color: 'white' },
      bbq: { backgroundColor: '#F59E0B', color: 'white' },
      gym: { backgroundColor: '#8B5CF6', color: 'white' }
    }
    
    const style = facilityColors[event.facility] || { backgroundColor: '#6B7280', color: 'white' }
    
    if (event.status === 'pending') {
      style.opacity = 0.7
      style.borderLeft = '4px solid #EF4444'
    }
    
    return { style }
  }

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate({ start, end })
    setShowBookingModal(true)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Facility Bookings & Calendar</h1>
        <p className="text-lg text-gray-600">
          Reserve community facilities and view availability
        </p>
      </div>

      {/* Quick Booking Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Facilities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div key={facility.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{facility.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">Capacity: {facility.capacity} people</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">${facility.hourlyRate}/hour</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Amenities:</h4>
                <ul className="text-sm text-gray-600">
                  {facility.amenities.slice(0, 2).map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="h-3 w-3 mr-2 text-green-500" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Booking Calendar</h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by facility:</label>
            <select 
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Facilities</option>
              {facilities.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={filteredBookings}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onSelectSlot={handleSelectSlot}
            selectable
            views={['month', 'week', 'day']}
            defaultView="month"
            popup
            style={{ height: '100%' }}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Clubhouse</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-cyan-500 rounded mr-2"></div>
            <span>Pool</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Tennis</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span>BBQ Area</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span>Gym</span>
          </div>
        </div>
      </div>

      {/* My Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.facility}</h3>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{booking.date} | {booking.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">Cost: {booking.cost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      <button className="text-red-600 text-sm mt-2 hover:underline">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Guidelines */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ExclamationCircleIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900">Booking Guidelines</h3>
            </div>
            <ul className="space-y-2">
              {bookingGuidelines.map((guideline, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {guideline}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-sm text-blue-800">
                Contact the community office at <br />
                <span className="font-medium">(555) 123-4568</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings
