import type { DBRef } from './db.types.js';
import type { IUser } from './user.types.js';

export interface ITask {
    userId: DBRef<IUser>;
    title: string;
    description?: string;
    rating?: number;

    createdAt: Date;
    updatedAt: Date;
}