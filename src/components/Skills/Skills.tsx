import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSkillsData } from '../../hooks/useSkillsData';
import { useMediaQuery } from '../../hooks/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width: 639px)');
  const crypticDuration = isMobile ? 600 : 1000;

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
        <CrypticText text={skill.name} duration={crypticDuration} />
      </h4>

      {/* Skill Level */}
      <div className="text-sm mb-3 text-neutral-500">
        <CrypticText text={skill.level} duration={crypticDuration} />
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

const SkillCategory: React.FC<{
  category: any;
  categoryIndex: number;
  inView: boolean;
}> = ({ category, categoryIndex, inView }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        // gap-4 is 1rem = 16px
        const gap = 16;
        const stride = firstChild.offsetWidth + gap;
        const newIndex = Math.round(container.scrollLeft / stride);
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToSkill = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        const gap = 16;
        const stride = firstChild.offsetWidth + gap;
        container.scrollTo({ left: index * stride, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
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
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 scrollbar-hide"
      >
        {category.skills
          .sort((a: any, b: any) => (a.id || 999) - (b.id || 999))
          .map((skill: any, skillIndex: number) => (
            <div key={skill.name} className="flex-shrink-0 w-[85vw] sm:w-auto snap-center">
              <SkillCard
                skill={skill}
                index={skillIndex}
                categoryIndex={categoryIndex}
                inView={inView}
              />
            </div>
          ))}
      </div>

      {/* Dot Indicators (Mobile Only) */}
      <div className="flex justify-center gap-2 mt-2 sm:hidden">
        {category.skills
          .sort((a: any, b: any) => (a.id || 999) - (b.id || 999))
          .map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => scrollToSkill(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-brand-neon w-6' : 'bg-neutral-800 w-1.5'
                }`}
              aria-label={`Go to skill ${index + 1}`}
            />
          ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const { data: skillsData } = useSkillsData();
  const { ref, inView } = useInView({
    threshold: 0.1,
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
            <SkillCategory
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;