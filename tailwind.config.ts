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
          50: '#e6ebf5',
          100: '#ccd6eb',
          200: '#99add7',
          300: '#6684c3',
          400: '#335baf',
          500: '#0B1A54',  // Main brand color - deep navy
          600: '#091548',
          700: '#07103c',
          800: '#050b30',
          900: '#030624',
        },
        // Accent blue for gradients and highlights
        accent: {
          50: '#e8f1ff',
          100: '#d1e3ff',
          200: '#a3c7ff',
          300: '#75abff',
          400: '#478fff',
          500: '#1E4BCC',  // Vibrant blue
          600: '#183ca3',
          700: '#122d7a',
          800: '#0c1e51',
          900: '#060f29',
        },
        // Orange/Gold for CTAs and prices
        gold: {
          50: '#fff9e6',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffdb66',
          400: '#ffcf33',
          500: '#F5A623',  // Main orange/gold
          600: '#c48500',
          700: '#936300',
          800: '#624200',
          900: '#312100',
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
        'hero-gradient': 'linear-gradient(135deg, #0B1A54 0%, #1E4BCC 50%, #0B1A54 100%)',
        'card-gradient': 'linear-gradient(180deg, #1E3A8A 0%, #0B1A54 100%)',
        'cta-gradient': 'linear-gradient(90deg, #F5A623 0%, #FFD700 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(11, 26, 84, 0.15)',
        'card-hover': '0 8px 30px rgba(11, 26, 84, 0.25)',
        'cta': '0 4px 15px rgba(245, 166, 35, 0.4)',
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


