/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#3d70b2',
          200: '#5596e6',
          300: '#41d6c3',
        },
        ui: {
          100: '#ffffff',
          200: '#f5f7fa',
          300: '#f0f3f6',
          400: '#dfe3e6',
          500: '#8c9ba5',
        },
        background: '#ffffff',
        foreground: '#1a1a1a',
      },
      fontFamily: {
        sans: ['"General Sans"', 'sans-serif'],
        serif: ['"Gambetta"', 'serif']
      }
    },
  },
  plugins: [],
}
