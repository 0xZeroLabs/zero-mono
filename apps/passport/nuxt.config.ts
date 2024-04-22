// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss"],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  pwa: {
    manifest: {
      name: "ZERO",
      short_name: "ZERO",
      description: "The omni-identity protocol.",
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
      icons: [
        {
          src: "icon.png",
          sizes: "1080x1080",
          type: "image/png"
        }
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ['**/*.{js,css,html,json,svg,webp}'],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst',
        }
      ]
    },
    devOptions: {
      enabled: false,
      type: "module"
    },
  }
});
