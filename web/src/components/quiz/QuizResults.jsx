// QuizResults.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowLeft, TrendingUp, BookOpen, Target, GraduationCap, Star } from "lucide-react";

// Mock aggregated results — replace with API data
const MOCK_STREAM_SCORES = {
  Science: 0.78,
  Arts: 0.54,
  Commerce: 0.46,
  Vocational: 0.35,
};

const MOCK_CAREERS = [
  { title: "Software/Engineering", stream: "Science" },
  { title: "Research & Lab", stream: "Science" },
  { title: "Journalism", stream: "Arts" },
  { title: "Banking & Finance", stream: "Commerce" },
];

const MOCK_COLLEGES = [
  { id: "c1", name: "Govt. Science College", programs: ["B.Sc", "BCA"], location: "District A" },
  { id: "c2", name: "Govt. Arts College", programs: ["B.A", "B.Ed"], location: "District B" },
  { id: "c3", name: "Govt. Commerce College", programs: ["B.Com", "BBA"], location: "District C" },
  { id: "c4", name: "Govt. Vocational College", programs: ["Diploma", "ITI"], location: "District D" },
];


const QuizResults = () => {
  const navigate = useNavigate();

  // Determine top stream
  const sorted = Object.entries(MOCK_STREAM_SCORES).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back button */}
        <Button
          variant="secondary"
          onClick={() => navigate("/quiz")}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Assessments
        </Button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">🎯 Your Guidance Results</h1>
          <p className="text-gray-600 mt-2">
            Based on your responses, here are your recommended streams, careers, and colleges.
          </p>
        </div>

        {/* Top Stream Highlight */}
        <Card className="overflow-hidden rounded-2xl shadow-lg border border-blue-200">
            {/* Gradient header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-center">
                <CardTitle className="text-2xl font-bold text-white flex justify-center items-center gap-2">
                <TrendingUp className="h-6 w-6 text-white" />
                Top Recommended Stream
                </CardTitle>
            </div>

            <CardContent className="p-6 text-center bg-white">
                {/* Stream Badge */}
                <div className="inline-block bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-base font-semibold shadow-sm mb-4">
                {top[0]}
                </div>

                {/* Match Percentage */}
                <div className="text-3xl font-extrabold text-gray-900">{Math.round(top[1] * 100)}% Match</div>
                <p className="text-gray-600 max-w-xl mx-auto mt-4 leading-relaxed">
                This stream aligns <span className="font-semibold">best with your interests</span> and aptitudes.  
                Explore related degree programs and nearby government colleges to plan your next steps.
                </p>
            </CardContent>
        </Card>


        {/* Stream Scores with Top Match Highlight */}
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-all">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" /> Stream Match Scores
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
            {sorted.map(([stream, score], idx) => {
                const percent = Math.round(score * 100);

                // assign unique colors per stream
                const colorMap = {
                Science: "bg-blue-600",
                Arts: "bg-pink-500",
                Commerce: "bg-yellow-500",
                Vocational: "bg-teal-500",
                };

                const barColor = colorMap[stream] || "bg-gray-400";

                return (
                <div
                    key={stream}
                    className={`relative p-3 rounded-lg transition-all ${
                    idx === 0 ? "bg-blue-50 border border-blue-200" : ""
                    }`}
                >
                    {/* Label Row */}
                    <div className="flex justify-between items-center mb-1">
                    <span
                        className={`font-medium flex items-center gap-2 ${
                        idx === 0 ? "text-blue-700" : "text-gray-800"
                        }`}
                    >
                        {stream}
                        {idx === 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                            Top Match
                        </span>
                        )}
                    </span>
                    <span
                        className={`font-semibold ${
                        idx === 0 ? "text-blue-700" : "text-gray-700"
                        }`}
                    >
                        {percent}%
                    </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className={`${barColor} h-4 transition-all duration-700 ease-out ${
                        idx === 0 ? "shadow-md shadow-blue-300" : ""
                        }`}
                        style={{ width: `${percent}%` }}
                    />
                    </div>
                </div>
                );
            })}
            </div>
        </CardContent>
        </Card>



        {/* Career Paths */}
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" /> Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {MOCK_CAREERS.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{c.title}</div>
                      <div className="text-sm text-gray-600">{c.stream}</div>
                    </div>
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Colleges */}
        <Card className="rounded-xl shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-600" /> Nearby Government Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {MOCK_COLLEGES.map((col) => (
                <div
                  key={col.id}
                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-gray-900">{col.name}</div>
                  <div className="text-sm text-gray-600">{col.programs.join(", ")}</div>
                  <div className="text-sm text-gray-500 mt-2">{col.location}</div>
                  <div className="mt-3 flex gap-2">
                    <Link to="/colleges">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        View
                      </Button>
                    </Link>
                    <Button size="sm" className="bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Bookmark
                    </Button>
                  </div>
                </div>
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
