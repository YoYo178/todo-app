import ENV from '@src/common/ENV';
import mongoose from 'mongoose';
import logger from 'jet-logger';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MongodbUri);
    logger.info('Connected to MongoDB successfully.');
  } catch (error) {
    let reason = 'Unknown reason';

    if (error instanceof Error)
      reason = error.message;

    logger.err('Couldn\'t connect to MongoDB!\nReason: ' + reason);
  }
};