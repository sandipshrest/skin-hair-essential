/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        color1: "#139438",
        color2: "#175785",
        color3: "#1B3C73",
      },
      fontFamily: {
        custom: ["Times New Roman", "sans"],
      },
      // keyframes: {
      //   top: {
      //     "0%": { bottom: "0px", opacity: "0" },
      //     "100%": { bottom: "32px", opacity: "1" },
      //   },
      //   zoom: {
      //     "0%, 100%": { scale: "1" },
      //     "50%": { scale: "1.2" },
      //   },
      // },
      // animation: {
      //   "top-slow": "top 0.5s linear",
      //   "zoom-image": "zoom 6s linear infinite",
      // },
    },
  },
  plugins: [],
};
