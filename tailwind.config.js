/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fef7ec',
          100: '#fbe9ca',
          200: '#f7d097',
          300: '#f1b05b',
          400: '#ec8e2d',
          500: '#e67419',
          600: '#c95213',
          700: '#a73a13',
          800: '#872e16',
          900: '#712715',
        },
        // Добавляем цвет для border если нужно
        border: '#e5e7eb', // цвет по умолчанию для border-gray-300
      },
      borderColor: {
        DEFAULT: '#e5e7eb', // тоже устанавливаем дефолтный цвет border
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'size': 'width, height',
      },
    },
  },
  plugins: [],
}