/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: { 
          DEFAULT: '#0D4F4F', 
          light: '#1a6b6b', 
          dark: '#0a3a3a' 
        },
        mint: { 
          DEFAULT: '#4ECDC4', 
          light: '#80e8e0' 
        },
        coral: { 
          DEFAULT: '#FF6B6B', 
          light: '#ff9b9b' 
        },
      },
    },
  },
  plugins: [],
}
