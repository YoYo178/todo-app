import { Router } from 'express';

import { requireAuth } from '@src/middlewares/auth.middleware.js';

import AuthRouter from './auth.routes.js';
import TaskRouter from './task.routes.js';

const APIRouter = Router();

APIRouter.use('/auth', AuthRouter);
APIRouter.use('/tasks', requireAuth, TaskRouter);

export default APIRouter;