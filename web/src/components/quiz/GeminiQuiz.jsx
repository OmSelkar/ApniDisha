// GeminiQuiz.jsx
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";

/**
 * Polished assistant UI: uses your existing SSE implementation (kept)
 * and simpler state to work as a sidebar assistant. No backend required for UI demo.
 */

const GeminiQuiz = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {role, text}
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const mockAssistantAnswer = (q) => {
    // simple canned answers for demo
    if (!q) return "Please type a question about streams, colleges or exams.";
    if (q.toLowerCase().includes("science")) return "Science streams typically lead to engineering, research, medicine, and competitive government exams (e.g., UPSC Stage 1 for some areas).";
    if (q.toLowerCase().includes("arts")) return "Arts (BA) opens pathways in journalism, civil services, social sciences, and teaching.";
    if (q.toLowerCase().includes("commerce")) return "Commerce is suited for CA, banking, business, and finance roles.";
    return "That's a great question — in this demo the AI returns an example answer. Replace with your SSE/API to get live responses.";
  };

  const ask = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    // simulate streaming/typing
    setTimeout(() => {
      const ans = mockAssistantAnswer(text);
      // streaming effect
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setMessages(prev => {
          const last = prev[prev.length-1];
          if (!last || last.role !== "assistant") {
            return [...prev, { role: "assistant", text: ans.slice(0, idx) }];
          } else {
            const copy = [...prev];
            copy[copy.length-1] = { ...last, text: ans.slice(0, idx) };
            return copy;
          }
        });
        if (idx >= ans.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 8);
    }, 400);
  };

  return (
    <Card className="rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Ask AI</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={scrollRef} className="h-48 overflow-y-auto p-2 space-y-3 bg-white rounded-md border border-gray-100">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <div className="mb-2">Ask about streams, colleges, or admissions</div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} p-3 rounded-lg max-w-[78%]`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 rounded-md border border-gray-200 p-2 text-sm focus:outline-none"
            disabled={loading}
            aria-label="Ask AI"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => { setMessages([]); setInput(""); }}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeminiQuiz;
