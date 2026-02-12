<script setup>
// libs imports
import { onMounted, ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Delete01Icon } from '@hugeicons/core-free-icons/index'

// local imports
import AddorUpdateStudentModal from '../components/AddorUpdateStudentModal.vue'
import {
  deleteAllStudents,
  deleteStudentById,
  getPaginatedStudentsData,
  getTotalStudents,
  searchStudents,
} from '../service/localStorageService.js'
import StudentTable from '@/components/student/StudentTable.vue'
import StudentSearchBar from '@/components/student/StudentSearchBar.vue'
import { useStudentStore } from '@/stores'

// use Pinia Student Store
const studentStore = useStudentStore()

// destructure state from student store (use store methods for actions)
const {
  students,
  form,
  showAddStudentModal,
  currentPage,
  pageSize,
  editingStudent,
  totalPages,
  isNextDisabled,
  isPreviousDisabled,
} = storeToRefs(studentStore)

const editStudentDetails = (student) => {
  form.value = { ...student }
  studentStore.setShowAddModal(true)
  editingStudent.value = true
}

const deleteStudent = (studentId) => {
  const filteredStudents = students.value.filter((student) => student.id !== studentId)
  students.value = filteredStudents
  deleteStudentById(studentId)
}

const deleteAllStudentData = () => {
  // clear all students in store
  studentStore.deleteAllStudents()

  // update local storage
  deleteAllStudents('studentsData')
}

// search value
const searchValue = ref('')

watch(searchValue, (value) => {
  const keyword = value.toLowerCase()

  if (!keyword) {
    studentStore.setStudents(getPaginatedStudentsData(currentPage.value, itemsPerPage))
    return
  }

  studentStore.setStudents(searchStudents(keyword))
})

// use store page size for pagination
const itemsPerPage = pageSize.value

// on mounted get students data from local storage

onMounted(() => {
  const studentsData = studentStore.fetchStudents()
  if (studentsData) {
    studentStore.setStudents(studentsData)
    studentStore.setTotalItems(getTotalStudents())
  }
})

// watch for current page change and update students data
watch(currentPage, (newPage) => {
  const studentsData = getPaginatedStudentsData(newPage, itemsPerPage)
  if (studentsData) {
    studentStore.setStudents(studentsData)
  }
})
</script>

<template>
  <div class="MainContainer lg:px-30 p-1 border-amber-400">
    <div class="TableContainer">
      <div class="mb-6 rounded-xl bg-white p-4 shadow-sm border border-slate-100">
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <!-- LEFT -->
          <div class="flex gap-3 items-center w-full sm:w-auto">
            <!-- Add Button -->
            <button
              @click="studentStore.setShowAddModal(true)"
              class="flex items-center justify-center h-10 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
            >
              + Add New Student
            </button>

            <!-- Search -->
            <StudentSearchBar v-model="searchValue" />
          </div>

          <!-- RIGHT -->
          <div class="w-full sm:w-auto">
            <button
              @click="deleteAllStudentData"
              class="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white border border-slate-200 text-red-600 text-sm font-medium hover:bg-red-50 transition shadow-sm w-full"
            >
              <HugeiconsIcon :icon="Delete01Icon"/>
            </button>
          </div>
        </div>
      </div>

      <AddorUpdateStudentModal
        v-model:form="form"
        @submits="studentStore.submitStudent"
        :show="showAddStudentModal"
        @close="studentStore.setShowAddModal(false)"
      />

      <StudentTable :students="students" @edit="editStudentDetails" @delete="deleteStudent" />
    </div>
  </div>
</template>
