import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";

const site = "https://juanod.com";

// https://astro.build/config
export default defineConfig({
  // vite: {
  //   resolve: {
  //     alias: {
  //       three: resolve("./src/three/exports.js"),
  //       three_modules: resolve("./node_modules/three"),
  //     },
  //   },
  // },
  site,
  image: {
    domains: ["skillicons.dev", "raw.githubusercontent.com"],
  },
  integrations: [
    tailwind(),
    react({
      experimentalReactChildren: true,
    }),
    robotsTxt({ sitemap: false, host: true }),
  ],
});
