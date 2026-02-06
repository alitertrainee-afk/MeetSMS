// libs imports
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// local imports
import { config } from '@/config/environment.js'

export const useStudentStore = defineStore('students', () => {
  // State
  const students = ref([])
  const currentPage = ref(1)
  const pageSize = ref(config?.PAGINATION_SIZE)
  const totalItems = ref(0)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const showAddModal = ref(false)
  const editingStudent = ref(null)

  const form = ref({
    name: '',
    rollNo: '',
    age: '',
    subjects: [],
  })

  const resetForm = () => {
    form.value = {
      name: '',
      rollNo: '',
      age: '',
      subjects: [],
    }
    editingStudent.value = null
  }

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / pageSize.value)
  })

  const isNextDisabled = computed(() => {
    return currentPage.value >= totalPages.value
  })

  const isPreviousDisabled = computed(() => {
    return currentPage.value <= 1
  })

  const filteredStudents = computed(() => {
    if (!searchQuery.value) return students.value

    return students.value.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const setStudents = (newStudents) => {
    students.value = newStudents
  }

  const setTotalItems = (total) => {
    totalItems.value = total
  }

  const setCurrentPage = (page) => {
    currentPage.value = page
  }

  const setLoading = (isLoading) => {
    loading.value = isLoading
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setShowAddModal = (isVisible) => {
    showAddModal.value = isVisible
    if (!isVisible) {
      resetForm()
    }
  }

  const addStudent = (student) => {
    students.value.push(student)
    totalItems.value += 1
  }

  const updateStudent = (studentId, updates) => {
    const index = students.value.findIndex((s) => s.id === studentId)
    if (index !== -1) {
      students.value[index] = { ...students.value[index], ...updates }
      return true
    }
    return false
  }

  const deleteStudent = (studentId) => {
    const index = students.value.findIndex((s) => s.id === studentId)
    if (index !== -1) {
      students.value.splice(index, 1)
      totalItems.value -= 1
      return true
    }
    return false
  }

  const deleteAllStudents = () => {
    students.value = []
    totalItems.value = 0
    currentPage.value = 1
  }

  const nextPage = () => {
    if (!isNextDisabled.value) {
      setCurrentPage(currentPage.value + 1)
    }
  }

  const prevPage = () => {
    if (!isPreviousDisabled.value) {
      setCurrentPage(currentPage.value - 1)
    }
  }

  return {
    // State
    students,
    currentPage,
    pageSize,
    totalItems,
    loading,
    error,
    searchQuery,
    showAddModal,
    editingStudent,
    form,

    // Computed
    totalPages,
    isNextDisabled,
    isPreviousDisabled,
    filteredStudents,

    // Methods
    resetForm,
    setStudents,
    setTotalItems,
    setCurrentPage,
    setLoading,
    setError,
    clearError,
    setSearchQuery,
    setShowAddModal,
    addStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
    nextPage,
    prevPage,
  }
})
