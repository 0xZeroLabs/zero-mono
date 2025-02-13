import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./auth-schema.ts",
  dbCredentials: {
    url: process.env.PGURL as string,
  },
  verbose: true,
  strict: true,
});
