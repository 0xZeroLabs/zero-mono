<template>
  <Tabs default-value="account" class="w-[400px]">
    <Navigation />
  </Tabs>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
console.log(colorMode);
</script>
