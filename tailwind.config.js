/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greyLight:"#808080",
        lightgray: "#e6e6e6",
        lightblack : "#1a1a1a",
        gray:"#e6e6e6",
        lightblue:"#2d9bf0",
        lightgreen:"#7df177",
        lightGray: "#e9e8e87a"
      },
      animation: {
        shimmer: "shimmer 2s linear infinite"
      },
      keyframes: {
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        }
      }
    },
  },
  plugins: [],
});


