<script setup>
defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  disabled: Boolean,
  required: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full h-10 px-3 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
  />
</template>
