// local imports
import { removeLocalStorage } from '@/service/localStorageService'
import { useAuthStore } from '@/stores/modules/authStore'
import router from '@/router/index'

export const setupResponseInterceptor = (apiCLient) => {
  apiCLient.interceptors.response.use(
    (response) => {
      console.log("🚀 ~ setupResponseInterceptor ~ response:", response)
      return response
    },
    (error) => {
      console.log("🚀 ~ setupResponseInterceptor ~ error:", error)
      
      // Handle 401 Unauthorized (invalid or expired token)
      if (error.response?.status === 401) {
        const authStore = useAuthStore()
        
        // Clear invalid token from localStorage
        removeLocalStorage('accessToken')
        
        // Clear auth store
        authStore.setAuthError(error.response?.data?.message || 'Session expired. Please login again.')
        authStore.setAuthUser(null)
        authStore.setAuthAccessToken('')
        
        // Redirect to login
        router.push({ name: 'Login' })
      }
      
      return Promise.reject(error)
    },
  )
}
