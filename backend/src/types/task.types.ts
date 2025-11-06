import { DBRef } from './db.types';
import { IUser } from './user.types';

export interface ITask {
    userId: DBRef<IUser>;
    title: string;
    description?: string;
    rating?: number;

    createdAt: Date;
    updatedAt: Date;
}