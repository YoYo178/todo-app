import { mongooseObjectId } from '@src/utils';
import { z } from 'zod';

// Task ID param
export const taskIdParamsSchema = z.object({
  taskId: mongooseObjectId,
});

export type TTaskIdParams = z.infer<typeof taskIdParamsSchema>;

// Create task body
export const createTaskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  rating: z.number().min(0).max(5),
});

export type TCreateTaskBody = z.infer<typeof createTaskSchema>;

// Update task body
export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export type TUpdateTaskBody = Partial<z.infer<typeof updateTaskSchema>>;