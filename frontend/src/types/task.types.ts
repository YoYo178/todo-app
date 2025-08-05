import type { IUser } from "./user.types";

export interface ITask {
    _id: string;

    userId: IUser;
    title: string;
    description?: string;
    rating?: number;

    createdAt: Date;
    updatedAt: Date;
}