import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  MapPinIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const Contacts = () => {
  const emergencyContacts = [
    {
      service: "Emergency Services",
      phone: "911",
      description: "Fire, Police, Medical Emergencies",
      available: "24/7",
      priority: "high"
    },
    {
      service: "Community Security",
      phone: "(555) 123-4567",
      description: "Security concerns, gate access issues",
      available: "24/7",
      priority: "high"
    },
    {
      service: "Maintenance Emergency",
      phone: "(555) 123-4569",
      description: "Water leaks, power outages, urgent repairs",
      available: "24/7",
      priority: "high"
    }
  ]

  const managementContacts = [
    {
      title: "Community Office",
      phone: "(555) 123-4568",
      email: "office@veredascommunity.com",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM",
      services: ["General inquiries", "Move-in/out coordination", "Facility reservations", "HOA information"]
    },
    {
      title: "Property Manager",
      name: "Sarah Johnson",
      phone: "(555) 123-4570",
      email: "manager@veredascommunity.com",
      hours: "Monday - Friday: 8:00 AM - 4:00 PM",
      services: ["Property management", "Lease issues", "Maintenance coordination", "Resident relations"]
    },
    {
      title: "HOA Board",
      phone: "(555) 123-4571",
      email: "board@veredascommunity.com",
      hours: "By appointment",
      services: ["Rule violations", "Architectural approvals", "Community improvements", "Policy decisions"]
    }
  ]

  const serviceContacts = [
    {
      category: "Maintenance & Repairs",
      contacts: [
        { service: "General Maintenance", phone: "(555) 123-4572", hours: "Mon-Fri 8AM-5PM" },
        { service: "Landscaping", phone: "(555) 123-4573", hours: "Mon-Sat 7AM-4PM" },
        { service: "Pool Maintenance", phone: "(555) 123-4574", hours: "Daily 6AM-8PM" },
        { service: "Electrical Issues", phone: "(555) 123-4575", hours: "24/7 Emergency" }
      ]
    },
    {
      category: "Utilities & Services",
      contacts: [
        { service: "Water Department", phone: "(555) 987-1111", hours: "Mon-Fri 8AM-5PM" },
        { service: "Electric Company", phone: "(555) 987-2222", hours: "24/7" },
        { service: "Gas Company", phone: "(555) 987-3333", hours: "24/7" },
        { service: "Internet/Cable", phone: "(555) 987-4444", hours: "24/7" }
      ]
    },
    {
      category: "Community Services",
      contacts: [
        { service: "Clubhouse Reservations", phone: "(555) 123-4576", hours: "Mon-Fri 9AM-5PM" },
        { service: "Pool & Recreation", phone: "(555) 123-4577", hours: "Daily 6AM-10PM" },
        { service: "Package Delivery", phone: "(555) 123-4578", hours: "Mon-Fri 9AM-6PM" },
        { service: "Gate Access Support", phone: "(555) 123-4579", hours: "24/7" }
      ]
    }
  ]

  const localServices = [
    { service: "Police Department", phone: "(555) 987-6543", address: "123 Main St" },
    { service: "Fire Department", phone: "(555) 987-7654", address: "456 Oak Ave" },
    { service: "Hospital", phone: "(555) 987-8765", address: "789 Health Blvd" },
    { service: "Urgent Care", phone: "(555) 987-9876", address: "321 Care Dr" }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Directory</h1>
        <p className="text-lg text-gray-600">
          Important contact information for community services and emergency assistance
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3" />
          <h2 className="text-2xl font-bold text-red-900">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-bold text-lg text-red-900 mb-2">{contact.service}</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-xl font-bold text-red-600">{contact.phone}</span>
                </div>
                <p className="text-sm text-gray-700">{contact.description}</p>
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{contact.available}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Management Contacts */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Management & Administration</h2>
        {managementContacts.map((contact, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{contact.title}</h3>
                {contact.name && <p className="text-gray-600 mb-2">{contact.name}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-600">{contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-blue-600">{contact.email}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">{contact.hours}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {contact.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Service Contacts */}
      <div className="space-y-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Service Contacts</h2>
        {serviceContacts.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.contacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{contact.service}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-blue-600 font-medium">{contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-600 text-sm">{contact.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Local Services */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Local Emergency Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{service.service}</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-blue-600 font-medium">{service.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">{service.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts
