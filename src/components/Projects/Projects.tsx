import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X } from 'lucide-react';
import { useProjectsData } from '../../hooks/useProjectsData';
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

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  category: string;
}

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  inView: boolean;
  onClick: () => void;
}> = ({ project, index, inView, onClick }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const crypticDuration = isMobile ? 600 : 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer group bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      {/* Project Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 flex-shrink-0">
        {project.image ? (
          <motion.img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-700">
            <div className="text-6xl font-bold">{project.title.charAt(0)}</div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-black/80 border border-neutral-800 text-neutral-400">
            <CrypticText text={project.category} duration={crypticDuration} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-neon transition-colors duration-300 tracking-tight">
          <CrypticText text={project.title} duration={crypticDuration} />
        </h3>

        <p className="text-neutral-500 mb-6 line-clamp-3 leading-relaxed break-words">
          <CrypticText text={project.description} duration={crypticDuration} />
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800"
            >
              <CrypticText text={tech} duration={crypticDuration} delay={i * 50} />
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 text-xs bg-neutral-900 text-neutral-500 border border-neutral-800">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.demoUrl && (
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-transparent border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { data: projectsData } = useProjectsData();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  return (
    <section id="projects" ref={ref} className="py-20 px-6 sm:px-8 lg:pl-48 lg:pr-16 bg-transparent grain-texture">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-neutral-400"
          >
            Portfolio Showcase
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-6 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white">Featured </span>
            <span className="text-brand-neon">Projects</span>
          </motion.h2>
        </motion.div>

        {/* Projects Grid */}
        <div
          onScroll={(e) => {
            const container = e.currentTarget;
            const firstChild = container.firstElementChild as HTMLElement;
            if (firstChild) {
              // gap-6 is 1.5rem = 24px
              const gap = 24;
              const stride = firstChild.offsetWidth + gap;
              const newIndex = Math.round(container.scrollLeft / stride);
              // Only update if changed to avoid excessive re-renders
              if (newIndex !== activeProjectIndex) {
                setActiveProjectIndex(newIndex);
              }
            }
          }}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-6 sm:gap-8 md:grid md:grid-cols-2 scrollbar-hide"
        >
          {(projectsData || [])
            .sort((a, b) => b.id - a.id)
            .map((project, index) => (
              <div key={project.id} className="flex-shrink-0 w-[85vw] md:w-auto snap-center">
                <ProjectCard
                  project={project}
                  index={index}
                  inView={inView}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
        </div>

        {/* Dot Indicators (Mobile Only) */}
        <div className="flex justify-center gap-2 mb-12 md:hidden">
          {(projectsData || [])
            .sort((a, b) => b.id - a.id)
            .map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = document.querySelector('#projects .overflow-x-auto');
                  if (container) {
                    const firstChild = container.firstElementChild as HTMLElement;
                    if (firstChild) {
                      const gap = 24;
                      const stride = firstChild.offsetWidth + gap;
                      container.scrollTo({ left: index * stride, behavior: 'smooth' });
                    }
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === activeProjectIndex ? 'bg-brand-neon w-6' : 'bg-neutral-800 w-1.5'
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800"
              >
                <div className="p-6 sm:p-8 lg:p-12">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight pr-4">
                      {selectedProject.title}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(null)}
                      className="p-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-neutral-400 mb-8 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-neutral-900 text-neutral-300 border border-neutral-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 font-medium bg-transparent border-2 border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-black transition-all duration-300 text-sm sm:text-base"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Demo</span>
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 font-medium bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base"
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;