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
          100: '#FF4F1F', // Coral Orange - Primary Accent
          200: '#41D6C3', // Teal Cyan - Secondary Accent
          300: '#9B5DE5', // Electric Purple - Tertiary Accent
        },
        ui: {
          100: '#0A0A0A', // Charcoal Black - Main Background
          200: '#121212', // Deep Gray - Secondary Background
          300: '#1A1A1A', // Card/Modal Background
          400: '#2A2A2A', // Borders/Dividers
          500: '#9CA3AF', // Muted Text
        },
        background: '#0A0A0A',
        foreground: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', '"General Sans"', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', '"Gambetta"', 'serif'],
      }
    },
  },
  plugins: [],
}
