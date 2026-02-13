<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  loading: Boolean,
  disabled: Boolean,
})
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span
      v-if="loading"
      class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
    />
    <slot />
  </button>
</template>
