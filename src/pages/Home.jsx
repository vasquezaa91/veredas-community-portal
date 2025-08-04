import { Link } from 'react-router-dom'
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  PhoneIcon, 
  InformationCircleIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const Home = () => {
  const quickLinks = [
    {
      title: 'Community Rules',
      description: 'Read and understand our community guidelines and regulations',
      icon: DocumentTextIcon,
      path: '/rules',
      color: 'bg-blue-500'
    },
    {
      title: 'Safety Protocols',
      description: 'Emergency procedures and safety guidelines for residents',
      icon: ShieldCheckIcon,
      path: '/protocols',
      color: 'bg-green-500'
    },
    {
      title: 'Contact Directory',
      description: 'Important contact numbers and emergency services',
      icon: PhoneIcon,
      path: '/contacts',
      color: 'bg-red-500'
    },
    {
      title: 'General Information',
      description: 'Community facilities, amenities, and general information',
      icon: InformationCircleIcon,
      path: '/general-info',
      color: 'bg-purple-500'
    },
    {
      title: 'Events Calendar',
      description: 'Upcoming community events and important dates',
      icon: CalendarIcon,
      path: '/events',
      color: 'bg-orange-500'
    },
    {
      title: 'Facility Bookings',
      description: 'Reserve community facilities and amenities',
      icon: ClockIcon,
      path: '/bookings',
      color: 'bg-teal-500'
    },
    {
      title: 'AI Assistant',
      description: 'Get instant help with community-related questions',
      icon: ChatBubbleLeftRightIcon,
      path: '/ai-assistant',
      color: 'bg-indigo-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Veredas Community
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive portal for community information, resources, and services. 
          Everything you need to know about living in our gated community.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {quickLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <Link
              key={index}
              to={link.path}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-center mb-4">
                <div className={`${link.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  {link.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {link.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Recent Updates Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Updates</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900">New Pool Hours</h3>
            <p className="text-gray-600 text-sm">Pool hours have been extended for summer season - now open until 10 PM</p>
            <span className="text-xs text-gray-500">Posted 2 days ago</span>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-900">Community BBQ Event</h3>
            <p className="text-gray-600 text-sm">Join us for our monthly community BBQ this Saturday at 6 PM</p>
            <span className="text-xs text-gray-500">Posted 1 week ago</span>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-gray-900">Maintenance Notice</h3>
            <p className="text-gray-600 text-sm">Scheduled landscaping maintenance will occur next Tuesday</p>
            <span className="text-xs text-gray-500">Posted 1 week ago</span>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="bg-red-500 p-2 rounded-full">
            <PhoneIcon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-red-900">Emergency Contact</h3>
            <p className="text-red-700">For emergencies, call: <span className="font-bold">911</span></p>
            <p className="text-red-700">Security Office: <span className="font-bold">(555) 123-4567</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
