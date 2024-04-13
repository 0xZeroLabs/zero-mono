/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
      serif: ["Montserrat"],
      mono: ["Montserrat"],
      display: ["Montserrat"],
      body: ["Montserrat"],
    },
    duration: {
      fast: "1s",
      normal: "3s",
      slow: "9s",
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-glitch")],
  extend: {},
};
