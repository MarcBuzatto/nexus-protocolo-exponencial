import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05050a",
        panel: "#0b0d14",
        grid: "#121623",
        matrix: {
          DEFAULT: "#00ff88",
          dark: "#00a85a",
          glow: "#1aff94",
        },
        cyber: {
          cyan: "#00e5ff",
          red: "#ff0844",
          purple: "#b347ff",
          yellow: "#ffcc00",
          pink: "#ff3ea5",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
        display: ["var(--font-display)", "Orbitron", "sans-serif"],
      },
      animation: {
        "scan-lines": "scanlines 8s linear infinite",
        "flicker": "flicker 3s infinite",
        "glitch-1": "glitch1 2s infinite",
        "glitch-2": "glitch2 3s infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "boot": "boot 1.5s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "border-run": "borderRun 3s linear infinite",
      },
      keyframes: {
        scanlines: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.6" },
        },
        glitch1: {
          "0%, 100%": { transform: "translate(0)", opacity: "1" },
          "20%": { transform: "translate(-2px, 1px)", opacity: "0.9" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" },
        },
        glitch2: {
          "0%, 100%": { clipPath: "inset(0 0 0 0)" },
          "25%": { clipPath: "inset(20% 0 30% 0)" },
          "50%": { clipPath: "inset(60% 0 10% 0)" },
          "75%": { clipPath: "inset(10% 0 70% 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        boot: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        borderRun: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
      },
      boxShadow: {
        "neon-green": "0 0 10px #00ff88, 0 0 20px rgba(0, 255, 136, 0.35)",
        "neon-red": "0 0 10px #ff0844, 0 0 24px rgba(255, 8, 68, 0.4)",
        "neon-cyan": "0 0 10px #00e5ff, 0 0 24px rgba(0, 229, 255, 0.4)",
        "neon-purple": "0 0 10px #b347ff, 0 0 24px rgba(179, 71, 255, 0.4)",
        "inner-panel": "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
      },
      backgroundImage: {
        "grid-cyber":
          "linear-gradient(to right, rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.06) 1px, transparent 1px)",
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
