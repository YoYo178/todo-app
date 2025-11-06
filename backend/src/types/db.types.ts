import mongoose from 'mongoose';

export type DBRef<T> = T extends (infer U)[] ? mongoose.Schema.Types.ObjectId[] | U[] : mongoose.Schema.Types.ObjectId | T;