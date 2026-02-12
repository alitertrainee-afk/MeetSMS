import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase().padEnd(5)} ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" })),
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true }), logFormat),
    }),
  ],
});
