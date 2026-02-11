<script setup>
// libs imports
import { reactive } from 'vue'

// UI Imports - [Molecules]
import TextInputField from '@/components/ui/molecules/TextInputField.vue'
import PasswordInputField from '@/components/ui/molecules/PasswordInputField.vue'

// UI Imports - [Atoms]
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

defineProps({
  loading: Boolean,
  error: String
});

const emit = defineEmits(['submit'])

const form = reactive({
  email: '',
  password: '',
})

const submitForm = () => {
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submitForm">
    <TextInputField label="Email" type="email" placeholder="you@example.com" v-model="form.email" />

    <PasswordInputField placeholder="*******" v-model="form.password" />

    <BaseButton type="submit" :loading="loading"> Login </BaseButton>
  </form>
</template>
