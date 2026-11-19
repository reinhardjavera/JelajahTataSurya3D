/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        void: '#03050a',
        panel: 'rgba(10, 15, 28, 0.68)',
      }
    },
  },
  plugins: [],
}
