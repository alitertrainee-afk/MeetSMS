// local imports
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// services imports
import {
  createStudentService,
  deactivateStudentService,
  fetchStudentsService,
  updateStudentService,
} from "../service/student.service.js";

// Add new student to database
export const addStudent = asyncHandler(async (req, res, next) => {
  const student = await createStudentService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Student registered successfully.",
    data: student,
  });
});

// fetch all the students fromt the database
export const getAllStudent = asyncHandler(async (req, res) => {
  const students = await fetchStudentsService();

  return successResponse(res, {
    statusCode: 200,
    message: "Student fetched successfully.",
    data: students,
  });
});

// update current student details
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await updateStudentService(id, req.body);

  return successResponse(res, {
    statusCode: 200,
    message: "Student updated successfully.",
    data: student,
  });
});

// delete individual student by id
export const deactivateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await deactivateStudentService(id);

  return successResponse(res, {
    statusCode: 200,
    message: "Student deactivated successfully.",
    data: student,
  });
});
