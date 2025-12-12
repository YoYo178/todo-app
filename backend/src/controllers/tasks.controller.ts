import HTTP_STATUS_CODES from '@src/common/HTTP_STATUS_CODES';
import { Task } from '@src/models/task.model';
import { TCreateTaskBody, TTaskIdParams, TUpdateTaskBody } from '@src/schemas/task.schema';
import type { Request, Response } from 'express';

export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ userId: req.user.id });

  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, data: { tasks } });
};

export const getTask = async (req: Request, res: Response) => {
  const { taskId } = req.params as TTaskIdParams;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, error: 'No task found by the specified ID!' });
    return;
  }

  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, data: { task } });
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, rating } = req.body as TCreateTaskBody;

  const task = await Task.create({ userId: req.user.id, title, description, rating });

  res.status(HTTP_STATUS_CODES.Created).json({ success: true, message: 'Task created successfully', data: { task } });
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params as TTaskIdParams;
  const { title, description, rating } = req.body as TUpdateTaskBody;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, error: 'No task found by the specified ID!' });
    return;
  }

  if (title?.trim())
    task.title = title;

  if (description?.trim())
    task.description = description;

  if (rating !== undefined)
    task.rating = rating;

  await task.save();

  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, message: 'Updated task successfully', data: { task } });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params as TTaskIdParams;

  const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });

  if (!task) {
    res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, error: 'No task found by the specified ID!' });
    return;
  }

  res.status(HTTP_STATUS_CODES.Ok).json({ success: true, message: 'Deleted task successfully' });
};