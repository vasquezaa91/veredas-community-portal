import { DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Rules = () => {
  const ruleCategories = [
    {
      title: "General Community Rules",
      icon: DocumentTextIcon,
      rules: [
        "All residents must register with the community office within 30 days of moving in",
        "Guests must be registered at the gate and accompanied by residents at all times",
        "Quiet hours are from 10:00 PM to 7:00 AM - please be considerate of neighbors",
        "No soliciting or door-to-door sales are permitted within the community",
        "All vehicles must display valid community parking permits",
        "Speed limit within the community is 15 mph - strictly enforced"
      ]
    },
    {
      title: "Property Maintenance",
      icon: DocumentTextIcon,
      rules: [
        "Lawns must be maintained and kept neat at all times",
        "Any exterior modifications require approval from the HOA board",
        "Trash bins must be stored out of sight except on collection days",
        "Holiday decorations may be displayed 30 days before and must be removed 7 days after the holiday",
        "Exterior paint colors must be approved from the community color palette",
        "Swimming pools and hot tubs must be properly maintained and fenced"
      ]
    },
    {
      title: "Parking Regulations",
      icon: DocumentTextIcon,
      rules: [
        "Each unit is allocated 2 designated parking spaces",
        "Guest parking is available in designated areas only",
        "No commercial vehicles, RVs, or boats allowed in residential areas",
        "Overnight parking in guest spots requires permission from management",
        "Abandoned or non-functioning vehicles will be towed at owner's expense",
        "Fire lanes and emergency access routes must remain clear at all times"
      ]
    },
    {
      title: "Pet Policies",
      icon: DocumentTextIcon,
      rules: [
        "Maximum of 2 pets per household (dogs and cats only)",
        "All pets must be registered with the community office",
        "Dogs must be leashed at all times when outside the home",
        "Pet waste must be cleaned up immediately",
        "Pets causing disturbances may result in removal requirements",
        "Aggressive animals are not permitted in the community"
      ]
    },
    {
      title: "Pool and Recreation Areas",
      icon: DocumentTextIcon,
      rules: [
        "Pool hours: 6:00 AM to 10:00 PM daily",
        "Children under 14 must be accompanied by an adult",
        "No glass containers in pool area",
        "Maximum pool capacity is 25 people",
        "Pool parties require advance approval from management",
        "Appropriate swimwear is required - no street clothes in pool"
      ]
    }
  ]

  const violations = [
    "First violation: Written warning",
    "Second violation: $50 fine",
    "Third violation: $100 fine",
    "Continued violations may result in legal action or lease termination"
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Rules & Regulations</h1>
        <p className="text-lg text-gray-600">
          Please review and follow these guidelines to maintain our community standards
        </p>
      </div>

      {/* Rules Categories */}
      <div className="space-y-8">
        {ruleCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Icon className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              <ul className="space-y-3">
                {category.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Violation Policy */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3" />
          <h2 className="text-xl font-semibold text-yellow-900">Violation Policy</h2>
        </div>
        <p className="text-yellow-800 mb-4">
          Violations of community rules will result in the following progressive enforcement:
        </p>
        <ul className="space-y-2">
          {violations.map((violation, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-yellow-800">{violation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Questions About Rules?</h2>
        <p className="text-blue-800 mb-2">
          If you have questions about any community rules or need clarification, please contact:
        </p>
        <div className="text-blue-800">
          <p><strong>Community Office:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> office@veredascommunity.com</p>
          <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  )
}

export default Rules
