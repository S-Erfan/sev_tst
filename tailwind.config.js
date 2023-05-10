/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
