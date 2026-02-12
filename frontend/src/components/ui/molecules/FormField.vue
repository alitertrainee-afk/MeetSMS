<script setup>
defineProps({
  label: String,
  error: String,
})
</script>

<template>
  <div class="space-y-1">
    <label class="text-sm font-medium text-slate-700 dark:text-slate-300">
      {{ label }}
    </label>

    <slot />

    <p v-if="error" class="text-xs text-red-500">
      {{ error }}
    </p>
  </div>
</template>
