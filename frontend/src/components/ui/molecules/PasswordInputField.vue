<script setup>
// libs import
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Eye, EyeOff } from '@hugeicons/core-free-icons'

// UI Imports - [Atoms]
import BaseInput from '../atoms/BaseInput.vue'
import BaseLabel from '../atoms/BaseLabel.vue'

// props and emits
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])

const showPassword = ref(false)
</script>

<template>
  <div>
    <BaseLabel>Password</BaseLabel>

    <div class="relative">
      <BaseInput
        :type="showPassword ? 'text' : 'password'"
        class="pr-10"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />

      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2"
        @click="showPassword = !showPassword"
      >
        <HugeiconsIcon :icon="showPassword ? EyeOff : Eye" size="18" />
      </button>
    </div>
  </div>
</template>
