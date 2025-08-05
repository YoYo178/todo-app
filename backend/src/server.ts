import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import ENV from '@src/common/ENV';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';


/******************************************************************************
                                Setup
******************************************************************************/

const app = express();


// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
