import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: "#0E558C", // Almost Navy
        fuschia_maked: "#E21860", // Fuschia
        sky: "#4499E3", // New Sky Blue
        deepBlue: "#114B7E", // Name for #114B7E
        lightBlue: "#1F88E4", // Name for #1F88E4
        deepRed: "#770F2E", // Name for #770F2E
        brightRed: "#DD1C55", // Name for #DD1C55
      },
    },
  },
  plugins: [heroui() , require('@tailwindcss/typography')],
} satisfies Config;

