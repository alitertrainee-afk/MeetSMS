import apiClient from '../apiClient.js'

export const loginApi = (payload) => apiClient.post('/user/login', payload)

export const registerApi = (payload) => apiClient.post('/register', payload)
