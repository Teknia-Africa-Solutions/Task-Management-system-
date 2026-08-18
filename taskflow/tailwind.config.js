/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#073A0B",
          hover: "#0C4C11",
        },
        cream: {
          DEFAULT: "#F7F7F7",
          card: "#FFFFFF",
        },
        // Primary brand color (#0B5E12)
        primary: {
          50: "#E9F3E9",
          100: "#CFE7D0",
          200: "#A3D2A6",
          300: "#6FB874",
          400: "#3D9A43",
          500: "#0B5E12",
          600: "#094B0E",
          700: "#073A0B",
        },
        // Secondary brand color (#96AF25)
        secondary: {
          50: "#F3F6E2",
          100: "#E4EBC0",
          200: "#CCD98A",
          300: "#B3C557",
          400: "#A2BA3C",
          500: "#96AF25",
          600: "#7C9420",
          700: "#62761A",
        },
        // Accent brand color (#D5966C)
        accent: {
          50: "#FBF2EC",
          100: "#F4DFCF",
          200: "#E9C0A4",
          300: "#DFA687",
          400: "#DA9E79",
          500: "#D5966C",
          600: "#C17F51",
          700: "#A3673F",
        },
        slate2: {
          400: "#7C8B99",
          500: "#5F7080",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
