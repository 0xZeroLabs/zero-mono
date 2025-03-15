<template>
  <div
    class="w-full py-4 flex justify-between items-center fixed top-0 z-[999] px-5"
  >
    <div class="flex items-center"></div>
    <div
      class="z-[999] flex flex-wrap gap-2 justify-end items-center text-white max-w-[calc(100%-10px)]"
      ref="menuContent"
    >
      <Transition name="menu" :duration="250">
        <ul
          class="gap-2 contents"
          :class="{ '!pointer-events-none': !menuOpen }"
        >
          <Motion
            v-for="i in items"
            :key="i.id"
            as="li"
            :initial="{ x: 4, opacity: 0 }"
            :animate="menuOpen ? { x: 0, opacity: 1 } : { x: 4, opacity: 0 }"
            :transition="
              menuOpen
                ? { delay: (items.length - 1 - i.id) * 0.05 }
                : { delay: i.id * 0.05 }
            "
            class="inline-block"
          >
            <nuxt-link class="h-[36px] bg-[#EE6F53] mx-1 btn" :to="i.url"
              >{{ i.name }}
            </nuxt-link>
          </Motion>
        </ul>
      </Transition>
      <button @click="toggleMenuState" class="w-[40px] h-[40px] btn">
        <svg
          class="fill-[#EE6F53] shrink-0"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="11"
            width="24"
            height="2"
            rx="1"
            class="transform origin-center -translate-y-1 transition duration-200 ease-out"
            :class="{ '!rotate-[45deg]': menuOpen, '!translate-y-0': menuOpen }"
          />
          <rect
            y="11"
            width="24"
            height="2"
            rx="1"
            class="transform origin-center translate-y-1 transition duration-200 ease-out"
            :class="{
              '!-rotate-[45deg]': menuOpen,
              '!translate-y-0': menuOpen,
            }"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion, useAnimate, stagger } from "motion-v";

let menuOpen = ref(false);
const toggleMenuState = () => {
  menuOpen.value = !menuOpen.value;
};

const menuContent = ref(null);

const handleClickOutside = (event: any) => {
  if (
    menuContent.value &&
    !(menuContent.value as HTMLElement).contains(event.target)
  ) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const items = [
  {
    name: "Portal",
    url: "/",
    // children: [],
    external: false,
  },
  {
    name: "Docs",
    url: "/",
    // children: [],
    external: false,
  },
].map((i, j) => ({
  ...i,
  id: j,
}));
</script>
