// local imports
import { logger } from "../config/logger.js";
import { ApiError } from "./ApiError.js";
import { errorResponse } from "./response.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError && err.isOperational) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Logging
  if (process.env.NODE_ENV !== "production") {
    logger.error(err);
  } else {
    logger.error(`[ERROR] ${message}`);
  }

  return errorResponse(res, { statusCode, message });
};
