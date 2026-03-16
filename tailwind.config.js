/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071a33',
          navy2: '#0a2348',
          gold: '#d7a640',
          gold2: '#c18c2e',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.12)',
      },
    },
  },
  plugins: [],
}

