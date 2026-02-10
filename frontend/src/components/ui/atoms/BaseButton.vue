<script setup>
defineProps({
  loading: Boolean,
})
</script>

<template>
  <button
    :disabled="loading"
    class="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50"
  >
    <span v-if="!loading">
      <slot />
    </span>
    <span v-else>Loading...</span>
  </button>
</template>
