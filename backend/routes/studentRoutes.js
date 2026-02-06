import express from "express"
import { addStudent,getAllStudent,updateStudent ,deleteStudent} from "../controlers/studentController.js"
const router = express.Router()

router.post('/create',addStudent )
router.get('/getAll',getAllStudent )
router.post('/edit',updateStudent )
router.post('/deleteStudent',deleteStudent )

export default router