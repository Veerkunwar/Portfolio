/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#08090D",
          surface: "#101218",
          raised: "#15171F",
          border: "#1E2029",
        },
        ink: {
          DEFAULT: "#F5F5F7",
          muted: "#9297A3",
          faint: "#5C606B",
        },
        accent: {
          violet: "#FF2E4D",
          blue: "#8B0014",
          glow: "#FF5470",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #FF2E4D 0%, #8B0014 100%)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(255,46,77,0.16) 0%, rgba(8,9,13,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(255,46,77,0.45)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: 1 },
          "50%, 100%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};
