/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      serif: ['Bitter', 'serif']
    },
    extend: {
      colors: {
        'dark': '#10101A',
        'white': '#F7F7F7',
        'blue': '#a4c2f4',
        'blue-hover': '#ebbae4'
      },
    },
  },
  plugins: [],
}