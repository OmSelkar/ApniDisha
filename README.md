# 🎓 Career & Education Advisor - One-Stop Personalized Platform

A comprehensive career and education advisory platform designed to guide students through their academic and professional journey. Built with modern technologies and enterprise-grade architecture, this platform provides personalized recommendations, aptitude assessments, college discovery, and career path mapping.

## ✨ Features

### 🎯 Core Features
- **Personalized Career Recommendations** using AI-powered matching
- **Aptitude & Interest Assessments** with detailed scoring
- **College & Program Discovery** with 20+ government colleges
- **Course→Career Path Mapping** with visual graph representation
- **Timeline Tracking** for exams, admissions, and scholarships
- **Content Hub** with study materials and resources
- **Bookmark System** for saving favorite colleges and content
- **Admin Console** with comprehensive data management
- **Seed Data** with realistic Indian education ecosystem
- **RESTful API** with 50+ endpoints

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token management
- **Role-based access control** (Student, Counselor, Admin)
- **Password hashing** with bcrypt
- **Input validation** and sanitization middleware
- **Rate limiting** (100 requests per 15 minutes)
- **Helmet.js** for security headers
- **CORS** protection with configurable origins
- **XSS protection** and request sanitization
- **MongoDB injection** prevention
- **Comprehensive error handling**

### 🏗️ Backend Architecture
- **Express.js** with ES6 modules and monorepo structure
- **MongoDB** with Mongoose ODM and optimized schemas
- **Recommendation Engine** with configurable scoring weights
- **Comprehensive data models** for education ecosystem
- **Bulk import/export** capabilities for admin
- **ICS calendar** generation for timeline events
- **Analytics and reporting** with aggregation pipelines
- **Health monitoring** and system diagnostics
- **Graceful shutdown** and error recovery
- **Modular controller** architecture

### 🎨 Frontend Architecture (Planned)
- **React 18** with modern hooks and PWA capabilities
- **Vite** for fast development and building
- **Redux Toolkit** with persistence for state management
- **React Router v6** with protected routes
- **Tailwind CSS** with responsive design system
- **Offline-first** architecture with service workers
- **Progressive Web App** features for mobile experience
- **Component library** with shared UI package
- **TypeScript** integration for type safety
- **Modern build** optimization and code splitting

### 🤖 Intelligent Features
- **Rule-based Recommendation Engine** with multi-factor scoring
- **Quiz Assessment System** with adaptive scoring algorithms
- **Personalized Content Matching** based on user profile and interests
- **Career Path Discovery** with graph-based relationship mapping
- **Location-based College Recommendations** with distance calculations
- **Interest-Stream Mapping** using psychometric analysis
- **Performance Analytics** with detailed user insights
- **Recommendation Audit Logging** for transparency
- **Configurable Scoring Weights** for different recommendation types
- **Smart Content Filtering** based on academic level and preferences

### 📊 Data & Analytics
- **Comprehensive Seed Data** with 20+ colleges, 12+ degrees, 4 streams
- **Realistic Quiz Content** with 3 different assessment types
- **Timeline Events** covering exams, admissions, scholarships
- **Study Materials** and scholarship information
- **Career Graph Data** with skills and role relationships
- **User Analytics** and engagement tracking
- **Content Performance** metrics and ratings
- **System Health** monitoring and diagnostics
- **Bulk Data Operations** for efficient management
- **Export Capabilities** for reports and analysis

## 🛠️ Tech Stack

### Backend
- **Node.js** (v18+)
- **Express.js** (v5.1.0)
- **MongoDB** with **Mongoose** (v8.17.1)
- **Google Gemini AI** for intelligent features
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Cloudinary** for cloud storage
- **Nodemailer** for emails
- **Helmet** for security
- **Rate limiting** with express-rate-limit
- **Compression** middleware
- **Morgan** for logging

### Frontend
- **React** (v18.3.1)
- **Vite** (v5.4.1)
- **Redux Toolkit** (v2.8.2)
- **React Router** (v6.30.1)
- **Tailwind CSS** (v3.4.13)
- **Framer Motion** (v11.18.2)
- **Radix UI** components
- **Lucide React** icons
- **Axios** for API calls
- **Sonner** for notifications
- **Redux Persist** for state persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-education-advisor
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Alternative: Install individually**
   ```bash
   # Backend
   cd apps/server && npm install
   
   # Frontend
   cd ../web && npm install
   
   # Shared packages
   cd ../../packages/lib && npm install
   ```

