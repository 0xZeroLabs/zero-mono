<template>
    <div class="h-screen">
    <head>
      <title>Zero Labs - Unlocking real-world value for DeFi</title>
    </head>
    <div class="wrapper">
      <div class="w-[88.89%] mb-12 md:mb-16">
        <Navigation />
        <h1
          class="text-4xl mb-2 lg:mb-9 md:text-[clamp(3.5rem,4vw,6rem)] leading-[1.1] capitalize"
        >
          Unleashing DeFi's Potential
        </h1>
        <h2
          class="capitalize text-5xl md:text-[clamp(4rem,4vw,7rem)] leading-[1.1] font-extrabold"
        >
          Empowering a New Digital Age
        </h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
console.log(colorMode)
</script>