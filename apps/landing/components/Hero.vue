<template>
    <div
        class="min-w-full min-h-[calc(100vh-252px)] rounded-3xl p-5 mt-[72px] relative overflow-hidden flex justify-start items-center text-black gap-3 bg-white">
        <div class="">
            <img src="@/assets/statue-head.png" alt="" class="hidden absolute z-0 -scale-x-100 w-[400px] h-fit -bottom-[100px] right-0">
            <h1 class="negative font-normal text-[24px] md:text-[32px] text-left mb-4 z-10 relative">
                Empowering self-sovereignty through zero-knowledge
            </h1>
            <h2 class="negative font-normal text-[16px] md:text-[19px] text-left mb-8 z-10 relative">
                ZERO Labs is building solutions to accelerate real-world value for the open web with secure and trustless data ownership.
            </h2>
            <div class="gap-2 flex justify-start items-center z-10 relative">
                <ScrambleBtn content="Explore protocol" type="inverse-alt" />
                <a href="https://docs.0xzero.org/developers/zero-sdk"
                    class="negative text-sm"><Scramble content="Read whitepaper" /></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>