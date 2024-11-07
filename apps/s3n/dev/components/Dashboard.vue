<template>
  <main class="flex-1 p-8 max-w-5xl mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Welcome to the S3N Dev Portal</h1>
      <p class="text-gray-400">Access your development resources and monitor your projects.</p>
    </div>

    <QuickStats :stats="stats" />
    <RecentActivity :activities="recentActivities" />
    <QuickAccess :links="quickAccessLinks" />
  </main>
</template>

<script setup>
const stats = ref({
  activeProjects: 0,
  apiCalls: 0,
  teamMembers: 0
})

const recentActivities = ref([])
const quickAccessLinks = ref([])

onMounted(async () => {
  try {
    const [statsData, activitiesData, linksData] = await Promise.all([
      fetchStats(),
      fetchRecentActivities(),
      fetchQuickAccessLinks()
    ])
    
    stats.value = statsData
    recentActivities.value = activitiesData
    quickAccessLinks.value = linksData
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
})

async function fetchStats() {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    activeProjects: 12,
    apiCalls: 1234567,
    teamMembers: 8
  }
}

async function fetchRecentActivities() {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: 1, type: 'code', message: 'New API endpoint added', time: '2 hours ago' },
    { id: 2, type: 'user', message: 'Team member joined', time: '1 day ago' },
    { id: 3, type: 'alert', message: 'Usage limit warning', time: '2 days ago' }
  ]
}

async function fetchQuickAccessLinks() {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: 1, title: 'Documentation', description: 'Explore guides and tutorials for S3N development.', icon: 'BookOpen' },
    { id: 2, title: 'API Reference', description: 'Detailed information about S3N API endpoints.', icon: 'Code' },
    { id: 3, title: 'Account Settings', description: 'Manage your account and team preferences.', icon: 'Settings' },
    { id: 4, title: 'Support', description: 'Get help from our team or community forums.', icon: 'HelpCircle' }
  ]
}
</script>