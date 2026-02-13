// libs import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

// local imports
import { errorHandler } from "../utils/errorHandler.js";
import { morganMiddleware } from "../middleware/morgan.middleware.js";
import { env } from "../config/env.js";
import { apiLimiter } from "../middleware/ratelimit.middleware.js";
import { requestIdMiddleware } from "../middleware/requestId.middleware.js";

// routes imports
import userRoutes from "../routes/user.routes.js";
import studentroute from "../routes/student.routes.js";


const app = express();

// middlewares
app.use(requestIdMiddleware)
app.use(helmet());
app.use(morganMiddleware);
app.use(express.json());
app.use(
  cors({
    origin: env?.CLIENT_URL,
    credentials: true,
  }),
);
// app.use(apiLimiter)

// routes
app.use("/user", userRoutes);
app.use("/students", studentroute);

app.use(errorHandler);

export default app;
