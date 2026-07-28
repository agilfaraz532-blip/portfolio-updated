/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: "#050816",
        primary: "#2563EB",
        accent: "#06B6D4",
        secondaryAccent: "#7C3AED",
        textPrimary: "#F8FAFC",
        textSecondary: "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
