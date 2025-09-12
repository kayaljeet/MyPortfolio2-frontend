import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useExperienceData } from '../../hooks/useExperienceData';

const Experience: React.FC = () => {
  const { theme } = useTheme();
  const { data: experienceData } = useExperienceData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="experience" ref={ref} className={`py-20 px-4 sm:px-6 lg:px-8 content-shift ${
      inView ? 'shifted' : ''
    } ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950/60 via-slate-900/40 to-slate-950/60' 
        : 'bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80'
    }`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className={`${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Experience
            </span>
          </h2>
          <div className={`w-24 h-1 mx-auto ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`} />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2 ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-purple-500 to-pink-500'
              : 'bg-gradient-to-b from-blue-500 to-purple-500'
          }`} />

          {(experienceData || []).map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                  : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } shadow-lg z-10`} />

              <div className={`ml-12 md:ml-0 ${
                index % 2 === 0
                  ? 'md:mr-[52%]'
                  : 'md:ml-[52%]'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/20'
                      : 'bg-white/50 hover:bg-white/80 border border-blue-200/50 shadow-lg'
                  }`}
                >
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                    theme === 'dark'
                      ? 'bg-purple-900/50 text-purple-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {exp.type}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                  <h4 className={`text-lg font-medium mb-3 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
                  }`}>
                    {exp.company}
                  </h4>
                  
                  <div className={`flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  
                  <p className={`mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {exp.description}
                  </p>
                  
                  {exp.achievements && (
                    <ul className={`space-y-1 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 ${
                            theme === 'dark' ? 'bg-purple-400' : 'bg-blue-600'
                          }`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 rounded text-xs ${
                            theme === 'dark'
                              ? 'bg-slate-700 text-gray-300'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;