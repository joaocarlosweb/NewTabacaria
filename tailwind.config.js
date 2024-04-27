/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontfamily:{
        'sans':['poppins','sans-serif']
      },
      backgroundImage:{
        "home":"url('/imgs/tabacariaimg1.jpg')"
      }
    },
  },
  plugins: [],
}

