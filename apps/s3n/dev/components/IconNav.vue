<template>
  <nav class="w-16 min-h-screen bg-[#0A0F0D] border-r border-white/10 flex flex-col items-center py-4 space-y-8">
    <a href="#" class="text-xl font-bold"><img class="w-10" src="~/assets/img/s3n.png" alt=""></a>
    
    <div class="flex flex-col space-y-4">
      <a href="#" class="text-white hover:text-white/80" title="Dashboard">
        <LayoutDashboardIcon class="h-6 w-6" />
      </a>
      <a href="#" class="text-gray-400 hover:text-white" title="Documentation">
        <BookOpenIcon class="h-6 w-6" />
      </a>
      <a href="#" class="text-gray-400 hover:text-white" title="API Reference">
        <CodeIcon class="h-6 w-6" />
      </a>
      <a href="#" class="text-gray-400 hover:text-white" title="Community">
        <MessageSquareIcon class="h-6 w-6" />
      </a>
      <a href="#" class="text-gray-400 hover:text-white" title="GitHub">
        <GithubIcon class="h-6 w-6" />
      </a>
      <a href="#" class="text-gray-400 hover:text-white" title="Telegram">
        <SendIcon class="h-6 w-6" />
      </a>
    </div>
  </nav>
</template>

<script setup>
import { LayoutDashboardIcon, BookOpenIcon, CodeIcon, MessageSquareIcon, GithubIcon, SendIcon } from 'lucide-vue-next'
</script>