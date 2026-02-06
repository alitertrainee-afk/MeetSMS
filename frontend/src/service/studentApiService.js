// API service for students: thin wrappers over axios client that return response data
import apiClient from '@/app/api/apiClient.js'
import { API_ENDPOINTS } from '@/config/config.js'

export const createStudent = (form) => {
	return apiClient.post(API_ENDPOINTS.STUDENTS, form).then((res) => res.data)
}

export const fetchStudents = (params = {}) => {
	return apiClient.get(API_ENDPOINTS.STUDENTS, { params }).then((res) => res.data)
}

export const updateStudent = (id, payload) => {
	return apiClient.put(API_ENDPOINTS.STUDENT_BY_ID(id), payload).then((res) => res.data)
}

export const deleteStudent = (id) => {
	return apiClient.delete(API_ENDPOINTS.STUDENT_BY_ID(id)).then((res) => res.data)
}

export default {
	createStudent,
	fetchStudents,
	updateStudent,
	deleteStudent,
}