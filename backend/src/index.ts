import ENV from '@src/common/env.js';
import server from './server.js';
import { connectDB } from './config/db.config.js';

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = 'Express server started on port: ' + ENV.PORT.toString();

/******************************************************************************
                                  Run
******************************************************************************/

connectDB();

// Start the server
server.listen(ENV.PORT, (err) => {
  if (!!err) {
    console.error(err.message);
  } else {
    console.info(SERVER_START_MSG);
  }
});
