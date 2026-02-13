<script setup>
import { reactive } from 'vue'

import { useAuthStore } from '@/stores/modules/auth.store'
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import FormField from '../molecules/FormField.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const submit = async () => {
  await auth.login(form)
  if (auth.isAuthenticated) {
    console.log("🚀 ~ submit ~ isAuthenticated:", auth.isAuthenticated)
    router.push('/')
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Sign in</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Enter your credentials to continue
      </p>
    </div>

    <FormField label="Email">
      <BaseInput v-model="form.email" type="email" placeholder="you@example.com" required />
    </FormField>

    <FormField label="Password">
      <BaseInput v-model="form.password" type="password" placeholder="••••••••" required />
    </FormField>

    <p v-if="auth.error" class="text-sm text-red-600 text-center">
      {{ auth.error }}
    </p>

    <BaseButton :loading="auth.loading" type="submit" class="w-full"> Sign In </BaseButton>
  </form>
</template>
