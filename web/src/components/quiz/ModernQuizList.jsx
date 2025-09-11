import React, { useState, useEffect } from 'react';
const GeminiQuiz = React.lazy(() => import('./GeminiQuiz'));
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Clock, 
  Users, 
  ArrowRight, 
  BookOpen, 
  Trophy,
  Play,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { quizAPI } from '../../services/api';

const ModernQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [myAttempts, setMyAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch quizzes (public endpoint)
      const quizzesRes = await quizAPI.getAll({ isActive: true });
      setQuizzes(quizzesRes.data.data || quizzesRes.data.quizzes || []);
      
      // Try to fetch user attempts (requires auth)
      try {
        const attemptsRes = await quizAPI.getUserAttempts();
        setMyAttempts(attemptsRes.data.attempts || []);
      } catch {
        // User not authenticated - that's okay for public quiz access
        console.log('User not authenticated - showing public quizzes only');
        setMyAttempts([]);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      // Don't show error toast for public access
      console.warn('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const getAttemptForQuiz = (quizId) => {
    return myAttempts.find(attempt => attempt.quizId === quizId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Assessment Quizzes</h1>
          <p className="text-lg text-gray-600">
            Discover your strengths and find the perfect career path through our AI-powered assessments
          </p>
        </div>

        {/* Featured Quiz */}
        {quizzes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Assessment</h2>
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <h3 className="text-2xl font-bold mb-3">{quizzes[0].title}</h3>
                    <p className="text-blue-100 mb-4 text-lg leading-relaxed">
                      {quizzes[0].description}
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{quizzes[0].duration || 15} minutes</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{quizzes[0].totalQuestions || 20} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{quizzes[0].attempts || 0} taken</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to={`/quiz/${quizzes[0]._id}`}>
                      <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
                        <Play className="h-5 w-5 mr-2" />
                        Start Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Quizzes Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Assessments</h2>
          
          {quizzes.length === 0 ? (
            // Show live Gemini Q&A stream when no curated quizzes exist
            <div>
              {/* Lazy load GeminiQuiz to avoid bundling heavy client code if not needed */}
              <React.Suspense fallback={<div className="p-12 text-center">Loading assistant...</div>}>
                <GeminiQuiz />
              </React.Suspense>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => {
                const attempt = getAttemptForQuiz(quiz._id);
                const isCompleted = attempt && attempt.status === 'completed';
                
                return (
                  <Card key={quiz._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty || 'Medium'}
                        </Badge>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">{quiz.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {quiz.description}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{quiz.duration || 15} minutes</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <BookOpen className="h-4 w-4 mr-2" />
                          <span>{quiz.totalQuestions || 20} questions</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{quiz.attempts || 0} students taken</span>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center text-sm text-green-600">
                            <Trophy className="h-4 w-4 mr-2" />
                            <span>Score: {attempt.score}%</span>
                          </div>
                        )}
                      </div>
                      
                      <Link to={`/quiz/${quiz._id}`} className="block">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Attempts */}
        {myAttempts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Recent Attempts</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {myAttempts.slice(0, 5).map((attempt) => (
                    <div key={attempt._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{attempt.quizTitle}</h4>
                        <p className="text-sm text-gray-600">
                          Completed on {new Date(attempt.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{attempt.score}%</div>
                          <div className="text-sm text-gray-500">Score</div>
                        </div>
                        <Link to={`/quiz/results/${attempt._id}`}>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernQuizList;
