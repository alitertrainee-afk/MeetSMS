// app/stores/auth.store.js
import { defineStore } from 'pinia'
import { loginApi } from '@/app/api/endpoints/auth.api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (s) => !!s.accessToken,
  },

  actions: {
    async login(credentials) {
      console.log("🚀 ~ credentials:", credentials)
      this.loading = true
      this.error = null

      try {
        const { data } = await loginApi(credentials)
        console.log("🚀 ~ data:", data)
        this.user = data.data.user
        this.accessToken = data.data.accessToken
      } catch (err) {
        console.log("🚀 ~ err:", err)
        this.error = err|| 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.$reset()
    },
  },

  persist: {
    key: 'acadly-auth',
    paths: ['accessToken'],
  },
})
