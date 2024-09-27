<template>
    <Transition name="cover" :duration="300">
        <span v-if="menuOpen" class="fixed z-[100] w-screen h-screen top-0 left-0 bg-[#00000080] backdrop-blur cursor-default"></span>
    </Transition>
    <div class="w-full py-4 flex justify-start items-center fixed top-0 z-[999]">
        <div class="z-[999] flex flex-wrap gap-2 justify-start items-center text-white w-[calc(100%-10px)]"
            ref="menuContent">
            <router-link to="/" class="h-[40px] border-[0.5px] border-[#fff] btn">
                <img src="@/assets/logo.svg" class="w-fit h-4">
            </router-link>
            <button @click="toggleMenuState"
                class="w-[40px] h-[40px] border-[0.5px] border-[#fff] btn">
                <svg class="fill-white shrink-0" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1"
                        class="transform origin-center transition duration-200 ease-out"
                        :class="{ '!rotate-180': menuOpen }" />
                    <rect y="7" width="16" height="2" rx="1"
                        class="transform origin-center rotate-90 transition duration-200 ease-out"
                        :class="{ '!rotate-180': menuOpen }" />
                </svg>
            </button>
            <Transition name="menu" :duration="250">
                <div v-if="menuOpen" class="contents gap-2">
                    <button class="nav-button h-[40px] border-[0.5px] border-[#fff] btn">
                        <router-link to="/solutions" class="nav-buttonnk"><Scramble content="Solutions" /></router-link>
                    </button>
                    <button class="nav-button h-[40px] border-[0.5px] border-[#fff] btn">
                        <router-link to="/developers" class="nav-buttonnk"><Scramble content="Developers" /></router-link>
                    </button>
                    <button class="nav-button h-[40px] border-[0.5px] border-[#fff] btn">
                        <router-link to="/company" class=""><Scramble content="Company" /></router-link>
                    </button>
                    <button @click="toggleWaitlistState"
                        class="nav-button w-[140px] h-[40px] border-[0.5px] border-[#fff] btn">
                        <span><Scramble content="Join Waitlist" /></span>
                    </button>
                </div>
            </Transition>
        </div>
        <Transition name="waitlist">
            <div v-if="waitlistOpen" class="absolute w-full">
                <Waitlist />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

let waitlistOpen = ref(false);
const toggleWaitlistState = () => {
    waitlistOpen.value = !waitlistOpen.value;
};

let menuOpen = ref(false);
const toggleMenuState = () => {
    menuOpen.value = !menuOpen.value;
    waitlistOpen.value = false;
};

const menuContent = ref(null);

const handleClickOutside = (event: any) => {
    if (menuContent.value && !(menuContent.value as HTMLElement).contains(event.target)) {
        menuOpen.value = false;
        waitlistOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.menu-enter-active button {
    transition: all 0.1s ease-in-out;
}

.menu-enter-from button,
.menu-leave-to button {
    transform: translateX(-10px);
    opacity: 0;
}

.menu-enter-active button:nth-child(1),
.menu-enter-from button:nth-child(4),
.menu-leave-to button:nth-child(4) {
    transition-delay: 0.1s;
}

.menu-enter-active button:nth-child(2),
.menu-enter-from button:nth-child(3),
.menu-leave-to button:nth-child(3) {
    transition-delay: 0.15s;
}

.menu-enter-active button:nth-child(3),
.menu-enter-from button:nth-child(2),
.menu-leave-to button:nth-child(2) {
    transition-delay: 0.2s;
}

.menu-enter-active button:nth-child(4),
.menu-enter-from button:nth-child(1),
.menu-leave-to button:nth-child(1) {
    transition-delay: 0.25s;
}
</style>