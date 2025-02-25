<template>
  <a
    :href="to"
    target="_blank"
    v-if="props.type === 'regular'"
    class="scramble-text"
    @mouseenter="startScramble"
    @mouseleave="stopScramble"
  >
    <div>
      <span class="negative" v-for="(char, index) in displayText" :key="index">
        {{ char }}
      </span>
    </div>
  </a>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
    default: "regular",
  },
});

const displayText = ref(props.content.split(""));
let scrambleInterval: NodeJS.Timeout | null = null;

const scramble = () => {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#________"; // Characters to insert randomly

  for (let i = 0; i < displayText.value.length; i++) {
    // 50% chance to replace with a random character
    if (Math.random() < 0.5) {
      displayText.value[i] = randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    } else {
      // Otherwise, perform the shuffling
      const j = Math.floor(Math.random() * displayText.value.length);
      [displayText.value[i], displayText.value[j]] = [
        displayText.value[j],
        displayText.value[i],
      ];
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
    displayText.value = props.content.split("");
  }, 500);
};

const stopScramble = () => {
  if (scrambleInterval) {
    clearInterval(scrambleInterval);
    scrambleInterval = null;
  }
  displayText.value = props.content.split("");
};

const changeState = () => {
  stopScramble();
  displayText.value = props.content.split("");
};
</script>

<style scoped>
.scramble-text {
  display: inline-block;
  transition: all 0.1s ease-in-out;
}
</style>
