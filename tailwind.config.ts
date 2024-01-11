import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "grey-800": "#171A1A",
        "grey-600": "#202328",
        "grey-400": "#7B8699",
        "green-500": "#86C232",
        "red-500": "#FF6161",
      },
      borderWidth: {
        "border-l-10": "border-left-width: 10px",
      },
    },
  },
  plugins: [],
}
export default config

