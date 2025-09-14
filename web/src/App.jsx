import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import ModernLayout from './components/layout/ModernLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Auth Pages
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'

// Modern Career & Education Advisor Components
import ModernLandingPage from './components/ModernLandingPage'
import QuizPage from './components/quiz/QuizPage'
import QuizResults from './components/quiz/QuizResults'
import ModernRecommendationsPage from './components/recommendations/ModernRecommendationsPage'
import ModernCollegeDirectory from './components/colleges/ModernCollegeDirectory'
import CollegeDetail from './components/colleges/CollegeDetail'
import ModernTimelineTracker from './components/timeline/ModernTimelineTracker'
import ModernContentHub from './components/content/ModernContentHub'
import ContentDetail from './components/content/ContentDetail'
import CareerGraphPage from './components/career/CareerGraphPage'
import BookmarksPage from './components/bookmarks/BookmarksPage'
import ModernProfilePage from './components/profile/ModernProfilePage'

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard'
import AdminUsers from './components/admin/AdminUsers'
import AdminColleges from './components/admin/AdminColleges'
import AdminPrograms from './components/admin/AdminPrograms'
import AdminTimeline from './components/admin/AdminTimeline'
import AdminContent from './components/admin/AdminContent'
import AdminCareerGraph from './components/admin/AdminCareerGraph'
import AdminAnalytics from './components/admin/AdminAnalytics'
import QuizList from './components/quiz/QuizList'

// Simple fallback component for unmatched routes
const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  </div>
)

const appRouter = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },

  // Core Routes - Career & Education Advisor Platform
  {
    path: '/',
    element: <ModernLayout><ModernLandingPage /></ModernLayout>
  },
  {
    path: "/profile",
    element: <ModernLayout><ModernProfilePage /></ModernLayout>
  },

  // Career & Education Advisor Routes
  {
    path: "/quiz",
    element: <ModernLayout><QuizList /></ModernLayout>
  },
  {
    path: "/quiz/:id",
    element: <ModernLayout><QuizPage /></ModernLayout>
  },
  {
    path: "/quiz/results/:attemptId",
    element: <ModernLayout><QuizResults /></ModernLayout>
  },
  {
    path: "/recommendations",
    element: <ModernLayout><ModernRecommendationsPage /></ModernLayout>
  },
  {
    path: "/colleges",
    element: <ModernLayout><ModernCollegeDirectory /></ModernLayout>
  },
  {
    path: "/colleges/:id",
    element: <ModernLayout><CollegeDetail /></ModernLayout>
  },
  {
    path: "/timeline",
    element: <ModernLayout><ModernTimelineTracker /></ModernLayout>
  },
  {
    path: "/content",
    element: <ModernLayout><ModernContentHub /></ModernLayout>
  },
  {
    path: "/content/:id",
    element: <ModernLayout><ContentDetail /></ModernLayout>
  },
  {
    path: "/career-graph",
    element: <ModernLayout><CareerGraphPage /></ModernLayout>
  },
  {
    path: "/bookmarks",
    element: <ModernLayout><BookmarksPage /></ModernLayout>
  },

  // Admin Routes
  {
    path: "/admin",
    element: <ModernLayout><ProtectedRoute><AdminDashboard /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/users",
    element: <ModernLayout><ProtectedRoute><AdminUsers /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/colleges",
    element: <ModernLayout><ProtectedRoute><AdminColleges /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/programs",
    element: <ModernLayout><ProtectedRoute><AdminPrograms /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/timeline",
    element: <ModernLayout><ProtectedRoute><AdminTimeline /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/content",
    element: <ModernLayout><ProtectedRoute><AdminContent /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/career-graph",
    element: <ModernLayout><ProtectedRoute><AdminCareerGraph /></ProtectedRoute></ModernLayout>
  },
  {
    path: "/admin/analytics",
    element: <ModernLayout><ProtectedRoute><AdminAnalytics /></ProtectedRoute></ModernLayout>
  },

  // Catch-all route for 404 errors
  {
    path: "*",
    element: <NotFound />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
