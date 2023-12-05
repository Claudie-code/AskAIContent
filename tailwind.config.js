// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        appBg: "#FAFDFE",
        subtleBg: "#F2FAFB",

        // Interactive components
        elementBg: "#DEF7F9",
        hoveredElementBg: "#CAF1F6",
        activeElementBg: "#B5E9F0",

        // Borders and separators
        subtleBorder: "#9DDDE7",
        border: "#9DDDE7",
        hoveredBorder: "#3DB9CF",

        // Solid colors
        solidBg: "#00A2C7",
        hoveredSolidBg: "#0797B9",

        // Accessible text
        subtleText: "#107D98",
        text: "#0D3C48",
      },
    },
  },
  plugins: [],
};
