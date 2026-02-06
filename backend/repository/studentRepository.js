import Student from "../models/studentModel.js";

export const createStudent = async (data) => {
  const newStudnt = await Student.create(data);
  return newStudnt;
};

export const fatcheStudent = async () => {
  const allStudent = await Student.find();
  return allStudent;
};
