<template>
  <div
    class="bg-[#00231f] rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(238,111,83,0.2)] border border-transparent hover:border-[#EE6F53]/20"
  >
    <nuxt-link :to="post.path" class="block h-full group">
      <div class="relative h-48 overflow-hidden">
        <img
          :src="post.image || '/blog-placeholder.png'"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#001917]/80 to-transparent"
        ></div>
        <div
          v-if="post.tags && post.tags.length"
          class="absolute top-3 right-3 flex gap-1 flex-wrap justify-end max-w-[60%]"
        >
          <span
            v-for="tag in post.tags.slice(0, 2)"
            :key="tag"
            class="px-2 py-0.5 text-xs rounded-lg bg-[#EE6F53] text-[#001917] uppercase font-bold backdrop-blur-sm"
          >
            {{ tag }}
          </span>
          <span
            v-if="post.tags.length > 2"
            class="px-2 py-0.5 text-xs rounded-lg bg-[#EE6F53] text-[#001917] uppercase font-bold backdrop-blur-sm"
          >
            +{{ post.tags.length - 2 }}
          </span>
        </div>
      </div>
      <div class="p-6">
        <span
          v-if="post.date"
          class="inline-block mb-3 text-sm text-[#EE6F53] font-medium border-b border-[#EE6F53]/20 pb-1"
        >
          {{ formatDate(post.date) }}
        </span>
        <h2 class="text-xl font-bold text-[#EE6F53] mb-3 line-clamp-2">
          {{ post.title }}
        </h2>
        <p class="text-white/80 text-sm mb-5 line-clamp-2">
          {{ post.description }}
        </p>
        <div
          class="text-[#EE6F53] font-semibold uppercase text-sm flex items-center"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const formatDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
