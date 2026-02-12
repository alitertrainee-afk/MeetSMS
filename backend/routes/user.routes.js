// libs imports
import express from "express";

// local imports
import { register, login } from "../controlers/user.controller.js"
import { validate } from "../app/validations/validate.js";
import { loginSchema, registerSchema } from "../app/validations/schemas/auth.validator.js";

// initialize the router
const router = express.Router();

// all the user routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router
