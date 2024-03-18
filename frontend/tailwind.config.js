/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#469eef",
        "secondary": "#e9ebf0",
        "black": "#353935",
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

