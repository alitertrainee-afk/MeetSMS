import apiClient from '../apiClient.js'

export const loginApi = (payload) => apiClient.post('/user/login', payload).then((res) => res.json())

export const registerApi = (payload) => apiClient.post('/register', payload)
