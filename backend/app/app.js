// libs import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// local imports
import { errorHandler } from "../utils/errorHandler.js";
import { morganMiddleware } from "../middleware/morgan.middleware.js";

// routes imports
import userRoutes from "../routes/user.routes.js";
import studentroute from "../routes/student.routes.js";

const app = express();

// middlewares
app.use(morganMiddleware);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// routes
app.use("/user", userRoutes);
app.use("/students", studentroute);

app.use(errorHandler);

export default app;
