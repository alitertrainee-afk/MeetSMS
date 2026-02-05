<script setup>
defineProps({
  show: Boolean,
})

defineEmits(['close'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0  flex items-center justify-center"
    @click="$emit('close')"
  >
    <div class="bg-black text-white p-4 rounded-lg" @click.stop>
      <p>Modal Content</p>

      <footer class="mt-4 text-right">
        <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="$emit('close')">OK</button>
      </footer>
    </div>
  </div>
</template>
