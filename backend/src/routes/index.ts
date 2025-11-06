import { Router } from 'express';

import { requireAuth } from '@src/middlewares/auth.middleware';

import AuthRouter from './auth.routes';
import TaskRouter from './task.routes';

const APIRouter = Router();

APIRouter.use('/auth', AuthRouter);
APIRouter.use('/tasks', requireAuth, TaskRouter);

export default APIRouter;