// import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode"],
  css: ["~/assets/scss/main.scss"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    preference: "system",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  vite: {
    define: {
      global: "globalThis",
    },

    plugins: [
      // {
      //   // work around for `exports is not defined` error within the crypto-browserify > randomfill dep
      //   name: "crypto-randomfill-patch",
      //   apply: "build",
      //   enforce: "pre",
      //   renderChunk(code, chunk) {
      //     if (!/randomfill.*\.js$/.test(chunk.fileName)) {
      //       return null;
      //     }
      //     console.log("🟪 Patching crypto randomfill dep");
      //     const modifiedCode = code
      //       .split("\n")
      //       .map((line) => {
      //         if (line.trim() === "exports.randomFill = randomFill;") {
      //           return "var exports = {}; exports.randomFill = randomFill;";
      //         }
      //         return line;
      //       })
      //       .join("\n");
      //     return { code: modifiedCode, map: null };
      //   },
      // },
      // nodePolyfills({
      //   include: ["crypto", "stream", "process", "path", "string_decoder"],
      // }),
    ],

    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: (id) => {
    //         // isolate randomfill as a separate chunk
    //         if (id.includes("node_modules/randomfill/browser.js")) {
    //           return "randomfill";
    //         }
    //       },
    //     },
    //   },
    // },
  },

  // nitro: {
  //   preset: "cloudflare-pages",
  //   rollupConfig: {
  //     external: ["cloudflare:sockets"],
  //   },
  //   //   externals: {
  //   //     inline: ["crypto", "stream", "process", "path", "string_decoder"],
  //   //   },
  // },
});
