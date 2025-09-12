import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Github, Linkedin, Download } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePersonalData } from '../../hooks/usePersonalData';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { data: personalData } = usePersonalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroHeight = windowHeight * 0.8; // Assuming hero is 80vh
      
      setIsScrolled(scrollY > 20);
      setScrollProgress(Math.min(scrollY / heroHeight, 1));
      
      // Determine active section
      const sections = navItems.map(item => item.id);
      let currentSection = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.3) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const headerTransform = `translateX(${scrollProgress * -200}px)`;
  const nameOpacity = Math.max(0.3, 1 - scrollProgress * 0.7);

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? theme === 'dark'
              ? 'bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10'
              : 'bg-white/95 backdrop-blur-xl border-b border-blue-200/50 shadow-lg shadow-blue-500/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Animated Logo/Name Section */}
            <motion.div
              className="flex items-center space-x-4"
              style={{ transform: headerTransform }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <motion.div
                className="font-bold text-xl"
                style={{ opacity: nameOpacity }}
              >
                <span className={`${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                }`}>
                  {personalData?.name || 'Portfolio'}
                </span>
              </motion.div>
              
              {/* Designation */}
              <motion.div
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{ opacity: nameOpacity * 0.8 }}
              >
                {personalData?.title || 'Developer'}
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? theme === 'dark'
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-blue-600 bg-blue-100/50'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800 to-slate-700 hover:from-cyan-900/50 hover:to-purple-900/50 border border-cyan-500/20'
                    : 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-indigo-50 border border-blue-200/50 shadow-lg'
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-600" />
                  )}
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-cyan-500/20'
                    : 'bg-white/50 hover:bg-gray-50/50 border border-blue-200/50'
                }`}
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`md:hidden py-6 ${
                theme === 'dark'
                  ? 'bg-slate-900/98 backdrop-blur-xl border-t border-cyan-500/20'
                  : 'bg-white/98 backdrop-blur-xl border-t border-blue-200/50'
              }`}
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? theme === 'dark'
                          ? 'text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400'
                          : 'text-blue-600 bg-blue-100/50 border-l-4 border-blue-600'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>

      {/* Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 h-1 z-50 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600'
        }`}
        style={{ width: `${scrollProgress * 100}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default Header;
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20'
            : 'bg-white/80 backdrop-blur-md border-b border-blue-200/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl"
          >
            <span className={theme === 'dark' ? 'text-purple-400' : 'text-blue-600'}>
              Portfolio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors duration-200 hover:${
                  theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-purple-900/50 hover:bg-purple-800/50'
                  : 'bg-blue-100/50 hover:bg-blue-200/50'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-purple-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden py-4 ${
              theme === 'dark'
                ? 'bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20'
                : 'bg-white/95 backdrop-blur-md border-t border-blue-200/50'
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left px-4 py-2 capitalize transition-colors duration-200 hover:${
                  theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;