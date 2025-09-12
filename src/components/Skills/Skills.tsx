import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSkillsData } from '../../hooks/useSkillsData';

const SkillCard: React.FC<{ 
  skill: any; 
  index: number; 
  categoryIndex: number; 
  theme: string;
  inView: boolean;
}> = ({ skill, index, categoryIndex, theme, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: categoryIndex * 0.1 + index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.08,
        rotateY: 5,
        rotateX: 5,
        y: -8,
        boxShadow: theme === 'dark' 
          ? '0 25px 50px rgba(168, 85, 247, 0.3)' 
          : '0 25px 50px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.3 }
      }}
      className={`p-6 rounded-2xl text-center transition-all duration-500 cursor-pointer relative overflow-hidden group ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/20 hover:border-purple-400/50'
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-blue-200/50 hover:border-blue-300/70 shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
            : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}
        initial={{ scale: 0, rotate: 180 }}
        whileHover={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Skill Icon */}
      <motion.div
        className={`text-4xl mb-4 relative z-10`}
        whileHover={{ 
          rotate: [0, -10, 10, 0],
          scale: 1.2
        }}
        transition={{ duration: 0.5 }}
      >
        {skill.icon || '⚡'}
      </motion.div>
      
      {/* Skill Name */}
      <motion.h4 
        className="font-semibold mb-3 text-lg relative z-10"
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.2 }}
      >
        {skill.name}
      </motion.h4>
      
      {/* Skill Level */}
      <motion.div 
        className={`text-sm mb-4 relative z-10 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.3 }}
      >
        <div className="flex items-center justify-center space-x-1">
          <TrendingUp className="w-4 h-4" />
          <span>{skill.level}</span>
        </div>
      </motion.div>
      
      {/* Animated Progress Bar */}
      <div className={`w-full h-3 rounded-full relative overflow-hidden ${
        theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
      }`}>
        <motion.div
          initial={{ width: 0, x: '-100%' }}
          animate={inView ? { 
            width: `${skill.proficiency}%`,
            x: 0
          } : {}}
          transition={{
            duration: 1.2,
            delay: categoryIndex * 0.1 + index * 0.05 + 0.5,
            ease: "easeOut"
          }}
          className={`h-full rounded-full relative ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: categoryIndex * 0.1 + index * 0.05 + 1.5,
              repeatDelay: 3
            }}
          />
        </motion.div>
      </div>
      
      {/* Proficiency Percentage */}
      <motion.div
        className={`text-xs mt-2 font-medium relative z-10 ${
          theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ 
          delay: categoryIndex * 0.1 + index * 0.05 + 1,
          type: "spring",
          stiffness: 200
        }}
      >
        {skill.proficiency}%
      </motion.div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const { data: skillsData } = useSkillsData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="skills" ref={ref} className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden content-shift ${
      inView ? 'shifted' : ''
    } ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900/40 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-white/80 to-gray-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-10 ${
              theme === 'dark' ? 'bg-purple-500' : 'bg-blue-500'
            }`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 text-purple-300'
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Technical Expertise
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className={`${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Skills & Technologies
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
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        <div className="space-y-16">
          {(skillsData || []).map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="relative"
            >
              {/* Category Header */}
              <motion.div
                className="flex items-center justify-center mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 + 0.3 }}
              >
                <div className={`h-px flex-1 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-transparent to-purple-500/50' 
                    : 'bg-gradient-to-r from-transparent to-blue-500/50'
                }`} />
                <h3 className={`px-6 text-2xl font-bold ${
                  theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                }`}>
                  {category.category}
                </h3>
                <div className={`h-px flex-1 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-l from-transparent to-purple-500/50' 
                    : 'bg-gradient-to-l from-transparent to-blue-500/50'
                }`} />
              </motion.div>
              
              {/* Skills Grid with Staggered Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    categoryIndex={categoryIndex}
                    theme={theme}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;