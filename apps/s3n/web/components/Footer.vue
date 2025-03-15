<template>
  <div class="w-full py-4 flex justify-between items-center px-5">
    <div class="flex items-center ml-2 text-[#EE6F53] font-bold">
      All rights reserved © {{ new Date().getFullYear() }}.
    </div>
    <router-link to="/" class="h-[40px] btn">
      <img src="@/assets/img/s3n.svg" class="w-fit h-7" />
    </router-link>
  </div>
</template>
