<script setup>
// libs imports
import { ref } from 'vue'

// local imports
import AddorUpdateStudentModal from '../components/AddorUpdateStudentModal.vue'
import { addNewStudent } from '../service/localStorageService.js'

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
  students.value.push({ ...form.value, id: crypto.randomUUID() })

  addNewStudent(form.value)

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
</script>

<template>
  <div class="MainContainer lg:px-30 p-1 border-amber-400">
    <div class="TableContainer">
      <button
        @click="showAddStudentModal = true"
        class="cursor-pointer bg-blue-400 px-3 py-2 rounded-lg text-white border-black border-2"
      >
        Add Student Details
      </button>

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
          <tr class="border-t border-white p-2">
            <td class="text-center p-2">1</td>
            <td class="text-center p-2">John Doe</td>
            <td class="text-center p-2">A101</td>
            <td class="text-center p-2">20</td>
            <td class="text-center p-2">Math, Science</td>
            <td class="text-center p-2"><button>Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
