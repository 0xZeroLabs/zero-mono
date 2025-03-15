<template>
  <div class="w-full px-5">
    <ul class="uppercase text-[#EE6F53] font-semibold">
      <li><nuxt-link to="https://x.com/s3ndotxyz">x.com</nuxt-link></li>
      <li><nuxt-link to="https://t.me/s3ndotxyz">telegram</nuxt-link></li>
      <li><nuxt-link to="https://discord.gg/s3ndotxyz">discord</nuxt-link></li>
    </ul>
    <div class="w-full flex justify-between items-center py-4">
      <div class="flex items-center text-[#EE6F53] font-bold">
        All rights reserved © {{ new Date().getFullYear() }}.
      </div>
      <router-link to="/" class="h-[40px] btn">
        <img src="@/assets/img/s3n.svg" class="w-fit h-7" />
      </router-link>
    </div>
  </div>
</template>
