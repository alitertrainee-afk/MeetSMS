// libs imports
import { ZodError } from "zod";

// local imports
import { errorResponse } from "../../utils/response.js";
import { logger } from "../../config/logger.js";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // sanitized body
      req.body = validated.body;

      // Attach validated meta safely
      req.validated = {
        query: validated.query,
        params: validated.params,
      };

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Validation Failed",
          data: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      return errorResponse(res, {
        statusCode: 500,
        message: "Internal validation error",
        data: null,
      });
    }
  };
};
