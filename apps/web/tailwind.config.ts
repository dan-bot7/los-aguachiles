import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aguachile: "#12A86B",
        "aguachile-dark": "#08784D",
        navy: "#164154",
        sea: "#DFF7F2",
        lime: "#C9EC4F",
        coral: "#FF6F61",
        shell: "#F7FBF7",
        ink: "#102F3F"
      },
      boxShadow: {
        soft: "0 18px 42px rgba(16, 47, 63, 0.12)",
        card: "0 12px 28px rgba(16, 47, 63, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
