import dotenv from "dotenv";
dotenv.config();
import { connect } from "./database/db.js";
import app from "./app/app.js";

const PORT = process.env.PORT;
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listen on port${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error.message);
  });
