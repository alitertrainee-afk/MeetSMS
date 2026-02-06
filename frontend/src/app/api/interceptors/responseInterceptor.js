export const setupResponseInterceptor = (apiCLient) => {
  apiCLient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
