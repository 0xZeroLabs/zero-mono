<template>
  <div class="h-full">

    <head>
      <title>ZΞRO Labs - Unlocking real-world value for DeFi</title>
    </head>
    <!-- Hero -->
    <div
      class="min-w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center font-SpaceGrotesk text-white gap-3 bg-[url('@/assets/bg.png')] bg-cover bg-no-repeat">
      <div class="">
        <h1 class="z-[999] font-bold text-[30px] md:text-[60px] text-center">Your Universal zk-Identity and Financial Passport</h1>
        <h2 class="font-normal text-[20px] text-center mb-8">Simplifying DeFi and Web3 with Omnichain Identity and Trust</h2>
        <div class="w-full flex justify-center items-center">
          <button class="bg-[#1e1e1e] w-[168px] h-[48px] border-[0.2px] border-[#fff] m-3">
            <span class="">Launch app</span>
          </button>
          <a href="https://docs.0xzero.org/developers/zero-sdk" class="text-white font-SpaceGrotesk font-bold text-lg capitalize hover:underline m-3">Build with ZERO</a>
        </div>
      </div>
      <img src="@/assets/angel.svg" alt="angel"
        class="w-[320px] 2xl:w-[380px] absolute md:-bottom-[0px] 2xl:-bottom-[0px] -left-[94px] hidden md:block" :draggable="false">
    </div>
    <!-- About -->
    <div
      class="w-full h-screen flex flex-col justify-center items-center relative font-SpaceGrotesk text-white gap-3 px-10">
      <h1 class="font-Italiana font-bold text-[70px]">About <span class="underline">Zero</span></h1>
      <p class="font-SpaceGrotesk font-normal text-[25px] text-center">At Zero, we believe in a future where you have
        complete control over your digital identity and can navigate the
        DeFi and Web3 world with confidence. We achieve this through a suite of core functionalities designed to
        streamline identity management and empower you financially.</p>
      <img src="@/assets/Zero-coin.png" alt="Zero-coin"
        class="w-[320px] 2xl:w-[420px] absolute md:-bottom-[120px] 2xl:-bottom-[80px] right-[10px] hidden md:block" :draggable="false">

    </div>
    <!-- Solutions -->
    <div
      class="w-full pb-16 pt-20 flex flex-col justify-center items-center font-SpaceGrotesk text-white gap-3 px-10 overflow-x-hidden bg-[url('@/assets/bg.png')] bg-cover bg-no-repeat">
      <h1 class="font-bold text-[70px]">Zero Solutions</h1>
      <div
        class="flex 2xl:flex-row 2xl:flex-wrap flex-col gap-10 2xl:justify-between justify-center items-center h-full relative">
        <div
          class="w-[300px] md:w-[643px] h-full pb-16 md:pb-0 md:h-[499px] text-start px-10 bg-white/40 border border-white md:[clip-path:_polygon(0_0,_100%_0%,_100%_100%,_20%_100%,_0_81.27%);]">
          <h1 class="font-bold text-[40px] md:text-[70px]">omID</h1>
          <p class="font-normal text-[18px]">Imagine a world where you can prove you're eligible for something without
            revealing every detail of your personal information. With Zero's zk-powered identities, also known as omIDs,
            you can do just that. This innovative technology leverages zero-knowledge attestation, allowing you to share
            only the necessary information while keeping your sensitive data secure. Each omID is unique and built with
            cutting-edge cryptography, ensuring the utmost privacy. What's even better? A single identity can't be
            linked to multiple omIDs, further protecting your anonymity.</p>

        </div>
        <div
          class="w-[300px] md:w-[643px] h-full pb-16 md:pb-0 md:h-[499px] text-start px-10 bg-white/40 border border-white md:[clip-path:_polygon(0_0,_100%_0%,_100%_100%,_20%_100%,_0_81.27%);]">
          <h1 class="font-bold text-[40px] md:text-[70px]">omPassport</h1>
          <p class="font-normal text-[18px]">Powered by Hyperlane, we bring you omPassports, a SBT (Soulbound Token)
            solution. This innovative solution allows you to choose a single passport that works flawlessly across all
            supported blockchains. With omnichain technology, your verified data seamlessly travels between chains,
            eliminating the need for separate verification processes. This translates to a smoother and more efficient
            experience for you whenever you interact with dApps on different blockchains.

            omPassports offer a unique approach to managing your digital identity. Powered by omIDs, they allow you to
            create multiple passports for several wallets, all linked to a single core identity.</p>

        </div>
        <div
          class="w-[300px] md:w-[643px] h-full pb-16 md:pb-0 md:h-[530px] text-start px-10 bg-white/40 border border-white md:[clip-path:_polygon(0_0,_100%_0%,_100%_100%,_20%_100%,_0_81.27%);]">
          <h1 class="font-bold text-[40px] md:text-[70px]">Aggregated Verifications</h1>
          <p class="font-normal text-[18px]">We leverage aggregated data across multiple supported blockchains and
            wallets to deliver a comprehensive solvency index score. This score provides a clear picture of financial
            health within the ecosystem. Additionally, we employ advanced on-chain monitoring to identify and blacklist
            sybil addresses through their omPassport. These are addresses created by a single entity to manipulate the
            system. By blacklisting these addresses across all supported chains and wallets, we ensure a secure and
            trustworthy on-chain environment for everyone.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// const colorMode = useColorMode();
// console.log(colorMode)
</script>