// libs import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// local imports
import {
  createUser,
  findUserByIdentifier,
} from "../repository/user.repository.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return errorResponse(res, {
        statusCode: 401,
        message: "All fields are required.",
      });
    }

    const existingUser = await findUserByIdentifier("email", email);

    if (existingUser) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "User successfully registered.",
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, { error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🚀 ~ login ~ req.body:", req.body);

    if (!email || !password) {
      return errorResponse(res, res, {
        statusCode: 401,
        message: "All fields are required.",
      });
    }

    const existingUser = await findUserByIdentifier("email", email);

    if (!existingUser) {
      console.log("🚀 ~ login ~ existingUser:", existingUser);
      return errorResponse(res, {
        statusCode: 401,
        message: "User is not registered",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password,
    );

    if (!isPasswordValid) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      { userId: existingUser?._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return successResponse(res, {
      statusCode: 201,
      message: "Logged in successfully",
      data: {
        user: existingUser,
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, { error: error });
  }
};
