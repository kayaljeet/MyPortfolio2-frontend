import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { usePersonalData } from '../../hooks/usePersonalData';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { data: personalData } = usePersonalData();

  const navItems = ['about', 'skills', 'projects', 'experience', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };

    handleScroll(); // Set initial active section
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  return (
    <>
      {/* Logo - Top Left (Rotated 90° anticlockwise) - Desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block fixed top-24 left-8 lg:left-16 z-50"
      >
        <motion.div
          // whileHover={{ rotate: -90, scale: 1.02 }}
          className="font-bold text-xl tracking-tight text-white whitespace-nowrap"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'left center',
            marginLeft: '1.25rem'
          }}
        >
          {personalData?.name?.split(' ')[0] || 'Portfolio'}
        </motion.div>
      </motion.div>

      {/* Logo - Top Left - Mobile only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:hidden fixed top-8 left-8 z-50"
      >
        <div className="font-bold text-xl tracking-tight text-white">
          {personalData?.name?.split(' ')[0] || 'Portfolio'}
        </div>
      </motion.div>

      {/* Navigation Links - Top Right (Vertical Stack) */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex fixed top-8 right-8 lg:right-16 z-50 flex-col items-end gap-6"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection(item)}
            className={`capitalize transition-all duration-300 relative group text-sm font-medium tracking-wide ${activeSection === item
              ? 'text-brand-neon'
              : 'text-neutral-400 hover:text-brand-neon'
              }`}
          >
            {item}
            <span
              className={`absolute bottom-0 right-0 h-[1px] bg-brand-neon transition-all duration-300 ${activeSection === item
                ? 'w-full'
                : 'w-0 group-hover:w-full'
                }`}
            />
          </motion.button>
        ))}
      </motion.nav>

      {/* Social Icons - Bottom Left (Vertical Stack) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden md:flex fixed bottom-8 left-8 lg:left-16 z-50 flex-col gap-5"
      >
        {personalData?.socialLinks && Object.entries(personalData.socialLinks).map(([platform, url], index) => {
          const IconComponent = socialIcons[platform as keyof typeof socialIcons];
          if (!IconComponent) return null;

          return (
            <motion.a
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="text-neutral-400 hover:text-brand-neon transition-colors duration-300"
              aria-label={platform}
            >
              <IconComponent className="w-5 h-5" />
            </motion.a>
          );
        })}

        {/* Fallback social icons if no data */}
        {(!personalData?.socialLinks || Object.keys(personalData.socialLinks).length === 0) && (
          <>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="text-neutral-400 hover:text-brand-neon transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="text-neutral-400 hover:text-brand-neon transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </>
        )}
      </motion.div>

      {/* Mobile Menu Button - Top Right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-8 right-8 z-50 p-2 text-white hover:text-brand-neon transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </motion.button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {/* Nav Items */}
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item)}
                className={`text-2xl capitalize transition-colors duration-300 ${activeSection === item
                  ? 'text-brand-neon'
                  : 'text-neutral-400 hover:text-brand-neon'
                  }`}
              >
                {item}
              </motion.button>
            ))}

            {/* Social Links */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-neutral-800">
              {personalData?.socialLinks && Object.entries(personalData.socialLinks).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="text-neutral-400 hover:text-brand-neon transition-colors duration-300"
                    aria-label={platform}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;