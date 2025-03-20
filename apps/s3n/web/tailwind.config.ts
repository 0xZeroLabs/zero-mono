const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  theme: {
    extend: {
      fontFamily: {
        Neue: ["Neue"],
        Sora: ["Sora"],
        Actay: ["Actay"],
      },
    },
  },
};
