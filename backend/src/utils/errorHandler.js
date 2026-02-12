// local imports
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
import { ApiError } from "./ApiError.js";
import { errorResponse } from "./response.js";

export const errorHandler = (err, req, res, next) => {
  console.log("🚀 ~ errorHandler ~ err:", err);
  let statusCode = 500;
  let message = "Internal Server Error";
  let data = null;

  // Handle Common MongoSB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    statusCode = 409; // Conflict
    message = `${field} already exists`;
    data = { field, value };
  } else if (err instanceof ApiError && err.isOperational) {
    statusCode = err.statusCode;
    message = err.message;
    data = err.details;
}

  // Logging
  if (env.NODE_ENV !== "production") {
    logger.error(err);
  } else {
    logger.error(`[ERROR] ${message}`);
  }

  return errorResponse(res, { statusCode, message, ...(data ? data : null) });
};
