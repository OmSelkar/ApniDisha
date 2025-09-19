// src/components/simulator/SimulatorPage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Mic,
  Volume2,
  X,
  Shuffle,
  RefreshCcw,
  Target,
  Users,
  GraduationCap,
} from "lucide-react";

/*
  SimulatorPage.jsx
  - Full-page What-If Career Simulator (UI-improved)
  - Collapsible Voice Assistant FAB -> expands into responsive panel/modal
  - Responsive layout, correct alignment, padding so dock doesn't hide content
  - Safe SpeechRecognition & TTS guards
  - Export summary implemented
*/

/* ----------------------
   i18n strings + fixtures
   ---------------------- */
const i18nStrings = {
  en: {
    title: "Career What-If Simulator",
    subtitle: "Build scenarios, compare outcomes, and show families the evidence.",
    stream: "Stream",
    course: "Course",
    collegeType: "College Type",
    college: "College",
    skills: "Skills",
    upskill: "Upskill",
    scholarships: "Scholarships",
    suggestForMe: "Suggest",
    autoSuggest: "Auto-suggest",
    shuffle: "Shuffle",
    addScenario: "Add Scenario",
    compare: "Compare",
    save: "Save",
    exportPDF: "Export PDF",
    share: "Share",
    language: "Language",
    consentMic: "Allow microphone to use the voice assistant.",
    consentAccept: "Allow",
    consentDecline: "Decline",
    noBadgesYet: "No badges yet",
    points: "Points",
    badges: "Badges",
    playgroundMode: "Auto-Experiment",
    sensitivityLens: "Sensitivity",
    governmentFirst: "Govt-First",
  },
  hi: {
    title: "करियर क्या-अगर सिम्युलेटर",
    subtitle: "परिदृश्य बनाएं, तुलना करें, और परिवार को समझाएँ।",
    stream: "धारा",
    course: "कोर्स",
    collegeType: "कॉलेज प्रकार",
    college: "कॉलेज",
    skills: "कौशल",
    upskill: "अपस्किल",
    scholarships: "छात्रवृत्ति",
    suggestForMe: "सुझाएँ",
    autoSuggest: "स्वतः सुझाव",
    shuffle: "शफल",
    addScenario: "परिदृश्य जोड़ें",
    compare: "तुलना",
    save: "सहेजें",
    exportPDF: "पीडीएफ निर्यात",
    share: "साझा करें",
    language: "भाषा",
    consentMic: "वॉयस असिस्टेंट के लिए माइक्रोफोन की अनुमति दें।",
    consentAccept: "अनुमोदित",
    consentDecline: "अस्वीकार",
    noBadgesYet: "अभी कोई बैज नहीं",
    points: "अंक",
    badges: "बैज",
    playgroundMode: "स्वतः परीक्षण",
    sensitivityLens: "संवेदनशीलता",
    governmentFirst: "सरकार-प्रथम",
  },
};

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

const COLLEGE_TYPES = [
  { id: "govt", label: { en: "Government", hi: "सरकारी" } },
  { id: "private", label: { en: "Private", hi: "निजी" } },
];

const COLLEGES = {
  govt: [
    { id: "govt1", label: { en: "Govt College A", hi: "सरकारी कॉलेज ए" }, location: "Delhi" },
    { id: "govt2", label: { en: "Govt College B", hi: "सरकारी कॉलेज बी" }, location: "Mumbai" },
  ],
  private: [
    { id: "priv1", label: { en: "Private College X", hi: "निजी कॉलेज एक्स" }, location: "Bengaluru" },
    { id: "priv2", label: { en: "Private College Y", hi: "निजी कॉलेज वाई" }, location: "Chennai" },
  ],
};

const SKILLS = [
  { id: "communication", label: { en: "Communication", hi: "संचार" } },
  { id: "coding", label: { en: "Coding", hi: "कोडिंग" } },
  { id: "management", label: { en: "Management", hi: "प्रबंधन" } },
];

const UPSKILLS = [
  { id: "cert1", label: { en: "Certification 1", hi: "प्रमाणपत्र 1" } },
  { id: "cert2", label: { en: "Certification 2", hi: "प्रमाणपत्र 2" } },
];

