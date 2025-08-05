import mongoose from 'mongoose';
import { IUser } from '../types/user.types'
import { MongooseModel } from '@src/utils/db.utils';

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const User = MongooseModel<IUser>('User', userSchema);