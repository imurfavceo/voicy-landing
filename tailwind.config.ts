import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [tailwindcssAnimate]
}

export default config 