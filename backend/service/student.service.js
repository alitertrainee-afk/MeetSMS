// local imports
import { ApiError } from "../utils/ApiError.js";
import { createStudentRepo } from "../repositories/student.repository.js";
import {
    deactivateStudentByIdRepo,
  fetchStudentsRepo,
  findStudentByIdRepo,
  updateStudentRepo,
} from "../repository/student.repository.js";

export const createStudentService = async (data) => {
  const { name, email, rollNo, age, address, standard, subjects } = data;

  if (
    !name ||
    !email ||
    !rollNo ||
    !age ||
    !address ||
    !standard ||
    !subjects
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const student = await createStudentRepo(data);

  return student;
};

export const fetchStudentsService = async () => {
  const students = await fetchStudentsRepo();
  return students;
};

export const updateStudentService = async (id, data) => {
  if (!id) {
    throw new ApiError(400, "Student ID is required");
  }

  const existingStudent = await findStudentByIdRepo(id);

  if (!existingStudent) {
    throw new ApiError(404, "Student not found");
  }

  const updatedStudent = await updateStudentRepo(id, data);

  return updatedStudent;
};

export const deactivateStudentService = async (id) => {
  if (!id) {
    throw new ApiError(400, "Student ID is required");
  }

  const student = await findStudentByIdRepo(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (student.isActive === false) {
    return student; // idempotent behavior
  }

  const deactivatedStudent = await deactivateStudentByIdRepo(id);

  return deactivatedStudent;
};
