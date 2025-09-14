// src/components/profile/ModernProfilePage.jsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Globe,
  Medal,
  Dumbbell,
  Pencil,
  BookOpen,
  TrendingUp,
  Bookmark,
  Flame,
  Puzzle,
  Award,
  MessageSquare,
  Trophy,
  Sparkles,
  User,
  X,
  Camera,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const initialUser = {
  name: "Pranay Gumashta",
  email: "pranay@gmail.com",
  location: "Nagpur, India",
  avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  summary:
    "DSA enthusiast with a love for puzzles and problem solving. Building a portfolio of CS projects and Olympiad attempts.",
  tags: ["DSA", "Hackathons", "Web Development", "Open Source"],
  metrics: [
    {
      label: "Quizzes",
      value: 22,
      icon: BookOpen,
      color: "from-sky-400 to-blue-500",
    },
    {
      label: "Avg Score",
      value: "86%",
      icon: TrendingUp,
      color: "from-emerald-400 to-green-500",
    },
    {
      label: "Bookmarks",
      value: 15,
      icon: Bookmark,
      color: "from-fuchsia-400 to-purple-500",
    },
    {
      label: "Streak",
      value: "11d",
      icon: Flame,
      color: "from-amber-400 to-orange-500",
    },
  ],
  beyondAcademics: {
    hobbies: ["Photography", "Chess", "Reading Books", "Traveling"],
    extracurriculars: ["Debate Club", "Student Council"],
    certifications: ["AWS Certified", "Google Cloud Fundamentals"],
    sports: ["Football", "Badminton", "Table Tennis", "Swimming"],
  },
};

const feed = [
  {
    id: 1,
    icon: Puzzle,
    title: "Solved 10 new DSA problems",
    time: "2h ago",
    note: "Focus: stacks, queues, sliding window",
  },
  {
    id: 2,
    icon: Award,
    title: "Ranked top 5% in Logic Quiz",
    time: "1d ago",
    note: "Score 92% • 30 questions",
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Posted a guide on Git basics",
    time: "3d ago",
    note: "Got 24 upvotes from peers",
  },
];