4. **Environment Setup**
   Create `.env` files in the server directory:

   **apps/server/.env**
   ```env
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/career-advisor
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   
   # Optional: AI Features
   GEMINI_API_KEY=your_gemini_api_key
   
   # Optional: File Upload
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

   **apps/web/.env**
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

5. **Seed the database with demo data**
   ```bash
   npm run seed:dev
   ```

6. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:server  # Backend only
   npm run dev:web     # Frontend only
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/v1
   - Health Check: http://localhost:8000/health
   - API Documentation: See `/docs/API_DOCUMENTATION.md`

## 📁 Project Structure

```
career-education-advisor/
├── apps/
│   ├── server/              # Express.js Backend
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   └── web/                 # React Frontend (Planned)
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/       # Page components
│       │   ├── hooks/       # Custom hooks
│       │   ├── services/    # API services
│       │   └── utils/       # Utility functions
│       └── public/          # Static assets
├── packages/
│   ├── lib/                 # Shared utilities & types
│   │   ├── src/
│   │   │   ├── types/       # TypeScript definitions
│   │   │   ├── recommendation/ # Recommendation engine
│   │   │   └── utils/       # Shared utilities
│   │   └── package.json
│   └── ui/                  # Shared UI components (Planned)
├── infra/
│   ├── docker/              # Docker configurations
│   └── seeds/               # Database seed data
│       ├── colleges.json    # College data
│       ├── degrees.json     # Degree programs
│       ├── quizzes.json     # Assessment quizzes
│       ├── timeline-events.json # Events & deadlines
│       ├── content-items.json   # Study materials
│       └── import-seeds.js  # Data import script
├── docs/
│   ├── API_DOCUMENTATION.md # Complete API docs
│   └── DECISIONS.md         # Architecture decisions
└── package.json             # Root package.json
```

## 🔧 Key API Endpoints

### Authentication & Users
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

### Quiz & Assessments
- `GET /api/v1/quiz` - Get available quizzes
- `POST /api/v1/quiz/:quizId/attempt` - Submit quiz attempt
- `GET /api/v1/quiz/attempts` - Get user's quiz attempts

### Recommendations
- `GET /api/v1/recommendations/streams` - Get stream recommendations
- `GET /api/v1/recommendations/degrees` - Get degree recommendations
- `GET /api/v1/recommendations/colleges` - Get college recommendations

### Colleges & Programs
- `GET /api/v1/colleges` - Search and filter colleges
- `GET /api/v1/colleges/:collegeId` - Get college details
- `GET /api/v1/colleges/:collegeId/programs` - Get college programs

### Career Graph
- `GET /api/v1/career-graph/graph` - Get career graph data
- `GET /api/v1/career-graph/paths` - Get career paths
- `GET /api/v1/career-graph/skills` - Get skills data

### Timeline & Events
- `GET /api/v1/timeline` - Get timeline events
- `GET /api/v1/timeline/:eventId/ics` - Get ICS calendar file
- `POST /api/v1/timeline/:eventId/subscribe` - Subscribe to event

### Content Hub
- `GET /api/v1/content-hub/materials` - Get study materials
- `GET /api/v1/content-hub/scholarships` - Get scholarships
- `POST /api/v1/content-hub/:contentId/rate` - Rate content

### Bookmarks
- `GET /api/v1/bookmarks` - Get user bookmarks
- `POST /api/v1/bookmarks` - Add bookmark
- `DELETE /api/v1/bookmarks/:bookmarkId` - Remove bookmark

### Admin Console (Admin Only)
- `GET /api/v1/admin/dashboard/stats` - Dashboard statistics
- `GET /api/v1/admin/users` - User management
- `POST /api/v1/admin/content/bulk-import` - Bulk data import
- `GET /api/v1/admin/dashboard/analytics` - Platform analytics

*For complete API documentation, see `/docs/API_DOCUMENTATION.md`*

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start both frontend and backend
npm run dev:server   # Start backend only
npm run dev:web      # Start frontend only
```

### Database Management
```bash
npm run seed:dev     # Seed database with demo data
npm run seed:prod    # Seed production database
```

### Building & Production
```bash
npm run build        # Build all packages
npm run start        # Start production server
```

### Docker Support
```bash
npm run docker:dev   # Start development environment
npm run docker:prod  # Start production environment
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Demo Data

The platform includes comprehensive seed data:

- **4 Educational Streams**: Science, Commerce, Arts, Vocational
- **12 Degree Programs**: B.Tech, MBBS, B.Com, BA, CA, ITI, etc.
- **20 Government Colleges**: Across major Indian states
- **3 Assessment Quizzes**: Interest, aptitude, and guidance tests
- **15 Timeline Events**: Exams, admissions, scholarships, counseling
- **18 Content Items**: Study materials and scholarship information
- **Sample Career Data**: Skills, roles, and progression paths

## 🔮 Future Enhancements

- **PWA Implementation**: Offline-first mobile experience
- **Frontend Development**: Complete React application
- **AI Integration**: Enhanced recommendations with machine learning
- **Real-time Features**: Chat support, live counseling sessions
- **Mobile App**: Native iOS and Android applications
- **Advanced Analytics**: Predictive modeling and insights
- **Integration APIs**: Third-party education platforms
- **Multilingual Support**: Regional language support

---

**Transforming Career Guidance for the Next Generation** 🎓

*A comprehensive platform designed to empower students in their educational and career journey*
