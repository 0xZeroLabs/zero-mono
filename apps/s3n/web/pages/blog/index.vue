<template>
  <div class="w-full py-20">
    <div class="container mx-auto px-5">
      <div class="relative mb-14">
        <h1 class="text-5xl font-bold uppercase text-[#EE6F53] relative z-10">
          Blog <span class="negative">Posts</span>
          <span class="inline-block ml-2 transform rotate-12 text-4xl">✦</span>
        </h1>
        <div
          class="absolute -bottom-3 left-0 w-24 h-1 bg-[#EE6F53] opacity-70"
        ></div>
      </div>

      <div class="flex justify-between items-center mb-8">
        <p class="text-white/80 italic">
          Insights, research, and updates from the S3N team.
        </p>
      </div>

      <div
        v-if="posts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <Motion
          as="div"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ staggerChildren: 0.1 }"
          class="contents"
        >
          <BlogCard
            v-for="(post, index) in posts"
            :key="post.path || index"
            :post="post"
            :index="index"
          />
        </Motion>
      </div>
      <div
        v-else
        class="text-center py-16 px-8 bg-[#00231f]/50 rounded-xl border border-[#EE6F53]/20"
      >
        <div class="text-[#EE6F53] text-4xl mb-4">✦</div>
        <p class="text-white text-lg mb-2">No blog posts found</p>
        <p class="text-white/70 text-sm">
          We've not written any articles yet. Stick around!
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

const { data: postsRaw } = await useAsyncData("blog-posts", () => {
  return queryCollection("blog").all();
});

const posts = computed(() => {
  if (!postsRaw.value || !Array.isArray(postsRaw.value)) return [];

  return [...postsRaw.value].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
});

useSeoMeta({
  title: "Blog",
  ogTitle: "S3N Blog",
  description: "Insights, research, and updates from the S3N team.",
  ogDescription: "Insights, research, and updates from the S3N team.",
  ogImage: "/blog-hero.png",
  twitterCard: "summary_large_image",
  twitterSite: "@s3ndotxyz",
});
</script>
