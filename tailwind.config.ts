import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Cabinet Grotesk", "sans-serif"],
      "general-sans": ["General Sans", "sans-serif"],
    },
    extend: {
      backgroundPosition: {
        "team-bg": "center top",
      },
      objectPosition: {
        "value-bg": "center 20%",
        "landing-bg": "70% top",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        agblack: "#030404",
        brblue: "#3C00DC",
        brred: "#FF5001",
        blue: "#3C00DC",
        agyellow: "#F5EB00",
        agwhite: "#FEFFFF",
        bgblue: "#3C00DC54",
      },
      boxShadow: {
        button: "0 6px 0 0 #030404",
      },
      dropShadow: {
        pressed: "0 0 0 4px linear-gradient(#e66465, #9198e5);",
      },
      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        marqueeRev: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
