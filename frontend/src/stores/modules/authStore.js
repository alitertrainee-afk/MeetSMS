import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as userApi from '@/service/userApiService'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // state
    const user = ref(null)
    const accessToken = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // actions
    const login = async (formData) => {
      loading.value = true
      error.value = null

      try {
        const response = await userApi.login(formData)
        console.log("🚀 ~ login ~ userApi:", userApi)

        if (response.success) {
          user.value = response.data.user
          accessToken.value = response.data.accessToken
          error.value = null
        }
      } catch (err) {
        error.value = err?.response?.data?.message || 'Invalid credentials'
        throw err
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      user.value = null
      accessToken.value = null
    }

    return {
      // state
      user,
      accessToken,
      loading,
      error,

      // actions
      login,
      logout,
    }
  },
  {
    persist: true
  },
)
