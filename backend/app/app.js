// libs import
import express from "express";
import cors from "cors";

// local imports
import userRoutes from "../routes/user.routes.js"
import studentroute from "../routes/student.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);


// routes
app.use("/user", userRoutes)
app.use("/students", studentroute);

export default app;
