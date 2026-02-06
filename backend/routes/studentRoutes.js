import express from "express";
import {
  addStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
} from "../controlers/studentController.js";
const router = express.Router();

router.post("/", addStudent);
router.get("/", getAllStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
