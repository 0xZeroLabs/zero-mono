//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  runtimeConfig: {
    privateKey: process.env.PRIVATE_KEY,
  },
});
