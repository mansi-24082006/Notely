/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}" // include CSS files too
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E"
      }
    }
  },
  plugins: []
};
