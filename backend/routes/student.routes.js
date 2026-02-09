// libs import
import express from "express";

// local imports
import {
  addStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
} from "../controlers/student.controller.js";

// initialize router
const router = express.Router();


// all the students routes
router.post("/", addStudent);
router.get("/", getAllStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
