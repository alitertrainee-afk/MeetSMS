 import dotenv from "dotenv"
 dotenv.config();
 import express from "express"
 import cors from "cors"

 

 const PORT = 8000

 app.use(express.json())

 const app = express();

 app.listen(PORT,()=>{
    console.log(`server listen on port${PORT}`)
 })