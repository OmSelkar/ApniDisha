// src/components/ModernNavbar.jsx
import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import NotificationCenter from "../notifications/NotificationCenter";
import logo from "./image.jpeg";
import { Menu, X, Bell, User, BookOpen, Users, Calendar, FileText, GraduationCap, Target, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";

const ModernNavbar = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  const navLinks = useMemo(
    () => [
      { name: t("quiz"), href: "/quiz", icon: BookOpen },
      { name: t("recommendations"), href: "/recommendations", icon: GraduationCap },
      { name: t("colleges"), href: "/colleges", icon: Users },
      { name: t("timeline"), href: "/timeline", icon: Calendar },
      { name: t("content"), href: "/content", icon: FileText },
    ],
    [t]
  );

  const isActive = (path) => location.pathname === path;
  const currentLang = i18n.language || "hi";
  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("apni_disha_lang", lng);
  };

  return (
    <>
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Language */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2">
                <img src={logo} alt="ApniDisha logo" className="h-9 w-auto" />
                <span className="text-xl font-bold text-gray-900">ApniDisha</span>
              </Link>
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

            {/* Desktop Links */}
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

              <Link
                to="/simulator"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-teal-50 hover:bg-teal-100 transition"
                aria-label={t("scenarioBuilder")}
              >
                <Target className="h-4 w-4 mr-2 text-teal-600" />
                <span>{t("scenarioBuilder")}</span>
              </Link>
            </div>

            {/* Right Controls */}
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

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen((s) => !s)} aria-expanded={isMobileMenuOpen}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-3 border-t">
              <div className="space-y-2 px-2">
                <div className="flex items-center space-x-2 px-2">
                  <button onClick={() => { setLanguage("hi"); setIsMobileMenuOpen(false); }} className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "hi" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>हिंदी</button>
                  <button onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }} className={`px-2 py-1 rounded-md text-sm font-medium ${currentLang === "en" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>English</button>
                </div>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} to={link.href} className={`flex items-center px-4 py-2 rounded-md ${isActive(link.href) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setIsMobileMenuOpen(false)}>
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}

                <Link to="/simulator" className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Target className="h-5 w-5 mr-3" />
                  <span>{t("scenarioBuilder")}</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <NotificationCenter isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      </nav>
    </>
  );
};

export default ModernNavbar;
