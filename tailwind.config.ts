import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Cabinet Grotesk", "sans-serif"],
      "general-sans": ["General Sans", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        value: "url('/value.svg')",
        timer: "url('/grid.svg')",
        team: "url('/teams_bg.svg')",
        home: "url('/reg_bg.svg')",
        registered: "url('/bg_hero_reg.svg')",
      },
      colors: {
        agblack: "#030404",
        brred: "#3C00DC",
        brblue: "#FF5001",
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
            transform: "translateX-100%)",
          },
          "100%": {
            transform: "translateX(150%)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
