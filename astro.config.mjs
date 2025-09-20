import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";

const site = "https://juanod.com";

// https://astro.build/config
export default defineConfig({
  site,

  image: {
    domains: ["skillicons.dev", "raw.githubusercontent.com"],
  },

  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    robotsTxt({ sitemap: false, host: true }),
  ],

  vite: {
    plugins: [tailwindcss()],
    // resolve: {
    //   alias: {
    //     three: resolve("./src/three/exports.js"),
    //     three_modules: resolve("./node_modules/three"),
    //   },
    // },
  },
});
