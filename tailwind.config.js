/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bnv-primary': '#A70336',    // Rojo carmesí
        'bnv-secondary': '#273376',  // Azul marino
        'bnv-tertiary': '#FFCF07',   // Amarillo oro
      },
    },
  },
  plugins: [],
};