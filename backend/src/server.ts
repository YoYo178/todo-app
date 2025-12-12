import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import ENV from '@src/common/ENV';
import HTTP_STATUS_CODES from '@src/common/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import { NODE_ENVS } from '@src/common/constants';
import APIRouter from './routes';
import { CORSConfig } from './config';
import cors from 'cors';
import cookieParser from 'cookie-parser';


/******************************************************************************
                                Setup
******************************************************************************/

const app = express();


// **** Middleware **** //

app.use(cors(CORSConfig));
app.use(cookieParser());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (ENV.NodeEnv === NODE_ENVS.Dev) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NodeEnv === NODE_ENVS.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

app.use('/api', APIRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NODE_ENVS.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HTTP_STATUS_CODES.BadRequest;
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
