<script setup lang="ts">
let value = ref("Launch App");
const use = () => {
  value.value = "Coming Soon";
  setTimeout(() => {
    value.value = "Launch App";
  }, 3000);
};

const angel1 = ref() as unknown as any;
</script>
<template>
  <div class="min-h-full">
    <Head>
      <title>ZΞRO Labs - Unlocking real-world value for DeFi</title>
    </Head>
    <!-- Hero -->
    <div
      class="min-w-full min-h-[calc(100vh-100px)] relative overflow-hidden flex flex-col justify-center items-center font-SpaceGrotesk text-white gap-3 bg-[url('@/assets/bg.png')] bg-cover bg-no-repeat">
      <div class="max-w-[1536px] uppercase">
        <h1 class="z-[999] font-bold text-[30px] md:text-[55px] text-center">
          Your Universal zk-Identity and Financial Passport
        </h1>
        <h2 class="font-normal text-[19px] md:text-[24px] text-center mb-8 capitalize">
          Simplifying DeFi and Web3 with Self-Sovereign Omnichain Identity and Trust
        </h2>
        <div class="w-full flex justify-center items-center">
          <button @click="use" class="bg-[#1e1e1e] w-[168px] h-[48px] border-[0.2px] border-[#fff] m-3 btn">
            <span class="">{{ value }}</span>
          </button>
          <a href="https://docs.0xzero.org/developers/zero-sdk"
            class="text-white font-SpaceGrotesk font-bold text-lg capitalize hover:underline m-3">Build with ZERO</a>
        </div>
      </div>
      <img src="@/assets/angel.svg" alt="angel"
        class="w-[320px] 2xl:w-[380px] an1 absolute md:bottom-0 -left-[94px] hidden md:block" :draggable="false" />

      <img src="@/assets/angel.svg" alt="angel"
        class="w-[320px] 2xl:w-[400px] an2 -scale-x-100 absolute md:bottom-0 -right-[94px] hidden md:block"
        :draggable="false" />

      <a href="#partners" class="h-fit w-fit">
        <img src="@/assets/arrow.svg" alt="angel"
          class="w-[40px] -scale-x-100 absolute bottom-[4px] md:bottom-[16px] animate-bounce left-0 right-0"
          style="margin: 0 auto;" :draggable="false" />
      </a>
    </div>
    <Partners />

    <!-- About -->
    <div
      class="relative max-w-full flex min-h-fit max-h-[550px] justify-center items-center bg-white bg-cover bg-center bg-no-repeat bg-none">
      <div
        class="max-w-[1536px] solutions-backdrop text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
        <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center text-black">
          THE <span class="underline">MISSION</span>
        </h1>
        <p
          class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px] text-black">
          At ZERO, we're building a future where you have complete control
          over your digital identity and can navigate the new web with
          confidence.
        </p>
        <p
          class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px] text-black">
          We believe in a world where you can seamlessly prove who you are, what you know, and what you own - without
          sacrificing your privacy.</p>
        <p
          class="z-20 font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px] text-black">
          Our mission is to empower you to navigate the Web3 landscape with confidence, unlocking opportunities and
          experiences based on your verifiable credentials.
        </p>
      </div>
      <img src="@/assets/Zero-coin.png" alt="Zero-coin"
        class="w-[calc(320px)] absolute -bottom-48 z-10 cursor-crosshair ml-[10%] h-fit -left-72 hidden lg:block"
        :draggable="false">
    </div>
    <!-- Solutions -->
    <div id="solutions">
      <div class="bg-black w-full z-30">
        <div class="max-w-full bg-black flex in1 justify-center items-center bg-none">
          <img src="@/assets/statue-head.png" alt="Zero-coin"
            class="w-[calc(320px)] cursor-crosshair mr-[10%] h-fit hidden lg:block" :draggable="false">
          <div
            class="w-full lg:max-w-[45%] border-[#111111]  solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
            <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
              IDENTITY
            </h1>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Issue and verify zk-proof self-sovereign credentials for dynamic use anywhere.
            </p>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              ZERO's omIDs let you share verifiable credentials without exposing your personal information, ensuring
              both
              privacy and trust.
            </p>
          </div>
        </div>
        <div class="max-w-full flex in1 justify-center items-center bg-none">
          <div
            class="w-full lg:max-w-[45%] border-[#111111]  solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
            <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
              PASSPORT
            </h1>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Access, manage and control your digital identity on any wallet across chains.
            </p>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Your omPassport is your key to Web3, securely linking your wallets and credentials across chains while
              maintaining your privacy.
            </p>
          </div>
          <img src="@/assets/passport.png" alt="Zero-coin"
            class="w-[calc(320px)] cursor-crosshair ml-[10%] h-fit hidden lg:block" :draggable="false">
        </div>
        <div class="max-w-full flex in1 justify-center items-center bg-none">
          <img src="@/assets/vault.png" alt="Zero-coin"
            class="w-[calc(320px)] cursor-crosshair mr-[10%] h-fit hidden lg:block" :draggable="false">
          <div
            class="w-full lg:max-w-[45%] border-[#111111]  solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
            <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
              BALANCE
            </h1>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Make seamless & borderless payments through gasless abstraction.
            </p>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              While omBalance can simplify payments, its true power lies in enabling access to exclusive services and
              opportunities based on your verified credentials.
            </p>
          </div>
        </div>
        <div class="max-w-full flex in1 justify-center items-center bg-none">
          <div
            class="w-full lg:max-w-[45%] border-[#111111] solutions-backdrop border-b md:text-left py-4 md:h-[calc(50vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-10">
            <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-center">
              SMART KEY
            </h1>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Secure your identity, and your funds using secure passkeys.
            </p>
            <p class="font-SpaceGrotesk font-normal text-[19px] md:text-[24px] text-center md:text-left max-w-[1536px]">
              Safeguard your credentials and data with advanced encryption and passkeys, ensuring only you have access.
            </p>
          </div>
          <img src="@/assets/discord-qr.png" alt="qr-code"
            class="w-[calc(320px)] cursor-crosshair ml-[10%] h-fit hidden lg:block" :draggable="false">
        </div>
      </div>
    </div>
  </div>
</template>
