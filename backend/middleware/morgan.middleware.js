import morgan from "morgan";
import { logger } from "../config/logger.js";

export const morganMiddleware = morgan(
  ":method :url :status :response-time ms",
  {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  },
);
