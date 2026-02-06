// lib imports
import axios from 'axios'

// local imports
import { setupRequestInterceptor } from './interceptors/requestInterceptor.js'
import { setupResponseInterceptor } from './interceptors/responseInterceptor.js'
import { API_BASE_URL } from '../../config/config.js'
import config from '@/config/environment.js'

// creating axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: config?.REQUEST_TIMEOUT,
})

// setup interceptor which will do something for ongoing request and response
setupRequestInterceptor(apiClient)
setupResponseInterceptor(apiClient)

export default apiClient

