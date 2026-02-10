<script setup>

// local imports
import { useAuthStore } from '@/stores/modules/authStore'
import LoginForm from '@/components/ui/organisms/LoginForm.vue'
import { useRouter } from 'vue-router'

// libs imports
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()
const { loading, error, user, accessToken } = storeToRefs(authStore)

const handleLogin = async (payload) => {
  console.log("🚀 ~ handleLogin ~ payload:", payload)
  await authStore.login(payload)
  
  // Only redirect if login successful AND both user and accessToken exist
  if(!authStore.error && authStore.user && authStore.accessToken){
    router.push("/")
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="w-80 p-4 shadow-2xl rounded-2xl">
      <LoginForm :loading="loading" @submit="handleLogin" />
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
  </div>
</template>
