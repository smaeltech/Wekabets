import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: "#0b1f4d",
        brandGreen: "#0b9f6a",
        brandRed: "#dc2626"
      }
    }
  },
  plugins: []
};

export default config;
