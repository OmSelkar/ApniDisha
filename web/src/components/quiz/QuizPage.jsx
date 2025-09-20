// QuizPage.jsx
import React, { useEffect, useState, Suspense, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Trophy, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-dom-confetti";

/**
 * QuizPage with validation (Remark 1)
 * - Validates question fixtures on mount
 * - Renders fallback message when data invalid
 * - Prevents navigation/submit when current question unanswered or answer invalid
 */

/* -------------------------
   Mock quiz questions (fixtures)
   ------------------------- */
  const MOCK_QUESTIONS = [
  { id: "q1", section: "Interests", text: "How much do you enjoy solving logical or scientific problems?", type: "likert", icon: "🧠" },
  { id: "q2", section: "Interests", text: "How interested are you in creative/artistic activities?", type: "likert", icon: "🎨" },
  { id: "q3", section: "Aptitude", text: "How comfortable are you with numbers and calculations?", type: "likert", icon: "🔢" },
  { id: "q4", section: "Personality", text: "Do you prefer teamwork or independent work?", type: "choice", options: ["Teamwork", "Independent", "Both"], icon: "👥" },
  { id: "q5", section: "Career Goals", text: "Are you interested in quick skill-based employment (vocational) or long-term degrees?", type: "choice", options: ["Skill-based", "Degree", "Undecided"], icon: "🎯" },
];

/* -------------------------
   Small presentational helpers
   ------------------------- */
const StepDot = ({ active }) => (
  <div
    className={`w-3 h-3 rounded-full ${active ? "bg-blue-600" : "bg-gray-200"}`}
    aria-hidden="true"
  />
);

const ProgressRing = ({ progress }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" aria-hidden="true">
      <svg width="100" height="100" className="transform -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
};

const LikertEmoji = ({ value, selected, onClick }) => {
  const emojis = ["😞", "🙁", "😐", "🙂", "😊"];
  return (
    <motion.button
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(value)}
      aria-pressed={selected}
      aria-label={`Rate ${value}`}
      className={`text-4xl p-3 rounded-full transition-all focus:outline-none focus:ring-2 ${
        selected ? "bg-blue-100 scale-110 shadow-lg" : "hover:bg-gray-100"
      }`}
    >
      {emojis[value - 1]}
    </motion.button>
  );
};

/* -------------------------
   Main QuizPage component
   ------------------------- */