const SCHOLARSHIPS = [
  { id: "sch1", label: { en: "Merit Scholarship", hi: "मेरिट छात्रवृत्ति" } },
  { id: "sch2", label: { en: "Need-based Scholarship", hi: "आवश्यकता आधारित छात्रवृत्ति" } },
];

const SAMPLE_SCENARIOS = [
  {
    id: "sc1",
    name: "Engineering — Govt",
    stream: "science",
    course: "btech",
    collegeType: "govt",
    college: "govt1",
    skills: ["coding"],
    upskill: ["cert1"],
    scholarship: "sch1",
    npv: 1200000,
    roi: 1.5,
    employmentProb: 0.85,
    startingSalary: 600000,
    timeToJob: 6,
    scholarshipOdds: 0.7,
  },
  {
    id: "sc2",
    name: "Commerce — Private",
    stream: "commerce",
    course: "bcom",
    collegeType: "private",
    college: "priv1",
    skills: ["management"],
    upskill: ["cert2"],
    scholarship: "sch2",
    npv: 900000,
    roi: 1.2,
    employmentProb: 0.75,
    startingSalary: 450000,
    timeToJob: 8,
    scholarshipOdds: 0.5,
  },
];

function getLabel(item, lang = "en") {
  if (!item) return "";
  return item.label?.[lang] ?? item.label?.en ?? "";
}
function currency(x) {
  return `₹${Number(x).toLocaleString()}`;
}

/* -------------------------
   MAIN: SimulatorPage
   ------------------------- */
