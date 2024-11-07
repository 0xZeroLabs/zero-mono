<template>
  <section class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Recent Activity</h2>
    <div class="bg-white/5 rounded-lg p-6">
      <ul class="space-y-4">
        <li v-for="activity in activities" :key="activity.id" class="flex items-center gap-4">
          <div :class="getIconClass(activity.type)">
            <component :is="getIcon(activity.type)" class="h-4 w-4" />
          </div>
          <div>
            <p class="font-semibold">{{ activity.message }}</p>
            <p class="text-sm text-gray-400">{{ activity.time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { CodeIcon, UserIcon, AlertCircleIcon } from 'lucide-vue-next'

defineProps({
  activities: {
    type: Array,
    required: true
  }
})

function getIconClass(type) {
  const classes = {
    code: 'bg-blue-500',
    user: 'bg-green-500',
    alert: 'bg-yellow-500'
  }
  return `${classes[type] || 'bg-gray-500'} rounded-full p-2`
}

function getIcon(type) {
  const icons = {
    code: CodeIcon,
    user: UserIcon,
    alert: AlertCircleIcon
  }
  return icons[type] || AlertCircleIcon
}
</script>