<template>
    <div class="w-full flex justify-center">
        <div
            class="relative max-w-[94%] in1 rounded-md flex min-h-fit max-h-[720px] justify-center items-center bg-white bg-cover bg-center bg-no-repeat bg-none">
            <div
                class="max-w-[1536px] text-left py-4 min-h-[calc(52vh)] flex flex-col justify-center items-center md:items-start relative font-SpaceGrotesk text-white gap-3 px-6">
                <h1 class="font-SpaceGrotesk font-bold text-[40px] md:text-[70px] capitalize text-left text-black">
                    <span class="negative">FAQs</span>
                </h1>
                <div
                    class="font-SpaceGrotesk negative font-normal text-[19px] md:text-[24px] text-left md:text-left max-w-[1536px] text-black">
                    <div class="accordion-items" ref="accordionItems">
                        <div class="text-xl md:text-2xl cursor-pointer mb-4">When will these FAQs ready?</div>
                        <div class="toggle">
                            It's currently a work in progress, and we're taking proactive steps to answer your
                            burning questions in this section.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const accordionItems = ref();


</script>