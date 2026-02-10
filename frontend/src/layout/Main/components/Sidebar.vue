<script setup lang="ts">
import { StudentsIcon } from '@hugeicons/core-free-icons/index'
import { HugeiconsIcon } from '@hugeicons/vue'

const sidebarItems = {
    
}
</script>

<template>
  <nav class="h-full p-4 space-y-2">
    <a class="flex gap-2 px-3 py-2 rounded hover:bg-gray-800">
      <HugeiconsIcon :icon="StudentsIcon" /> <span class="font-semibold">Students</span></a
    >
  </nav>
</template>
