<template>
    <button @focus="toggleWaitlistState" class="fixed z-20 w-screen h-screen bg-none" :class="waitlistState"></button>
    <button @focus="toggleMenuState" class="fixed z-20 w-screen h-screen bg-none" :class="menuState"></button>
    <div
        class="bg-[#000]/80 backdrop-blur-sm w-full h-[80px] flex justify-center items-center fixed top-0 border-[#111111]/80 border-b z-20">
        <div
            class="z-[999] flex flex-row justify-between items-center px-5 md:px-10 w-[97%] md:max-w-[1536px] text-white">
            <!-- bg transitions in on-scroll -->
            <a href="/" class="hidden md:block"><img src="@/assets/logo1.svg" /></a>
            <a href="/" class="md:hidden"><img src="@/assets/logo.svg" /></a>

            <ul
                class="bg-[#111111]/80 backdrop-blur-sm hidden md:flex flex-row justify-evenly items-center gap-2 font-SpaceGrotesk font-light capitalize text-md w-[512px] h-[40px] rounded-md border">
                <li><a href="/#" class="nav-link">Ecosystem</a></li>
                <li><a href="/#solutions" class="nav-link">Solutions</a></li>
                <li><a href="/#" class="nav-link">Token</a></li>
                <li><a href="/#" class="nav-link">About</a></li>
                <li><a href="/#" class="nav-link">Contact</a></li>
            </ul>

            <div class="flex">
                <button @click="toggleWaitlistState"
                    class="w-[140px] md:w-[168px] h-[40px] md:h-[48px] border-[0.5px] border-[#fff] btn">
                    <span class="">Join Waitlist</span>
                </button>
                <button @click="toggleMenuState"
                    class="w-[40px] ml-3 md:hidden h-[40px] md:h-[48px] border-[0.5px] border-[#fff] btn">
                    <span class=""><img src="@/assets/ham.svg" class="w-fit h-fit" :class="btnState" alt=""></span>
                    <span class=""><img src="@/assets/cross2.svg" class="w-fit h-fit" :class="menuState" alt=""></span>
                </button>
            </div>
        </div>
        <div class="absolute w-[97%] md:max-w-[1536px]" :class="waitlistState">
            <Waitlist />
        </div>
        <div class="absolute w-[97%] md:max-w-[1536px] z-30" :class="menuState">
            <Menu />
        </div>
    </div>
</template>
<script setup lang="ts">
let waitlistState = ref("hidden")
const toggleWaitlistState = () => {
    if (waitlistState.value == "hidden") {
        waitlistState.value = "fade-in"
        if (menuState.value != "hidden") {
            menuState.value = "hidden"
            btnState.value = "fade-in"
        }
    } else {
        waitlistState.value = "hidden"
    }
}
let menuState = ref("hidden")
let btnState = ref("fade-in")
const toggleMenuState = () => {
    if (menuState.value == "hidden") {
        menuState.value = "fade-in"
        btnState.value = "hidden"
        if (waitlistState.value != "hidden") {
            waitlistState.value = "hidden"
        }
    } else {
        menuState.value = "hidden"
        btnState.value = "fade-in"
    }
}
</script>