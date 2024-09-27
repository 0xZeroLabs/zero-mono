<template>
    <div class="min-w-[1056px] md:min-w-[1664px] h-fit partner-slide inline-block whitespace-nowrap">
        <div class="flex items-center justify-around">
            <img class="w-44 h-fit md:w-52 logo" src="@/assets/viction-logo.svg" alt="viction" :draggable="false" />
            <img class="w-44 h-fit md:w-52 logo" src="@/assets/aligned-logo-white.svg" alt="aligned"
                :draggable="false" />
            <img class="w-32 h-fit md:w-40 logo" src="@/assets/irys-white.svg" alt="irys" :draggable="false" />
            <img class="w-44 h-fit md:w-52 logo" src="@/assets/sindri-white.svg" alt="sindri" :draggable="false" />
        </div>
    </div>
</template>

<style scoped>
img {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}
</style>