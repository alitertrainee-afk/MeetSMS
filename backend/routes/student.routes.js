// libs import
import express from "express";

// local imports
import {
  addStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
} from "../controlers/student.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// initialize router
const router = express.Router();

// all the students routes (protected with token verification)
router.post("/", verifyToken, addStudent);
router.get("/", verifyToken, getAllStudent);
router.patch("/:id", verifyToken, updateStudent);
router.delete("/:id", verifyToken, deleteStudent);

export default router;
