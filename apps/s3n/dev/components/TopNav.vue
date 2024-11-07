<template>
  <nav class="border-b border-white/10 px-6 py-4">
    <div class="max-w-[1400px] mx-auto flex items-center justify-between">
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="search" 
            placeholder="Search..." 
            class="w-full bg-black/20 border border-white/10 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
          />
          <span class="absolute right-3 top-2.5 text-xs text-gray-400">Ctrl K</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <a href="mailto:team@0xzero.org" class="text-sm hover:text-white/80">Support</a>
        <a href="https://z02zx88jlm9.typeform.com/to/kg3RzFcs" class="px-4 py-1.5 border border-white/20 rounded-md text-sm hover:bg-white/5">
          Collaborate <ArrowRight class="h-3 w-3 inline" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { SearchIcon, ArrowRight } from 'lucide-vue-next'
</script>