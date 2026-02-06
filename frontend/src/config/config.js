// local imports
import { config } from '@/config/environment.js'

export const API_BASE_URL = config.VUE_API_URL

// api endpoints constants
export const API_ENDPOINTS = {
  STUDENTS: '/students',
  STUDENT_BY_ID: (id) => `/students/${id}`,
  SEARCH_STUDENTS: '/students/search',
  DELETE_ALL_STUDENTS: '/students',
}

export function getFullUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  getFullUrl,
}
