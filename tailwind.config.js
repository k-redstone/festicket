import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        kbiz: ["KbizM"], // Medium
        "kbiz-bold": ["KbizB"], // Bold
        "kbiz-heavy": ["KbizH"], // Heavy
      },
    },
  },
  plugins: [],
};
