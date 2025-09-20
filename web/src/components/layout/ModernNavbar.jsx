// src/components/ModernNavbar.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import NotificationCenter from "../notifications/NotificationCenter";
import logo from "./image.jpeg";
import {
  Menu,
  X,
  Bell,
  User,
  BookOpen,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  LogOut,
  Target,
  Mic,
  Volume2,
  Shuffle,
  RefreshCcw,
} from "lucide-react";
import { useTranslation, initReactI18next } from "react-i18next";
import i18nLib from "i18next";

/* ---------------------------------
   i18n initialization (in-file)
   --------------------------------- */
const EN = {
  scenarioBuilderTitle: "Disha Lab",
  stream: "Stream",
  course: "Course",
  career: "Career",
  addScenario: "Add Scenario",
  reset: "Reset",
  savedScenarios: "Saved Scenarios",
  noScenarios: "No scenarios yet. Add one.",
  exportSummary: "Export",
  voiceOn: "Stop",
  voiceOff: "Listen",
  totalPoints: "Total Points",
  scenarioBuilder: "Disha Lab",
  quiz: "Quiz",
  recommendations: "Recommendations",
  colleges: "Colleges",
  timeline: "Timeline",
  content: "Content Hub",
  remove: "Remove",
  listen: "Listen",
  stop: "Stop",
};

const HI = {
  scenarioBuilderTitle: "दिशा लैब",
  stream: "स्ट्रीम",
  course: "कोर्स",
  career: "करियर",
  addScenario: "परिदृश्य जोड़ें",
  reset: "रीसेट",
  savedScenarios: "सहेजे गए परिदृश्य",
  noScenarios: "कोई परिदृश्य नहीं। पहले एक जोड़ें।",
  exportSummary: "निर्यात",
  voiceOn: "रोकें",
  voiceOff: "सुनें",
  totalPoints: "कुल अंक",
  scenarioBuilder: "दिशा लैब",
  quiz: "क्विज़",
  recommendations: "सिफारिशें",
  colleges: "कॉलेज",
  timeline: "टाइमलाइन",
  content: "कंटेंट हब",
  remove: "हटाएँ",
  listen: "सुनें",
  stop: "रोकें",
};

const resources = {
  en: { translation: EN },
  hi: { translation: HI },
};

