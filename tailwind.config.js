/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#5DB896",
        secondary: "#F156B3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
