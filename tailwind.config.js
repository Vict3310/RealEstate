/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        offwhite: "#F9F9F7",
        bronze: "#8C7E6A",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        30: "7.5rem",
      },
      transitionTimingFunction: {
        power4out: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      },
      keyframes: {
        scrolldown: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        scrolldown: 'scrolldown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite',
      }
    },
  },
  plugins: [],
};