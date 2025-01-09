<template>
  <h3
    class="text-white font-normal text-[19px] md:text-[24px] text-center my-2 z-10 relative"
  >
    What will you ship?
  </h3>
  <footer class="gap-2 text-sm mb-2">
    <div
      class="bg-[#e8e8e8] rounded-3xl p-5 text-black w-full h-full column-ends row-ends"
    >
      <h5 class="font-bold negative">Developers</h5>
      <ul class="ml-5">
        <li class="">
          <Scramble to="https://github.com/0xZeroLabs" content="Github" />
        </li>
        <li class="">
          <Scramble to="https://docs.0xzero.org/" content="Docs" />
        </li>
        <li class="">
          <Scramble
            to="https://docsend.com/view/2fbpws5p2vsjnqqj"
            content="Whitepaper"
          />
        </li>
        <li class="">
          <Scramble to="/" content="Forum" />
        </li>
        <li class="">
          <Scramble to="/" content="Research" />
        </li>
      </ul>
    </div>
    <div class="bg-[#e8e8e8] rounded-3xl p-5 text-black w-full column-ends">
      <h5 class="font-bold negative">Connect</h5>
      <ul class="ml-5">
        <li class="">
          <Scramble to="https://x.com/0xZeroOrg" content="X (Twitter)" />
        </li>
        <li class="">
          <Scramble to="https://discord.gg/bqscx4Mg5j" content="Discord" />
        </li>
        <li class="">
          <Scramble to="https://t.me/zeroproto" content="Telegram" />
        </li>
        <li class="">
          <Scramble
            to="https://www.linkedin.com/company/0xzero"
            content="LinkedIn"
          />
        </li>
        <li class="">
          <Scramble to="https://youtube.com/@0xZeroOrg" content="YouTube" />
        </li>
      </ul>
    </div>
    <div class="bg-[#e8e8e8] rounded-3xl p-5 text-black w-full column-ends">
      <h5 class="font-bold negative">Company</h5>
      <ul class="ml-5">
        <li class="">
          <Scramble to="/about" content="About Us" />
        </li>
        <li class="">
          <Scramble to="https://paragraph.xyz/@0xzero" content="Blog" />
        </li>
        <li class="">
          <Scramble to="/contact" content="Contact" />
        </li>
        <li class="">
          <Scramble
            to="https://docs.0xzero.org/community/press-kit"
            content="Press Kit"
          />
        </li>
      </ul>
      <h5 class="font-bold negative mt-4">
        ZERO Labs © {{ new Date().getFullYear() }}
      </h5>
    </div>
    <div
      class="w-full bg-[#e8e8e8] rounded-3xl p-4 flex items-center justify-center logo"
    >
      <img class="h-fit w-[calc(100%-64px)] invert" src="@/assets/logo1.svg" />
    </div>
  </footer>
</template>

<style scoped>
a {
  @apply font-light;
}

footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
}

.column-ends {
  grid-column-end: span calc(4 / 2);
}

.row-ends {
  grid-row-end: span 2;
}

.logo {
  grid-column-end: span 4;
}

@media (min-width: 1024px) {
  .logo {
    grid-column-end: span 2;
    grid-row-end: span 1;
  }

  .column-ends {
    grid-column-end: span 1;
    grid-row-end: span 2;
  }

  .row-ends {
    grid-column-end: span 2;
    grid-row-end: span 3;
  }
}
</style>
