import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSkillsData } from '../../hooks/useSkillsData';

import CrypticText from '../common/CrypticText';

// Helper function to convert GitHub blob URLs to raw URLs
const getImageUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;

  // Convert GitHub blob URLs to raw URLs
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }

  return url;
};

const SkillCard: React.FC<{
  skill: any;
  index: number;
  categoryIndex: number;
  inView: boolean;
}> = ({ skill, index, categoryIndex, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: categoryIndex * 0.05 + index * 0.03,
      }}
      whileHover={{ y: -4 }}
      className="p-6 bg-black border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
    >
      {/* Skill Icon */}
      <div className="text-4xl mb-4">
        {skill.icon ? (
          <img
            src={getImageUrl(skill.icon)}
            alt={skill.name || "Skill icon"}
            className="w-12 h-12"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center text-brand-neon text-2xl font-bold">
            {skill.name?.charAt(0)}
          </div>
        )}
      </div>

      {/* Skill Name */}
      <h4 className="font-semibold mb-2 text-lg text-white">
        <CrypticText text={skill.name} duration={1000} />
      </h4>

      {/* Skill Level */}
      <div className="text-sm mb-3 text-neutral-500">
        <CrypticText text={skill.level} duration={1000} />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-neutral-900 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : {}}
          transition={{
            duration: 1,
            delay: categoryIndex * 0.05 + index * 0.03 + 0.3,
          }}
          className="h-full bg-brand-neon"
        />
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { data: skillsData } = useSkillsData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="skills" ref={ref} className="py-20 px-6 sm:px-8 lg:pl-48 lg:pr-16 bg-black grain-texture">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400">
            Technical Expertise
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 tracking-tighter">
            <span className="text-white">Skills & </span>
            <span className="text-brand-neon">Technologies</span>
          </h2>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12 sm:space-y-16">
          {(skillsData || []).map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {category.category}
                </h3>
                <div className="flex-1 h-px bg-neutral-800 ml-6" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    categoryIndex={categoryIndex}
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