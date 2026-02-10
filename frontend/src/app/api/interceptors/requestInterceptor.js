// local imports
import { getLocalStorage } from '@/service/localStorageService'

export const setupRequestInterceptor = (apiCLient) => {
  apiCLient.interceptors.request.use(
    (config) => {
      // Get token from localStorage
      const token = getLocalStorage('accessToken')
      
      // Add Authorization header with Bearer token if token exists
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
