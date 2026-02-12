import morgan from "morgan";
import { logger } from "../config/logger.js";

/**
 * Custom token to read request id
 */
morgan.token("request-id", (req) => req.requestId);

export const morganMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      requestId: tokens["request-id"](req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number(tokens.status(req, res)),
      responseTime: `${tokens["response-time"](req, res)} ms`,
    }),
  {
    stream: {
      write: (message) => {
        logger.info(JSON.parse(message));
      },
    },
  },
);
