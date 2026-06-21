import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aguachile: "#E9281E",
        "aguachile-dark": "#B91F18",
        "brand-blue": "#1687C9",
        "brand-blue-dark": "#064B78",
        navy: "#064B78",
        sea: "#FFF4E2",
        lime: "#FFC247",
        coral: "#F47B20",
        fresh: "#1687C9",
        shell: "#FFF4E2",
        ink: "#252525"
      },
      boxShadow: {
        soft: "0 18px 42px rgba(6, 75, 120, 0.14)",
        card: "0 12px 28px rgba(6, 75, 120, 0.1)"
      }
    }
  },
  plugins: []
};

export default config;
