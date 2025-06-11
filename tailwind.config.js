/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bnv-primary': '#820000',
        'bnv-secondary': '#E0D7A2',
        'bnv-tertiary': '#8F8967',
      },
    },
  },
  plugins: [],
};