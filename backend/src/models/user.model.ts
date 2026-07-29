import mongoose from 'mongoose';
import type { IUser } from '@src/types/user.types.js';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    hasLegacyHashing: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>('User', userSchema);
