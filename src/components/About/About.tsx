import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, Coffee, Code } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePersonalData } from '../../hooks/usePersonalData';

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; delay: number }> = ({ 
  icon, value, label, delay 
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        boxShadow: theme === 'dark' 
          ? '0 20px 40px rgba(168, 85, 247, 0.2)' 
          : '0 20px 40px rgba(59, 130, 246, 0.15)'
      }}
      className={`p-6 rounded-2xl text-center transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/20'
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 border border-blue-200/50 shadow-lg'
      }`}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex p-3 rounded-full mb-4 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 text-purple-400'
            : 'bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600'
        }`}
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-3xl font-bold mb-2"
      >
        {value}
      </motion.div>
      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const { theme } = useTheme();
  const { data: personalData } = usePersonalData();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" ref={ref} className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden content-shift ${
      inView ? 'shifted' : ''
    } ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80' 
        : 'bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#22d3ee' : '#3b82f6'} 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              About Me
            </span>
          </motion.h2>
          <motion.div 
            className={`w-24 h-1 mx-auto ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          <StatCard icon={<Code className="w-6 h-6" />} value="5+" label="Years Experience" delay={0.1} />
          <StatCard icon={<Award className="w-6 h-6" />} value="50+" label="Projects Completed" delay={0.2} />
          <StatCard icon={<Coffee className="w-6 h-6" />} value="1000+" label="Cups of Coffee" delay={0.3} />
          <StatCard icon={<Download className="w-6 h-6" />} value="100K+" label="Lines of Code" delay={0.4} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative perspective-1000">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5
                }}
                transition={{ duration: 0.3 }}
                className="w-80 h-80 mx-auto relative overflow-hidden rounded-3xl"
              >
                <motion.div 
                  className={`absolute inset-0 rounded-3xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                } p-1`}
                  animate={{
                    background: theme === 'dark'
                      ? [
                          'linear-gradient(45deg, #8b5cf6, #ec4899)',
                          'linear-gradient(45deg, #ec4899, #06b6d4)',
                          'linear-gradient(45deg, #06b6d4, #8b5cf6)'
                        ]
                      : [
                          'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                          'linear-gradient(45deg, #8b5cf6, #ec4899)',
                          'linear-gradient(45deg, #ec4899, #3b82f6)'
                        ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className={`w-full h-full rounded-3xl flex items-center justify-center text-6xl font-bold ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-white'
                  }`}>
                    {personalData?.name?.charAt(0) || 'J'}
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Floating elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-4 h-4 rounded-full ${
                    theme === 'dark' ? 'bg-purple-400' : 'bg-blue-400'
                  } opacity-40 blur-sm`}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 10, 0],
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${10 + (i % 4) * 25}%`,
                    top: `${10 + Math.floor(i / 4) * 30}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="space-y-6"
          >
            <motion.h3 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {personalData?.bio?.title || 'Passionate Developer'}
            </motion.h3>
            <motion.div 
              className={`text-lg leading-relaxed space-y-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {personalData?.bio?.paragraphs?.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.2 }}
                  className="relative pl-4 border-l-2 border-purple-400/30"
                >
                  {paragraph}
                </motion.p>
              )) || (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="relative pl-4 border-l-2 border-purple-400/30"
                  >
                    I'm a passionate software developer with expertise in modern web technologies. 
                    I love creating intuitive, efficient, and scalable solutions that make a real impact.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="relative pl-4 border-l-2 border-purple-400/30"
                  >
                    When I'm not coding, you can find me exploring new technologies, contributing to 
                    open-source projects, or sharing knowledge with the developer community.
                  </motion.p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.7 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: theme === 'dark' 
                  ? '0 20px 40px rgba(168, 85, 247, 0.4)' 
                  : '0 20px 40px rgba(59, 130, 246, 0.3)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="pt-6"
            >
              <a
                href={personalData?.resume || '#'}
                className={`inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-500 relative overflow-hidden group ${
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
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mr-2 relative z-10"
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <span className="relative z-10">
                Download Resume
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;