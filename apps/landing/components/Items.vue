<template>
    <div class="h-fit partners-track">
        <div class="w-44 h-fit md:w-52 logo">
            <img class="w-full logo" src="@/assets/morph-logo-white.svg" alt="morph" :draggable="false" />
        </div>
        <div class="w-44 h-fit md:w-52 logo">
            <img class="w-full logo" src="@/assets/aligned-logo-white.svg" alt="aligned" :draggable="false" />
        </div>
        <div class="w-32 h-fit md:w-40 logo">
            <img class="w-full logo" src="@/assets/irys-white.svg" alt="irys" :draggable="false" />
        </div>
        <div class="w-44 h-fit md:w-52 logo">
            <img class="w-full logo" src="@/assets/sindri-white.svg" alt="sindri" :draggable="false" />
        </div>
        <div class="w-44 h-fit md:w-52 logo">
            <img class="w-full logo" src="@/assets/kwil-logo-white.svg" alt="kwil" :draggable="false" />
        </div>
    </div>
</template>

<style scoped>
img {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
}

.logo {
    @apply mx-[7vw];
}
</style>