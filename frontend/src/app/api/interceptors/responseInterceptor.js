// local imports
import { removeLocalStorage } from '@/service/localStorageService'
import { useAuthStore } from '@/stores/modules/authStore'
import router from '@/router/index'

export const setupResponseInterceptor = (apiCLient) => {
  apiCLient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle 401 Unauthorized (invalid or expired token)
      if (error.response?.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }

      return Promise.reject(error)
    },
  )
}
