import mongoose from 'mongoose';
import { ITask } from '../types';

const taskSchema = new mongoose.Schema<ITask>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, min: 0, max: 5 },
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', taskSchema);