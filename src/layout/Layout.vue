<template lang="">
  <div className="layout">
    <Navbar />
    <main className="main-content">
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
<style lang=""></style>
