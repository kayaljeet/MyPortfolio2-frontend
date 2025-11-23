import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
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
      className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'
        }`}
    >
      <div className="relative">
        {/* Animated background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-purple-400' : 'bg-blue-400'
                } opacity-20`}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
              }}
            />
          ))}
        </div>

        <Header />
        <main>{children}</main>
      </div>
    </motion.div>
  );
};

export default Layout;