
import express from "express";
import  studentroute from "../routes/studentRoutes.js"

const app = express();

app.use(express.json());

app.use("/student",studentroute)

export default app
