import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Github, Linkedin, Download, ExternalLink, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePersonalData } from '../../hooks/usePersonalData';

const FloatingElement: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: [0, 1, -1, 0]
    }}
    transition={{ 
      duration: 0.8, 
      delay,
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    className="absolute"
  >
    {children}
  </motion.div>
);

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { data: personalData } = usePersonalData();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const profileLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: personalData?.socialLinks?.github || '#',
      color: theme === 'dark' ? 'from-gray-600 to-gray-800' : 'from-gray-700 to-gray-900'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: personalData?.socialLinks?.linkedin || '#',
      color: theme === 'dark' ? 'from-blue-600 to-blue-800' : 'from-blue-600 to-blue-800'
    },
    {
      icon: Download,
      label: 'Resume',
      url: personalData?.resume || '#',
      color: theme === 'dark' ? 'from-purple-600 to-pink-600' : 'from-indigo-600 to-purple-600'
    },
    {
      icon: Mail,
      label: 'Contact',
      url: `mailto:${personalData?.contact?.email || ''}`,
      color: theme === 'dark' ? 'from-cyan-600 to-teal-600' : 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: theme === 'dark' 
            ? [
                'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.4) 0%, transparent 60%)',
                'radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 60%)',
                'radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 60%)'
              ]
            : [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 60%)'
              ]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Enhanced Floating Elements */}
      {[...Array(12)].map((_, i) => (
        <FloatingElement key={i} delay={i * 0.3}>
          <div 
            className={`absolute ${
              i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2 h-2' : 'w-1 h-1'
            } rounded-full ${
              theme === 'dark' 
                ? ['bg-cyan-400', 'bg-purple-400', 'bg-pink-400'][i % 3]
                : ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400'][i % 3]
            } opacity-40`}
            style={{ 
              left: `${10 + (i * 7) % 80}%`, 
              top: `${15 + (i * 11) % 70}%` 
            }}
          />
        </FloatingElement>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-cyan-500/30 text-cyan-300 backdrop-blur-sm'
                : 'bg-gradient-to-r from-white/80 to-gray-50/80 border border-blue-200/50 text-blue-700 backdrop-blur-sm shadow-lg'
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            {personalData?.tagline || 'Available for new opportunities'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <motion.span 
              className="block mb-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {personalData?.name || 'Soumojit Kayal'}
            </motion.span>
            <motion.span 
              className={`${
              theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            } bg-clip-text text-transparent`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              >
              {personalData?.title || 'Engineer'}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Crafting innovative digital experiences with cutting-edge technologies and visionary design
          </motion.p>

          {/* Profile Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {profileLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target={link.label === 'Contact' ? '_self' : '_blank'}
                  rel={link.label === 'Contact' ? '' : 'noopener noreferrer'}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: theme === 'dark' 
                      ? '0 20px 40px rgba(34, 211, 238, 0.3)' 
                      : '0 20px 40px rgba(59, 130, 246, 0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-cyan-500/20 text-white backdrop-blur-sm'
                      : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-blue-200/50 text-gray-800 backdrop-blur-sm shadow-lg'
                  }`}
                >
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Icon with rotation effect */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                  
                  {/* Label */}
                  <span className="relative z-10 font-semibold">
                    {link.label}
                  </span>
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: theme === 'dark' 
                  ? '0 25px 50px rgba(34, 211, 238, 0.4)' 
                  : '0 25px 50px rgba(59, 130, 246, 0.3)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              onClick={() => scrollToSection('projects')}
              className={`px-10 py-5 rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">
                Explore My Work
              </span>
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: theme === 'dark' ? '#22d3ee' : '#3b82f6',
                boxShadow: theme === 'dark' 
                  ? '0 0 25px rgba(34, 211, 238, 0.3)' 
                  : '0 0 20px rgba(59, 130, 246, 0.3)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              onClick={() => scrollToSection('contact')}
              className={`px-10 py-5 rounded-2xl font-semibold border-2 transition-all duration-500 relative overflow-hidden ${
                theme === 'dark'
                  ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 backdrop-blur-sm'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white backdrop-blur-sm'
              }`}
            >
              Let's Connect
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ 
              y: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ 
              scale: 1.2,
              rotate: 5
            }}
            onClick={() => scrollToSection('about')}
            className={`p-3 rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
            }`}
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;