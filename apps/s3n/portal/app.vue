<script setup lang="ts">
useHead({
  title: "S3N Dev",
  meta: [
    {
      name: "description",
      content: "One-click TEE application deployment.",
    },
  ],
});

useSeoMeta({
  title: "S3N Dev",
  ogTitle: "S3N Dev",
  description: "One-click TEE application deployment.",
  ogDescription: "One-click TEE application deployment.",
  ogImage: "/hero.png",
  twitterCard: "summary_large_image",
  twitterSite: "@s3ndotxyz",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
