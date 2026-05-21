import React, { useRef, useEffect } from 'react';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  glowColor?: string;
  proximity?: number;
  className?: string;
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Dot {
  x0: number;
  y0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  r: number;
  g: number;
  b: number;
  isActive: boolean;
}

// Robust color parsing helper
const parseColor = (colorStr: string): RGBA => {
  const trimmed = colorStr.trim();
  
  // Hex #RRGGBB
  const hexMatch = trimmed.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
      a: 1,
    };
  }
  
  // Hex #RGB
  const hexShortMatch = trimmed.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (hexShortMatch) {
    return {
      r: parseInt(hexShortMatch[1] + hexShortMatch[1], 16),
      g: parseInt(hexShortMatch[2] + hexShortMatch[2], 16),
      b: parseInt(hexShortMatch[3] + hexShortMatch[3], 16),
      a: 1,
    };
  }
  
  // rgb(...) or rgba(...)
  const rgbaMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  
  // Fallback default green
  return { r: 0, g: 255, b: 0, a: 1 };
};

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 1.5,
  gap = 30,
  baseColor = 'rgba(0, 255, 0, 0.08)',
  glowColor = 'rgba(0, 255, 0, 0.85)',
  proximity = 120,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: 0,
    y: 0,
    isInside: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Dot[] = [];

    // Parse colors to RGBA for smooth interpolation
    const startRGBA = parseColor(baseColor);
    const endRGBA = parseColor(glowColor);

    const initGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Handle high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.floor(width / gap) + 1;
      const rows = Math.floor(height / gap) + 1;

      // Center the grid slightly
      const offsetX = (width - (cols - 1) * gap) / 2;
      const offsetY = (height - (rows - 1) * gap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = offsetX + i * gap;
          const y0 = offsetY + j * gap;
          dots.push({
            x0,
            y0,
            x: x0,
            y: y0,
            vx: 0,
            vy: 0,
            size: dotSize,
            alpha: startRGBA.a,
            r: startRGBA.r,
            g: startRGBA.g,
            b: startRGBA.b,
            isActive: false,
          });
        }
      }
    };

    // Initialize grid size
    initGrid();

    // Spring constants
    const springK = 0.03;
    const damping = 0.85;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Group dots by resting vs active for massive batch drawing optimization
      const restingDots: Dot[] = [];
      const activeDots: Dot[] = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Vector from mouse to dot origin
        const dx = dot.x0 - mouse.x;
        const dy = dot.y0 - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.x0;
        let targetY = dot.y0;
        let targetSize = dotSize;
        let ratio = 0;

        if (mouse.isInside && d < proximity) {
          // Normalize proximity ratio (1.0 at center, 0.0 at outer bound)
          ratio = (proximity - d) / proximity;
          
          // Push distance scales with intensity
          const pushDist = ratio * 12;
          const pushAngle = Math.atan2(dy, dx);
          
          targetX = dot.x0 + Math.cos(pushAngle) * pushDist;
          targetY = dot.y0 + Math.sin(pushAngle) * pushDist;
          targetSize = dotSize * (1 + ratio * 1.5);
        }

        // Apply spring physics
        const ax = (targetX - dot.x) * springK;
        const ay = (targetY - dot.y) * springK;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Easing visual properties
        dot.size += (targetSize - dot.size) * 0.1;
        dot.r += ((startRGBA.r + (endRGBA.r - startRGBA.r) * ratio) - dot.r) * 0.1;
        dot.g += ((startRGBA.g + (endRGBA.g - startRGBA.g) * ratio) - dot.g) * 0.1;
        dot.b += ((startRGBA.b + (endRGBA.b - startRGBA.b) * ratio) - dot.b) * 0.1;
        dot.alpha += ((startRGBA.a + (endRGBA.a - startRGBA.a) * ratio) - dot.alpha) * 0.1;

        // Check if dot is active/moving or fully at rest
        const isMoving = Math.abs(dot.x - dot.x0) > 0.05 || Math.abs(dot.y - dot.y0) > 0.05;
        const isStylingActive = dot.alpha > startRGBA.a + 0.01;
        
        dot.isActive = isMoving || isStylingActive || (mouse.isInside && d < proximity);

        if (dot.isActive) {
          activeDots.push(dot);
        } else {
          // Snap back to exact base values to prevent infinite micro-calculations
          dot.x = dot.x0;
          dot.y = dot.y0;
          dot.vx = 0;
          dot.vy = 0;
          dot.size = dotSize;
          dot.r = startRGBA.r;
          dot.g = startRGBA.g;
          dot.b = startRGBA.b;
          dot.alpha = startRGBA.a;
          restingDots.push(dot);
        }
      }

      // 1. Draw resting dots in a single batch path (extremely fast)
      ctx.fillStyle = `rgba(${startRGBA.r}, ${startRGBA.g}, ${startRGBA.b}, ${startRGBA.a})`;
      ctx.beginPath();
      for (let i = 0; i < restingDots.length; i++) {
        const dot = restingDots[i];
        // Use arc or small rects. Arc is prettier.
        ctx.moveTo(dot.x + dotSize, dot.y);
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
      }
      ctx.fill();

      // 2. Draw active dots individually with custom styling
      for (let i = 0; i < activeDots.length; i++) {
        const dot = activeDots[i];
        ctx.fillStyle = `rgba(${Math.round(dot.r)}, ${Math.round(dot.g)}, ${Math.round(dot.b)}, ${dot.alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Event listeners attached to window for seamless interaction across layouts
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate coordinates relative to canvas
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotSize, gap, baseColor, glowColor, proximity]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
    />
  );
};

export default DotGrid;
