/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #db3803, #e5cc00, #a8c567, #7bbad2, #588fb5)',
      },

      keyframes: {
        floatbg: {
          "0%,100%": {
            backgroundPosition: "0px 0px",
          },
          "25%": {
            backgroundPosition: "20px -20px",
          },
          "50%": {
            backgroundPosition: "0px -40px",
          },
          "75%": {
            backgroundPosition: "-20px -20px",
          },
        },
      },

      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        floatbg: "floatbg 20s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};