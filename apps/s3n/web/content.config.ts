import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
