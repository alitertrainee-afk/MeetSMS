<template>
  <!-- OUTER CARD -->
  <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
    <!-- SCROLL CONTAINER -->
    <div class="max-h-[65vh] overflow-y-auto">
      <table class="w-full text-sm text-slate-600">
        <!-- HEADER (sticky) -->
        <thead class="sticky top-0 z-10 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th class="px-4 py-3 text-center w-16">Sr No.</th>
            <th class="px-4 py-3 text-left min-w-[180px]">Name</th>
            <th class="px-4 py-3 text-left min-w-[220px]">Email</th>
            <th class="px-4 py-3 text-center">Roll No</th>
            <th class="px-4 py-3 text-center">Age</th>
            <th class="px-4 py-3 text-left min-w-[200px]">Address</th>
            <th class="px-4 py-3 text-center">Standard</th>
            <th class="px-4 py-3 text-left min-w-[180px]">Subjects</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody class="divide-y divide-slate-100">
          <!-- Empty -->
          <tr v-if="students.length === 0">
            <td colspan="9" class="px-6 py-8 text-center text-slate-400">No students found</td>
          </tr>

          <!-- Rows -->
          <tr
            v-else
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-slate-50 transition-colors"
          >
            <td class="px-4 py-3 text-center font-medium text-slate-900">
              {{ index + 1 }}
            </td>

            <td class="px-4 py-3 font-medium text-slate-900">
              {{ student.name }}
            </td>

            <td class="px-4 py-3">
              {{ student.email }}
            </td>

            <td class="px-4 py-3 text-center">
              <span class="rounded bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-700">
                {{ student.rollNo }}
              </span>
            </td>

            <td class="px-4 py-3 text-center">
              {{ student.age }}
            </td>

            <td class="px-4 py-3 max-w-xs truncate" :title="student.address">
              {{ student.address }}
            </td>

            <td class="px-4 py-3 text-center">
              <span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                {{ student.standard }}
              </span>
            </td>

            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(sub, i) in normalizedSubjects(student.subjects)"
                  :key="i"
                  class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                >
                  {{ sub }}
                </span>
              </div>
            </td>

            <td class="px-4 py-3 text-right">
              <div class="flex justify-end gap-2">
                <button
                  @click="$emit('edit', student)"
                  class="rounded-lg p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                >
                  ✏️
                </button>
                <button
                  @click="$emit('delete', student.id)"
                  class="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                >
                  🗑
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'delete'])

const normalizedSubjects = (subjects) => {
  if (!subjects) return []
  return typeof subjects === 'string' ? subjects.split(',') : subjects
}
</script>
