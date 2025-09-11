import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Loader2, 
  Clock, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Target, 
  Brain, 
  TrendingUp, 
  Award,
  Star,
  CheckCircle,
  Play
} from 'lucide-react';
import { quizAPI } from '../../services/api';
import { toast } from 'sonner';

const NewQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myAttempts, setMyAttempts] = useState([]);
  const [featuredQuiz, setFeaturedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
    fetchMyAttempts();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizAPI.getAll({ isActive: true });
      const quizData = response.data.quizzes || [];
      setQuizzes(quizData);
      
      // Set featured quiz (first one or most popular)
      if (quizData.length > 0) {
        setFeaturedQuiz(quizData[0]);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast.error('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyAttempts = async () => {
    try {
      const response = await quizAPI.getMyAttempts();
      setMyAttempts(response.data.attempts || []);
    } catch (error) {
      console.error('Error fetching attempts:', error);
      setMyAttempts([]);
    }
  };

  const getQuizIcon = (category) => {
    switch (category) {
      case 'Career Discovery': return <Target className="h-6 w-6" />;
      case 'Academic Planning': return <BookOpen className="h-6 w-6" />;
      case 'College Preparation': return <Award className="h-6 w-6" />;
      default: return <Brain className="h-6 w-6" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasAttempted = (quizId) => {
    return myAttempts.some(attempt => attempt.quizId === quizId);
  };

  const getAttemptScore = (quizId) => {
    const attempt = myAttempts.find(attempt => attempt.quizId === quizId);
    return attempt ? attempt.score : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-xl text-gray-600">Loading career assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Perfect <span className="text-yellow-300">Career Path</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Take our scientifically-designed assessments to uncover your strengths, 
              interests, and ideal career opportunities.
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>25,000+ Students Assessed</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-300" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                <span>95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Quiz */}
        {featuredQuiz && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 Featured Assessment</h2>
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center mb-4">
                      {getQuizIcon(featuredQuiz.category)}
                      <h3 className="text-2xl font-bold ml-3">{featuredQuiz.title}</h3>
                      {featuredQuiz.isPopular && (
                        <Badge className="ml-3 bg-yellow-500 text-black">Most Popular</Badge>
                      )}
                    </div>
                    <p className="text-blue-100 text-lg mb-4">{featuredQuiz.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredQuiz.duration} minutes</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{featuredQuiz.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{featuredQuiz.attempts.toLocaleString()} taken</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-300" />
                        <span>{featuredQuiz.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    {hasAttempted(featuredQuiz.id) ? (
                      <div className="mb-4">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="h-6 w-6 text-green-300 mr-2" />
                          <span className="text-lg font-semibold">Completed</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-300">
                          {getAttemptScore(featuredQuiz.id)}%
                        </div>
                        <Link to={`/quiz/${featuredQuiz.id}`}>
                          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 mt-2">
                            Retake Quiz
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <Link to={`/quiz/${featuredQuiz.id}`}>
                        <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
                          <Play className="mr-2 h-5 w-5" />
                          Start Assessment
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* All Quizzes */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">All Career Assessments</h2>
            <div className="text-sm text-gray-600">
              {quizzes.length} assessments available
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        {getQuizIcon(quiz.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{quiz.title}</CardTitle>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs">
                            {quiz.category}
                          </Badge>
                          <Badge className={`ml-2 text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {quiz.isPopular && (
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                    {quiz.description}
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{quiz.duration} min</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{quiz.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{quiz.attempts.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      <span>{quiz.rating}/5</span>
                    </div>
                  </div>

                  {hasAttempted(quiz.id) ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">Completed</span>
                        </div>
                        <span className="font-bold text-green-600">
                          {getAttemptScore(quiz.id)}%
                        </span>
                      </div>
                      <Link to={`/quiz/${quiz.id}`} className="block">
                        <Button variant="outline" className="w-full">
                          Retake Assessment
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Link to={`/quiz/${quiz.id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Start Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Take Our Career Assessments?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
              <p className="text-gray-600">
                Get tailored career recommendations based on your unique profile and interests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Science-Based</h3>
              <p className="text-gray-600">
                Our assessments are built on proven psychological and career development theories.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Future-Ready</h3>
              <p className="text-gray-600">
                Discover careers that align with future job market trends and opportunities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewQuizList;
