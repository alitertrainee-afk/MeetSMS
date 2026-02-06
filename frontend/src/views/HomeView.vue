<script setup>
// libs imports
import { onMounted, ref, watch, computed } from 'vue'

// local imports
import AddorUpdateStudentModal from '../components/AddorUpdateStudentModal.vue'
import {
  addorEditNewStudent,
  deleteAllStudents,
  deleteStudentById,
  getLocalStorage,
  getPaginatedStudentsData,
  getTotalStudents,
  searchStudents,
} from '../service/localStorageService.js'
import { HugeiconsIcon } from '@hugeicons/vue'
import { Delete01Icon, Edit03Icon } from '@hugeicons/core-free-icons/index'

// add student model dialog ref
const showAddStudentModal = ref(false)

// students data ref
const students = ref([])

// student filling form ref
const form = ref({
  id: crypto.randomUUID(),
  name: '',
  rollNo: '',
  age: '',
  subjects: '',
})

// save studdent fuction on click of the submit button
const saveStudentDetails = () => {
  // push data to students
  const findStudentIndex = students.value.findIndex((student) => student.id === form.value.id)

  console.log('findStudentIndex', findStudentIndex)

  if (findStudentIndex === -1) {
    students.value.push(form.value)
  } else {
    students.value[findStudentIndex] = form.value
  }

  addorEditNewStudent(form.value)

  // close the dialog model
  showAddStudentModal.value = false

  // clean up form data for next time
  form.value = {
    id: null,
    name: '',
    rollNo: '',
    age: '',
    subjects: '',
  }
}

const editStudentDetails = (student) => {
  form.value = { ...student }
  showAddStudentModal.value = true
}

const deleteStudent = (studentId) => {
  const filteredStudents = students.value.filter((student) => student.id !== studentId)
  students.value = filteredStudents
  deleteStudentById(studentId)
}

const deleteAllStudentData = () => {
  // clear all students ref
  students.value = []

  // update local storage
  deleteAllStudents('studentsData')
}

// search value
const searchValue = ref('')

const handleSearch = (event) => {
  searchValue.value = event.target.value.toLowerCase()

  setTimeout(() => {
    const searchedStudents = searchStudents(searchValue.value)
    console.log('searchedStudents', searchedStudents)
    students.value = searchedStudents
  }, 500)
}

// pagination variables
let currentPage = ref(1)
const itemsPerPage = 5

let totalPages = ref(Math.ceil(getTotalStudents() / itemsPerPage))

const isNextDisabled = computed(() => {
  return currentPage.value >= totalPages.value
})
console.log('isNextDisabled', isNextDisabled.value)

const isPreviousDisabled = computed(() => {
  return currentPage.value <= 1
})

// on mounted get students data from local storage

onMounted(() => {
  const studentsData = getPaginatedStudentsData(currentPage.value, itemsPerPage)
  if (studentsData) {
    students.value = studentsData
  }
})

// watch for current page change and update students data
watch(currentPage, (newPage) => {
  const studentsData = getPaginatedStudentsData(newPage, itemsPerPage)
  if (studentsData) {
    students.value = studentsData
  }
})
</script>

<template>
  <div class="MainContainer lg:px-30 p-1 border-amber-400">
    <div class="TableContainer">
      <div class="TableHeader w-full flex items-center justify-between gap-1">
        <div class="LeftElements flex gap-1 items-center justify-start w-full">
          <button
            @click="showAddStudentModal = true"
            class="cursor-pointer bg-blue-400 font-bold h-12 w-40 truncate px-2 rounded-lg text-white border-black border-2"
          >
            + New Student
          </button>
          <input
            placeholder="Search Students"
            type="text"
            class="h-10 w-sm border-2 rounded-lg px-2 truncate"
            v-model="searchValue"
            @input="handleSearch"
          />
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
        @submits="saveStudentDetails"
        :show="showAddStudentModal"
        @close="showAddStudentModal = false"
      />

      <table class="w-full rounded-lg text-white bg-black mt-4">
        <thead class="h-16 border-r border-white">
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Age</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="students.length === 0">
            <td colspan="6" class="text-center p-4 text-gray-300">No students found</td>
          </tr>
          <tr
            v-else
            v-for="(student, index) in students"
            :key="student.id"
            class="border-t border-white p-2"
          >
            <td class="text-center p-2">{{ index + 1 }}</td>
            <td class="text-left p-2">{{ student.name }}</td>
            <td class="text-center p-2">{{ student.rollNo }}</td>
            <td class="text-center p-2">{{ student.age }}</td>
            <td class="text-center p-2 truncate">
              {{
                typeof student.subjects === 'string'
                  ? student.subjects
                  : student.subjects.join(', ')
              }}
            </td>
            <td class="text-center w-full p-2 flex gap-1">
              <button @click="editStudentDetails(student)" class="bg-white p-1 rounded-md">
                <HugeiconsIcon :icon="Edit03Icon" class="text-black" />
              </button>
              <button @click="deleteStudent(student.id)" class="bg-white p-1 rounded-md">
                <HugeiconsIcon :icon="Delete01Icon" class="text-black" />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="p-2 flex justify-end gap-1">
              <button
                @click="currentPage > 1 ? currentPage-- : null"
                :disabled="isPreviousDisabled"
                class="bg-gray-300 p-1 rounded-md px-2 text-black"
              >
                Previous
              </button>

              <button
                :disabled="isNextDisabled"
                @click="currentPage++"
                class="bg-gray-300 p-1 rounded-md px-2 text-black"
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
