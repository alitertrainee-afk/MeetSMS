// libs imports
import express from "express";

// local imports
import { register, login } from "../controllers/auth.controller.js"
import { validate } from "../app/validations/validate.js";
import { loginSchema, registerSchema } from "../app/validations/schemas/auth.validator.js";
import { authLimiter } from "../middleware/ratelimit.middleware.js";

// initialize the router
const router = express.Router();

// all the user routes
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);

export default router
