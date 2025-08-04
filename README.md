# Veredas Community Portal

A comprehensive React application for gated community residents to access important information, services, and facilities.

## Features

### 🏠 **Community Information Hub**
- **Rules & Regulations**: Complete community guidelines and policies
- **Safety Protocols**: Emergency procedures and safety information
- **Contact Directory**: Important phone numbers and service contacts
- **General Information**: Community amenities, facilities, and policies

### 📅 **Events & Activities**
- **Events Calendar**: Community events and important dates
- **Event Registration**: Easy sign-up for community activities
- **Past Events**: History and photos from previous events
- **Recurring Activities**: Weekly and monthly community programs

### 🗓️ **Facility Booking System**
- **Interactive Calendar**: Visual booking interface using React Big Calendar
- **Multiple Facilities**: Clubhouse, pool, tennis court, BBQ area, gym
- **Real-time Availability**: See what's available and when
- **Booking Management**: Track your reservations and costs

### 🤖 **AI Assistant**
- **Community Q&A**: Get instant answers about community information
- **Azure AI Ready**: Prepared for Azure AI service integration
- **Smart Responses**: Context-aware answers about rules, events, and facilities
- **Quick Questions**: Pre-built common questions for easy access

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Inline styles (modern minimalist design)
- **Icons**: Heroicons React
- **AI Integration**: Azure AI service ready
- **Development**: ESLint

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd veredas-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── services/
│   └── azureAI.js          # Azure AI service integration
├── App.jsx                 # Main application component with all pages inline
└── main.jsx               # Application entry point
```

## Key Components

### Application Structure
- Single-page application with state-based navigation
- All page content defined inline in App.jsx
- Modern minimalist UI with inline styles
- Community branding

### Home Dashboard
- Quick access cards to all sections
- Recent community updates
- Emergency contact information

### Booking System
- Visual calendar interface
- Facility information and pricing
- Booking guidelines and rules
- Personal booking management

### AI Assistant
- Chat interface for community questions
- Quick question templates
- Azure AI integration ready
- Conversation history

## Azure AI Integration

The AI Assistant is prepared for Azure AI integration. To connect your Azure AI service:

1. **Set up Azure OpenAI Service**
   - Create an Azure OpenAI resource
   - Deploy a model (GPT-3.5-turbo or GPT-4)
   - Get API endpoint and key

2. **Configure Environment Variables**
   ```env
   VITE_AZURE_OPENAI_ENDPOINT=your-endpoint
   VITE_AZURE_OPENAI_KEY=your-api-key
   VITE_AZURE_OPENAI_DEPLOYMENT=your-deployment-name
   ```

3. **Update API Integration**
   - Replace mock responses in `AiAssistant.jsx`
   - Implement Azure OpenAI API calls
   - Add error handling and fallbacks

## Customization

### Community Branding
- Update colors in `tailwind.config.js`
- Replace community name in navigation
- Customize welcome messages and content

### Contact Information
- Update phone numbers in contact pages
- Modify emergency contacts
- Adjust office hours and locations

### Facilities and Amenities
- Add or remove facilities in booking system
- Update pricing and availability
- Modify rules and guidelines

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Various Platforms
- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop `dist` folder
- **Azure Static Web Apps**: Use GitHub Actions
- **AWS S3**: Upload build files to S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For technical support or questions about the community portal:
- Email: support@veredascommunity.com
- Phone: (555) 123-4568
- Office Hours: Monday-Friday, 9:00 AM - 5:00 PM+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
