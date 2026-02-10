<script setup>

// UI Imports - [Atoms]
import BaseInput from '../atoms/BaseInput.vue'
import BaseLabel from '../atoms/BaseLabel.vue'

defineProps({
  label: String,
  type: String,
  placeholder: String,
  modelValue: String,
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <BaseLabel>{{ label }}</BaseLabel>
    <BaseInput
      :type="type"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>
