import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Header presence check
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
        data: null,
      });
    }

    // 2. Bearer scheme validation
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Authorization header must be in format: Bearer <token>",
        data: null,
      });
    }

    const token = parts[1];

    // 3. Token presence check
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
        data: null,
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // 5. Attach decoded payload (flexible)
    req.user = {
      id: decoded?.userId,
    };

    next();
  } catch (error) {
    let message = "Invalid token";

    if (error.name === "TokenExpiredError") {
      message = "Token expired. Please login again.";
    } else if (error.name === "JsonWebTokenError") {
      message = "Malformed or invalid token";
    }

    return res.status(401).json({
      success: false,
      message,
      data: null,
    });
  }
};
