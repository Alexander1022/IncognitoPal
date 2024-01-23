/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx, ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require("tailwindcss-animate"),
  ],
}