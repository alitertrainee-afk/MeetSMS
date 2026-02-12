// local imports
import Student from "../models/Student.js";

export const createStudentRepo = async (data) => {
  return Student.create(data);
};

export const fetchStudentsRepo = async () => {
  return Student.find();
};

export const findStudentByIdRepo = async (id) => {
  return Student.findById(id);
};

export const updateStudentRepo = async (id, data) => {
  return Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deactivateStudentByIdRepo = async (id) => {
  return Student.findByIdAndUpdate(id, { isActive: false }, { new: true });
};
