import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "@src/controllers/tasks.controller";
import { validate } from "@src/middlewares/validation.middleware";
import { createTaskSchema, taskIdParamsSchema, updateTaskSchema } from "@src/schemas/task.schema";
import { Router } from "express";

const TaskRouter = Router();

TaskRouter.get('/', getAllTasks)
TaskRouter.get('/:taskId', validate({ params: taskIdParamsSchema }), getTask)
TaskRouter.post('/', validate({ body: createTaskSchema }), createTask)
TaskRouter.patch('/:taskId', validate({ params: taskIdParamsSchema, body: updateTaskSchema}), updateTask)
TaskRouter.delete('/:taskId', validate({ params: taskIdParamsSchema }), deleteTask)

export default TaskRouter;