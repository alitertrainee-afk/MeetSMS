import Student from "../models/studentModel.js";

export const createStudent = async (data) => {
  const newStudnt = await Student.create(data);
  return newStudnt;
};

export const fatcheStudent = async () => {
  const allStudent = await Student.find();
  return allStudent;
};

export const editStudent = async (id, data) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,        // return updated document
      runValidators: true
    }
  );

  return updatedStudent;
};

export const deactivateStudent = async (id) => {
  const student = await Student.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  return student;
};