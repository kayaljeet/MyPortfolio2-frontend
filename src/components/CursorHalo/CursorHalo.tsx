import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface CursorPosition {
  x: number;
  y: number;
}

const CursorHalo: React.FC = () => {
  const { theme } = useTheme();
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track interactive elements for enhanced halo effect
    const handleInteractiveHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('button, a, input, textarea, [role="button"], [tabindex]:not([tabindex="-1"])');
      setIsHovering(isInteractive);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleInteractiveHover);
    document.addEventListener('mouseout', () => setIsHovering(false));

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleInteractiveHover);
      document.removeEventListener('mouseout', () => setIsHovering(false));
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen">
      {/* Main cursor halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer glow */}
        <div
          className={`w-32 h-32 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-radial from-cyan-400/20 via-purple-500/15 to-transparent'
              : 'bg-gradient-radial from-blue-400/25 via-indigo-500/20 to-transparent'
          }`}
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 70%)'
          }}
        />
        
        {/* Inner core */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-cyan-300 to-purple-400'
              : 'bg-gradient-to-br from-blue-400 to-indigo-500'
          }`}
          animate={{
            scale: isHovering ? 1.2 : 0.8,
            rotate: 360,
          }}
          transition={{
            scale: { duration: 0.2 },
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.div>

      {/* Trailing particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            background: theme === 'dark'
              ? 'linear-gradient(45deg, #22d3ee, #a855f7)'
              : 'linear-gradient(45deg, #3b82f6, #6366f1)',
          }}
          animate={{
            x: [0, -20 - i * 10, -40 - i * 15],
            y: [0, -10 - i * 5, -20 - i * 8],
            opacity: [0.6, 0.3, 0],
            scale: [1, 0.8, 0.4],
          }}
          transition={{
            duration: 0.8 + i * 0.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default CursorHalo;