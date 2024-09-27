<template>
    <div
        class="min-w-full min-h-[calc(100vh-252px)] rounded-3xl p-5 mt-[72px] relative overflow-hidden flex flex-col justify-center items-center text-black gap-3 bg-white">
        <div class="">
            <img src="@/assets/statue-head.png" alt="" class="hidden absolute z-0 -scale-x-100 w-[400px] h-fit -bottom-[100px] right-0">
            <h1 class="negative font-normal text-[30px] md:text-[55px] text-left mb-4 z-10 relative">
                Empowering self-sovereignty through zero-knowledge
            </h1>
            <h2 class="negative font-normal text-[19px] md:text-[24px] text-left ml-8 md:ml-12 lg:ml-0 mb-8 z-10 relative">
                ZERO Labs is building solutions to accelerate real-world value for the open web with secure data ownership and trust.
            </h2>
            <div class="gap-2 flex justify-start items-center z-10 relative">
                <button @click="use" class="bg-[#e9e9e9] w-[168px] h-[40px] border-[0.2px] border-[#000] btn2">
                    <span class="negative"><Scramble :content="value" /></span>
                </button>
                <a href="https://docs.0xzero.org/developers/zero-sdk"
                    class="negative text-sm"><Scramble content="Read whitepaper" /></a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
let value = ref("Explore protocol");
const use = () => {
    value.value = "Coming soon..";
    setTimeout(() => {
        value.value = "Explore protocol";
    }, 1500);
};
</script>