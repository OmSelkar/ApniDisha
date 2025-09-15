import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Quizzes', href: '/quiz' },
  { name: 'Colleges', href: '/colleges' },
  { name: 'Careers', href: '/career-graph' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'About', href: '/about' }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center space-x-3 select-none">
            <span className="text-3xl">🎓</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              EduNavigator
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-lg font-semibold transition-colors duration-300 ${
                    isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {link.name}
                  {/* Animated underline */}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px 2px rgba(255, 182, 0, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-semibold shadow-lg"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px 2px rgba(255, 182, 0, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full border-2 border-gradient-r from-yellow-400 via-pink-500 to-purple-600 text-purple-600 font-semibold bg-white shadow-lg"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-16 right-0 bottom-0 w-64 bg-white/90 backdrop-blur-md shadow-lg border-l border-white/30 z-50 flex flex-col p-6 space-y-6"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-auto space-y-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 8px 2px rgba(255, 182, 0, 0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-semibold shadow-lg"
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 8px 2px rgba(255, 182, 0, 0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-5 py-2 rounded-full border-2 border-gradient-r from-yellow-400 via-pink-500 to-purple-600 text-purple-600 font-semibold bg-white shadow-lg"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
