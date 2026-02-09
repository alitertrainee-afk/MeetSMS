<template>
  <table class="w-full rounded-lg text-white bg-black mt-4">
    <thead class="h-16 border-r border-white">
      <tr>
        <th>Sr No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Roll No</th>
        <th>Age</th>
        <th>Address</th>
        <th>Standard</th>
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
        class="border-t border-white"
      >
        <td class="text-center p-1">{{ index + 1 }}</td>
        <td class="text-center p-1">{{ student.name }}</td>
        <td class="text-center p-1">{{ student.email }}</td>
        <td class="text-center p-1">{{ student.rollNo }}</td>
        <td class="text-center p-1">{{ student.address }}</td>
        <td class="text-center p-1">{{ student.standard }}</td>
        <td class="text-center p-1">{{ student.age }}</td>
        <td class="text-center p-1 max-w-30 truncate">
          {{
            typeof student.subjects === 'string' ? student.subjects : student.subjects.join(', ')
          }}
        </td>

        <td class="flex gap-1 justify-center">
          <button @click="$emit('edit', student)">✏️</button>
          <button @click="$emit('delete', student.id)">🗑</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'delete'])
</script>
