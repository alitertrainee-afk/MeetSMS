// libs import
import dotenv from "dotenv";
dotenv.config();

// local imports
import { connect } from "./database/db.js";
import app from "./app/app.js";
import { logger } from "./config/logger.js";
import { env } from "./config/env.js";

connect()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`server listen on port${PORT}`);
    });
  })
  .catch((error) => {
    logger.info("error", error.message);
  });
