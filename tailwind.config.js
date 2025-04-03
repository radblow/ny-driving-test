/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // добавляем поддержку тёмной темы
  theme: {
    extend: {},
  },
  plugins: [],
}
