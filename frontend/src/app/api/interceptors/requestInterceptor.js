export const setupRequestInterceptor = (apiCLient) => {
  apiCLient.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
