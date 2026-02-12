import apiClient from '../apiClient.js'

export const fetchStudentsApi = (params) => apiClient.get('/students', { params })

export const createStudentApi = (payload) => apiClient.post('/students', payload)

export const updateStudentApi = (id, payload) => apiClient.patch(`/students/${id}`, payload)

export const deactivateStudentApi = (id) => apiClient.delete(`/students/${id}`)
