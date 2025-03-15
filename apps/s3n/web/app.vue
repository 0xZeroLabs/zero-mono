<template>
  <div id="custom-cursor">
    <div class="cursor-fill"></div>
  </div>
  <div class="flex flex-col justify-evenly min-h-[calc(100vh-32px)]">
    <Navigation />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
let cursor: HTMLElement | null = null;

onMounted(() => {
  cursor = document.getElementById("custom-cursor");

  const moveCursor = (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    if (cursor) {
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    }
  };

  const handleMouseDown = () => {
    cursor?.classList.add("cursor-clicked");
  };

  const handleMouseUp = () => {
    cursor?.classList.remove("cursor-clicked");
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mouseup", handleMouseUp);

  // Add and remove cursor-hover class
  document.body.addEventListener("mouseover", (e) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.matches("a, button, input, textarea")
    ) {
      cursor?.classList.add("cursor-hover");
    }
  });

  document.body.addEventListener("mouseout", (e) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.matches("a, button, input, textarea")
    ) {
      cursor?.classList.remove("cursor-hover");
    }
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
  });
});
</script>

<style>
#custom-cursor {
  width: 40px;
  height: 40px;
  border: 2px solid #ee6f53;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.3s ease-out;
  transform: translate(-50%, -50%);
}

.cursor-clicked {
  transform: translate(-50%, -50%) scale(1.5) !important;
}

/* Hide cursor on touch devices */
@media (hover: none) and (pointer: coarse) {
  #custom-cursor {
    display: none;
  }

  body {
    cursor: auto;
  }
}
button {
  /* @apply cursor-crosshair !important; */
}
</style>
