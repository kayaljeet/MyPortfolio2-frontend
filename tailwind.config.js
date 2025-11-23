/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Consolas', "'Courier New'", 'monospace'],
        mono: ['Consolas', "'Courier New'", 'monospace'],
      },
      colors: {
        'brand-neon': '#00FF00',
        'brand-neon-dim': '#39FF14',
        neutral: {
          1000: '#000000',
          950: '#0a0a0a',
          900: '#111111',
          850: '#151515',
          800: '#1a1a1a',
          750: '#1f1f1f',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#888888',
          400: '#999999',
          300: '#aaaaaa',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      letterSpacing: {
        tighter: '-0.02em',
        'extra-tight': '-0.03em',
        widest: '0.15em',
      },
      borderColor: {
        'subtle': '#1a1a1a',
        'subtle-hover': '#2a2a2a',
      },
      fontSize: {
        'display': ['6.5rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '400' }],
        'display-sm': ['5rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '400' }],
        'heading-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
