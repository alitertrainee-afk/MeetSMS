// local imports
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../config/logger.js";

export const register = asyncHandler(async (req, res) => {
  await registerUserService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "User successfully registered.",
  });
});

export const login = asyncHandler(async (req, res) => {
  logger.info("Login attempt", withRequestContext(req));

  const result = await loginUserService(req.body);

  return successResponse(res, {
    statusCode: 200,
    message: "Logged in successfully",
    data: result,
  });
});
