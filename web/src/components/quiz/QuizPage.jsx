// QuizPage.jsx
import React, { useEffect, useState, Suspense, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const GeminiQuiz = React.lazy(() => import("./GeminiQuiz"));

// Mock quiz questions
const MOCK_QUESTIONS = [
  { id: "q1", section: "Interests", text: "How much do you enjoy solving logical or scientific problems?", type: "likert" },
  { id: "q2", section: "Interests", text: "How interested are you in creative/artistic activities?", type: "likert" },
  { id: "q3", section: "Aptitude", text: "How comfortable are you with numbers and calculations?", type: "likert" },
  { id: "q4", section: "Personality", text: "Do you prefer teamwork or independent work?", type: "choice", options: ["Teamwork", "Independent", "Both"] },
  { id: "q5", section: "Career Goals", text: "Are you interested in quick skill-based employment (vocational) or long-term degrees?", type: "choice", options: ["Skill-based", "Degree", "Undecided"] },
];

const StepDot = ({ active }) => (
  <div className={`w-3 h-3 rounded-full ${active ? "bg-blue-600" : "bg-gray-200"}`} />
);

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [chatOpen, setChatOpen] = useState(false);
  const [error, setError] = useState("");

  // Chat state
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your assistant. Ask me about courses, exams, or colleges." },
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
        { from: "bot", text: "This is a mock AI reply. (You can connect real AI here!)" },
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

  // ✅ Progress based on answered questions
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / MOCK_QUESTIONS.length) * 100);

  const q = MOCK_QUESTIONS[current];

  const setAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    setError("");
  };

  const next = () => {
    if (!answers[q.id]) {
      setError("⚠ Please select an option before continuing.");
      return;
    }
    setError("");
    if (current < MOCK_QUESTIONS.length - 1) setCurrent((c) => c + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const submit = () => {
    if (!answers[q.id]) {
      setError("⚠ Please select an option before submitting.");
      return;
    }
    setError("");
    navigate("/quiz/results/demo-attempt");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,340px] gap-6">
        {/* Main Quiz */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button variant="secondary" onClick={() => navigate("/quiz")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Clock className="h-4 w-4" />
              <span>Estimated time: 8–12 mins</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Guidance Assessment</h1>
          <p className="text-gray-600 mb-4">
            Answer honestly — this helps us suggest the right subject stream and career options.
          </p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-2">
                {MOCK_QUESTIONS.map((q, idx) => (
                  <StepDot key={idx} active={!!answers[q.id]} />
                ))}
              </div>
              <div className="ml-auto text-sm text-gray-600">{progress}%</div>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>

          {/* Question */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="mb-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {q.section}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">{q.text}</CardTitle>
              </CardHeader>
              <CardContent>
                {q.type === "likert" && (
                  <div className="flex gap-3 mt-3">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => setAnswer(q.id, val)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          answers[q.id] === val
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-gray-800 hover:bg-gray-50 border-gray-300"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "choice" && (
                  <div className="flex flex-col gap-3 mt-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswer(q.id, opt)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          answers[q.id] === opt
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-gray-800 hover:bg-gray-50 border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {error && <p className="text-red-600 text-sm font-medium mt-2">{error}</p>}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="secondary"
              onClick={prev}
              disabled={current === 0}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Previous
            </Button>
            {current === MOCK_QUESTIONS.length - 1 ? (
              <Button onClick={submit} className="bg-blue-600 text-white hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-1" /> Submit
              </Button>
            ) : (
              <Button onClick={next} className="bg-blue-600 text-white hover:bg-blue-700">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar: AI Assistant */}
        <aside>
          <div className="sticky top-24 space-y-4">
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
                <div className="flex flex-col h-80 border rounded-lg overflow-hidden">
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
                  Open the assistant for targeted help while you take the quiz.
                </p>
              )}
            </Card>

            <Card className="p-4 rounded-xl shadow-md">
              <h5 className="font-semibold mb-2">Tips</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Be honest — results are most accurate that way.</li>
                <li>• Use the AI assistant if unsure about a question.</li>
                <li>• View results to explore colleges & timelines.</li>
              </ul>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuizPage;
