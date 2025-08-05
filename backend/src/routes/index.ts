import { Router } from "express";

import AuthRouter from "./auth.routes";
import TaskRouter from "./task.routes";

const APIRouter = Router();

APIRouter.use('/auth', AuthRouter);
APIRouter.use('/tasks', TaskRouter);

export default APIRouter;