import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: theme === 'dark' 
            ? [
                'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)'
              ]
            : [
                'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
              ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating Elements */}
      <FloatingElement delay={0.5}>
        <div className={`w-4 h-4 rounded-full ${theme === 'dark' ? 'bg-purple-400' : 'bg-blue-400'} opacity-60`} 
             style={{ left: '10%', top: '20%' }} />
      </FloatingElement>
      <FloatingElement delay={1.2}>
        <Sparkles className={`w-6 h-6 ${theme === 'dark' ? 'text-pink-400' : 'text-purple-500'} opacity-40`} 
                  style={{ right: '15%', top: '30%' }} />
      </FloatingElement>
      <FloatingElement delay={2.1}>
        <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-indigo-400'} opacity-50`} 
             style={{ left: '80%', bottom: '40%' }} />
      </FloatingElement>

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
                ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 text-purple-300'
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700'
            }`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Available for new opportunities
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
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
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
            {personalData?.tagline || 'Crafting digital experiences with modern web technologies'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: theme === 'dark' 
                  ? '0 20px 40px rgba(168, 85, 247, 0.4)' 
                  : '0 20px 40px rgba(59, 130, 246, 0.3)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              onClick={() => scrollToSection('projects')}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-500 relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">
              View My Work
              </span>
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: theme === 'dark' ? '#a855f7' : '#3b82f6',
                boxShadow: theme === 'dark' 
                  ? '0 0 20px rgba(168, 85, 247, 0.3)' 
                  : '0 0 20px rgba(59, 130, 246, 0.3)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 rounded-full font-medium border-2 transition-all duration-500 relative overflow-hidden ${
                theme === 'dark'
                  ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
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
              theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
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