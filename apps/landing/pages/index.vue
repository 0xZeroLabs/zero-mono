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
    <div
      class="max-w-full flex justify-center items-center bg-[url('@/assets/Zero-coin.png')] bg-cover bg-center bg-no-repeat md:bg-none">
      <div
        class="w-full md:max-w-[40%] border-[#111111] bg-[rgba(0,0,0,0.6)] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
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
      <img src="@/assets/Zero-coin.png" alt="Zero-coin" class="w-[calc(320px)] ml-[10%] h-fit hidden md:block"
        :draggable="false">
    </div>
    <!-- Solutions -->
    <div id="solutions">
      <div
        class="max-w-full flex justify-center items-center bg-[url('@/assets/statue-head.png')] bg-cover bg-center bg-no-repeat md:bg-none">
        <img src="@/assets/statue-head.png" alt="Zero-coin" class="w-[calc(320px)] mr-[10%] h-fit hidden md:block"
          :draggable="false">
        <div
          class="w-full md:max-w-[40%] border-[#111111] bg-[rgba(0,0,0,0.6)] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
          <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
            IDENTITY
          </h1>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            Issue and verify zk-proof self-sovereign credentials for use anywhere.
          </p>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            Our omIDs empowers you to verify sensitive information about
            yourself without revealing the underlying details.
          </p>
        </div>
      </div>
      <div
        class="max-w-full flex justify-center items-center bg-[url('@/assets/Zero-coin.png')] bg-cover bg-center bg-no-repeat md:bg-none">
        <div
          class="w-full md:max-w-[40%] border-[#111111] bg-[rgba(0,0,0,0.6)] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
          <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
            PASSPORT
          </h1>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            Make seamless & borderless payments through gasless abstraction.
          </p>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            omBalance gasless abstraction removes the complexity of onchain payments, allowing you to access seamless
            payments and subscriptions.
          </p>
        </div>
        <img src="@/assets/Zero-coin.png" alt="Zero-coin" class="w-[calc(320px)] ml-[10%] h-fit hidden md:block"
          :draggable="false">
      </div>
      <div
        class="max-w-full flex justify-center items-center bg-[url('@/assets/vault.png')] bg-cover bg-center bg-no-repeat md:bg-none">
        <img src="@/assets/vault.png" alt="Zero-coin" class="w-[calc(320px)] mr-[10%] h-fit hidden md:block"
          :draggable="false">
        <div
          class="w-full md:max-w-[40%] border-[#111111] bg-[rgba(0,0,0,0.6)] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
          <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
            BALANCE
          </h1>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            Make seamless & borderless payments through gasless abstraction.
          </p>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            omBalance gasless abstraction removes the complexity of onchain payments, allowing you to access seamless
            payments and subscriptions.
          </p>
        </div>
      </div>
      <div
        class="max-w-full flex justify-center items-center bg-[url('@/assets/0xZero-qr.png')] bg-cover bg-center bg-no-repeat md:bg-none">
        <div
          class="w-full md:max-w-[40%] border-[#111111] bg-[rgba(0,0,0,0.6)] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
          <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
            SMART KEY
          </h1>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            Secure your identity, and your funds using secure passkeys.
          </p>
          <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
            We safegaurd your identity, recovery phrases, and assets using secure encryptions with passkeys to provide
            sovereignty & recoverability.
          </p>
        </div>
        <img src="@/assets/0xZero-qr.png" alt="Zero-coin" class="w-[calc(320px)] ml-[10%] h-fit hidden md:block"
          :draggable="false">
      </div>
    </div>
  </div>
</template>
