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
          50: '#CAF0F8',
          100: '#90E0EF',
          200: '#00B4D8',
          300: '#0077B6',
          400: '#03045E',
        },
        ui: {
          100: '#ffffff',
          200: '#f5f7fa',
          300: '#f0f3f6',
          400: '#dfe3e6',
          500: '#8c9ba5',
        },
        offwhite: '#f7f8fa',
        background: '#f7f8fa',
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
