
import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import { logger } from "./logger.js";

/**
 * Env schema
 */
const envSchema = z.object({
  MONGODB_URL: z.string().min(1, "MONGODB_URL is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  CLIENT_URL: z.string().min(1, "CLIENT_URL is required"),
  NODE_ENV: z.string().min(1, "NODE_ENV.r is required"),

  PORT: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 3000)),

  BCRYPT_SALT_ROUNDS: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("Environment variable validation failed");

  const missingVars = parsed.error.issues.map((issue) => `- ${issue.path[0]}`);

  logger.error("Missing or invalid environment variables:");
  logger.error(missingVars.join("\n"));

  process.exit(1); 
}

export const env = parsed.data;
