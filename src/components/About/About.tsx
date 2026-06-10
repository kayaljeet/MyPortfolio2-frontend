import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Code, Award, Coffee, FileText } from 'lucide-react';
import { usePersonalData } from '../../hooks/usePersonalData';

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

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; delay: number }> = ({
  icon, value, label, delay
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="p-4 sm:p-8 text-center bg-black border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
    >
      <div className="inline-flex p-2 sm:p-4 mb-2 sm:mb-4 text-brand-neon">
        {icon}
      </div>
      <div className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-white">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const { data: personalData } = usePersonalData();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" ref={ref} className="py-10 sm:py-20 px-6 sm:px-8 lg:pl-48 lg:pr-16 bg-transparent grain-texture">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400">
            Get to know me
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
            <span className="text-white">About </span>
            <span className="text-brand-neon">Me</span>
          </h2>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20"
        >
          <StatCard
            icon={<Code className="w-6 h-6 sm:w-8 sm:h-8" />}
            value={personalData?.stats?.yearsExperience || "5+"}
            label="Years Experience"
            delay={0.1}
          />
          <StatCard
            icon={<Award className="w-6 h-6 sm:w-8 sm:h-8" />}
            value={personalData?.stats?.projectsCompleted || "50+"}
            label="Projects Completed"
            delay={0.2}
          />
          <StatCard
            icon={<Coffee className="w-6 h-6 sm:w-8 sm:h-8" />}
            value={personalData?.stats?.cupsOfCoffee || "1000+"}
            label="Cups of Coffee"
            delay={0.3}
          />
          <StatCard
            icon={<Download className="w-6 h-6 sm:w-8 sm:h-8" />}
            value={personalData?.stats?.linesOfCode || "100K+"}
            label="Lines of Code"
            delay={0.4}
          />
        </motion.div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Profile Image/Initial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="aspect-square bg-gradient-to-br from-brand-neon/20 to-transparent border border-neutral-800 flex items-center justify-center overflow-hidden"
            >
              {personalData?.image ? (
                <img
                  src={getImageUrl(personalData.image)}
                  alt={personalData.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-7xl sm:text-9xl font-bold text-brand-neon">
                  {personalData?.name?.charAt(0) || 'A'}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-tight break-words">
              {personalData?.bio?.title || 'Passionate Developer'}
            </h3>

            <div className="text-base sm:text-lg leading-relaxed space-y-6 text-neutral-400">
              {personalData?.bio?.paragraphs?.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="border-l-2 border-neutral-800 pl-4 sm:pl-6 break-words"
                >
                  {paragraph}
                </motion.p>
              )) || (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="border-l-2 border-neutral-800 pl-4 sm:pl-6 break-words"
                    >
                      I'm a passionate software developer with expertise in modern web technologies.
                      I love creating intuitive, efficient, and scalable solutions that make a real impact.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="border-l-2 border-neutral-800 pl-4 sm:pl-6 break-words"
                    >
                      When I'm not coding, you can find me exploring new technologies, contributing to
                      open-source projects, or sharing knowledge with the developer community.
                    </motion.p>
                  </>
                )}
            </div>

            {personalData?.resume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="pt-8"
              >
                <a
                  href={personalData.resume.startsWith('http') ? personalData.resume : `${apiBaseUrl}${personalData.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 font-medium bg-transparent border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black transition-all duration-300 tracking-wide text-sm sm:text-base"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Resume</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;