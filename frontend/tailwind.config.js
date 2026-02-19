/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Hind Siliguri', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        secondary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)',
        'gradient-dark': 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'hover': '0 12px 48px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
