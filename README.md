# 🏰 Super Guest - AI-Powered Event Compatibility System

> **CascadiaJS 2025 Hackathon Project** - Built in 24 hours with fairy tale magic! ✨

An intelligent event management platform that uses AI to score attendee compatibility with event requirements, helping organizers create more meaningful networking experiences.

## 🎭 The Fairy Tale

Super Guest transforms boring event management into an enchanted experience where every attendee is a character in their own story, and every event is a magical gathering in the realm.

### ✨ Key Features

- **🔮 AI Compatibility Scoring**: Intelligent attendee-event matching using advanced AI agents
- **👑 Fairy Tale Theming**: Immersive magical experience with consistent royal terminology
- **📊 Real-time Analytics**: Live event statistics and attendee insights
- **🏰 Responsive Design**: Beautiful mobile-first interface
- **⚡ Instant Scoring**: One-click compatibility analysis with detailed explanations
- **🎯 Smart Sorting**: Automatic attendee ranking based on compatibility scores

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ 
- npm, pnpm, or yarn
- Supabase account (for database)
- Langflow API access (for AI scoring)
- OpenAI LLM access (for AI scoring)

### 1. Clone & Install

```bash
git clone https://github.com/kirill-mikhaylov/super-guest.git
cd super-guest
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Scoring Service (Langflow)
LANGFLOW_API_URL=your_langflow_api_endpoint
LANGFLOW_API_KEY=your_langflow_api_key
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL scripts in `/db/`:
   - `schema.sql` - Creates the database tables
   - `seed_data.sql` - Populates with sample events and attendees

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to enter the magical realm! 🏰

## 🧙‍♂️ How It Works

### AI Scoring System

1. **Event Requirements**: Define magical abilities, preferred realms, and experience levels
2. **Attendee Profiles**: Rich character profiles with interests and backgrounds  
3. **AI Analysis**: Advanced AI agent analyzes compatibility using custom scoring algorithms
4. **Smart Results**: Detailed explanations with percentage matches and sorting

### Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **AI Engine**: Langflow integration for intelligent scoring
- **Deployment**: Vercel-ready with optimized builds

## 🎪 Hackathon Story

This project was created during the **CascadiaJS 2025 Hackathon** in just 24 hours! The challenge was to build something innovative that showcases the power of modern web technologies combined with AI.

### What We Built

- Complete event management system from scratch
- AI-powered compatibility scoring engine  
- Beautiful fairy tale-themed UI/UX
- Real-time database integration
- Mobile-responsive design
- Comprehensive error handling

### Tech Stack Highlights

- **Next.js 15**: Server-side rendering and API routes
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Rapid UI development
- **Supabase**: Backend-as-a-service with real-time features
- **AI Integration**: Custom scoring algorithms via Langflow

## 🏗️ Project Structure

```
super-guest/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── events/        # Event-related endpoints
│   ├── components/        # Reusable UI components
│   ├── dashboard/         # Main dashboard pages
│   ├── events/           # Event detail pages
│   └── login/            # Authentication
├── agents/               # AI agent prompts and configuration
├── db/                   # Database schema and seed data
├── public/               # Static assets
└── utils/                # Utility functions and configurations
```

## 🎭 Key Components

### Event Management
- **Dashboard**: Overview of all magical gatherings
- **Event Details**: Comprehensive event information with requirements
- **Attendee Management**: Character profiles and check-in status

### AI Scoring Engine
- **Compatibility Analysis**: Multi-factor scoring algorithm
- **Detailed Explanations**: Transparent reasoning for each score
- **Real-time Processing**: Instant results with loading states

### User Experience
- **Responsive Design**: Perfect on all devices
- **Error Handling**: Graceful failure states with retry options
- **Loading States**: Smooth transitions and feedback

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🎯 Future Enhancements

- **Real-time Notifications**: Live updates for event changes
- **Advanced Analytics**: Deeper insights and reporting
- **Mobile App**: Native iOS/Android applications
- **Social Features**: Attendee networking and messaging
- **Integration APIs**: Connect with popular event platforms

## 🏆 Hackathon Achievements

Built in 24 hours with:
- ✅ Complete full-stack application
- ✅ AI integration with custom scoring
- ✅ Beautiful, responsive UI
- ✅ Real-time database operations
- ✅ Comprehensive error handling
- ✅ Type-safe development
- ✅ Production-ready deployment

## 🤝 Contributing

This project was created during a hackathon, but contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your magical improvements
4. Submit a pull request

## 📄 License

MIT License - Feel free to use this project as inspiration for your own magical creations!

## 👥 Team

This magical project was brought to life by our amazing hackathon team:

- **Adam Burgh**
- **Kirill Mikhaylov**
- **Steve Nielsen**

*Three wizards coding through the night to create something truly magical!* 🧙‍♂️✨

## 🙏 Acknowledgments

- **CascadiaJS 2025** for hosting an amazing hackathon
- **OpenAI** for providing credits to run the models
- **Langflow** for AI integration capabilities

---

**Built with ❤️ and ☕ during CascadiaJS 2025 Hackathon**

*May your events be ever magical and your attendees perfectly matched!* 🏰✨
