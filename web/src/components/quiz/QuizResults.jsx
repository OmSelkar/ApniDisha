// QuizResults.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowLeft, TrendingUp, BookOpen, Target, GraduationCap, Star, MapPin, Award, Trophy, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// Mock aggregated results — replace with API data
const MOCK_STREAM_SCORES = {
  Science: 0.78,
  Arts: 0.54,
  Commerce: 0.46,
  Vocational: 0.35,
};

const MOCK_CAREERS = [
  { title: "Software Engineer", stream: "Science", icon: "💻", description: "Build the future with code" },
  { title: "Research Scientist", stream: "Science", icon: "🔬", description: "Discover new knowledge" },
  { title: "Creative Writer", stream: "Arts", icon: "✍️", description: "Tell stories that inspire" },
  { title: "Financial Analyst", stream: "Commerce", icon: "📊", description: "Shape financial futures" },
];

const MOCK_COLLEGES = [
  { id: "c1", name: "Govt. Science College", programs: ["B.Sc", "BCA"], location: "District A", rating: 4.2 },
  { id: "c2", name: "Govt. Arts College", programs: ["B.A", "B.Ed"], location: "District B", rating: 4.0 },
  { id: "c3", name: "Govt. Commerce College", programs: ["B.Com", "BBA"], location: "District C", rating: 4.1 },
  { id: "c4", name: "Govt. Vocational College", programs: ["Diploma", "ITI"], location: "District D", rating: 3.9 },
];


const QuizResults = () => {
  const navigate = useNavigate();

  // Determine top stream
  const sorted = Object.entries(MOCK_STREAM_SCORES).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];

  // Prepare data for radar chart
  const radarData = sorted.map(([stream, score]) => ({
    subject: stream,
    A: score * 100,
    fullMark: 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back button */}
        <Button
          variant="secondary"
          onClick={() => navigate("/quiz")}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Assessments
        </Button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">🎯 Your Personalized Career Report</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Based on your quiz responses, here are your recommended streams, career paths, and nearby government colleges.
          </p>
        </div>

        {/* Top Stream Highlight */}
        <Card className="overflow-hidden rounded-3xl shadow-xl border border-blue-300">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-center">
            <CardTitle className="text-3xl font-extrabold text-white flex justify-center items-center gap-3">
              <TrendingUp className="h-7 w-7 text-white" />
              Top Recommended Stream
            </CardTitle>
          </div>

          <CardContent className="p-8 bg-white">
            {/* Stream Badge */}
            <div className="inline-block bg-gradient-to-r from-blue-200 to-indigo-300 text-blue-900 px-6 py-3 rounded-full text-xl font-bold shadow-lg mb-6">
              {top[0]}
            </div>

            {/* Match Percentage */}
            <div className="text-4xl font-extrabold text-gray-900 mb-4">{Math.round(top[1] * 100)}% Match</div>
            <p className="text-gray-700 max-w-xl mx-auto leading-relaxed">
              This stream aligns <span className="font-semibold">best with your interests</span> and aptitudes.  
              Explore related degree programs and nearby government colleges to plan your next steps.
            </p>
          </CardContent>
        </Card>


        {/* Stream Scores Radar Chart */}
        <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="h-6 w-6 text-indigo-600" /> Stream Compatibility Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Compatibility"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {sorted.map(([stream, score], idx) => {
                const percent = Math.round(score * 100);
                const colorMap = {
                  Science: "from-blue-500 to-cyan-500",
                  Arts: "from-pink-500 to-rose-500",
                  Commerce: "from-yellow-500 to-orange-500",
                  Vocational: "from-teal-500 to-green-500",
                };
                const gradient = colorMap[stream] || "from-gray-500 to-gray-600";

                return (
                  <motion.div
                    key={stream}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-r ${gradient} text-white p-4 rounded-xl shadow-lg`}
                  >
                    <div className="font-bold text-lg">{stream}</div>
                    <div className="text-2xl font-extrabold">{percent}%</div>
                    {idx === 0 && <div className="text-xs bg-white/20 px-2 py-1 rounded-full mt-1">Top Match</div>}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>



        {/* Career Path Collection */}
        <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BookOpen className="h-6 w-6 text-green-600" /> Career Path Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_CAREERS.map((career, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-green-300 transition-all cursor-pointer"
                >
                  {/* Collectible Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-2 shadow-lg">
                    <Award className="h-4 w-4" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{career.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{career.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{career.stream} Stream</p>
                      <p className="text-gray-700 text-sm">{career.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Match</span>
                      <span>{Math.round(MOCK_STREAM_SCORES[career.stream] * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.round(MOCK_STREAM_SCORES[career.stream] * 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Colleges */}
        <Card className="rounded-3xl shadow-xl hover:shadow-2xl transition-all bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <GraduationCap className="h-6 w-6 text-purple-600" /> Nearby Government Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_COLLEGES.map((col, idx) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{col.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span>{col.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(col.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({col.rating})</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Programs:</span> {col.programs.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link to="/colleges">
                        <Button size="sm" variant="outline" className="rounded-xl border-purple-300 text-purple-700 hover:bg-purple-50">
                          View Details
                        </Button>
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600">
                        <Trophy className="h-4 w-4 mr-1" /> Bookmark
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/recommendations">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
              View Recommendations
            </Button>
          </Link>
          <Link to="/colleges">
            <Button variant="outline" className="rounded-lg">
              Explore Colleges
            </Button>
          </Link>
          <Link to="/timeline">
            <Button variant="outline" className="rounded-lg">
              Track Timelines
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
