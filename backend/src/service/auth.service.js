// libs import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// local imports
import { ApiError } from "../utils/ApiError.js";
import {
  findUserByEmailRepo,
  createUserRepo,
} from "../repository/user.repository.js";
import { env } from "../config/env.js";

export const registerUserService = async (data) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await findUserByEmailRepo(email);

  if (existingUser) {
    throw new ApiError(409, "User is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUserRepo({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const user = await findUserByEmailRepo(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = jwt.sign({ userId: user._id }, env?.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  };
};
