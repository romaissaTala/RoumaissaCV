import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A843",
          light: "#E8C472",
          dark: "#B8922E",
        },
        dark: {
          DEFAULT: "#1A1A1A",
          card: "#222222",
          sidebar: "#1E1E1E",
          input: "#2A2A2A",
          border: "#333333",
          hover: "#2E2E2E",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-right": "slideRight 0.4s ease-out",
        "skill-fill": "skillFill 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        skillFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--skill-width)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
