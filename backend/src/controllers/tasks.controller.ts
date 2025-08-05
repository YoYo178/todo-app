import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { Task } from "@src/models/task.model";
import { TCreateTaskBody, TTaskIdParams, TUpdateTaskBody } from "@src/schemas/task.schema";
import type { Request, Response, NextFunction } from "express";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ userId: req.user.id });

    res.status(HttpStatusCodes.OK).json({ success: true, data: { tasks } })
}

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params as TTaskIdParams;

    const task = await Task.findById(taskId);

    if (!task) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, error: 'No task found by the specified ID!' });
        return;
    }

    res.status(HttpStatusCodes.OK).json({ success: true, data: { task } });
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, rating } = req.body as TCreateTaskBody;

    const task = await Task.create({ title, description, rating });

    res.status(HttpStatusCodes.CREATED).json({ success: true, message: 'Task created successfully', data: { task } });
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params as TTaskIdParams;
    const { title, description, rating } = req.body as TUpdateTaskBody;

    const task = await Task.findById(taskId);

    if (!task) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, error: 'No task found by the specified ID!' });
        return;
    }

    if (title?.trim())
        task.title = title;

    if (description?.trim())
        task.description = description;

    if (rating !== undefined)
        task.rating = rating;

    await task.save();

    res.status(HttpStatusCodes.OK).json({ success: true, message: 'Updated task successfully', data: { task } })
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params as TTaskIdParams;

    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });

    if (!task) {
        res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, error: 'No task found by the specified ID!' });
        return;
    }

    res.status(HttpStatusCodes.OK).json({ success: true, message: 'Deleted task successfully' })
}