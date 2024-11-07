<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">Quick Access</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a v-for="link in links" :key="link.id" href="#" class="block p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
        <component :is="getIcon(link.icon)" class="h-6 w-6 mb-4" />
        <h3 class="text-lg font-semibold mb-2">{{ link.title }}</h3>
        <p class="text-sm text-gray-400">{{ link.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup>
import { BookOpenIcon, CodeIcon, SettingsIcon, HelpCircleIcon } from 'lucide-vue-next'

defineProps({
  links: {
    type: Array,
    required: true
  }
})

function getIcon(iconName) {
  const icons = {
    BookOpen: BookOpenIcon,
    Code: CodeIcon,
    Settings: SettingsIcon,
    HelpCircle: HelpCircleIcon
  }
  return icons[iconName] || HelpCircleIcon
}
</script>