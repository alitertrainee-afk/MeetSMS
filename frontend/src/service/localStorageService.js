import { splitSubject } from '@/utils/utils'

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

export const addorEditNewStudent = (student) => {
  console.log(student)

  const students = getLocalStorage('studentsData') || []

  const findStudent = students?.findIndex((s) => s.id === student.id)

  if (findStudent !== -1) {
    students[findStudent] = { ...student, updatedAt: new Date().toISOString() }
    setLocalStorage('studentsData', students)
    return { success: true }
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

export const deleteStudentById = (studentId) => {
  //gets student
  const students = getLocalStorage('studentsData')

  // filtered students by removing the student you don't want
  const filteredStudents = students.filter((student) => student.id !== studentId)
  console.log(filteredStudents)
  // set the data in local storage
  setLocalStorage('studentsData', filteredStudents)
}

export const deleteAllStudents = () => {
  removeLocalStorage('studentsData')
}

export const searchStudents = (query) => {
  const students = getLocalStorage('studentsData') || []

  console.log('students', 'cons'.includes('cons'?.toLowerCase()), query)

  return students.filter((student) => {
    const fullName = `${student.name}`.toLowerCase()
    return fullName.includes(query?.toLowerCase())
  })
}
