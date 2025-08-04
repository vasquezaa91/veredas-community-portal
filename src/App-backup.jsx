import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Protocols from './pages/Protocols'
import Contacts from './pages/Contacts'
import GeneralInfo from './pages/GeneralInfo'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import AiAssistant from './pages/AiAssistant'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/general-info" element={<GeneralInfo />} />
            <Route path="/events" element={<Events />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
