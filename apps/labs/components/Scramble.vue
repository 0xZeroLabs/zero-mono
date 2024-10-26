<template>
    <span class="negative"v-for="(char, index) in displayText" :key="index" @mouseenter="startScramble" @mouseleave="stopScramble">
      {{ char }}
    </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const displayText = ref(props.content.split(''));
let scrambleInterval: NodeJS.Timeout | null = null;

const scramble = () => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#________'; // Characters to insert randomly

  for (let i = 0; i < displayText.value.length; i++) {
    // 50% chance to replace with a random character
    if (Math.random() < 0.5) {
      displayText.value[i] = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    } else {
      // Otherwise, perform the shuffling
      const j = Math.floor(Math.random() * displayText.value.length);
      [displayText.value[i], displayText.value[j]] = [displayText.value[j], displayText.value[i]];
    }
  }
};

const startScramble = () => {
  if (scrambleInterval) {
    clearInterval(scrambleInterval);
  }

  scrambleInterval = setInterval(scramble, 25);

  setTimeout(() => {
    if (scrambleInterval) {
      clearInterval(scrambleInterval);
      scrambleInterval = null;
    }
    displayText.value = props.content.split('');
  }, 800);
};

const stopScramble = () => {
  if (scrambleInterval) {
    clearInterval(scrambleInterval);
    scrambleInterval = null;
  }
  displayText.value = props.content.split('');
};
</script>

<style scoped>
.scramble-text span {
  display: inline-block;
  transition: all 0.1s ease-in-out;
}
</style>
