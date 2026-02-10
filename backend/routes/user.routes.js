// libs imports
import express from "express";

// local imports
import { register, login } from "../controlers/user.controller.js"

// initialize the router
const router = express.Router();

// all the user routes
router.post('/register', register);
router.post('/login', login);

export default router
