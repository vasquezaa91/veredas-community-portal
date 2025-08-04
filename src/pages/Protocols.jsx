import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  PhoneIcon,
  FireIcon,
  TruckIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const Protocols = () => {
  const emergencyProtocols = [
    {
      title: "Fire Emergency",
      icon: FireIcon,
      color: "bg-red-500",
      steps: [
        "Immediately evacuate the building using the nearest exit",
        "Do not use elevators during a fire emergency",
        "Close doors behind you to prevent fire spread",
        "Call 911 from a safe location outside the building",
        "Meet at the designated assembly point in the parking lot",
        "Do not re-enter the building until cleared by fire department"
      ]
    },
    {
      title: "Medical Emergency",
      icon: HeartIcon,
      color: "bg-green-500",
      steps: [
        "Call 911 immediately for serious medical emergencies",
        "Do not move injured persons unless they are in immediate danger",
        "Provide first aid only if you are trained to do so",
        "Contact security at (555) 123-4567 to assist emergency responders",
        "Clear pathways for emergency medical personnel",
        "Notify community office of the incident"
      ]
    },
    {
      title: "Security Threat",
      icon: ShieldCheckIcon,
      color: "bg-blue-500",
      steps: [
        "If you feel threatened, call 911 immediately",
        "Do not confront suspicious individuals directly",
        "Contact security office at (555) 123-4567",
        "Provide detailed description of the threat or suspicious activity",
        "Secure your home and stay inside until cleared",
        "Report any security concerns to management"
      ]
    },
    {
      title: "Natural Disaster",
      icon: ExclamationTriangleIcon,
      color: "bg-orange-500",
      steps: [
        "Follow local emergency broadcast instructions",
        "Secure outdoor furniture and potential flying debris",
        "Have emergency supplies readily available",
        "Know your evacuation route and assembly point",
        "Stay informed through official communication channels",
        "Do not venture outside during severe weather conditions"
      ]
    }
  ]

  const generalSafety = [
    {
      title: "Gate Access Protocol",
      description: "All visitors must check in at the main gate and be authorized by residents"
    },
    {
      title: "Delivery Procedures",
      description: "Large deliveries must be scheduled through the community office"
    },
    {
      title: "Maintenance Access",
      description: "Service personnel must present valid ID and work orders to security"
    },
    {
      title: "After-Hours Access",
      description: "Gate access code changes monthly - check your email for updates"
    },
    {
      title: "Lost Key/FOB Protocol",
      description: "Report lost access devices immediately to prevent unauthorized entry"
    },
    {
      title: "Vacation Security",
      description: "Notify security when leaving for extended periods for increased patrols"
    }
  ]

  const emergencyContacts = [
    { service: "Emergency Services", number: "911" },
    { service: "Community Security", number: "(555) 123-4567" },
    { service: "Community Office", number: "(555) 123-4568" },
    { service: "Maintenance Emergency", number: "(555) 123-4569" },
    { service: "Poison Control", number: "1-800-222-1222" },
    { service: "Non-Emergency Police", number: "(555) 987-6543" }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Safety Protocols & Emergency Procedures</h1>
        <p className="text-lg text-gray-600">
          Essential safety information and emergency response procedures for all residents
        </p>
      </div>

      {/* Emergency Protocols */}
      <div className="space-y-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Response Protocols</h2>
        {emergencyProtocols.map((protocol, index) => {
          const Icon = protocol.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className={`${protocol.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">{protocol.title}</h3>
              </div>
              <ol className="space-y-2">
                {protocol.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 text-sm font-medium rounded-full mr-3 flex-shrink-0">
                      {stepIndex + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>

      {/* General Safety Procedures */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">General Safety Procedures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generalSafety.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-red-900 mb-6">Emergency Contact Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-red-600 mr-2" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{contact.service}</h3>
                  <p className="text-lg font-bold text-red-600">{contact.number}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assembly Points */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Emergency Assembly Points</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <TruckIcon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900">Primary Assembly Point</h3>
              <p className="text-blue-800">Main parking lot near the community center</p>
            </div>
          </div>
          <div className="flex items-start">
            <TruckIcon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900">Secondary Assembly Point</h3>
              <p className="text-blue-800">Tennis court area (if primary location is inaccessible)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Protocols
