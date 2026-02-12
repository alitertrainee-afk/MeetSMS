import { fetchStudentsApi } from '@/app/api/endpoints/student.api'
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('students', {
  state: () => ({
    students: [],
    meta: { page: 1, limit: 10, total: 0, pages: 0 },
    loading: false,

    query: {
      page: 1,
      search: '',
      filters: {
        standard: '',
      },
    },
  }),

  actions: {
    async fetchStudents(overrides = {}) {
      this.loading = true

      // merge new params
      this.query = {
        ...this.query,
        ...overrides,
        filters: {
          ...this.query.filters,
          ...(overrides.filters || {}),
        },
      }

      try {
        const res = await fetchStudentsApi(this.query)
        this.students = res.data.data.students
        this.meta = res.data.data.meta
      } finally {
        this.loading = false
      }
    },
  },
})
