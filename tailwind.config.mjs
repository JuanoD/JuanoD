// @ts-check
import catppuccin from "@catppuccin/tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    animate,
    catppuccin({
      prefix: "cat",
      defaultFlavour: "mocha",
    }),
    // https://play.tailwindcss.com/u34Y0G769l?file=config
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "auto-fill": (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
          }),
          "auto-fit": (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
          }),
        },
        {
          values: theme("width", {}),
        }
      );
    }),
  ],
};
