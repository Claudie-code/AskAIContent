// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bgPrimary: "#F4FAFF",
        bgSecondary: "#2196F3",

        // Interactive components
        interactivePrimary: "#D5EFFF",
        interactiveSecondary: "#FFC300",

        // Borders and separators
        borderPrimary: "#5EB1EF",
        borderSecondary: "#888888",

        // Solid colors
        solidPrimary: "#0090FF",
        solidSecondary: "#800080",

        // Accessible text
        textPrimary: "#113264",
        textSecondary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
