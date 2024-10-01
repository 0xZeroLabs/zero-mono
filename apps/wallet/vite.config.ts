import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        background: "./src/background.ts",
        content: "./src/content.ts",
      },
      output: {
        dir: "dist",
        entryFileNames: "[name].js",
      },
    },
  },
});
