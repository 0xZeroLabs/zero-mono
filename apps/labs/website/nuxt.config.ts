// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },

  devServer: {
    port: 3000,
  },

  app: {
    head: {
      titleTemplate: {
        tagPriority: "critical",
        textContent: "%s — ZERO Labs",
      },
    },
  },

  runtimeConfig: {
    litApiKey: process.env.LIT,
    nodeEnv: process.env.NODE_ENV,
  },
  
   plugins: ['~/plugins/spline-viewer.client.ts'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag: any) => {
        return tag === 'spline-viewer';
      }
    }
  },

  colorMode: {
    preference: "dark",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  compatibilityDate: "2024-10-29",
});