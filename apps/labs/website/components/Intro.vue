<template>
  <div class="text-sm relative h-auto">
    <spline-viewer
      url="https://prod.spline.design/wqcsCJFeJl94DdiB/scene.splinecode"
      class="absolute min-h-[260px] lg:h-[320px] hidden"
    ></spline-viewer>
    <div
      class="bg-[#e8e8e8] min-h-[260px]lg:min-h-[320px] rounded-3xl p-5 text-black w-full relative"
    >
      <h3 class="font-bold negative">Foundry of innovation</h3>
      <p class="negative font-normal mt-2 text-left z-10 relative">
        We're a startup committed to solving the intricate challenges that
        hinder self-sovereignty. Our goal is to simplify the process of
        empowering individuals with control over their data, thereby
        safeguarding their privacy. We're dedicated to tackling global
        challenges and are collaborating with diverse teams to achieve the
        collective goal of empowering digital freedom.
      </p>
      <div class="gap-2 flex justify-start items-center z-10 mt-6 relative">
        <ScrambleBtn to="/company" content="Meet the team" type="inverse-alt" />
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

.us {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, auto);
}

.column-ends,
.column-ends2 {
  grid-column-end: span 5;
}

.row-ends {
  grid-row-end: span 2;
}

@media (min-width: 1024px) {
  .column-ends {
    grid-column-end: span calc(5 / 2);
  }

  .column-ends2 {
    grid-column-end: span calc(5 / 3);
  }

  .row-ends {
    grid-column-end: span calc(2);
  }
}
</style>
