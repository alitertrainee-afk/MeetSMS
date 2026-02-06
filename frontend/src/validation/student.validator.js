// libs import
import z from 'zod'

export const addNewStudentSchema = z.object({
  name: z.string().min(4).max(30).required(),
  age: z.number().required(),
  rollNo: z.number().required(),
  email: z.email().required(),
  address: z.string().required(),
  standard: z.number().required(),
})
