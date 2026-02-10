// libs imports
import mongoose from "mongoose";

// local imports
import {
  createStudent,
  editStudent,
  fatcheStudent,
  deactivateStudent,
} from "../repository/student.repository.js";


// Add new student to database
export const addStudent = async (req, res) => {
  try {
    const { standard, address, age, name, rollNo, email } = req.body;
    console.log("🚀 ~ addStudent ~ req.body:", req.body)

    if (!standard || !address || !age || !name || !rollNo || !email) {
      return res.status(400).json({
        meta: { success: false, message: "please fill all the details" },
        data: {},
      });
    }

    const student = await createStudent(req.body);
    console.log("🚀 ~ addStudent ~ student:", student)

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
export const getAllStudent = async (req, res) => {
  try {
    const students = await fatcheStudent();

    if (students?.length === 0) {
      return res.status(200).json({
        meta: { success: true, message: "No Student Found" },
        data: { students },
      });
    }

    return res.status(200).json({
      meta: { success: true, message: "student fetch successfully" },
      data: { students },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ meta: { success: false, message: err.message }, data: {} });
  }
};

// update current student details
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        meta: { success: false, message: "Id is required" },
      });
    }

    const student = await editStudent(id, req.body);

    if (!student) {
      return res.status(404).json({
        meta: { success: false, message: "Student not found" },
      });
    }

    return res.status(200).json({
      meta: { success: true, message: "Student updated successfully" },
      data: { student },
    });
  } catch (error) {
    return res.status(500).json({
      meta: { success: false, message: error.message },
      data: {},
    });
  }
};

// delete individual student by id
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        meta: { success: false, message: "Invalid student id" },
      });
    }

    const student = await deactivateStudent(id);

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
