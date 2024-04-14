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
        value: "url('https://ik.imagekit.io/xlvg9oc4k/Antigravity/value.svg?updatedAt=1713114097599')",
        timer: "url('https://ik.imagekit.io/xlvg9oc4k/Antigravity/grid.svg?updatedAt=1713111242912')",
        team: "url('https://ik.imagekit.io/xlvg9oc4k/Antigravity/teams_bg.svg?updatedAt=1713114096677')",
        home: "url('https://ik.imagekit.io/xlvg9oc4k/Antigravity/reg_bg.svg?updatedAt=1713114634378')",
        registered: "url('https://ik.imagekit.io/xlvg9oc4k/Antigravity/bg_hero_reg.svg?updatedAt=1713114088618')",
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
