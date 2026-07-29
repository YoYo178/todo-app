import ENV from '@src/common/env.js';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.info('Connected to MongoDB successfully.');
  } catch (error) {
    let reason = 'Unknown reason';

    if (error instanceof Error) reason = error.message;

    console.error("Couldn't connect to MongoDB!\nReason: " + reason);
  }
};
