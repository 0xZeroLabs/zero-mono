<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white/5 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-2">Active Projects</h3>
      <p class="text-3xl font-bold">{{ stats.activeProjects }}</p>
    </div>
    <div class="bg-white/5 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-2">API Calls (24h)</h3>
      <p class="text-3xl font-bold">{{ stats.apiCalls.toLocaleString() }}</p>
    </div>
    <div class="bg-white/5 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-2">Team Members</h3>
      <p class="text-3xl font-bold">{{ stats.teamMembers }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>