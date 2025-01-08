<template>
  <div class="initiatives gap-2 text-sm">
    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">S3N</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        S3N by ZERO Labs is collection of tools in an interoperated stack with
        the sole purpose of championing and productionising self-sovereign
        verifiable data. It started as a decentralised identity protocol but has
        slowly evolved to tackle a wider range of issues surrounding user data.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <ScrambleBtn
          to="https://s3n.xyz/"
          content="Learn more"
          type="inverse-alt"
        />
        <Scramble to="https://docs.0xzero.org/" content="Documentation" />
      </div>
    </div>

    <div class="bg-[#fff] rounded-3xl p-5 text-black w-full column-ends">
      <h3 class="font-bold negative">The Forge</h3>
      <p
        class="negative font-normal text-[14px] md:text-[16px] mt-2 text-left z-10 relative"
      >
        The Forge is yet another AVS built on
        <a href="https://eigenlayer.xyz" class="negative underline"
          >EigenLayer</a
        >
        through the
        <a href="https://othentic.xyz" class="negative underline"
          >Othentic Stack</a
        >, designed to verifiably register any IP on Story Protocol unleashing
        access to unlimited IP. It's currently designed to support only data
        from social networks in order to make them composable as well as provide
        legal protection for their use.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <ScrambleBtn content="Learn more" type="inverse-alt" />
        <Scramble
          to="https://github.com/0xZeroLabs/the-forge/blob/main/README.md"
          content="Become an operator"
        />
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
