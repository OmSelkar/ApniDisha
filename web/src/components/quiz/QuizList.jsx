// QuizList.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Loader2, Clock, Users, BookOpen, ArrowRight, Play } from "lucide-react";

// Mock quizzes — replace with your API integration
const MOCK_QUIZZES = [
  {
    id: "career-1",
    title: "Stream & Career Guidance",
    description:
      "Discover which college stream (Arts, Science, Commerce, Vocational) best fits your interests and strengths.",
    duration: 12,
    totalQuestions: 12,
    attempts: 2345,
    difficulty: "Advanced",
    isFeatured: true,
  },
  {
    id: "career-2",
    title: "Skill & Job Readiness",
    description:
      "A short assessment to match practical skill-based courses to job roles and helps in finding appropriate opportunities.",
    duration: 8,
    totalQuestions: 8,
    attempts: 890,
    difficulty: "Beginner",
  },
  {
    id: "career-3",
    title: "Logical Reasoning",
    description:
      "Test your numerical and logical thinking ability to identify courses and careers that require analytical problem-solving skills.",
    duration: 10,
    totalQuestions: 10,
    attempts: 1576,
    difficulty: "Intermediate",
  },
  {
    id: "career-4",
    title: "Arts & Creativity Quiz",
    description:
      "Evaluate your creative mindset, design skills, and artistic interests to guide you towards arts, media, or humanities pathways.",
    duration: 9,
    totalQuestions: 9,
    attempts: 1120,
    difficulty: "Beginner",
  },
  {
    id: "career-5",
    title: "Science & Research",
    description:
      "Check your curiosity for scientific concepts and research-oriented thinking to align with STEM-based higher education streams.",
    duration: 11,
    totalQuestions: 11,
    attempts: 1789,
    difficulty: "Advanced",
  },
  {
    id: "career-6",
    title: "Commerce & Business",
    description:
      "Understand your financial reasoning and entrepreneurial mindset to align with commerce-related programs.",
    duration: 10,
    totalQuestions: 10,
    attempts: 945,
    difficulty: "Intermediate",
  },
  {
    id: "career-7",
    title: "Technology & Digital Skills",
    description:
      "Explore your aptitude for coding, IT, and emerging digital technologies to suggest technical education and career options as per your interest.",
    duration: 8,
    totalQuestions: 8,
    attempts: 1345,
    difficulty: "Beginner",
  },
  {
    id: "career-8",
    title: "Government Exams Prep",
    description:
      "Gauge your readiness for competitive exams with focus on reasoning, general knowledge, and aptitude for public sector roles.",
    duration: 12,
    totalQuestions: 12,
    attempts: 2100,
    difficulty: "Advanced",
  },
  {
    id: "career-9",
    title: "Personality & Work Style",
    description:
      "Assess your personality traits and working preferences to recommend suitable courses and professions aligned with strengths.",
    duration: 9,
    totalQuestions: 9,
    attempts: 765,
    difficulty: "Intermediate",
  }
];


const QuizList = () => {
  const [loading] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your assistant. Ask me about streams, careers, or admissions." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "This is a mock AI reply. (Connect real Gemini/OpenAI here!)" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8">
        {/* Main Content */}
        <main>
          {/* Hero */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Career & Stream Guidance</h1>
            <p className="text-gray-600 max-w-2xl">
              Short, friendly assessments to help you choose the right subject stream after Class 10/12.
              Get personalized recommendations for degree programs, career paths and nearby government colleges.
            </p>
          </section>

          {/* Featured */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Featured Assessment</h2>
            {MOCK_QUIZZES.filter((q) => q.isFeatured).slice(0, 1).map((q) => (
              <Card key={q.id} className="overflow-hidden shadow-lg border-0">
                <CardContent className="p-6 flex flex-col lg:flex-row items-start gap-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{q.title}</h3>
                    <p className="mt-2 text-blue-100">{q.description}</p>
                    <div className="flex items-center gap-6 mt-4 text-sm text-blue-100">
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {q.duration} mins</div>
                      <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {q.totalQuestions} questions</div>
                      <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {q.attempts} students</div>
                    </div>
                  </div>
                  <div className="self-center">
                    <Link to={`/quiz/${q.id}`}>
                      <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                        <Play className="mr-2 h-4 w-4" /> Start Assessment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* All Quizzes */}
          <section>
            <h2 className="text-xl font-semibold mb-4">All Assessments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_QUIZZES.map((q) => (
                <Card key={q.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {q.title}
                          {
                            q.difficulty === 'Beginner' ? <Badge className="text-xs bg-green-200 hover:bg-green-300">{q.difficulty}</Badge> : q.difficulty === 'Intermediate' ? <Badge className="text-xs bg-yellow-200 hover:bg-yellow-300">{q.difficulty}</Badge>: <Badge className="text-xs bg-red-200 hover:bg-red-300">{q.difficulty}</Badge>
                          }
                          {/* <Badge className="text-xs bg-red-200 hover:bg-red-200">{q.difficulty}</Badge> */}
                        </CardTitle>
                        <div className="mt-2 text-sm text-gray-600">{q.description}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {q.totalQuestions}</div>
                        <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {q.duration} mins</div>
                      </div>
                      <div className="text-sm text-gray-500">{q.attempts} taken</div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/quiz/${q.id}`} className="flex-1">
                        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                          Start <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/quiz/${q.id}`} className="w-14">
                        <Button variant="outline" className="w-full">Info</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar with Chatbot */}
        <aside className="hidden lg:block">
          <div className="space-y-6 sticky top-24">
            <Card className="p-4 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  AI Assistant
                </h4>
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
                  onClick={() => setChatOpen((s) => !s)}
                >
                  {chatOpen ? "Close" : "Open"}
                </Button>
              </div>

              {chatOpen ? (
                <div className="flex flex-col h-96 border rounded-lg overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-2 rounded-lg max-w-[80%] ${
                          msg.from === "user"
                            ? "bg-blue-600 text-white ml-auto"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="bg-gray-200 text-gray-500 px-3 py-2 rounded-lg max-w-[60%]">
                        Typing...
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  {/* Input */}
                  <div className="flex border-t p-2 bg-white">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask something..."
                      rows={2}
                      className="flex-1 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      size="sm"
                      className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      onClick={handleSend}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Open the assistant for instant guidance on streams and careers.
                </p>
              )}
            </Card>

            <Card className="p-4 rounded-xl shadow-md">
              <h4 className="font-semibold mb-2">Why these assessments?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized stream recommendations</li>
                <li>• Career path mapping & college suggestions</li>
                <li>• Timeline reminders for admissions & scholarships</li>
              </ul>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuizList;
