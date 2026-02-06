<template lang="">
  <div class="layout">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<!-- Layout Js Script -->
<script>
// local imports
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
  },
}
</script>
