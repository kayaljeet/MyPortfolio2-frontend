import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { usePersonalData } from '../../hooks/usePersonalData';

const Hero: React.FC = () => {
  const { data: personalData } = usePersonalData();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black grain-texture pt-20 pb-0 lg:pt-48 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center relative z-10 -mt-24 lg:-mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium mb-8 mt-1 sm:mb-12 bg-neutral-900 border border-neutral-800 text-neutral-400 uppercase tracking-wide max-w-full whitespace-normal text-center"
          >
            Available for new opportunities
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mb-8"
            style={{ minHeight: 'auto' }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight sm:leading-none">
              <span className="block mb-2 sm:mb-3 text-white typing-animation inline-block max-w-full break-words">
                {personalData?.name || 'Your Name'}
              </span>
              <span className="block text-brand-neon typing-animation-secondary inline-block max-w-full break-words">
                {personalData?.title || 'Developer'}
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-2xl mb-12 sm:mb-16 max-w-3xl mx-auto text-neutral-500 leading-relaxed px-4"
          >
            {personalData?.tagline || 'Crafting digital experiences with modern web technologies'}
          </motion.p>

          {/* Wrapper for buttons and arrow - ensures arrow aligns with buttons */}
          <div className="relative flex flex-col items-center">
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium transition-all duration-300 bg-transparent border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black text-sm sm:text-base tracking-wide"
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium transition-all duration-300 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black text-sm sm:text-base tracking-wide"
              >
                Get In Touch
              </motion.button>

              {personalData?.resume && (
                <motion.a
                  href={personalData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium transition-all duration-300 bg-transparent border-2 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white flex items-center justify-center gap-3 text-sm sm:text-base tracking-wide"
                >
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                </motion.a>
              )}
            </motion.div>

            {/* Scroll Indicator - Positioned relative to buttons container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-1 sm:-bottom-1 left-4/10 transform -translate-x-1/2"
            >
              <motion.button
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => scrollToSection('about')}
                className="p-3 rounded-full transition-all duration-300 hover:bg-neutral-900"
                aria-label="Scroll to about section"
              >
                {/* 8-bit Pixelated Down Arrow */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 0, 0.5))' }}
                >
                  {/* Pixelated arrow shape */}
                  <rect x="11" y="4" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="6" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="8" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="10" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="12" width="2" height="2" fill="#00FF00" />

                  {/* Arrow head */}
                  <rect x="7" y="14" width="2" height="2" fill="#00FF00" />
                  <rect x="9" y="14" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="14" width="2" height="2" fill="#00FF00" />
                  <rect x="13" y="14" width="2" height="2" fill="#00FF00" />
                  <rect x="15" y="14" width="2" height="2" fill="#00FF00" />

                  <rect x="9" y="16" width="2" height="2" fill="#00FF00" />
                  <rect x="11" y="16" width="2" height="2" fill="#00FF00" />
                  <rect x="13" y="16" width="2" height="2" fill="#00FF00" />

                  <rect x="11" y="18" width="2" height="2" fill="#00FF00" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;