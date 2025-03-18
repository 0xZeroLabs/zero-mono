<template>
  <div class="w-full py-20">
    <div class="container mx-auto px-5">
      <h1 class="text-5xl font-bold uppercase text-[#EE6F53] mb-10">
        Posts tagged: <span class="negative">{{ $route.params.tag }}</span> ✦
      </h1>

      <div class="mb-6">
        <nuxt-link to="/blog" class="text-[#EE6F53] uppercase font-semibold">
          ← Back to all posts
        </nuxt-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="(post, index) in posts"
          :key="post.path"
          :post="post"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const tag = route.params.tag as string;

const { data: posts } = await useAsyncData(`tag-posts-${tag}`, () => {
  return queryCollection("blog")
    .where("tags", "like", `%${tag}%`)
    .order("date", "DESC")
    .all();
});

useSeoMeta({
  title: `Posts tagged: ${tag}`,
  ogTitle: `Posts tagged: ${tag} | S3N Blog`,
  description: `Browse all blog posts tagged with ${tag}`,
  ogDescription: `Browse all blog posts tagged with ${tag}`,
  ogImage: "/blog-hero.png",
  twitterCard: "summary_large_image",
  twitterSite: "@s3ndotxyz",
});
</script>