export default function SimulatorPage() {
  // language + i18n
  const [lang, setLang] = useState("en");
  const t = i18nStrings[lang];

  // scenario state
  const [scenarios, setScenarios] = useState(SAMPLE_SCENARIOS);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const active = scenarios[activeScenarioIndex] || SAMPLE_SCENARIOS[0];

  // selection state (controlled by active scenario)
  const [stream, setStream] = useState(active.stream);
  const [course, setCourse] = useState(active.course);
  const [collegeType, setCollegeType] = useState(active.collegeType);
  const [college, setCollege] = useState(active.college);
  const [skills, setSkills] = useState(active.skills || []);
  const [upskill, setUpskill] = useState(active.upskill || []);
  const [scholarship, setScholarship] = useState(active.scholarship || "");
  const [sensitivity, setSensitivity] = useState(0);
  const [playgroundMode, setPlaygroundMode] = useState(false);
  const [govtFirst, setGovtFirst] = useState(true);

  // voice assistant state + refs
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [dockExpanded, setDockExpanded] = useState(false); // collapsed FAB vs expanded panel
  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== "undefined" && window.speechSynthesis ? window.speechSynthesis : null);

  // Derived: points & badges
  const totalPoints = useMemo(
    () => scenarios.reduce((acc, s) => acc + Math.round((s.npv || 0) / 100000), 0),
    [scenarios]
  );
  const badges = useMemo(() => {
    const out = [];
    if (totalPoints >= 50) out.push("Career Pro");
    if (totalPoints >= 30) out.push("Explorer");
    if (totalPoints >= 10) out.push("Beginner");
    return out;
  }, [totalPoints]);

  /* -------------------------
     SpeechRecognition setup
     ------------------------- */
  useEffect(() => {
    if (!voiceConsent) {
      // cleanup if any
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onresult = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current = null;
        } catch {}
      }
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) {
      // feature missing: we keep the UI but warn user
      console.warn("SpeechRecognition not available in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "en" ? "en-US" : "hi-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscripts((prev) => [...prev, transcript]);
    };

    recognition.onerror = (err) => {
      console.warn("Speech recognition error:", err);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        recognitionRef.current = null;
      } catch {}
    };
  }, [voiceConsent, lang]);

  // Toggle listening (safe)
  const toggleListening = () => {
    if (!voiceConsent) {
      alert(t.consentMic);
      return;
    }
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Speech recognition is not available in this browser.");
      return;
    }
    if (listening) {
      try { rec.stop(); } catch {}
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch (err) {
        console.warn("Failed to start recognition", err);
        setListening(false);
      }
    }
  };

  /* -------------------------
     playTts: TEXT-TO-SPEECH
     ------------------------- */
  const playTts = (text) => {
    if (!text || typeof text !== "string") return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Your browser doesn't support text-to-speech.");
      return;
    }
    try {
      if (synthRef.current && synthRef.current.speaking) synthRef.current.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "en" ? "en-US" : "hi-IN";
      u.rate = 1;
      u.pitch = 1;
      synthRef.current.speak(u);
    } catch (err) {
      console.warn("TTS failed:", err);
    }
  };

  /* -------------------------
     exportSummary
     ------------------------- */
  const exportSummary = () => {
    const summary = scenarios
      .map((s, i) => {
        return `Scenario ${i + 1}:
  Name: ${s.name || `Scenario ${i + 1}`}
  Stream: ${getLabel(STREAMS.find((st) => st.id === s.stream), lang)}
  Course: ${getLabel((COURSES[s.stream] || []).find((c) => c.id === s.course), lang)}
  College Type: ${getLabel(COLLEGE_TYPES.find((ct) => ct.id === s.collegeType), lang)}
  College: ${getLabel((COLLEGES[s.collegeType] || []).find((cl) => cl.id === s.college), lang)}
  Skills: ${(s.skills || []).map((sk) => getLabel(SKILLS.find((skl) => skl.id === sk), lang)).join(", ")}
  Upskill: ${(s.upskill || []).map((u) => getLabel(UPSKILLS.find((up) => up.id === u), lang)).join(", ")}
  Scholarship: ${getLabel(SCHOLARSHIPS.find((sch) => sch.id === s.scholarship), lang)}
  NPV: ${s.npv ? currency(s.npv) : "-"}
  ROI: ${s.roi ?? "-"}
  Employment Probability: ${s.employmentProb ? `${(s.employmentProb * 100).toFixed(1)}%` : "-"}
  Starting Salary: ${s.startingSalary ? currency(s.startingSalary) : "-"}
  Time to Job: ${s.timeToJob ?? "-"} months
  Scholarship Odds: ${s.scholarshipOdds ? `${(s.scholarshipOdds * 100).toFixed(1)}%` : "-"}
`;
      })
      .join("\n\n---\n\n");

    try {
      const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "career_summary.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.warn("Export failed:", err);
    }
  };

  // toggle helpers
  const toggleSkill = (id) =>
    setSkills((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleUpskill = (id) =>
    setUpskill((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // autoExperiment (perturb)
  const autoExperiment = () => {
    setScenarios((prevScenarios) => {
      if (prevScenarios.length === 0) return prevScenarios;
      const newScenarios = [...prevScenarios];
      const activeScenario = { ...newScenarios[activeScenarioIndex] };
      const newStream = STREAMS[Math.floor(Math.random() * STREAMS.length)].id;
      activeScenario.stream = newStream;
      const coursesForStream = COURSES[newStream] || [];
      activeScenario.course = coursesForStream.length > 0 ? coursesForStream[Math.floor(Math.random() * coursesForStream.length)].id : "";
      const newCollegeType = COLLEGE_TYPES[Math.floor(Math.random() * COLLEGE_TYPES.length)].id;
      activeScenario.collegeType = newCollegeType;
      const collegesForType = COLLEGES[newCollegeType] || [];
      activeScenario.college = collegesForType.length > 0 ? collegesForType[Math.floor(Math.random() * collegesForType.length)].id : "";
      const skillCount = Math.floor(Math.random() * 2) + 1;
      activeScenario.skills = SKILLS.sort(() => 0.5 - Math.random()).slice(0, skillCount).map((s) => s.id);
      const upskillCount = Math.floor(Math.random() * 2);
      activeScenario.upskill = UPSKILLS.sort(() => 0.5 - Math.random()).slice(0, upskillCount).map((u) => u.id);
      activeScenario.scholarship = Math.random() > 0.5 ? SCHOLARSHIPS[Math.floor(Math.random() * SCHOLARSHIPS.length)].id : "";
      const perturb = (v, pct = 0.12) => Math.round(v * (1 + (Math.random() * 2 - 1) * pct));
      activeScenario.npv = perturb(activeScenario.npv || 800000);
      activeScenario.roi = +( (activeScenario.roi || 1.2) * (1 + (Math.random() * 2 - 1) * 0.05) ).toFixed(2);
      activeScenario.employmentProb = Math.min(1, Math.max(0, (activeScenario.employmentProb || 0.6) + (Math.random()*2-1)*0.05));
      activeScenario.startingSalary = perturb(activeScenario.startingSalary || 300000);
      activeScenario.timeToJob = Math.max(1, Math.round((activeScenario.timeToJob || 6) * (1 + (Math.random()*2-1)*0.15)));
      activeScenario.scholarshipOdds = Math.min(1, Math.max(0, (activeScenario.scholarshipOdds || 0.4) + (Math.random()*2-1)*0.05));
      newScenarios[activeScenarioIndex] = activeScenario;
      return newScenarios;
    });
    setPlaygroundMode(true);
    setTimeout(() => setPlaygroundMode(false), 2200);
  };

  // language switch
  const onSwitchLanguage = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  /* -------------------------
     Layout & Render
     - main difference: dockExpanded controls whether the Assistant is collapsed FAB or expanded panel
     - when expanded we use an overlay on small screens (modal) and a right-side panel on large screens
     - the main page already has bottom padding (pb-32) to avoid being hidden by the FAB
     ------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 text-gray-900 font-sans selection:bg-indigo-300 selection:text-white">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">{t.title}</h1>
            <p className="mt-3 text-lg max-w-3xl drop-shadow-sm">{t.subtitle}</p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <button
                onClick={autoExperiment}
                className="inline-flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition rounded-xl px-5 py-3 font-semibold shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                aria-label={t.playgroundMode}
              >
                <RefreshCcw className="w-5 h-5" />
                {t.playgroundMode}
              </button>

              <button
                onClick={onSwitchLanguage}
                className="px-4 py-2 border border-white border-opacity-50 rounded-lg text-sm font-medium hover:bg-white hover:bg-opacity-20 transition focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t.language}
              >
                {lang === "en" ? "हिंदी" : "EN"}
              </button>

              <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={govtFirst}
                  onChange={() => setGovtFirst(!govtFirst)}
                  className="h-5 w-5 rounded border-transparent focus:ring-2 focus:ring-offset-1 focus:ring-white cursor-pointer"
                />
                <span className="text-white font-semibold">{t.governmentFirst}</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-sm opacity-80">Total scenarios</div>
              <div className="text-3xl font-extrabold">{scenarios.length}</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-6 py-3 shadow-lg flex items-center gap-4">
              <Target className="w-8 h-8 text-white" />
              <div>
                <div className="text-xs opacity-80">Engagement</div>
                <div className="font-semibold text-lg">High</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 md:grid-cols-12 gap-8"> 
        {/* note: pb-40 ensures FAB never hides bottom content */}

        {/* LEFT: Controls */}
        <aside className="md:col-span-3 bg-white rounded-3xl p-8 shadow-xl sticky top-24 h-fit border border-indigo-200">
          <h3 className="text-xl font-semibold mb-6 text-indigo-700">{t.stream} & {t.course}</h3>
          <div className="space-y-5">
            <Select label={t.stream} value={stream} options={STREAMS} lang={lang} onChange={setStream} />
            <Select label={t.course} value={course} options={COURSES[stream] || []} lang={lang} onChange={setCourse} disabled={!stream} />
            <Select label={t.collegeType} value={collegeType} options={COLLEGE_TYPES} lang={lang} onChange={setCollegeType} />
            <Select label={t.college} value={college} options={COLLEGES[collegeType] || []} lang={lang} onChange={setCollege} disabled={!collegeType} />
          </div>

          <hr className="my-6 border-indigo-200" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-indigo-700">{t.skills}</h4>
              <button onClick={() => setSkills([])} className="text-sm text-indigo-500 hover:underline">Clear</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((s) => (
                <Chip key={s.id} active={skills.includes(s.id)} onClick={() => toggleSkill(s.id)}>{getLabel(s, lang)}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-indigo-700">{t.upskill}</h4>
              <button onClick={() => setUpskill([])} className="text-sm text-indigo-500 hover:underline">Clear</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {UPSKILLS.map((u) => (
                <Chip key={u.id} active={upskill.includes(u.id)} onClick={() => toggleUpskill(u.id)}>{getLabel(u, lang)}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-3 font-semibold text-indigo-700">{t.scholarships}</label>
            <select value={scholarship} onChange={(e) => setScholarship(e.target.value)} className="w-full rounded-xl p-3 border border-indigo-300 shadow-sm">
              <option value="">{`-- ${t.scholarships} --`}</option>
              {SCHOLARSHIPS.map((s) => <option key={s.id} value={s.id}>{getLabel(s, lang)}</option>)}
            </select>
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={() => {
                const copy = [...scenarios];
                copy.push({ ...copy[activeScenarioIndex], id: `sc${Date.now()}`, name: `Scenario ${copy.length + 1}` });
                setScenarios(copy);
                setActiveScenarioIndex(copy.length - 1);
              }}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl py-3 font-semibold shadow-lg">
              + {t.addScenario}
            </button>
            <button onClick={() => {
                setStream("");
                setCourse("");
                setCollegeType("");
                setCollege("");
                setSkills([]);
                setUpskill([]);
                setScholarship("");
              }} className="px-5 py-3 border border-indigo-300 rounded-2xl text-indigo-700">Reset</button>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={autoExperiment} className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-2xl"> {t.autoSuggest}</button>
            <button onClick={() => { setStream(STREAMS[Math.floor(Math.random()*STREAMS.length)].id); setCourse(""); }} className="px-4 py-3 border border-indigo-300 rounded-2xl">
              <Shuffle className="inline w-5 h-5 mr-2" /> {t.shuffle}
            </button>
          </div>
        </aside>

        {/* CENTER: Visualizer */}
        <main className="md:col-span-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl min-h-[480px] border border-indigo-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-indigo-700">{active?.name || `Scenario ${activeScenarioIndex + 1}`}</h2>
                <p className="text-sm text-indigo-400 mt-1 font-medium tracking-wide">Interactive visualizer • Sankey / Timeline / Map</p>
              </div>

              <div className="flex items-center gap-5">
                <StatPill icon={<GraduationCap className="w-5 h-5 text-indigo-600" />} label="ROI" value={active?.roi?.toFixed(2) ?? "-"} />
                <StatPill icon={<Users className="w-5 h-5 text-indigo-600" />} label="Employ %" value={`${((active?.employmentProb || 0) * 100).toFixed(0)}%`} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 rounded-2xl border-2 border-dashed border-indigo-300 h-72 flex items-center justify-center bg-gradient-to-b from-indigo-50 to-indigo-100 shadow-inner">
                <div className="text-center text-indigo-300 select-none">
                  <div className="text-2xl font-semibold tracking-wide">Sankey / Flow</div>
                  <div className="mt-3 text-base">Visualize course → jobs → salary flows</div>
                </div>
              </div>

              <div className="col-span-1 space-y-5">
                <div className="rounded-2xl p-6 border border-indigo-200 shadow-md bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-indigo-500 font-semibold tracking-wide">Starting Salary</div>
                      <div className="text-3xl font-extrabold text-indigo-700">{currency(active?.startingSalary || 0)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-indigo-500 font-semibold tracking-wide">Time to job</div>
                      <div className="text-xl font-semibold text-indigo-700">{active?.timeToJob} months</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-indigo-400 italic">Includes scholarship & upskill assumptions</div>
                </div>

                <div className="rounded-2xl p-4 border border-indigo-300 bg-indigo-50 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-indigo-700">Scholarship Odds</div>
                    <div className="font-bold text-indigo-700">{Math.round((active?.scholarshipOdds || 0) * 100)}%</div>
                  </div>
                  <div className="mt-3 h-4 bg-indigo-200 rounded-full overflow-hidden shadow-inner">
                    <div style={{ width: `${Math.round((active?.scholarshipOdds || 0) * 100)}%` }} className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => playTts(`${active?.name || "Scenario"}: ROI ${active?.roi ?? "N/A"}`)} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-2xl">Explain (Voice)</button>
                  <button onClick={() => exportSummary()} className="flex-1 border border-indigo-300 rounded-2xl py-3">Export</button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label className="block mb-3 font-semibold text-indigo-700">{t.sensitivityLens}</label>
              <input type="range" min={-1} max={1} step={0.01} value={sensitivity} onChange={(e) => setSensitivity(parseFloat(e.target.value))} className="w-full h-3 rounded-lg bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500" />
            </div>
          </div>
        </main>

        {/* RIGHT: Summary rail */}
        <aside className="md:col-span-3">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl sticky top-24 border border-indigo-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-indigo-700">Summary</h4>
              <div className="text-indigo-600 font-semibold text-lg">{t.points}: {totalPoints}</div>
            </div>

            <div className="mt-6 space-y-5">
              <SummaryCard title="NPV" value={currency(active?.npv || 0)} hint="Net Present Value" />
              <SummaryCard title="ROI" value={(active?.roi || 0).toFixed(2)} hint="Return on Investment" />
              <SummaryCard title="Employment" value={`${((active?.employmentProb || 0) * 100).toFixed(1)}%`} hint="Employment probability" />
              <SummaryCard title="Salary" value={currency(active?.startingSalary || 0)} hint="Average starting salary" />
              <SummaryCard title="Time to Job" value={`${active?.timeToJob} months`} hint="Typical time to employment" />
            </div>

            <div className="mt-8">
              <h5 className="text-base font-semibold mb-3 text-indigo-700">{t.badges}</h5>
              <div className="flex flex-wrap gap-3">
                {badges.length === 0 ? <div className="text-indigo-400 italic select-none">{t.noBadgesYet}</div> : badges.map((b) => <Badge key={b}>{b}</Badge>)}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => alert("Share to parents (mock)")} className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-400 text-white py-3 rounded-3xl">Share</button>
              <button onClick={() => alert("Save scenario (mock)")} className="flex-1 border border-indigo-300 py-3 rounded-3xl text-indigo-700">Save</button>
            </div>
          </div>
        </aside>
      </div>

      {/* COLLAPSIBLE VOICE DOCK: FAB + Expandable Panel */}
      <VoiceDock
        lang={lang}
        setLang={setLang}
        voiceConsent={voiceConsent}
        setVoiceConsent={setVoiceConsent}
        listening={listening}
        toggleListening={toggleListening}
        transcripts={transcripts}
        playTts={playTts}
        expanded={dockExpanded}
        setExpanded={setDockExpanded}
        t={t}
      />
    </div>
  );
}

/* -------------------------------
   PRESENTATIONAL SMALL COMPONENTS
   (Select, Chip, StatPill, SummaryCard, Badge)
   ------------------------------- */
function Select({ label, value, onChange, options = [], disabled = false, lang = "en" }) {
  return (
    <label className="block">
      <div className="text-sm text-indigo-700 mb-2 font-semibold">{label}</div>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full rounded-xl p-3 border border-indigo-300 shadow-sm focus:outline-none">
        <option value="">{`-- ${label} --`}</option>
        {options.map((opt) => <option key={opt.id} value={opt.id}>{getLabel(opt, lang)}</option>)}
      </select>
    </label>
  );
}

function Chip({ children, active = false, onClick }) {
  return (
    <button onClick={onClick} className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${active ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "bg-white border-indigo-300 text-indigo-700"}`} aria-pressed={active}>
      {children}
    </button>
  );
}

function StatPill({ icon, label, value }) {
  return (
    <div className="bg-white/90 border border-indigo-200 rounded-xl px-4 py-3 shadow-md flex items-center gap-4 min-w-[110px]">
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">{icon}</div>
      <div className="text-right">
        <div className="text-xs text-indigo-500 font-semibold">{label}</div>
        <div className="font-bold text-indigo-700 text-lg">{value}</div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, hint }) {
  return (
    <div className="border border-indigo-200 rounded-2xl p-5 bg-white shadow-md hover:shadow-lg transition cursor-default">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-indigo-700">{title}</div>
        <div className="text-xs text-indigo-400 italic">{hint}</div>
      </div>
      <div className="mt-3 text-2xl font-extrabold text-indigo-900">{value}</div>
    </div>
  );
}

function Badge({ children }) {
  return <span className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">{children}</span>;
}

/* -------------------------------
   VOICE DOCK (FAB + Expandable Panel)
   - collapsed: small FAB bottom-right
   - expanded: responsive panel
     * mobile: centered modal
     * desktop: right-side floating panel (keeps main layout visible)
   - overlay to close on small screens
   ------------------------------- */
function VoiceDock({ lang, setLang, voiceConsent, setVoiceConsent, listening, toggleListening, transcripts, playTts, expanded, setExpanded, t }) {
  // Close when Escape pressed while expanded
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setExpanded(false); };
    if (expanded) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, setExpanded]);

  // Responsive width classes
  const panelWidthClass = "w-full max-w-md md:max-w-sm lg:max-w-lg";

  return (
    <>
      {/* Collapsed FAB (always visible) */}
      <div className="fixed right-6 bottom-6 z-50 flex items-end justify-end">
        <button
          aria-expanded={expanded}
          aria-label={expanded ? "Close voice assistant" : "Open voice assistant"}
          onClick={() => setExpanded((v) => !v)}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          title="Voice Assistant"
        >
          <Mic className="w-6 h-6" />
        </button>
      </div>

      {/* Expanded panel: overlay on small screens, side-panel on large screens */}
      {expanded && (
        <>
          {/* translucent backdrop for mobile / to close easily */}
          <div
            onClick={() => setExpanded(false)}
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            className={`fixed z-50 ${/* center on mobile, align right on md+ */ ""} inset-0 flex items-end md:items-center justify-center md:justify-end p-4`}
          >
            <div className={`${panelWidthClass} bg-white rounded-3xl shadow-2xl border border-indigo-200 overflow-hidden z-50 transform transition-all`}>
              {/* header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-full text-white">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-indigo-700">Voice Assistant</div>
                    <div className="text-xs text-neutral-500">Try: "Compare" / "Explain ROI"</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLang(lang === "en" ? "hi" : "en")} className="text-xs px-3 py-1 border rounded-lg text-indigo-700">
                    {lang === "en" ? "हिंदी" : "EN"}
                  </button>
                  <button onClick={() => { setExpanded(false); }} className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100" aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* body */}
              <div className="p-4 space-y-3 max-h-[60vh] md:max-h-[70vh] overflow-auto">
                {!voiceConsent ? (
                  <div className="p-4 bg-indigo-50 rounded-lg text-center">
                    <p className="text-sm text-indigo-700 mb-3">{t.consentMic}</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={() => setVoiceConsent(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg"> {t.consentAccept} </button>
                      <button onClick={() => setVoiceConsent(false)} className="px-4 py-2 border rounded-lg"> {t.consentDecline} </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <MicButton active={listening} onClick={toggleListening} />
                      <div className="flex-1">
                        <div className="text-xs text-neutral-500 mb-2 font-mono">
                          Listening: <span className={listening ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>{listening ? "ON" : "OFF"}</span>
                        </div>
                        <div className="h-36 overflow-auto bg-neutral-50 rounded-lg p-3 text-xs font-mono text-neutral-800">
                          {transcripts.length === 0 ? <div className="text-neutral-400 italic">No transcripts yet</div> : transcripts.map((t, i) => <div key={i} className="mb-1 break-words">{t}</div>)}
                        </div>
                      </div>
                      <button onClick={() => playTts(transcripts.join(" "))} className="p-3 bg-indigo-50 rounded-md">
                        <Volume2 className="w-5 h-5 text-indigo-600" />
                      </button>
                    </div>

                    <div className="mt-2 text-xs text-neutral-600">
                      <div className="font-semibold mb-1">Suggested commands</div>
                      <div className="flex gap-2 flex-wrap">
                        <CommandChip onClick={() => { alert("Compare (mock)"); setExpanded(false); }}>Compare</CommandChip>
                        <CommandChip onClick={() => { alert("Explain ROI (mock)"); setExpanded(false); }}>Explain ROI</CommandChip>
                        <CommandChip onClick={() => { alert("Show scholarships (mock)"); setExpanded(false); }}>Scholarships</CommandChip>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* footer actions */}
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-neutral-500">Voice Assistant</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => { navigator.clipboard?.writeText(transcripts.join("\n")) }} className="text-sm px-3 py-2 border rounded-lg">Copy</button>
                  <button onClick={() => setExpanded(false)} className="text-sm px-3 py-2 rounded-lg bg-indigo-600 text-white">Done</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* MicButton with subtle animation when active */
function MicButton({ active = false, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={`w-14 h-14 rounded-full flex items-center justify-center ${active ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl scale-105" : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"} focus:outline-none`} aria-label="Toggle microphone">
      <Mic className="w-6 h-6" />
    </button>
  );
}

function CommandChip({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-3 py-1 text-xs font-semibold border rounded-full bg-neutral-100 hover:bg-neutral-200">{children}</button>
  );
}
