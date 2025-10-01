import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  GraduationCap, 
  BookOpen, 
  Building, 
  Briefcase, 
  Star,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  IndianRupee,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { recommendationsAPI } from '../../services/api';

const ModernRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState({
    streams: [],
    degrees: [],
    colleges: [],
    careers: [],
    content: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('streams');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      
      try {
        // Try to get personalized recommendations (requires auth)
        const response = await recommendationsAPI.getPersonalized();
        const recoData = response.data.data || response.data.recommendations || {};
        
        setRecommendations({
          streams: recoData.streams || [],
          degrees: recoData.degrees || [],
          colleges: recoData.colleges || [],
          careers: recoData.careers || [],
          content: recoData.content || []
        });
      } catch {
        // User not authenticated - show sample recommendations
        console.log('User not authenticated - showing sample recommendations');
        setRecommendations({
            streams: [
              {
                _id: '1',
                name: 'Science',
                description: 'Mathematics, Physics, Chemistry, Biology and related fields',
                matchScore: 85,
                category: 'STEM'
              },
              {
                _id: '2',
                name: 'Commerce',
                description: 'Business, Economics, Accounting, Finance and related fields',
                matchScore: 75,
                category: 'Business'
              },
              {
                _id: '3',
                name: 'Arts & Humanities',
                description: 'History, Sociology, Political Science, Literature and related fields',
                matchScore: 70,
                category: 'Humanities'
              },
              {
                _id: '4',
                name: 'Vocational Studies',
                description: 'Practical skills in fields like IT, Tourism, Hospitality, and Design',
                matchScore: 65,
                category: 'Applied'
              },
              {
                _id: '5',
                name: 'Law',
                description: 'Study of legal systems, rights, and justice',
                matchScore: 72,
                category: 'Legal'
              },
              {
                _id: '6',
                name: 'Medical',
                description: 'MBBS, Nursing, Pharmacy, and related healthcare fields',
                matchScore: 88,
                category: 'Healthcare'
              },
              {
                _id: '7',
                name: 'Fine Arts',
                description: 'Painting, Music, Dance, Theatre and other creative arts',
                matchScore: 60,
                category: 'Creative'
              },
              {
                _id: '8',
                name: 'Agriculture',
                description: 'Farming, Soil Science, Horticulture, and Food Technology',
                matchScore: 68,
                category: 'Agriculture'
              }
            ],

            degrees: [
              {
                _id: '1',
                name: 'Bachelor of Technology',
                description: 'Engineering degree with specialization in various technical fields',
                level: 'Undergraduate',
                matchScore: 90,
                duration: '4 years',
                averageFee: 200000
              },
              {
                _id: '2',
                name: 'Bachelor of Commerce',
                description: 'Commerce degree covering business, finance, and accounting',
                level: 'Undergraduate',
                matchScore: 80,
                duration: '3 years',
                averageFee: 120000
              },
              {
                _id: '3',
                name: 'Bachelor of Arts',
                description: 'Focus on humanities and social sciences',
                level: 'Undergraduate',
                matchScore: 75,
                duration: '3 years',
                averageFee: 100000
              },
              {
                _id: '4',
                name: 'Bachelor of Science',
                description: 'Core science subjects like Physics, Chemistry, and Biology',
                level: 'Undergraduate',
                matchScore: 78,
                duration: '3 years',
                averageFee: 150000
              },
              {
                _id: '5',
                name: 'Bachelor of Medicine and Surgery (MBBS)',
                description: 'Professional degree in medicine and surgery',
                level: 'Undergraduate',
                matchScore: 92,
                duration: '5.5 years',
                averageFee: 600000
              },
              {
                _id: '6',
                name: 'Bachelor of Fine Arts',
                description: 'Degree focusing on visual and performing arts',
                level: 'Undergraduate',
                matchScore: 70,
                duration: '4 years',
                averageFee: 180000
              },
              {
                _id: '7',
                name: 'Bachelor of Law (LLB)',
                description: 'Degree in legal studies and law practice',
                level: 'Undergraduate',
                matchScore: 82,
                duration: '3 years',
                averageFee: 220000
              },
              {
                _id: '8',
                name: 'Bachelor of Business Administration',
                description: 'Focus on management, marketing, and entrepreneurship',
                level: 'Undergraduate',
                matchScore: 85,
                duration: '3 years',
                averageFee: 250000
              }
            ],

            colleges: [
              {
                _id: '1',
                name: 'Indian Institute of Technology Delhi',
                type: 'Government',
                rating: 4.8,
                location: 'New Delhi, Delhi',
                studentsCount: 8000,
                averageFee: 200000
              },
              {
                _id: '2',
                name: 'Delhi University',
                type: 'Government',
                rating: 4.6,
                location: 'New Delhi, Delhi',
                studentsCount: 200000,
                averageFee: 60000
              },
              {
                _id: '3',
                name: 'Christ University',
                type: 'Private',
                rating: 4.4,
                location: 'Bengaluru, Karnataka',
                studentsCount: 25000,
                averageFee: 180000
              },
              {
                _id: '4',
                name: 'St. Xavier’s College',
                type: 'Private',
                rating: 4.5,
                location: 'Mumbai, Maharashtra',
                studentsCount: 5000,
                averageFee: 120000
              },
              {
                _id: '5',
                name: 'All India Institute of Medical Sciences',
                type: 'Government',
                rating: 4.9,
                location: 'New Delhi, Delhi',
                studentsCount: 15000,
                averageFee: 300000
              },
              {
                _id: '6',
                name: 'National Law School of India University',
                type: 'Government',
                rating: 4.7,
                location: 'Bengaluru, Karnataka',
                studentsCount: 2000,
                averageFee: 250000
              },
              {
                _id: '7',
                name: 'Banaras Hindu University',
                type: 'Government',
                rating: 4.6,
                location: 'Varanasi, Uttar Pradesh',
                studentsCount: 30000,
                averageFee: 100000
              },
              {
                _id: '8',
                name: 'Symbiosis International University',
                type: 'Private',
                rating: 4.3,
                location: 'Pune, Maharashtra',
                studentsCount: 18000,
                averageFee: 200000
              }
            ],

            careers: [
              {
                _id: '1',
                title: 'Software Engineer',
                description: 'Design, develop, and maintain software applications',
                industry: 'Technology',
                matchScore: 88,
                averageSalary: 800000,
                growthRate: 'High'
              },
              {
                _id: '2',
                title: 'Chartered Accountant',
                description: 'Manage financial accounts, audits, and business taxation',
                industry: 'Finance',
                matchScore: 82,
                averageSalary: 900000,
                growthRate: 'High'
              },
              {
                _id: '3',
                title: 'Civil Services Officer',
                description: 'Serve the nation in administrative roles',
                industry: 'Government',
                matchScore: 78,
                averageSalary: 700000,
                growthRate: 'Moderate'
              },
              {
                _id: '4',
                title: 'Graphic Designer',
                description: 'Create visual content for digital and print media',
                industry: 'Design',
                matchScore: 72,
                averageSalary: 400000,
                growthRate: 'High'
              },
              {
                _id: '5',
                title: 'Doctor',
                description: 'Diagnose and treat patients across various specializations',
                industry: 'Healthcare',
                matchScore: 92,
                averageSalary: 1200000,
                growthRate: 'High'
              },
              {
                _id: '6',
                title: 'Lawyer',
                description: 'Advocate for clients in courts and provide legal advice',
                industry: 'Legal',
                matchScore: 80,
                averageSalary: 1000000,
                growthRate: 'High'
              },
              {
                _id: '7',
                title: 'Entrepreneur',
                description: 'Start and manage your own business venture',
                industry: 'Business',
                matchScore: 76,
                averageSalary: 1500000,
                growthRate: 'Very High'
              },
              {
                _id: '8',
                title: 'Data Scientist',
                description: 'Analyze data to extract insights and build predictive models',
                industry: 'Technology',
                matchScore: 89,
                averageSalary: 1400000,
                growthRate: 'Very High'
              }
            ],

            content: [
              {
                _id: '1',
                title: 'Complete Guide to JEE Preparation',
                description: 'Comprehensive study material for JEE Main and Advanced',
                type: 'Study Material',
                rating: 4.5,
                duration: '2 hours',
                enrollments: 1500
              },
              {
                _id: '2',
                title: 'Commerce Starter Pack',
                description: 'Covers basics of accounting, economics, and business studies',
                type: 'E-Book',
                rating: 4.2,
                duration: '3 hours',
                enrollments: 1200
              },
              {
                _id: '3',
                title: 'UPSC Preparation Guide',
                description: 'Key strategies, notes, and mock tests for UPSC aspirants',
                type: 'Course',
                rating: 4.6,
                duration: '5 hours',
                enrollments: 2500
              },
              {
                _id: '4',
                title: 'Graphic Design for Beginners',
                description: 'Learn Photoshop, Illustrator, and Figma basics',
                type: 'Video Course',
                rating: 4.3,
                duration: '6 hours',
                enrollments: 3000
              },
              {
                _id: '5',
                title: 'NEET Crash Course',
                description: 'Quick revision for NEET aspirants with mock tests',
                type: 'Course',
                rating: 4.7,
                duration: '10 hours',
                enrollments: 3500
              },
              {
                _id: '6',
                title: 'Corporate Law Basics',
                description: 'Introduction to business and corporate law',
                type: 'E-Book',
                rating: 4.1,
                duration: '4 hours',
                enrollments: 1000
              },
              {
                _id: '7',
                title: 'Entrepreneurship Masterclass',
                description: 'Step-by-step guide to launching and scaling startups',
                type: 'Webinar',
                rating: 4.8,
                duration: '3 hours',
                enrollments: 4000
              },
              {
                _id: '8',
                title: 'Data Science Bootcamp',
                description: 'Hands-on projects in Python, ML, and AI',
                type: 'Course',
                rating: 4.9,
                duration: '15 hours',
                enrollments: 5000
              }
            ]
          }
        );
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      console.warn('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Recommendations</h1>
          <p className="text-lg text-gray-600">
            Discover career paths, colleges, and resources tailored to your profile and interests
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="streams" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Streams
            </TabsTrigger>
            <TabsTrigger value="degrees" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Degrees
            </TabsTrigger>
            <TabsTrigger value="colleges" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Colleges
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>

          {/* Streams Tab */}
          <TabsContent value="streams">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.streams.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No stream recommendations</h3>
                      <p className="text-gray-600">Complete a career quiz to get personalized stream recommendations.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.streams.map((stream) => (
                  <Card key={stream._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{stream.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{stream.matchScore}% match</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{stream.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{stream.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{stream.popularity} students enrolled</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span>{stream.growthRate}% job growth</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Learn More
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Degrees Tab */}
          <TabsContent value="degrees">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.degrees.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No degree recommendations</h3>
                      <p className="text-gray-600">Complete a career quiz to get personalized degree recommendations.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.degrees.map((degree) => (
                  <Card key={degree._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{degree.level}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{degree.matchScore}% match</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{degree.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{degree.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{degree.duration} years</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>₹{degree.averageFee?.toLocaleString()} avg fee</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        View Colleges
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Colleges Tab */}
          <TabsContent value="colleges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.colleges.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No college recommendations</h3>
                      <p className="text-gray-600">Complete a career quiz to get personalized college recommendations.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.colleges.map((college) => (
                  <Card key={college._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{college.type}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{college.rating}/5</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{college.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{college.studentsCount} students</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>₹{college.averageFee?.toLocaleString()} per year</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        View Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.careers.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No career recommendations</h3>
                      <p className="text-gray-600">Complete a career quiz to get personalized career recommendations.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.careers.map((career) => (
                  <Card key={career._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{career.industry}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{career.matchScore}% match</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{career.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <IndianRupee className="h-4 w-4 mr-2" />
                          <span>₹{career.averageSalary?.toLocaleString()} per year</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span>{career.growthRate}% job growth</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Explore Career
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.content.length === 0 ? (
                <div className="col-span-full">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No content recommendations</h3>
                      <p className="text-gray-600">Complete a career quiz to get personalized content recommendations.</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                recommendations.content.map((content) => (
                  <Card key={content._id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">{content.type}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{content.rating}/5</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{content.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{content.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{content.enrollments} enrolled</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Access Content
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModernRecommendationsPage;
