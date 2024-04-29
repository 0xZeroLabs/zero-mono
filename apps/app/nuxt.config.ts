// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss", "shadcn-nuxt", '@nuxtjs/color-mode'],
  css: ["~/assets/scss/main.scss"],
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
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
      enabled: true,
      type: "module"
    },
  },
  app: {
    head: {
      title: 'Zero ID - Passport'
    }
  },
  colorMode: {
    preference: 'dark',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
});