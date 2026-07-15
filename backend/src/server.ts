import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import ENV, { NODE_ENVS } from '@src/common/env.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import HTTP_STATUS_CODES from './common/HttpStatusCodes.js';
import { CORSConfig } from './config/cors.config.js';
import APIRouter from './routes/index.js';


/******************************************************************************
                                Setup
******************************************************************************/

const app = express();


// **** Middleware **** //

app.use(cors(CORSConfig));
app.use(cookieParser());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (ENV.NODE_ENV === NODE_ENVS.DEVELOPMENT) {
  app.use(morgan('dev'));
}

// Security
if (ENV.NODE_ENV === NODE_ENVS.PRODUCTION) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

app.use('/api', APIRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  if (ENV.NODE_ENV !== NODE_ENVS.TEST.valueOf()) {
    console.error(err, true);
  }

  res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: err?.message ?? 'Something went wrong' });
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
