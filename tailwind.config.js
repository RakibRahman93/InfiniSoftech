/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/admin/**/*.{js,jsx,ts,tsx}",
    "./app/customer/**/*.{js,jsx,ts,tsx}",
    "./app/developer/**/*.{js,jsx,ts,tsx}",
    "./components/admin/**/*.{js,jsx,ts,tsx}",
    "./components/customer/**/*.{js,jsx,ts,tsx}",
    "./components/developer/**/*.{js,jsx,ts,tsx}",
    "./components/common/**/*.{js,jsx,ts,tsx}",
    "./lib/admin/**/*.{js,jsx,ts,tsx}",
    "./lib/customer/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        "muted-foreground": "#8A8A86",
        green: "#4D8A5B",
        gold: "#E2A92D",
        sand: "#F1EDE6",
        cream: "#F8F9FB",
        background: "#FFFFFF",
      },
      fontFamily: {
        display: ["'DM Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};
