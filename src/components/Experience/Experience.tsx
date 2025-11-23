import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin } from 'lucide-react';
import { useExperienceData } from '../../hooks/useExperienceData';
import CrypticText from '../common/CrypticText';

const Experience: React.FC = () => {
  const { data: experienceData } = useExperienceData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="experience" ref={ref} className="py-20 px-6 sm:px-8 lg:pl-48 lg:pr-16 bg-neutral-950 grain-texture">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400">
            Professional Journey
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            <span className="text-white">Work </span>
            <span className="text-brand-neon">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}


          {(experienceData || []).map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 sm:mb-16 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
            >
              {/* Timeline Line */}
              {index !== (experienceData || []).length - 1 && (
                <div className="absolute left-1.5 md:left-1/2 top-1/2 w-px bg-neutral-800 transform md:-translate-x-1/2 h-[calc(100%+3rem)] sm:h-[calc(100%+4rem)]" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-brand-neon z-10" />

              <div className={`ml-8 md:ml-0 ${index % 2 === 0
                ? 'md:mr-[52%]'
                : 'md:ml-[52%]'
                }`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`p-6 sm:p-8 bg-black border-neutral-800 hover:border-brand-neon transition-all duration-300 border-l-2 ${index % 2 === 0 ? 'md:border-l-0 md:border-r-2' : ''
                    }`}
                >
                  <div className="inline-flex px-3 py-1 text-xs font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400 mb-4">
                    <CrypticText text={exp.type} duration={1000} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white tracking-tight">
                    <CrypticText text={exp.position} duration={1000} />
                  </h3>
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 text-brand-neon">
                    <CrypticText text={exp.company} duration={1000} />
                  </h4>

                  {/* Meta Info */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <CrypticText text={exp.duration} duration={1000} />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <CrypticText text={exp.location} duration={1000} />
                    </div>
                  </div>

                  <p className="mb-4 text-neutral-400 leading-relaxed text-sm sm:text-base">
                    <CrypticText text={exp.description} duration={1000} />
                  </p>

                  {exp.achievements && (
                    <ul className="space-y-2 text-sm text-neutral-400 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="inline-block w-1 h-1 rounded-full mt-2 bg-brand-neon flex-shrink-0" />
                          <CrypticText text={achievement} duration={1000} delay={i * 100} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800"
                        >
                          <CrypticText text={tech} duration={1000} delay={i * 50} />
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