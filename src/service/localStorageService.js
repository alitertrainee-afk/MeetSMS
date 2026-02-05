import { splitSubject } from "@/utils/utils"

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const addNewStudent = (student) => {
  console.log(student)

  const students = getLocalStorage('studentsData') || []

  const findStudent = students?.find((s) => s.id === student.id)

  if (findStudent) {
    return { error: 'Student with this ID already exists.' }
  }

  students.push({
    ...student,
    subjects: splitSubject(student.subjects),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
  setLocalStorage('studentsData', students)
  return { success: true }
}
