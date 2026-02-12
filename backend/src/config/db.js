// libs imports
import mongoose from "mongoose";
import { logger } from "./logger.js";
import { env } from "./env.js";

export const connect = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URL);
    logger.info("DB connected", conn.connection.host);
  } catch (error) {
    logger.error("Failed to connect MongoDB: ",error);
    process.exit(1);
  }
};