try {
  const persistedLang = typeof window !== "undefined" ? localStorage.getItem("apni_disha_lang") : null;
  const browserPrefer = typeof navigator !== "undefined" ? navigator.language : "en";
  const defaultLang = persistedLang || (browserPrefer && browserPrefer.startsWith("hi") ? "hi" : "hi"); // default to Hindi

  if (!i18nLib.isInitialized) {
    i18nLib.use(initReactI18next).init({
      resources,
      lng: defaultLang,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
  }
} catch (err) {
  // silent fallback - app will use string fallbacks embedded in code
  // console.warn("i18n init failed", err);
}

/* ---------------------------
   Static domain data (single copy)
   --------------------------- */
const STREAMS = [
  { id: "arts", label: { en: "Arts", hi: "आर्ट्स" } },
  { id: "science", label: { en: "Science", hi: "साइंस" } },
  { id: "commerce", label: { en: "Commerce", hi: "कॉमर्स" } },
  { id: "vocational", label: { en: "Vocational", hi: "वोकेशनल" } },
];

const COURSES = {
  arts: [
    { id: "ba", label: { en: "B.A.", hi: "बी.ए." } },
    { id: "bfa", label: { en: "B.F.A.", hi: "बी.एफ.ए." } },
  ],
  science: [
    { id: "bsc", label: { en: "B.Sc.", hi: "बी.एससी." } },
    { id: "btech", label: { en: "B.Tech", hi: "बी.टेक" } },
  ],
  commerce: [
    { id: "bcom", label: { en: "B.Com.", hi: "बी.कॉम." } },
    { id: "bba", label: { en: "B.B.A.", hi: "बी.बी.ए." } },
  ],
  vocational: [
    { id: "diploma", label: { en: "Diploma", hi: "डिप्लोमा" } },
    { id: "certificate", label: { en: "Certificate Course", hi: "सर्टिफिकेट कोर्स" } },
  ],
};

const CAREERS = {
  ba: [
    { id: "teacher", label: { en: "Teacher", hi: "शिक्षक" }, points: 10 },
    { id: "journalist", label: { en: "Journalist", hi: "पत्रकार" }, points: 12 },
  ],
  bfa: [
    { id: "artist", label: { en: "Artist", hi: "कलाकार" }, points: 15 },
    { id: "designer", label: { en: "Designer", hi: "डिज़ाइनर" }, points: 14 },
  ],
  bsc: [
    { id: "scientist", label: { en: "Scientist", hi: "वैज्ञानिक" }, points: 20 },
    { id: "researcher", label: { en: "Researcher", hi: "अनुसंधानकर्ता" }, points: 18 },
  ],
  btech: [
    { id: "engineer", label: { en: "Engineer", hi: "इंजीनियर" }, points: 22 },
    { id: "developer", label: { en: "Developer", hi: "डेवलपर" }, points: 25 },
  ],
  bcom: [
    { id: "accountant", label: { en: "Accountant", hi: "लेखाकार" }, points: 16 },
    { id: "banker", label: { en: "Banker", hi: "बैंकर" }, points: 17 },
  ],
  bba: [
    { id: "manager", label: { en: "Manager", hi: "प्रबंधक" }, points: 19 },
    { id: "entrepreneur", label: { en: "Entrepreneur", hi: "उद्यमी" }, points: 21 },
  ],
  diploma: [
    { id: "technician", label: { en: "Technician", hi: "तकनीशियन" }, points: 13 },
    { id: "assistant", label: { en: "Assistant", hi: "सहायक" }, points: 11 },
  ],
  certificate: [
    { id: "skilledworker", label: { en: "Skilled Worker", hi: "कुशल कार्यकर्ता" }, points: 10 },
    { id: "operator", label: { en: "Operator", hi: "ऑपरेटर" }, points: 12 },
  ],
};

/* ---------------------------
   Small helper utils
   --------------------------- */
const getLabel = (obj, lang = "en") => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.en ?? Object.values(obj)[0];
};

/* ---------------------------
   Reusable small components
   --------------------------- */
function SelectField({ id, label, value, onChange, options = [], disabled = false, inputRef }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>
      <select
        id={id}
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-60 ${
          disabled ? "bg-gray-50" : "bg-white"
        }`}
        aria-disabled={disabled}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------------------------
   CareerScenarioBuilder (refined)
   --------------------------- */
function CareerScenarioBuilder({ onClose }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "hi";

  // persisted scenarios
  const [scenarios, setScenarios] = useState(() => {
    try {
      const raw = localStorage.getItem("apni_disha_scenarios");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [stream, setStream] = useState("");
  const [course, setCourse] = useState("");
  const [career, setCareer] = useState("");
  const [voiceOn, setVoiceOn] = useState(false);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const lastUrlRef = useRef(null);
  const streamRef = useRef(null);

  // clear dependent selects
  useEffect(() => {
    setCourse("");
    setCareer("");
  }, [stream]);

  useEffect(() => {
    setCareer("");
  }, [course]);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("apni_disha_scenarios", JSON.stringify(scenarios));
    } catch {}
  }, [scenarios]);

  // cleanup object URLs & speech on unmount
  useEffect(() => {
    return () => {
      if (lastUrlRef.current) {
        URL.revokeObjectURL(lastUrlRef.current);
        lastUrlRef.current = null;
      }
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const addScenario = useCallback(() => {
    if (!stream || !course || !career) return;
    const careerData = (CAREERS[course] || []).find((c) => c.id === career) || { points: 0 };
    const newScenario = {
      id: Date.now().toString(),
      stream,
      course,
      career,
      points: careerData.points,
      createdAt: new Date().toISOString(),
    };
    setScenarios((s) => [...s, newScenario]);
    // reset and focus stream for faster entry
    setStream("");
    setCourse("");
    setCareer("");
    if (streamRef.current) streamRef.current.focus();
  }, [stream, course, career]);

  // allow Enter key to add if all chosen
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addScenario();
    }
  };

  const exportSummary = useCallback(() => {
    if (scenarios.length === 0) return;
    const summary = scenarios
      .map(({ stream, course, career, points }) => {
        const streamLabel = getLabel(STREAMS.find((s) => s.id === stream)?.label, lang);
        const courseLabel = getLabel(COURSES[stream]?.find((c) => c.id === course)?.label, lang);
        const careerLabel = getLabel(CAREERS[course]?.find((c) => c.id === career)?.label, lang);
        return `${streamLabel} > ${courseLabel} > ${careerLabel} (Points: ${points})`;
      })
      .join("\n\n");

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    lastUrlRef.current = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "career_summary.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [scenarios, lang]);

  const speakSummary = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    if (voiceOn) {
      synthRef.current.cancel();
      setVoiceOn(false);
      return;
    }
    if (scenarios.length === 0) return;

    const text = scenarios
      .map(({ stream, course, career, points }) => {
        const streamLabel = getLabel(STREAMS.find((s) => s.id === stream)?.label, lang);
        const courseLabel = getLabel(COURSES[stream]?.find((c) => c.id === course)?.label, lang);
        const careerLabel = getLabel(CAREERS[course]?.find((c) => c.id === career)?.label, lang);
        return `${streamLabel}, ${courseLabel}, leading to ${careerLabel} (${points} points).`;
      })
      .join(" ");

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === "hi" ? "hi-IN" : "en-US";
    utter.onend = () => setVoiceOn(false);
    utter.onerror = () => setVoiceOn(false);

    try {
      synthRef.current.speak(utter);
      setVoiceOn(true);
    } catch (err) {
      // fallback: mark as not speaking
      setVoiceOn(false);
    }
  }, [scenarios, lang, voiceOn]);

  // toggle wrapper used in UI where toggleListening was referenced
  const toggleListening = useCallback(() => {
    speakSummary();
  }, [speakSummary]);

  // gamification
  const totalPoints = useMemo(() => scenarios.reduce((acc, s) => acc + (s.points || 0), 0), [scenarios]);
  const badges = useMemo(() => {
    const list = [];
    if (totalPoints >= 50) list.push("Career Pro");
    if (totalPoints >= 30) list.push("Explorer");
    if (totalPoints >= 10) list.push("Beginner");
    return list;
  }, [totalPoints]);

  const removeScenario = (id) => {
    setScenarios((s) => s.filter((sc) => sc.id !== id));
  };

  // derived options for selects with i18n labels
  const streamOptions = STREAMS.map((s) => ({ id: s.id, label: getLabel(s.label, lang) }));
  const courseOptions = (COURSES[stream] || []).map((c) => ({ id: c.id, label: getLabel(c.label, lang) }));
  const careerOptions = (CAREERS[course] || []).map((c) => ({ id: c.id, label: getLabel(c.label, lang), points: c.points }));

  return (
    <div
      className="p-5 bg-white border rounded-xl shadow-xl max-w-3xl mx-auto my-6"
      role="region"
      aria-label="Disha Lab"
      onKeyDown={onKeyDown}
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t("scenarioBuilderTitle") ?? "Disha Lab"}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left: form */}
        <div className="md:col-span-1 space-y-3">
          <div>
            <SelectField
              id="stream-select"
              label={t("stream") ?? "Stream"}
              value={stream}
              onChange={(v) => setStream(v)}
              options={streamOptions}
              inputRef={streamRef}
            />
          </div>

          <div>
            <SelectField
              id="course-select"
              label={t("course") ?? "Course"}
              value={course}
              onChange={(v) => setCourse(v)}
              options={courseOptions}
              disabled={!stream}
            />
          </div>

          <div>
            <SelectField
              id="career-select"
              label={t("career") ?? "Career"}
              value={career}
              onChange={(v) => setCareer(v)}
              options={careerOptions}
              disabled={!course}
            />
          </div>

          <div className="flex space-x-2 mt-2">
            <Button
              onClick={addScenario}
              disabled={!stream || !course || !career}
              className="flex-1"
            >
              {t("addScenario") ?? "Add Scenario"}
            </Button>

            <Button
              onClick={() => {
                setStream("");
                setCourse("");
                setCareer("");
              }}
              variant="outline"
              className="flex-1"
            >
              {t("reset") ?? "Reset"}
            </Button>
          </div>
        </div>

        {/* center: preview / list */}
        <div className="md:col-span-2 space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">{t("savedScenarios") ?? "Saved Scenarios"}</h3>
              <div className="text-xs text-gray-500">{scenarios.length} saved</div>
            </div>

            <div className="space-y-2 max-h-48 overflow-auto">
              {scenarios.length === 0 ? (
                <div className="text-sm text-gray-500 py-6 text-center">{t("noScenarios") ?? "No scenarios yet. Add one."}</div>
              ) : (
                scenarios.map((s, idx) => {
                  const streamLabel = getLabel(STREAMS.find((st) => st.id === s.stream)?.label, lang);
                  const courseLabel = getLabel(COURSES[s.stream]?.find((c) => c.id === s.course)?.label, lang);
                  const careerLabel = getLabel(CAREERS[s.course]?.find((c) => c.id === s.career)?.label, lang);
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-white/50 border"
                    >
                      <div className="text-sm">
                        <div className="font-medium">{streamLabel} › {courseLabel}</div>
                        <div className="text-xs text-gray-600">{careerLabel}</div>
                        <div className="text-xs text-gray-400">#{idx + 1}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-semibold text-teal-600">{s.points} pts</div>
                        <Button size="sm" variant="ghost" onClick={() => removeScenario(s.id)} aria-label={t("remove") ?? "Remove"}>
                          {t("remove") ?? "Remove"}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* gamification + actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">{t("totalPoints") ?? "Total Points"}: <span className="font-semibold text-gray-900">{totalPoints}</span></div>
              <div className="mt-2 flex space-x-2">
                {badges.length === 0 ? <div className="text-xs text-gray-400 italic">No badges yet</div> : badges.map((b) => <Badge key={b} variant="secondary" className="uppercase">{b}</Badge>)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button onClick={exportSummary} disabled={scenarios.length === 0}>{t("exportSummary") ?? "Export"}</Button>

              {/* Mic button: uses the toggleListening wrapper */}
              <Button
                onClick={toggleListening}
                disabled={scenarios.length === 0}
                variant={voiceOn ? "default" : "outline"}
                aria-pressed={voiceOn}
                className="flex items-center space-x-2"
                title={voiceOn ? (t("stop") ?? "Stop") : (t("listen") ?? "Listen")}
              >
                <Mic className="w-4 h-4" />
                <span className="sr-only">{voiceOn ? (t("stop") ?? "Stop") : (t("listen") ?? "Listen")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Main Navbar component (refined)
   --------------------------- */
const ModernNavbar = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // placeholder to fetch unread notifications
    setUnreadCount(0);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: t("quiz") ?? "Quiz", href: "/quiz", icon: BookOpen },
      { name: t("recommendations") ?? "Recommendations", href: "/recommendations", icon: GraduationCap },
      { name: t("colleges") ?? "Colleges", href: "/colleges", icon: Users },
      { name: t("timeline") ?? "Timeline", href: "/timeline", icon: Calendar },
      { name: t("content") ?? "Content Hub", href: "/content", icon: FileText },
    ],
    [t]
  );

  const isActive = (path) => location.pathname === path;

  // language helper
  const currentLang = i18n?.language || "hi";
  const setLanguage = (lng) => {
    try {
      i18n.changeLanguage(lng);
      if (typeof window !== "undefined") localStorage.setItem("apni_disha_lang", lng);
    } catch {}
  };

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + language (left) */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="ApniDisha logo" className="h-9 w-auto" />
                <span className="text-xl font-bold text-gray-900">ApniDisha</span>
              </Link>

              {/* language toggle - visible on small+ screens */}
              <div className="hidden sm:flex items-center ml-3 space-x-1">
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "hi" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  aria-pressed={currentLang === "hi"}
                  title="हिंदी में देखें"
                >
                  हि
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "en" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  aria-pressed={currentLang === "en"}
                  title="View in English"
                >
                  EN
                </button>
              </div>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive(link.href) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Link to full simulator page (prefer navigation over modal) */}
              <Link
                to="/simulator"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-teal-50 hover:bg-teal-100 transition"
                aria-label={t("scenarioBuilder") ?? "Disha Lab"}
              >
                <Target className="h-4 w-4 mr-2 text-teal-600" />
                <span>{t("scenarioBuilder") ?? "Disha Lab"}</span>
              </Link>
            </div>

            {/* right controls */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setIsNotificationOpen((s) => !s)} aria-expanded={isNotificationOpen}>
                  <Bell className="h-5 w-5 text-gray-600" />
                </Button>
                {unreadCount > 0 && <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">{unreadCount > 99 ? "99+" : unreadCount}</Badge>}
              </div>

              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setIsProfileMenuOpen((v) => !v)} aria-expanded={isProfileMenuOpen}>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                </Button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                      <Link to="/bookmarks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bookmarks</Link>
                    </div>
                    <div className="py-1">
                      <Link to="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* mobile menu */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen((s) => !s)} aria-expanded={isMobileMenuOpen}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-3 border-t">
              <div className="space-y-2 px-2">
                {/* language selector on mobile */}
                <div className="flex items-center space-x-2 px-2">
                  <button
                    onClick={() => { setLanguage("hi"); setIsMobileMenuOpen(false); }}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "hi" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    aria-pressed={currentLang === "hi"}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "en" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    aria-pressed={currentLang === "en"}
                  >
                    English
                  </button>
                </div>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center px-4 py-2 rounded-md ${isActive(link.href) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}

                <Link
                  to="/simulator"
                  className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Target className="h-5 w-5 mr-3" />
                  <span>{t("scenarioBuilder") ?? "Disha Lab"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <NotificationCenter isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      </nav>

      {/* Disha Lab panel (accessible region) - kept as optional slide-over for quick access */}
      {isScenarioOpen && (
        <div
          id="scenario-builder-panel"
          className="fixed inset-x-0 top-16 bg-gray-50 border-t border-gray-200 shadow-lg z-40 overflow-auto max-h-[calc(100vh-4rem)] p-4"
          aria-live="polite"
        >
          <CareerScenarioBuilder onClose={() => setIsScenarioOpen(false)} />
        </div>
      )}
    </>
  );
};

export default ModernNavbar;
