<template>
  <div class="relative w-full sm:w-96">
    <!-- Search Icon -->
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"> <HugeiconsIcon :icon="Search01FreeIcons" /> </span>

    <!-- Input -->
    <input
      type="text"
      placeholder="Search by name, email or roll no..."
      class="w-full h-10 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { Search01FreeIcons } from '@hugeicons/core-free-icons/index';
import { HugeiconsIcon } from '@hugeicons/vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>
