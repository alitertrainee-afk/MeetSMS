<script setup>
import { Close } from '@hugeicons/core-free-icons/index'
import { HugeiconsIcon } from '@hugeicons/vue'

defineProps({
  show: Boolean,
})
const emit = defineEmits(['close', 'submits'])

const form = defineModel('form')
console.log('FORM DATA', form.value)
const handleSubmit = () => {
  emit('submits', form.value)
  emit('close')
}
</script>

<template>
  <div
    v-if="show"
    class="DialogModal fixed inset-0 flex items-center justify-center"
    @click="$emit('close')"
  >
    <div
      class="DialogContentContainer flex flex-col gap-3 w-76 h-80 rounded-2xl bg-gray-300 text-black p-4"
      @click.stop
    >
      <div class="DialogHeader w-full flex justify-between items-center">
        <label class="text-lg font-semibold">Fill Student Deatils</label>

        <HugeiconsIcon
          @click="$emit('close')"
          :icon="Close"
          class="text-black cursor-pointer"
        />
      </div>
      <div class="DialogBody flex flex-col justify-start gap-3 items-center">
        <input
          v-model="form.name"
          placeholder="Enter name"
          type="text"
          class="h-10 w-full border-2 rounded-lg px-2 truncate"
        />
        <input
          v-model="form.rollNo"
          placeholder="Enter roll no"
          type="number"
          class="h-10 w-full border-2 rounded-lg px-2 truncate"
        />
        <input
          v-model="form.age"
          placeholder="Enter age"
          type="number"
          class="h-10 w-full border-2 rounded-lg px-2 truncate"
        />
        <input
          v-model="form.subjects"
          placeholder="Enter subjects (Ex: English, Maths, Science)"
          type="text"
          class="h-10 w-full border-2 rounded-lg px-2 truncate"
        />
      </div>
      <div class="DialogFooter w-full flex justify-end items-center gap-3">
        <button @click="$emit('close')" class="text-sm">Cancel</button>
        <button @click="handleSubmit" class="bg-black px-4 rounded-lg py-1 text-white">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
