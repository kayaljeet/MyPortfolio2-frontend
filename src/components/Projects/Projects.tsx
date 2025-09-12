import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, Folder, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProjectsData } from '../../hooks/useProjectsData';

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
  theme: string;
  inView: boolean;
  onClick: () => void;
}> = ({ project, index, theme, inView, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        boxShadow: theme === 'dark' 
          ? '0 30px 60px rgba(168, 85, 247, 0.3)' 
          : '0 30px 60px rgba(59, 130, 246, 0.2)',
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 group relative ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-purple-500/20 hover:border-purple-400/50'
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-blue-200/50 hover:border-blue-300/70 shadow-lg hover:shadow-2xl'
      }`}
    >
      {/* Project Image/Icon Section */}
      <div className={`h-56 relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20'
          : 'bg-gradient-to-br from-blue-600/20 to-purple-600/20'
      }`}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
        ) : (
          <motion.div
            className="w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Folder className={`w-20 h-20 ${theme === 'dark' ? 'text-purple-400' : 'text-blue-600'}`} />
          </motion.div>
        )}
        
        {/* Overlay with category */}
        <div className="absolute top-4 left-4">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              theme === 'dark'
                ? 'bg-purple-900/80 text-purple-300 border border-purple-500/30'
                : 'bg-blue-100/80 text-blue-700 border border-blue-200/50'
            }`}
          >
            {project.category}
          </motion.span>
        </div>
        
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative">
        <motion.h3 
          className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className={`mb-4 line-clamp-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {project.description}
        </motion.p>
        
        {/* Tech Stack */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6 }}
        >
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.7 + techIndex * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-purple-900/50 text-purple-300'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span 
              className={`px-3 py-1 rounded-full text-sm ${
                theme === 'dark'
                  ? 'bg-slate-700 text-gray-400'
                  : 'bg-gray-200 text-gray-600'
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 1 }}
            >
              +{project.technologies.length - 3} more
            </motion.span>
          )}
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          className="flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.8 }}
        >
          {project.demoUrl && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                  : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.a>
          )}
        </motion.div>
        
        {/* Decorative corner element */}
        <motion.div
          className={`absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300 ${
            theme === 'dark' ? 'text-purple-400' : 'text-blue-600'
          }`}
          whileHover={{ rotate: 180, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          <Star className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const { data: projectsData } = useProjectsData();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden content-shift ${
      inView ? 'shifted' : ''
    } ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/70' 
        : 'bg-gradient-to-br from-white/90 via-gray-50/70 to-white/90'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, ${theme === 'dark' ? '#8b5cf6' : '#3b82f6'} 25%, transparent 25%), 
                           linear-gradient(-45deg, ${theme === 'dark' ? '#8b5cf6' : '#3b82f6'} 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, ${theme === 'dark' ? '#8b5cf6' : '#3b82f6'} 75%), 
                           linear-gradient(-45deg, transparent 75%, ${theme === 'dark' ? '#8b5cf6' : '#3b82f6'} 75%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }} />
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
            <Folder className="w-4 h-4 mr-2" />
            Portfolio Showcase
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
              Featured Projects
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

        {/* Projects Grid with Masonry-like Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {(projectsData || []).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              theme={theme}
              inView={inView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-purple-500/30 backdrop-blur-xl'
                    : 'bg-gradient-to-br from-white/95 to-gray-50/95 border border-blue-200/50 backdrop-blur-xl shadow-2xl'
                }`}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <motion.h3 
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(null)}
                      className={`p-3 rounded-full transition-all duration-300 ${
                        theme === 'dark'
                          ? 'hover:bg-slate-700 text-gray-400 hover:text-white hover:shadow-lg'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:shadow-lg'
                      }`}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  
                  <motion.p 
                    className={`text-lg mb-8 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedProject.longDescription || selectedProject.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedProject.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-100 text-blue-700 border border-blue-200/50'
                        }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedProject.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                        }`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>View Demo</span>
                      </motion.a>
                    )}
                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                          theme === 'dark'
                            ? 'border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                            : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                  </motion.div>
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