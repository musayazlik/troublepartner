/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        ultrabold: 900,
        maxbold: 1000,
      },
    },
  },
  plugins: [],
};
