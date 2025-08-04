import { useState } from 'react'
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'

const AiAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your Veredas Community AI Assistant. I can help you with information about community rules, events, facilities, and general questions. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "What are the pool hours?",
    "How do I book the clubhouse?",
    "What are the community rules about pets?",
    "When is the next HOA meeting?",
    "Who do I contact for maintenance issues?",
    "What amenities are available?"
  ]

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response (replace with actual Azure AI integration)
    setTimeout(() => {
      const response = generateMockResponse(message)
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateMockResponse = (question) => {
    const responses = {
      'pool': 'The community pool is open daily from 6:00 AM to 10:00 PM. During summer months (June-August), we extend hours until 10:30 PM on weekends. Please remember that children under 14 must be accompanied by an adult.',
      'clubhouse': 'To book the clubhouse, please contact the community office at (555) 123-4568 or email office@veredascommunity.com. Bookings must be made at least 48 hours in advance. The rental fee is $150 for 4 hours, and a security deposit may be required.',
      'pets': 'Pet policies include: Maximum 2 pets per household (dogs and cats only), all pets must be registered, dogs must be leashed at all times, pet waste must be cleaned immediately, and aggressive animals are not permitted.',
      'hoa': 'The next HOA board meeting is scheduled for August 20th, 2025 at 7:00 PM in the Clubhouse Meeting Room. All residents are welcome to attend. The agenda will be posted 48 hours before the meeting.',
      'maintenance': 'For maintenance issues, contact: General Maintenance at (555) 123-4572 (Mon-Fri 8AM-5PM) or Emergency Maintenance at (555) 123-4569 (24/7). You can also submit requests through the community office.',
      'amenities': 'Our community amenities include: heated swimming pool, tennis court, fitness center, walking trails, clubhouse, business center, children\'s playground, BBQ area, and package concierge service.'
    }

    const lowerQuestion = question.toLowerCase()
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response
      }
    }

    return 'I\'d be happy to help you with that question! For specific information not covered in our general guidelines, please contact the community office at (555) 123-4568 or visit during office hours (Monday-Friday, 9:00 AM - 5:00 PM). Is there anything else about our community amenities, rules, or services I can help you with?'
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Community Assistant</h1>
        <p className="text-lg text-gray-600">
          Get instant answers to your community-related questions
        </p>
      </div>

      {/* Azure AI Integration Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold text-blue-900">Azure AI Integration Ready</h3>
            <p className="text-blue-800 text-sm">
              This AI assistant is ready for Azure AI integration. You can connect your Azure AI service to provide intelligent responses about community information.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        {/* Quick Questions */}
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-500" />
            Quick Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="text-left p-3 text-sm bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors"
              >
                <QuestionMarkCircleIcon className="h-4 w-4 inline mr-2 text-gray-400" />
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="flex items-center mb-1">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex items-center mb-1">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-600">AI Assistant</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about the community..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="2"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Integration Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Azure AI Integration Guide</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Current Status:</strong> This is a demo AI assistant with mock responses. 
            To integrate with Azure AI, you'll need to:
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Set up an Azure OpenAI Service or Azure Bot Service</li>
            <li>Configure API endpoints and authentication</li>
            <li>Replace the mock response function with actual Azure AI calls</li>
            <li>Train the model with community-specific information</li>
            <li>Implement proper error handling and fallbacks</li>
          </ol>
          <p className="mt-3">
            <strong>Features to implement:</strong> Natural language processing, community knowledge base integration, 
            multilingual support, and conversation context management.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AiAssistant