export default function ModernProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [showAll, setShowAll] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const [showMore, setShowMore] = useState({
    hobbies: false,
    extracurriculars: false,
    certifications: false,
    sports: false,
  });

  const toggleShow = (section) => {
    setShowMore((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSave = () => {
    // Clean up tags
    const cleanTags =
      typeof form.tags === "string"
        ? form.tags.split(",").map((t) => t.trim())
        : form.tags;

    // Clean up beyondAcademics
    const cleanBeyond = {};
    for (let key in form.beyondAcademics) {
      const val = form.beyondAcademics[key];
      cleanBeyond[key] =
        typeof val === "string"
          ? val
              .split("\n")
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
          : val;
    }

    setUser({
      ...form,
      tags: cleanTags,
      beyondAcademics: cleanBeyond,
    });
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-[#DEF6CA] via-[#F8BDC4] to-[#F65BE3] text-gray-800 shadow-md rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white shadow-xl bg-white grid place-items-center overflow-hidden ring-2 ring-pink-300">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-pink-600" />
                )}
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
              <p className="text-sm text-gray-700 mt-1">
                {user.email} • {user.location}
              </p>
              <p className="mt-2 text-gray-700 max-w-md leading-relaxed">
                {user.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {user.tags.map((t, i) => (
                  <Badge
                    key={i}
                    className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white rounded-full text-xs px-3 py-1"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={() => setEditing(true)}
            className="bg-white text-pink-600 hover:bg-pink-50 shadow rounded-xl px-5 py-2"
          >
            Edit Profile
          </Button>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {user.metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <Card
                key={i}
                className="border-0 shadow-md rounded-2xl hover:shadow-xl transition"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{m.value}</div>
                    <p className="text-sm text-gray-500">{m.label}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl text-white bg-gradient-to-r ${m.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ACTIVITY + ACHIEVEMENTS */}
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-0 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(showAll ? feed : feed.slice(0, 2)).map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.id}
                    className="flex items-start gap-3 p-4 rounded-xl border hover:bg-gray-50 transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-pink-50 grid place-items-center shrink-0">
                      <Icon className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{f.title}</div>
                      <div className="text-sm text-gray-600">{f.note}</div>
                    </div>
                    <span className="text-xs text-gray-500">{f.time}</span>
                  </div>
                );
              })}

              {feed.length > 2 && (
                <Button
                  variant="outline"
                  onClick={() => setShowAll((s) => !s)}
                  className="w-full rounded-xl"
                >
                  {showAll ? "Show Less" : "Show More"}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Trophy,
                  title: "Quiz Master",
                  desc: "5 scores above 90%",
                  points: 100,
                },
                {
                  icon: Sparkles,
                  title: "Consistency",
                  desc: "10-day learning streak",
                  points: 60,
                },
                {
                  icon: Award,
                  title: "Community Helper",
                  desc: "Helped 10 peers on forum",
                  points: 40,
                },
              ].map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl border hover:bg-gray-50 transition"
                  >
                    <div className="h-12 w-12 rounded-full bg-yellow-100 grid place-items-center">
                      <Icon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-sm text-gray-600">{a.desc}</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      +{a.points}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* BEYOND ACADEMICS */}
        <div className="mt-10">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Beyond Academics
              </CardTitle>
              <p className="text-sm text-gray-500">
                Explore hobbies, extracurriculars, certifications & sports.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    key: "hobbies",
                    title: "Hobbies",
                    icon: Heart,
                    color: "from-pink-400 to-rose-500",
                    items: user.beyondAcademics?.hobbies || [],
                  },
                  {
                    key: "extracurriculars",
                    title: "Extracurriculars",
                    icon: Globe,
                    color: "from-indigo-400 to-purple-500",
                    items: user.beyondAcademics?.extracurriculars || [],
                  },
                  {
                    key: "certifications",
                    title: "Certifications",
                    icon: Medal,
                    color: "from-emerald-400 to-green-500",
                    items: user.beyondAcademics?.certifications || [],
                  },
                  {
                    key: "sports",
                    title: "Sports",
                    icon: Dumbbell,
                    color: "from-amber-400 to-orange-500",
                    items: user.beyondAcademics?.sports || [],
                  },
                ].map((section, idx) => {
                  const Icon = section.icon;
                  const isExpanded = showMore[section.key];
                  const itemsToShow = isExpanded
                    ? section.items
                    : section.items.slice(0, 3);

                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition flex flex-col h-full min-h-[220px]"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${section.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-semibold text-gray-800 text-lg">
                        {section.title}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc list-inside flex-1">
                        {section.items.length > 0 ? (
                          itemsToShow.map((item, i) => (
                            <li key={i} className="leading-relaxed">
                              {item}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-400 italic list-none">
                            No {section.title.toLowerCase()} added
                          </li>
                        )}
                      </ul>
                      {section.items.length > 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3 self-start text-blue-600 hover:text-blue-800"
                          onClick={() => toggleShow(section.key)}
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 overflow-y-auto z-50 px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                  <button
                    onClick={() => setEditing(false)}
                    className="hover:text-gray-200"
                  >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Avatar Upload */}
                <div className="flex justify-center">
                  <label className="relative cursor-pointer">
                    <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-pink-200 shadow">
                      {form.avatar ? (
                        <img
                          src={form.avatar}
                          alt="avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-pink-500 m-auto mt-6" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-pink-600 text-white p-2 rounded-full shadow">
                      <Camera className="h-4 w-4" />
                    </div>
                  </label>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name ?? ""}
                      onChange={handleChange}
                      className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email ?? ""}
                      onChange={handleChange}
                      className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location ?? ""}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Summary
                  </label>
                  <textarea
                    name="summary"
                    value={form.summary ?? ""}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags ?? ""}
                    onChange={handleChange}
                    className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                  />
                </div>

                {/* Beyond Academics Editable Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(form.beyondAcademics).map((key) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-600 capitalize">
                        {key}
                      </label>
                      <textarea
                        name={key}
                        rows={3}
                        value={(form.beyondAcademics[key] || []).join("\n")}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            beyondAcademics: {
                              ...prev.beyondAcademics,
                              [key]: e.target.value.split("\n"),
                            },
                          }))
                        }
                        className="mt-1 px-3 py-2 w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-400 focus:border-pink-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <Button
                  onClick={() => setEditing(false)}
                  variant="outline"
                  className="rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-pink-600 text-white hover:bg-pink-700 rounded-lg"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
