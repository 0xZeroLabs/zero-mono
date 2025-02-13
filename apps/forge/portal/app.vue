<script setup lang="ts">
useHead({
  title: "The Forge Portal",
  meta: [
    {
      name: "description",
      content:
        "Start registering Verifiable Intellectual Property on Story protocol.",
    },
  ],
});

useSeoMeta({
  title: "The Forge Portal",
  ogTitle: "The Forge Portal",
  description: "Start registering Verifiable Intellectual Property on Story.",
  ogDescription: "Start registering Verifiable Intellectual Property on Story.",
  ogImage: "/hero.png",
  twitterCard: "summary_large_image",
  twitterSite: "@ipforge",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
