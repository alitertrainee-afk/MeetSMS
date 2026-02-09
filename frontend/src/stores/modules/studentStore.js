// libs imports
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// local imports
import { config } from '@/config/environment.js'
import * as studentApi from '@/service/studentApiService.js'

export const useStudentStore = defineStore('students', () => {
  // State
  const students = ref([])
  const currentPage = ref(1)
  const pageSize = ref(config?.PAGINATION_SIZE)
  const totalItems = ref(0)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const showAddStudentModal = ref(false)
  const editingStudent = ref(null)

  const form = ref({
    name: '',
    rollNo: '',
    age: '',
    standard: '',
    address: '',
    subjects: [],
  })

  const resetForm = () => {
    form.value = {
      name: '',
      rollNo: '',
      age: '',
      standard: '',
      address: '',
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
    showAddStudentModal.value = isVisible
    if (!isVisible) {
      resetForm()
    }
  }

  const addStudent = (student) => {
    students.value.push(student)
    totalItems.value += 1

    // call the
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

  // Async actions (call API then update store state)
  const fetchStudents = async (opts = {}) => {
    setLoading(true)
    clearError()
    try {
      const params = {
        page: currentPage.value,
        size: pageSize.value,
        q: searchQuery.value,
        ...opts,
      }
      const resp = await studentApi.fetchStudents(params)
      console.log('🚀 ~ fetchStudents ~ resp:', resp.data.students)

      // resp may be an array or an object containing items + total
      if (Array.isArray(resp)) {
        setStudents(resp)
        setTotalItems(resp.length)
      } else {
        const items = resp.data.students || resp.data || resp.items || resp.results || []
        setStudents(items)
        const total = resp.total || resp.totalItems || resp.count || items.length
        setTotalItems(total)
      }
    } catch (err) {
      setError(err?.message || 'Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  const createStudent = async (formData) => {
    console.log('🚀 ~ createStudent ~ formData:', formData)
    setLoading(true)
    clearError()
    try {
      const created = await studentApi.createStudent(formData)
      console.log('🚀 ~ createStudent ~ created:', created)

      // created may be the new student object or wrapped
      const studentObj = created.student || created.data || created || null
      if (studentObj) {
        addStudent(studentObj)
      }

      return created
    } catch (err) {
      setError(err?.message || 'Failed to create student')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const editStudent = async (formData) => {
    console.log("🚀 ~ editStudent ~ formData:", formData)
    setLoading(true)
    clearError()
    try {
      const created = await studentApi.updateStudent(formData)
      console.log("🚀 ~ editStudent ~ created:", created)

      // created may be the new student object or wrapped
      const studentObj = created.student || created.data || created || null
      if (studentObj) {
        updateStudent(studentObj)
      }

      return created
    } catch (err) {
      setError(err?.message || 'Failed to create student')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const submitStudent = async (formData) => {
    console.log("🚀 ~ submitStudent ~ formData:", formData)
    console.log("🚀 ~ submitStudent ~ editingStudent:", editingStudent)
    if (editingStudent.value) {
      // UPDATE
      return await editStudent(formData)
    } else {
      // CREATE
      return await createStudent(formData)
    }
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
    showAddStudentModal,
    editingStudent,
    form,


    // Computed
    totalPages,
    isNextDisabled,
    isPreviousDisabled,
    filteredStudents,

    // Methods
    resetForm,
    submitStudent,
    updateStudent,
    setStudents,
    setTotalItems,
    setCurrentPage,
    setLoading,
    setError,
    clearError,
    setSearchQuery,
    setShowAddModal,
    addStudent,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    deleteAllStudents,
    nextPage,
    prevPage,
  }
})
