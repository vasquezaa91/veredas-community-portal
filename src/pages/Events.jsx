import { useState } from 'react'
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Community BBQ & Pool Party",
      date: "2025-08-15",
      time: "6:00 PM - 9:00 PM",
      location: "Pool Area & Clubhouse",
      description: "Join your neighbors for our monthly community BBQ with music, food, and fun for the whole family!",
      category: "Social",
      attendees: 45,
      maxAttendees: 75,
      featured: true
    },
    {
      id: 2,
      title: "HOA Board Meeting",
      date: "2025-08-20",
      time: "7:00 PM - 8:30 PM",
      location: "Clubhouse Meeting Room",
      description: "Monthly board meeting to discuss community matters. All residents welcome to attend.",
      category: "Meeting",
      attendees: 12,
      maxAttendees: 30,
      featured: false
    },
    {
      id: 3,
      title: "Kids Movie Night",
      date: "2025-08-22",
      time: "7:30 PM - 9:30 PM",
      location: "Clubhouse",
      description: "Family-friendly movie night with popcorn and snacks. This month: Finding Nemo!",
      category: "Family",
      attendees: 28,
      maxAttendees: 50,
      featured: false
    },
    {
      id: 4,
      title: "Tennis Tournament",
      date: "2025-08-25",
      time: "9:00 AM - 4:00 PM",
      location: "Tennis Court",
      description: "Annual community tennis tournament. Register with the community office. Prizes for winners!",
      category: "Sports",
      attendees: 16,
      maxAttendees: 32,
      featured: true
    },
    {
      id: 5,
      title: "Book Club Meeting",
      date: "2025-08-28",
      time: "2:00 PM - 3:30 PM",
      location: "Clubhouse Library",
      description: "Monthly book discussion. This month's book: 'The Seven Husbands of Evelyn Hugo'",
      category: "Education",
      attendees: 8,
      maxAttendees: 15,
      featured: false
    }
  ]

  const pastEvents = [
    {
      title: "Summer Kickoff Party",
      date: "2025-07-20",
      attendees: 68,
      description: "Great turnout for our summer party!"
    },
    {
      title: "Community Garden Workshop",
      date: "2025-07-15",
      attendees: 22,
      description: "Residents learned about sustainable gardening"
    },
    {
      title: "Independence Day Celebration",
      date: "2025-07-04",
      attendees: 85,
      description: "Fantastic 4th of July celebration with fireworks"
    }
  ]

  const recurringEvents = [
    {
      title: "Water Aerobics",
      schedule: "Tuesdays & Thursdays, 9:00 AM",
      location: "Pool",
      description: "Low-impact fitness class for all ages"
    },
    {
      title: "Walking Group",
      schedule: "Daily, 7:00 AM",
      location: "Community Trails",
      description: "Join neighbors for a morning walk"
    },
    {
      title: "Yoga in the Park",
      schedule: "Saturdays, 8:00 AM",
      location: "Community Green Space",
      description: "Relaxing yoga session outdoors"
    }
  ]

  const getCategoryColor = (category) => {
    const colors = {
      'Social': 'bg-blue-100 text-blue-800',
      'Meeting': 'bg-gray-100 text-gray-800',
      'Family': 'bg-green-100 text-green-800',
      'Sports': 'bg-orange-100 text-orange-800',
      'Education': 'bg-purple-100 text-purple-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Events Calendar</h1>
        <p className="text-lg text-gray-600">
          Stay connected with community activities and upcoming events
        </p>
      </div>

      {/* Featured Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingEvents.filter(event => event.featured).map((event) => (
            <div key={event.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  <span>{event.attendees}/{event.maxAttendees} registered</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Upcoming Events</h2>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    {event.featured && <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.attendees}/{event.maxAttendees} registered</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recurring Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recurringEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Past Events</h2>
        <div className="space-y-4">
          {pastEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{formatDate(event.date)}</p>
                  <p className="text-gray-700 text-sm mt-1">{event.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-600">{event.attendees}</span>
                  <p className="text-gray-600 text-xs">attendees</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events
