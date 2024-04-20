// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  pwa: {
    manifest: {
      name: "Zero ID - Passport",
      short_name: "Zero ID",
      description: "The omni-identity protocol.",
      theme_color: "#000",
      icons: [
        {
          src: "icon.png",
          sizes: "1080x1080",
          type: "image/png"
        }
      ],
    },
    workbox: {
      navigateFallback: "/"
    },
    devOptions: {
      enabled: false,
      type: "module"
    },
  }
});
