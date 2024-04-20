// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
});
