import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aguachile: "#EE1717",
        "aguachile-dark": "#B90F12",
        "brand-blue": "#0877BE",
        "brand-blue-dark": "#063F7E",
        navy: "#092D5C",
        sea: "#EAF7FF",
        lime: "#0B82C9",
        coral: "#EE1717",
        fresh: "#12A86B",
        shell: "#F8FBFF",
        ink: "#102A43"
      },
      boxShadow: {
        soft: "0 18px 42px rgba(9, 45, 92, 0.14)",
        card: "0 12px 28px rgba(9, 45, 92, 0.1)"
      }
    }
  },
  plugins: []
};

export default config;
