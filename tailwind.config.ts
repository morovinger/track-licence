import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        // Page background
        body: '#f0f4fa',  // Light blue-gray for page background
        // Primary navy blue palette
        primary: {
          DEFAULT: '#123f90',  // Main brand color
          100: '#dbdbf9',      // Light backgrounds
          200: '#b7b7f3',      // Lighter accents  
          400: '#6e6fe7',      // Gradients
          500: '#123f90',      // Main (same as DEFAULT)
          600: '#2e2ba3',      // Darker accents
          700: '#22207a',      // Dark backgrounds
          800: '#171652',      // Hover states
          900: '#0b0b29',      // Text/darkest
        },
        // Success green
        success: {
          500: '#22C55E',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #22207a 0%, #123f90 50%, #22207a 100%)',
        'card-gradient': 'linear-gradient(180deg, #123f90 0%, #22207a 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(18, 63, 144, 0.15)',
        'card-hover': '0 8px 30px rgba(18, 63, 144, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config


