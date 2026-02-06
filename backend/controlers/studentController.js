import { createStudent, fatcheStudent } from "../repository/studentRepository.js";

export const addStudent = async (req, res) => {
  try {
    const { standard, address, age, email, name } = req.body;

    if (!standard || !address || !age || !email || !name) {
      return res.status(400).json({
        meta: { success: false, message: "please fill all the details" },
        data: {},
      });
    }
   

    const student = await createStudent(req.body);

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
export const getAllStudent = async (req, res) => {
 try {
    const students = await fatcheStudent()
    console.log("🚀 ~ getAllStudent ~ students:", students)
    
    return res.status(200).json({meta:{success:true,message:"student fatch successfully"},data:{students}})
  } catch (err) {
    return res.status(500).json({meta:{ success:false ,message: err.message },data:{}})
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { standard, address, age, email, name } = req.body;


    if (!standard || !address || !age || !email || !name) {
      return res.status(400).json({
        meta: { success: false, message: "please fill all the details" },
        data: {},
      });
    }
   

    const student = await createStudent(req.body);

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
export const deleteStudent = async (req, res) => {
  try {
    const { standard, address, age, email, name } = req.body;

    if (!standard || !address || !age || !email || !name) {
      return res.status(400).json({
        meta: { success: false, message: "please fill all the details" },
        data: {},
      });
    }
   

    const student = await createStudent(req.body);

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
