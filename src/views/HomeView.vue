<script setup>
// libs imports
import { ref } from 'vue'

// local imports
import AddorUpdateStudentModal from '../components/AddorUpdateStudentModal.vue'

const showAddStudentModal = ref(false)
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

      <AddorUpdateStudentModal :show="showAddStudentModal" @close="showAddStudentModal = false" />

      <table class="w-full rounded-lg text-white bg-black mt-4">
        <thead className="h-16 border-r border-white">
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
            <td className="text-center p-2">1</td>
            <td className="text-center p-2">John Doe</td>
            <td className="text-center p-2">A101</td>
            <td className="text-center p-2">20</td>
            <td className="text-center p-2">Math, Science</td>
            <td className="text-center p-2"><button>Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
