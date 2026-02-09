<script setup>
// libs imports
import { onMounted, ref, watch, computed } from 'vue'
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
import { storeToRefs } from 'pinia'

// use Pinia Student Store
const studentStore = useStudentStore()

// destructure state from student store (use store methods for actions)
const { students, form, showAddStudentModal, currentPage, pageSize, editingStudent, totalPages, isNextDisabled, isPreviousDisabled } = storeToRefs(studentStore)

const editStudentDetails = (student) => {
  form.value = { ...student }
  studentStore.setShowAddModal(true);
  editingStudent.value = true
}

const deleteStudent = (studentId) => {
  console.log(studentId)
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
  const studentsData = studentStore.fetchStudents();
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
      <div class="TableHeader w-full flex items-center justify-between gap-1">
        <div class="LeftElements flex gap-1 items-center justify-start w-full">
          <button
            @click="studentStore.setShowAddModal(true)"
            class="cursor-pointer bg-blue-400 font-bold h-12 w-40 truncate px-2 rounded-lg text-white border-black border-2"
          >
            + New Student
          </button>
          <StudentSearchBar v-model="searchValue" />
        </div>
        <div>
          <button
            @click="deleteAllStudentData"
            class="flex w-full bg-red-600 p-2 rounded-lg border-2 border-black text-white gap-2 cursor-pointer"
          >
            <HugeiconsIcon :icon="Delete01Icon" /> Delete All
          </button>
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
