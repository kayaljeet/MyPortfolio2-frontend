import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import CursorHalo from '../CursorHalo/CursorHalo';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'
      }`}
    >
      <CursorHalo />
      <div className="relative">
        {/* Enhanced animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'w-2 h-2' : i % 4 === 1 ? 'w-1 h-1' : i % 4 === 2 ? 'w-3 h-3' : 'w-1.5 h-1.5'
              } ${
                theme === 'dark' 
                  ? ['bg-cyan-400', 'bg-purple-400', 'bg-pink-400', 'bg-blue-400'][i % 4]
                  : ['bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-cyan-400'][i % 4]
              }`}
              animate={{
                x: [0, Math.sin(i) * 200, 0],
                y: [0, Math.cos(i) * 150, 0],
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <Header />
        <main className="relative z-10">{children}</main>
      </div>
    </motion.div>
  );
};

export default Layout;