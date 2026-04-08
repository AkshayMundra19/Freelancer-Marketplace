import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Bell, MessageSquare, Briefcase, User, LogOut, Palette } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme, accentColor, setAccentColor } = useTheme();
  const { notifications } = useData();
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Find Work', path: '/jobs' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-card !border-x-0 !border-t-0 !rounded-none py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Briefcase className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-purple-500">
              WorkNet
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                (!link.protected || currentUser) && (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-sm font-bold transition-all hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
                  title="Customize Theme"
                >
                  <Palette className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {showColorPicker && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 p-3 glass-card flex gap-2"
                    >
                      {colors.map(c => (
                        <button
                          key={c.value}
                          onClick={() => { setAccentColor(c.value); setShowColorPicker(false); }}
                          className={`w-6 h-6 rounded-full border-2 ${accentColor === c.value ? 'border-white scale-125' : 'border-transparent'}`}
                          style={{ backgroundColor: c.value }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>

              {currentUser ? (
                <div className="flex items-center gap-4">
                  <Link to="/chat" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <MessageSquare className="w-5 h-5 text-slate-500" />
                  </Link>
                  
                  <Link to="/notifications" className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Bell className="w-5 h-5 text-slate-500" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                    )}
                  </Link>

                  <div className="relative group cursor-pointer">
                    <img src={currentUser.avatar} alt="Profile" className="w-9 h-9 rounded-full border-2 border-primary object-cover shadow-lg shadow-primary/20" />
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 text-left font-medium">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn-primary shadow-lg shadow-primary/20">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mx-4 mt-2 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                (!link.protected || currentUser) && (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              {currentUser ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Profile
                  </Link>
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Notifications
                  </Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md font-medium text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 mt-4 text-center rounded-lg bg-primary text-white font-medium">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

