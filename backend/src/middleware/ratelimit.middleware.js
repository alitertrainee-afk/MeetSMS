// libs import
import rateLimit from "express-rate-limit";

// local imports
import { ApiError } from "../utils/ApiError.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, "Too many requests. Please try again later."));
  },
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  handler: (req, res, next) => {
    next(new ApiError(429, "Too many authentication attempts."));
  },
});
