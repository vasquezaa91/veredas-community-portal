import { 
  InformationCircleIcon,
  HomeIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const GeneralInfo = () => {
  const communityInfo = {
    name: "Veredas Gated Community",
    established: "2015",
    totalUnits: "62 residential units",
    community_type: "Mixed residential (single family homes and townhouses)",
    management: "Professional Property Management",
    hoa: "Homeowners Association"
  }

  const amenities = [
    {
      category: "Recreation & Fitness",
      items: [
        { name: "Swimming Pool", description: "Heated pool with lap lanes", hours: "6:00 AM - 10:00 PM" },
        { name: "Tennis Court", description: "Regulation size court with lighting", hours: "6:00 AM - 11:00 PM" },
        { name: "Fitness Center", description: "Fully equipped gym with cardio and weights", hours: "5:00 AM - 11:00 PM" },
        { name: "Walking Trails", description: "Scenic paths throughout the community", hours: "24/7" }
      ]
    },
    {
      category: "Community Facilities",
      items: [
        { name: "Clubhouse", description: "Event space for community gatherings", hours: "By reservation" },
        { name: "Business Center", description: "Computers, printer, and meeting room", hours: "6:00 AM - 10:00 PM" },
        { name: "Children's Playground", description: "Safe play area for kids", hours: "Dawn to dusk" },
        { name: "BBQ Area", description: "Outdoor grills and picnic tables", hours: "Dawn to dusk" }
      ]
    },
    {
      category: "Services",
      items: [
        { name: "Package Concierge", description: "Secure package delivery and pickup", hours: "Mon-Fri 9:00 AM - 6:00 PM" },
        { name: "Visitor Parking", description: "Designated spots for guests", hours: "24/7" },
        { name: "Maintenance Service", description: "On-site maintenance team", hours: "Mon-Fri 8:00 AM - 5:00 PM" },
        { name: "Landscaping", description: "Professional grounds maintenance", hours: "Mon-Sat 7:00 AM - 4:00 PM" }
      ]
    }
  ]

  const fees = [
    { type: "Monthly HOA Fee", amount: "$250", description: "Covers common area maintenance, amenities, security" },
    { type: "Move-in Fee", amount: "$200", description: "One-time fee for new residents" },
    { type: "Key/FOB Replacement", amount: "$25", description: "Per lost or damaged access device" },
    { type: "Clubhouse Rental", amount: "$150", description: "4-hour event rental (residents only)" },
    { type: "Guest Parking Pass", amount: "$5", description: "Daily visitor parking permit" }
  ]

  const policies = [
    {
      title: "Lease Terms",
      details: [
        "Minimum lease term: 6 months",
        "Security deposit: 1-2 months rent",
        "Pet deposit: $300 per pet (if applicable)",
        "Lease renewal options available"
      ]
    },
    {
      title: "Move-in Process",
      details: [
        "Schedule move-in with management office",
        "Complete registration forms and provide ID",
        "Receive access cards and community information",
        "Submit emergency contact information"
      ]
    },
    {
      title: "Maintenance Requests",
      details: [
        "Submit requests through community office",
        "Emergency repairs: call maintenance hotline",
        "Non-emergency requests processed within 48 hours",
        "Resident must provide access to unit"
      ]
    }
  ]

  const contactInfo = {
    address: "123 Veredas Drive, Peaceful Valley, CA 90210",
    phone: "(555) 123-4568",
    email: "office@veredascommunity.com",
    website: "www.veredascommunity.com",
    office_hours: "Monday - Friday: 9:00 AM - 5:00 PM"
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">General Community Information</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about living in Veredas Community
        </p>
      </div>

      {/* Community Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <HomeIcon className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Community Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-900">Community Name:</span>
              <span className="ml-2 text-gray-700">{communityInfo.name}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Established:</span>
              <span className="ml-2 text-gray-700">{communityInfo.established}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Total Units:</span>
              <span className="ml-2 text-gray-700">{communityInfo.totalUnits}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-900">Community Type:</span>
              <span className="ml-2 text-gray-700">{communityInfo.community_type}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Management:</span>
              <span className="ml-2 text-gray-700">{communityInfo.management}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Governance:</span>
              <span className="ml-2 text-gray-700">{communityInfo.hoa}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Community Amenities</h2>
        {amenities.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 text-sm">{item.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fees and Charges */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <CurrencyDollarIcon className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Fees & Charges</h2>
        </div>
        <div className="space-y-4">
          {fees.map((fee, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{fee.type}</h3>
                <p className="text-gray-600 text-sm">{fee.description}</p>
              </div>
              <span className="text-lg font-bold text-green-600 ml-4">{fee.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Important Policies</h2>
        {policies.map((policy, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{policy.title}</h3>
            <ul className="space-y-2">
              {policy.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <UserGroupIcon className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-blue-900">Community Office Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPinIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span className="text-blue-800">{contactInfo.address}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800">{contactInfo.office_hours}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-semibold text-blue-900 mr-2">Phone:</span>
              <span className="text-blue-800">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-900 mr-2">Email:</span>
              <span className="text-blue-800">{contactInfo.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-blue-900 mr-2">Website:</span>
              <span className="text-blue-800">{contactInfo.website}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo
