<script setup lang="ts">
let value = ref("Launch App");
const use = () => {
  value.value = "Coming Soon";
  setTimeout(() => {
    value.value = "Launch App";
  }, 3000);
};
</script>
<template>
  <div class="min-h-full">
    <Head>
      <title>ZΞRO Labs - Unlocking real-world value for DeFi</title>
    </Head>
    <!-- Hero -->
    <div
      class="min-w-full min-h-[calc(100vh-100px)] flex flex-col justify-center items-center font-SpaceGrotesk text-white gap-3 bg-[url('@/assets/bg.png')] bg-cover bg-no-repeat">
      <div class="max-w-[1536px]">
        <h1 class="z-[999] font-bold text-[30px] md:text-[60px] text-center">
          Your Universal zk-Identity and Financial Passport
        </h1>
        <h2 class="font-normal text-[19px] md:text-[24px] text-center mb-8">
          Simplifying DeFi and Web3 with Self-Sovereign Omnichain Identity and Trust
        </h2>
        <div class="w-full flex justify-center items-center">
          <button @click="use" class="bg-[#1e1e1e] w-[168px] h-[48px] border-[0.2px] border-[#fff] m-3">
            <span class="">{{ value }}</span>
          </button>
          <a href="https://docs.0xzero.org/developers/zero-sdk"
            class="text-white font-SpaceGrotesk font-bold text-lg capitalize hover:underline m-3">Build with ZERO</a>
        </div>
      </div>
      <img src="@/assets/angel.svg" alt="angel"
        class="w-[320px] 2xl:w-[380px] absolute md:bottom-[100px] 2xl:bottom-[100px] -left-[94px] hidden md:block"
        :draggable="false" />
    </div>
    <Sponsors />
    <!-- About -->
    <div class="max-w-full flex justify-center items-center">
      <div
        class="w-full mb-8 md:max-w-[50%] border-[#111111] border-b md:text-left my-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
        <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
          THE <span class="underline">MISSION</span>
        </h1>
        <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
          At ZERO, we believe in a future where you have complete control
          over your digital identity and can navigate the DeFi and Web3 world with
          confidence.
        </p>
        <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
          We achieve this through a suite of core functionalities
          designed to streamline identity management and empower you financially.
        </p>
      </div>
      <img src="@/assets/Zero-coin.png" alt="Zero-coin" class="w-[320px] h-fit hidden md:block" :draggable="false">
    </div>
    <!-- Solutions -->
    <div class="max-w-full flex justify-center items-center">
      <div
        class="w-full md:max-w-[calc(50%+320px)] border-[#111111] border-b md:text-left my-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
        <h1 class="font-bold text-[40px] md:text-[70px] text-center">OUR <span class="underline">SOLUTION</span>
        </h1>
        <div
          class="w-full mb-8 flex flex-row gap-10 justify-between items-center scrollbar-hide overflow-scroll min-h-fit relative">
          <div
            class="w-[300px] md:w-[643px] pb-8 md:pb-0 min-h-[240px] text-start px-10 bg-[#4e584d] border border-white feature">
            <h1 class="font-bold text-[40px] md:text-[70px] capitalize">Identity</h1>
            <p class="font-normal text-[18px] md:text-[24px]">
              Issue and verify verifiable credentials for various use cases.
            </p>
          </div>
          <div
            class="w-[300px] md:w-[643px] pb-8 md:pb-0 min-h-[240px] text-start px-10 bg-[#58574d] border border-white feature">
            <h1 class="font-bold text-[40px] md:text-[70px] capitalize">Passport</h1>
            <p class="font-normal text-[18px] md:text-[24px]">
              Manage and control your digital identity.
            </p>
          </div>
          <div
            class="w-[300px] md:w-[643px] pb-8 md:pb-0 min-h-[240px] text-start px-10 bg-[#4d5158] border border-white feature">
            <h1 class="font-bold text-[40px] md:text-[70px] capitalize">
              Balance
            </h1>
            <p class="font-normal text-[18px] md:text-[24px]">
              Make seamless payments through gasless abstraction.
            </p>
          </div>
          <div
            class="w-[300px] md:w-[643px] pb-8 md:pb-0 min-h-[240px] text-start px-10 bg-[#584d4d] border border-white feature">
            <h1 class="font-bold text-[40px] md:text-[70px] capitalize">
              Passkey
            </h1>
            <p class="font-normal text-[18px] md:text-[24px]">
              Secure your identity, and your funds using secure passkeys.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
