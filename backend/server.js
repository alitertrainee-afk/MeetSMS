// libs import


// local imports
import { connect } from "./src/database/db.js";
import app from "./src/app/app.js";
import { logger } from "./src/config/logger.js";
import { env } from "./src/config/env.js";

connect()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`server listen on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    logger.info("error", error.message);
  });
