// libs import
import express from "express";
import cors from "cors";

// local imports
import studentroute from "../routes/studentRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/students", studentroute);

export default app;
