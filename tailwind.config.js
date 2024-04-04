/** @type {import('tailwindcss').Config} */
module.exports = {
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
}

