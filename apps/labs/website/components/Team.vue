<template>
  <div class="initiatives gap-2 text-sm">
    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">Ewan</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        Technically focused with a passion for maths and cryptography.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <Scramble to="https://x.com/ewanretorokugbe" content="X (Twitter)" />
        <span class="mx-2">✦</span>
        <Scramble
          to="https://linkedin.com/in/ewanretorokugbe"
          content="LinkedIn"
        />
        <span class="mx-2">✦</span>
        <Scramble to="https://github.com/hey-ewan" content="GitHub" />
      </div>
    </div>

    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">Tobi</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        Serial founder and leader of some great software developer communities.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <Scramble to="https://x.com/defiboyszn" content="X (Twitter)" />
        <span class="mx-2">✦</span>
        <Scramble
          to="https://linkedin.com/in/tobithealpha"
          content="LinkedIn"
        />
        <span class="mx-2">✦</span>
        <Scramble to="https://github.com/defiboyszn" content="GitHub" />
      </div>
    </div>

    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">Dave</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        Professional engineer who mastered content and growth.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <Scramble to="https://x.com/serrdavee" content="X (Twitter)" />
        <span class="mx-2">✦</span>
        <Scramble to="https://linkedin.com/in/ser-dave" content="LinkedIn" />
      </div>
    </div>

    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">Adriel</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        Eloquent in the arts, embodies creativity.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <Scramble to="https://x.com/" content="X (Twitter)" />
        <!-- <span class="mx-2">✦</span>
        <Scramble to="https://linkedin.com/in/" content="LinkedIn" /> -->
      </div>
    </div>

    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">Alake</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        Math-pilled, cryptography and rust lover. Alake builds systems that
        scale.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <Scramble to="https://x.com/g4titan_" content="X (Twitter)" />
        <span class="mx-2">✦</span>
        <Scramble to="https://github.com/g4titanx" content="GitHub" />
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply font-light;
}

h3 {
  @apply text-[19px] md:text-[24px];
}

p {
  @apply text-sm;
}

.initiatives {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, auto);
}

.column-ends {
  grid-column-end: span 4;
}

.row-ends {
  grid-row-end: span 2;
}

@media (min-width: 1024px) {
  .column-ends {
    grid-column-end: span calc(4 / 2);
  }

  .row-ends {
    grid-column-end: span calc(2);
  }
}
</style>
