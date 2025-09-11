import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, User, LogOut, Bookmark, LayoutDashboard } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useGetUser from "@/hooks/useGetUser";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useGetUser(); // Make sure your hook returns setUser or use context

  const navLinks = [
    { path: "/quiz", label: "Quiz" },
    { path: "/recommendations", label: "Recommendations" },
    { path: "/colleges", label: "Colleges" },
    { path: "/timeline", label: "Timeline" },
    { path: "/content", label: "Content Hub" },
  ];

  const isActiveLink = (path) => location.pathname.startsWith(path);

  const logoutHandler = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you store token

    // Update state
    if (setUser) setUser(null);

    // Redirect to login or home page
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-1">
              <span className="inline-block w-6 h-6 rounded-full bg-blue-600 text-white items-center justify-center text-sm font-bold">C</span>
              CareerAdvisor
            </h1>
          </Link>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover:text-blue-600 transition ${
                    isActiveLink(link.path) ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 border rounded-lg shadow-sm">
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50">
                  <User className="h-4 w-4 text-gray-600" />
                  Profile
                </Link>
                <Link to="/bookmarks" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50">
                  <Bookmark className="h-4 w-4 text-gray-600" />
                  Bookmarks
                </Link>
                {/* Admin Link if needed
                {user?.role === "admin" && (
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50">
                    <LayoutDashboard className="h-4 w-4 text-gray-600" />
                    Admin
                  </Link>
                )} */}
                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 text-red-600 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
