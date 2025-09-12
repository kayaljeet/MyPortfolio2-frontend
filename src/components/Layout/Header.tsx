import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['about', 'skills', 'projects', 'experience', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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