const QuizPage = () => {
  const { id } = useParams(); // stage id, optional
  const navigate = useNavigate();

  // Internal validated questions state
  const [questions, setQuestions] = useState([]);
  const [validationError, setValidationError] = useState("");

  // Quiz progress & answers
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState("");

  // Chat / mentor states (kept from original)
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m your assistant. Ask me about courses, exams, or colleges." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const focusErrorRef = useRef(null);

  // ensure scroll to latest chat message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------------
     Validate fixture data (Remark 1)
     - ensure non-empty array
     - each question must have required fields:
       id (string), text (string), type (likert|choice), icon optional
     - for 'choice' type: options must be non-empty array
  ------------------------- */
  useEffect(() => {
    const errors = [];
    if (!Array.isArray(MOCK_QUESTIONS) || MOCK_QUESTIONS.length === 0) {
      setValidationError("Quiz data is unavailable. Please try again later.");
      setQuestions([]);
      return;
    }

    const validated = [];
    MOCK_QUESTIONS.forEach((q, idx) => {
      const ctx = `question[index=${idx}]`;
      if (!q || typeof q !== "object") {
        errors.push(`${ctx}: invalid object`);
        return;
      }
      if (!q.id || typeof q.id !== "string") errors.push(`${ctx}: missing or invalid id`);
      if (!q.text || typeof q.text !== "string") errors.push(`${ctx}: missing or invalid text`);
      if (!q.type || (q.type !== "likert" && q.type !== "choice")) errors.push(`${ctx}: missing or invalid type`);
      if (q.type === "choice") {
        if (!Array.isArray(q.options) || q.options.length === 0) errors.push(`${ctx}: 'choice' type requires non-empty options`);
      }
      // if all required checks ok, push to validated
      if (errors.length === 0 || errors[errors.length - 1]?.startsWith(ctx) === false) {
        // this line ensures we don't push duplicates; simpler approach: push if no error for this idx
      }
    });

    // To get per-question error detection and still return valid questions, do second pass:
    const perQuestionErrors = [];
    const validQuestions = MOCK_QUESTIONS.filter((q, idx) => {
      const localErrs = [];
      if (!q || typeof q !== "object") {
        localErrs.push("invalid object");
      } else {
        if (!q.id || typeof q.id !== "string") localErrs.push("missing/invalid id");
        if (!q.text || typeof q.text !== "string") localErrs.push("missing/invalid text");
        if (!q.type || (q.type !== "likert" && q.type !== "choice")) localErrs.push("missing/invalid type");
        if (q.type === "choice" && (!Array.isArray(q.options) || q.options.length === 0)) localErrs.push("choice type requires options");
      }
      if (localErrs.length) {
        perQuestionErrors.push({ index: idx, id: q?.id || `#${idx}`, errors: localErrs });
        return false;
      }
      return true;
    });

    if (perQuestionErrors.length) {
      // build readable message but keep valid questions available to user
      const summary = perQuestionErrors
        .map((p) => `Question ${p.id} invalid: ${p.errors.join(", ")}`)
        .slice(0, 5)
        .join(" | ");
      setValidationError(`Some questions have invalid data: ${summary}. The quiz will run with validated questions only.`);
      if (validQuestions.length === 0) {
        setValidationError("All quiz questions are invalid. Please contact the administrator.");
      }
    } else {
      setValidationError("");
    }

    setQuestions(validQuestions);
    // reset state when question set changes
    setCurrent(0);
    setAnswers({});
    setPoints(0);
    setShowConfetti(false);
  }, []);

  /* -------------------------
     Chat helpers (unchanged)
  ------------------------- */
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
    }, 900);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* -------------------------
     Helpers and safe guards
  ------------------------- */
  const safeLength = questions.length || 0;
  const answeredCount = Object.keys(answers).length;
  const progress = safeLength === 0 ? 0 : Math.round((answeredCount / safeLength) * 100);
  const q = questions[current];

  // validate incoming answer depending on question type
  const validateAnswerValue = (question, value) => {
    if (!question) return false;
    if (question.type === "likert") {
      const v = Number(value);
      return Number.isInteger(v) && v >= 1 && v <= 5;
    }
    if (question.type === "choice") {
      return question.options && question.options.includes(value);
    }
    return false;
  };

  const setAnswer = (qid, value) => {
    const question = questions.find((qq) => qq.id === qid);
    if (!validateAnswerValue(question, value)) {
      setError("Selected value is invalid for this question.");
      // focus error region
      setTimeout(() => focusErrorRef.current?.focus?.(), 0);
      return;
    }
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    // award points only if this is first time answering this qid
    setPoints((prev) => (prev + (prevAnswersHas(qid) ? 0 : 10)));
    setError("");
  };

  const prevAnswersHas = (qid) => Object.prototype.hasOwnProperty.call(answers, qid);

  // navigation with validation
  const next = () => {
    if (!q) {
      setError("Question not found. Can't proceed.");
      return;
    }
    if (!answers[q.id]) {
      setError("⚠ Please select an option before continuing.");
      focusErrorRef.current?.focus?.();
      return;
    }
    setError("");
    if (current < safeLength - 1) setCurrent((c) => c + 1);
  };

  const prev = () => {
    setError("");
    if (current > 0) setCurrent((c) => c - 1);
  };

  const submit = () => {
    if (!q) {
      setError("Question not found. Can't submit.");
      return;
    }
    if (!answers[q.id]) {
      setError("⚠ Please select an option before submitting.");
      focusErrorRef.current?.focus?.();
      return;
    }
    setError("");
    setShowConfetti(true);
    setTimeout(() => {
      try {
        // In a real app you'd POST answers to backend and receive attempt id
        navigate("/quiz/results/demo-attempt");
      } catch (err) {
        setValidationError("Failed to navigate to results. Please try again.");
      }
    }, 1200);
  };

  /* -------------------------
     Render fallback when validation fails completely
  ------------------------- */
  if (validationError && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center py-24">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Quiz unavailable</h2>
          <p className="text-gray-700 mb-6">{validationError}</p>
          <Button onClick={() => navigate("/quiz")} className="px-6 py-3">
            Go back to quizzes
          </Button>
        </div>
      </div>
    );
  }

  /* -------------------------
     Normal render
  ------------------------- */
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
              <span>Estimated time: {Math.max(1, Math.round((safeLength * 1.5) || 8))}–{Math.max(2, Math.round((safeLength * 2) || 12))} mins</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Guidance Assessment</h1>
          <p className="text-gray-600 mb-4">
            Answer honestly — this helps us suggest the right subject stream and career options.
          </p>

          {/* Progress and Points */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ProgressRing progress={progress} />
              <div className="flex items-center gap-1">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-gray-800">{points} pts</span>
              </div>
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              {questions.map((qq, idx) => (
                <motion.div
                  key={qq.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <StepDot active={!!answers[qq.id]} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* If no questions after partial validation */}
          {!q ? (
            <Card className="mb-6 rounded-xl shadow-md p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No valid questions</h3>
              <p className="text-gray-600">This quiz currently does not contain valid questions. Try another assessment.</p>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="mb-6 rounded-xl shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl" aria-hidden="true">{q.icon}</span>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        {q.section}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{q.text}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {q.type === "likert" && (
                      <div className="flex gap-4 mt-6 justify-center" role="radiogroup" aria-label="Likert scale">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <LikertEmoji
                            key={val}
                            value={val}
                            selected={answers[q.id] === val}
                            onClick={(v) => setAnswer(q.id, v)}
                          />
                        ))}
                      </div>
                    )}

                    {q.type === "choice" && Array.isArray(q.options) && (
                      <div className="flex flex-col gap-4 mt-6" role="list">
                        {q.options.map((opt) => (
                          <motion.button
                            key={opt}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setAnswer(q.id, opt)}
                            className={`text-left px-6 py-4 rounded-xl border-2 transition-all font-medium focus:outline-none focus:ring-2 ${
                              answers[q.id] === opt
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
                                : "bg-white text-gray-800 hover:bg-gray-50 border-gray-300 hover:border-blue-300"
                            }`}
                            role="listitem"
                            aria-pressed={answers[q.id] === opt}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}

          {/* inline error message */}
          {(error || validationError) && (
            <div
              ref={focusErrorRef}
              tabIndex={-1}
              aria-live="assertive"
              className="text-red-600 text-sm font-medium mt-2"
            >
              {error || validationError}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                onClick={prev}
                disabled={current === 0}
                className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 hover:from-gray-300 hover:to-gray-400 rounded-2xl px-8 py-3 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-disabled={current === 0}
              >
                Previous
              </Button>
            </motion.div>

            {/* Next or Submit - disabled if current question unanswered */}
            {current === safeLength - 1 ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={submit}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-2xl px-8 py-3 font-bold shadow-lg flex items-center disabled:opacity-60"
                    disabled={!q || !answers[q.id]}
                    aria-disabled={!q || !answers[q.id]}
                  >
                    <CheckCircle className="h-5 w-5 mr-2" /> Submit Quiz
                  </Button>
                </motion.div>

                <div className="ml-4">
                  <Confetti
                    active={showConfetti}
                    config={{
                      angle: 90,
                      spread: 90,
                      startVelocity: 40,
                      elementCount: 100,
                      dragFriction: 0.1,
                      duration: 3000,
                      stagger: 3,
                      width: "8px",
                      height: "8px",
                      colors: ["#aabbff", "#99ddff", "#7799ee"],
                    }}
                  />
                </div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={next}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-2xl px-8 py-3 font-bold shadow-lg disabled:opacity-60"
                  disabled={!q || !answers[q.id]}
                  aria-disabled={!q || !answers[q.id]}
                >
                  Next <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sticky AI Mentor */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            {/* AI Mentor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                    🤖
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">AI Mentor</h4>
                    <p className="text-sm text-gray-600">Your guide to success</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 p-3 rounded-xl border border-indigo-100"
                  >
                    <p className="text-sm text-gray-700">
                      💡 <strong>Tip:</strong> Take your time to think about each question carefully.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 p-3 rounded-xl border border-indigo-100"
                  >
                    <p className="text-sm text-gray-700">
                      🎯 <strong>Goal:</strong> Help you find the perfect career path!
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 p-3 rounded-xl border border-indigo-100"
                  >
                    <p className="text-sm text-gray-700">
                      📚 <strong>Remember:</strong> Your answers shape your future recommendations.
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4"
                >
                  <Button
                    onClick={() => setChatOpen(true)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl"
                  >
                    💬 Ask Me Anything
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="p-4 rounded-xl shadow-md bg-gradient-to-br from-green-50 to-blue-50">
                <h5 className="font-bold mb-3 text-gray-800">📊 Your Progress</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions Answered</span>
                    <span className="font-semibold">{answeredCount}/{safeLength}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points Earned</span>
                    <span className="font-semibold text-yellow-600">{points} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-semibold text-green-600">{progress}%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </aside>

        {/* Chat Modal */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setChatOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="AI Mentor chat"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      🤖
                    </div>
                    <div>
                      <h3 className="font-bold">AI Mentor</h3>
                      <p className="text-sm opacity-90">Online now</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatOpen(false)}
                    className="text-white hover:bg-white/20"
                    aria-label="Close chat"
                  >
                    ✕
                  </Button>
                </div>

                <div className="flex flex-col h-96">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                            msg.from === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl">
                          🤔 Thinking...
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="border-t p-4 bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Chat input"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={handleSend}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl px-6"
                        >
                          Send
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
