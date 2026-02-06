<template>
  <input
    type="text"
    placeholder="Search Students"
    class="h-10 w-sm border-2 rounded-lg px-2 truncate"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>
