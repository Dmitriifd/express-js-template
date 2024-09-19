import mongoose from 'mongoose';
import { log, error, success, info } from './chalkLogger';
import { config } from '@/config';

export const initDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI);
    log(success('Successfully connected to MongoDB'));

    mongoose.connection.on('error', (err) => {
      log(error('MongoDB connection error:'));
      console.error(err);
    });

    mongoose.connection.on('disconnected', () => {
      log(info('MongoDB disconnected'));
    });
  } catch (err) {
    log(error('Error connecting to MongoDB:'));
    console.error(err);
    process.exit(1);
  }
};
