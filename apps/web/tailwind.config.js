/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22C55E",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#166534",
          800: "#14532D",
          900: "#0F3D22",
        },
        accent: {
          DEFAULT: "#FACC15",
          50: "#FEFCE8",
          100: "#FEF9C3",
          400: "#FACC15",
          500: "#EAB308",
        },
        card: "#F0FDF4",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(22, 101, 52, 0.12)",
        glow: "0 0 24px -4px rgba(34, 197, 94, 0.4)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #22C55E 0%, #166534 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #FACC15 0%, #22C55E 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
