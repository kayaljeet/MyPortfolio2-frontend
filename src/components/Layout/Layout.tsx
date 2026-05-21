import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import { useTheme } from '../../contexts/ThemeContext';
import DotGrid from '../common/DotGrid';

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
      className="min-h-screen bg-gradient-to-b from-[#030303] via-[#060606] to-[#010101] text-white grain-texture"
    >
      <div className="relative z-10">
        {/* Dot Grid Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <DotGrid
            dotSize={1.5}
            gap={32}
            baseColor="rgba(0, 255, 0, 0.08)"
            glowColor="rgba(0, 255, 0, 0.85)"
            proximity={130}
          />
        </div>

        <div className="relative z-10">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </motion.div>
  );
};

export default Layout;