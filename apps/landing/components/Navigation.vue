<template>
    <div class="bg-[#000]/80 backdrop-blur-sm w-full h-[80px] flex justify-center items-center fixed top-0 border-[#111111]/80 border-b z-20">
        <div class="z-[999] flex flex-row justify-between items-center px-5 md:px-10 w-[97%] md:max-w-[1536px] text-white">
            <!-- bg transitions in on-scroll -->
            <a href="/" class="hidden md:block"><img src="@/assets/logo1.svg" /></a>
            <a href="/" class="md:hidden"><img src="@/assets/logo.svg" /></a>

            <ul class="bg-[#111111]/80 backdrop-blur-sm hidden md:flex flex-row justify-evenly items-center gap-2 font-SpaceGrotesk font-light capitalize text-md w-[512px] h-[40px] rounded-md border">
                <li><a href="/#" class="nav-link">Ecosystem</a></li>
                <li><a href="/#" class="nav-link">Solutions</a></li>
                <li><a href="/#" class="nav-link">Token</a></li>
                <li><a href="/#" class="nav-link">About</a></li>
                <li><a href="/#" class="nav-link">Contact</a></li>
            </ul>

            <div>
                <button class="w-[140px] md:w-[168px] h-[40px] md:h-[48px] border-[0.5px] border-[#fff]">
                    <span class="">Try Demo</span>
                </button>
            </div>
        </div>
    </div>
</template>