<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Fixed Navbar -->
    <Navbar />

    <!-- Fixed Sidebar -->
    <aside class="fixed top-16 left-0 bottom-0 w-64 bg-gray-900 text-white">
      <Sidebar />
    </aside>

    <!-- Scrollable Page Content -->
    <main class="ml-64 pt-16 p-4 min-h-screen overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<!-- Layout Js Script -->
<script>
// local imports
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  },
}
</script>
