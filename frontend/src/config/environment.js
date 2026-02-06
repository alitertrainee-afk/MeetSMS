const NODE_ENV = import.meta.env.NODE_ENV // 'development' or 'production'

// config for
export const config = {
  // API Configuration
  VUE_API_URL: NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'production-url',

  // Client configuration
  VUE_CLIENT_URL: import.meta.VUE_CLIENT_URL,

  // Pagination Settings
  PAGINATION_SIZE: 5,

  // Axios Instance Config Variables
  REQUEST_TIMEOUT: 10000,
}

export default config
