<template>
  <div v-if="toc && toc.length > 0" class="sticky top-24 hidden lg:block">
    <div class="p-6 bg-[#00231f] rounded-xl shadow-md">
      <h3
        class="text-[#EE6F53] font-bold text-lg mb-6 uppercase flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Table of Contents
      </h3>
      <ul class="space-y-3 border-l-2 border-[#003d34] pl-4">
        <li
          v-for="heading in toc"
          :key="heading.id"
          :class="{
            'ml-0': heading.depth === 2,
            'ml-3': heading.depth === 3,
            'ml-6': heading.depth > 3,
          }"
        >
          <a
            :href="`#${heading.id}`"
            class="text-white hover:text-[#EE6F53] transition-colors duration-200 flex items-center group py-1"
          >
            <span
              class="w-2 h-2 bg-[#003d34] rounded-full mr-2 group-hover:bg-[#EE6F53] transition-colors"
            ></span>
            <span class="text-sm">{{ heading.text }}</span>
          </a>
        </li>
      </ul>

      <!-- Reading progress indicator -->
      <div class="mt-8">
        <div class="h-1 w-full bg-[#003d34] rounded-full">
          <div
            class="h-1 bg-[#EE6F53] rounded-full"
            :style="{ width: readingProgress + '%' }"
          ></div>
        </div>
        <div class="text-xs text-[#EE6F53] mt-2 text-right">
          {{ Math.round(readingProgress) }}% read
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  toc: {
    type: Array,
    default: () => [],
  },
});

const readingProgress = ref(0);

// Calculate reading progress
const calculateReadingProgress = () => {
  const article = document.querySelector(".blog-content");
  if (!article) return;

  const scrollTop = window.scrollY;
  const contentHeight = article.clientHeight;
  const windowHeight = window.innerHeight;

  // Calculate how far the user has scrolled through the content
  const scrollPercentage = (scrollTop / (contentHeight - windowHeight)) * 100;

  // Clamp value between 0 and 100
  readingProgress.value = Math.min(Math.max(scrollPercentage, 0), 100);
};

onMounted(() => {
  window.addEventListener("scroll", calculateReadingProgress);
  calculateReadingProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", calculateReadingProgress);
});
</script>
