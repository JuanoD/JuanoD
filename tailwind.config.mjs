// @ts-check
import animate from "tailwindcss-animate";
import catppuccin from "@catppuccin/tailwindcss";
import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
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
    flowbite,
  ],
};
