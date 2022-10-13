/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.3)" },
        },
      },
      animation: {
        zoom: "zoom 300ms ease-in forwards",
      },
    },
  },
  plugins: [],
};
