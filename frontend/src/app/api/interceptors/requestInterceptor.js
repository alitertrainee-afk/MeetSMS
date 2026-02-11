// local imports
import { getLocalStorage } from '@/service/localStorageService'
import { useAuthStore } from '@/stores/modules/authStore'

export const setupRequestInterceptor = (apiCLient) => {
  apiCLient.interceptors.request.use(
    (config) => {
      const token = getLocalStorage('auth').accessToken

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
