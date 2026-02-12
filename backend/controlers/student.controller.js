// libs imports
import mongoose from "mongoose";

// local imports
import {
  createStudent,
  editStudent,
  fatcheStudent,
  deactivateStudentById,
  fetchStudentById,
} from "../repository/student.repository.js";
import { logger } from "../config/logger.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { successResponse } from "../utils/response.js";

// Add new student to database
export const addStudent = async (req, res) => {
  try {
    const { standard, address, age, name, rollNo, email } = req.body;
    logger.debug("🚀 ~ addStudent ~ req.body:", req.body);

    if (!standard || !address || !age || !name || !rollNo || !email) {
      return res.status(400).json({
        meta: { success: false, message: "please fill all the details" },
        data: {},
      });
    }

    const student = await createStudent(req.body);
    logger.log("🚀 ~ addStudent ~ student:", student);

    return res.status(201).json({
      meta: { success: true, message: "student register successfully" },
      data: { student },
    });
  } catch (error) {
    return res.status(500).json({
      meta: { success: false, message: error.message },
      data: {},
    });
  }
};

// fetch all the students fromt the database
export const getAllStudent = asyncHandler(async (req, res) => {
  const students = await fatcheStudent();

  if (students?.length === 0) {
    return successResponse(res, {
      statusCode: 201,
      message: "Logged in successfully",
      data: {},
    });
  }

  return res.status(200).json({
    meta: { success: true, message: "student fetch successfully" },
    data: { students },
  });
});

// update current student details
export const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      meta: { success: false, message: "Id is required" },
    });
  }

  const student = await editStudent(id, req.body);

  if (!student) {
    throw new ApiError(404, "Student not found");
    // return res.status(404).json({
    //   meta: { success: false, message: "Student not found" },
    // });
  }

  return res.status(200).json({
    meta: { success: true, message: "Student updated successfully" },
    data: { student },
  });
});

// delete individual student by id
export const deactivateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ id:", id);

  const student = await fetchStudentById(id);

  if (!student) {
    throw new ApiError(400, "Invalid student id");
  }

  const deactivatedStudent = await deactivateStudentById(id);

  return successResponse(res, {
    statusCode: 200,
    message: "Student deactivated successfully",
    data: deactivatedStudent,
  });
});
