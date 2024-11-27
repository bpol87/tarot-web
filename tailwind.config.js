/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        drawCard: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "50%": { transform: "translateY(-200px) scale(1.2)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        flipCard: {
          "0%": { transform: "rotateY(0)" },
          "100%": { transform: "rotateY(180deg)" },
        },
      },
      animation: {
        drawCard: "drawCard 1s ease-in-out forwards",
        flipCard: "flipCard 0.6s ease-in-out forwards",
      },
      transform: {
        "style-3d": "preserve-3d",
      },
      perspective: {
        DEFAULT: "1000px",
      }
    },
  },
  plugins: [],
};
