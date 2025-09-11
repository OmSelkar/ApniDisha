import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin,
  Star,
  Target,
  Lightbulb,
  Play
} from 'lucide-react';
import { quizAPI, collegesAPI } from '../services/api';
import { contentAPI } from '../services/contentService';

const LandingPage = () => {
  const [stats, setStats] = useState({
    studentsGuided: 0,
    collegesListed: 0,
    careerPaths: 0,
    studyResources: 0
  });
  const [featuredQuiz, setFeaturedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [quizzesRes, collegesRes, contentRes] = await Promise.all([
        quizAPI.getAll(),
        collegesAPI.getAll(),
        contentAPI.getAll()
      ]);
      
      // Set real stats from backend
      setStats({
        studentsGuided: quizzesRes.data.totalAttempts || 10000,
        collegesListed: collegesRes.data.colleges?.length || 500,
        careerPaths: 50,
        studyResources: contentRes.data.content?.length || 1000
      });
      
      // Set featured quiz
      if (quizzesRes.data.quizzes?.length > 0) {
        setFeaturedQuiz(quizzesRes.data.quizzes[0]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback stats
      setStats({
        studentsGuided: 10000,
        collegesListed: 500,
        careerPaths: 50,
        studyResources: 1000
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Personalized Career Assessment",
      description: "Take our comprehensive aptitude quiz to discover careers that match your interests and skills."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: "College Directory",
      description: "Explore 500+ colleges with detailed information about programs, fees, and admission requirements."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Study Materials Hub",
      description: "Access curated study materials, guides, and resources for entrance exams and career preparation."
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      title: "Timeline Tracker",
      description: "Never miss important dates for admissions, scholarships, and entrance exams with our timeline tracker."
    }
  ];

  const statsDisplay = [
    { number: `${stats.studentsGuided.toLocaleString()}+`, label: "Students Guided" },
    { number: `${stats.collegesListed}+`, label: "Colleges Listed" },
    { number: `${stats.careerPaths}+`, label: "Career Paths" },
    { number: `${stats.studyResources}+`, label: "Study Resources" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      class: "Class 12, Science",
      text: "The career quiz helped me discover my passion for biotechnology. Now I'm confidently preparing for NEET!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      class: "Class 10",
      text: "Amazing platform! The timeline tracker ensured I never missed any important admission deadlines.",
      rating: 5
    },
    {
      name: "Ananya Patel",
      class: "Class 12, Commerce",
      text: "Found the perfect college for my CA course through their detailed college directory. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your <span className="text-yellow-300">Career Journey</span> Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover your perfect career path with personalized assessments, college recommendations, 
              and comprehensive guidance for Class 10th & 12th students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Start Career Quiz
                </Button>
              </Link>
              <Link to="/colleges">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Colleges
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <GraduationCap className="h-16 w-16 text-yellow-300" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <BookOpen className="h-12 w-12 text-blue-300" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsDisplay.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {loading ? '...' : stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Career Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to make informed decisions about your future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to discover your perfect career path
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Take the Quiz</h3>
              <p className="text-gray-600">
                Complete our comprehensive aptitude and interest assessment to understand your strengths and preferences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized recommendations for courses, colleges, and career paths based on your quiz results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Plan Your Future</h3>
              <p className="text-gray-600">
                Use our timeline tracker and resources to plan your educational journey and achieve your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Students Say About Us
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of students who found their perfect career path
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.class}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quiz CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Perfect Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {featuredQuiz ? 
              `Take our ${featuredQuiz.title} and get personalized recommendations in just ${featuredQuiz.duration || 10} minutes.` :
              'Take our free career assessment quiz and get personalized recommendations in just 10 minutes.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={featuredQuiz ? `/quiz/${featuredQuiz._id}` : '/quiz'}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-4 text-lg font-semibold">
                <Play className="mr-2 h-5 w-5" />
                Start Career Quiz Now
              </Button>
            </Link>
            <Link to="/colleges">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                <GraduationCap className="mr-2 h-5 w-5" />
                Explore Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Career & Education Advisor</h3>
              <p className="text-gray-400">
                Empowering students to make informed decisions about their future through personalized guidance and comprehensive resources.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/quiz" className="hover:text-white">Career Quiz</Link></li>
                <li><Link to="/colleges" className="hover:text-white">Colleges</Link></li>
                <li><Link to="/content" className="hover:text-white">Study Materials</Link></li>
                <li><Link to="/timeline" className="hover:text-white">Timeline</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/recommendations" className="hover:text-white">Recommendations</Link></li>
                <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
                <li><Link to="/bookmarks" className="hover:text-white">Saved Items</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Have questions? We&apos;re here to help you on your career journey.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Career & Education Advisor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
