import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import { env } from '@/config/env';
import { log, error, success, info } from './chalkLogger';

export interface DBAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export class MongooseAdapter implements DBAdapter {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(env.MONGO_URI);
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
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export class PrismaAdapter implements DBAdapter {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      log(success('Successfully connected to database using Prisma'));
    } catch (err) {
      log(error('Error connecting to database using Prisma:'));
      console.error(err);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  getPrismaInstance(): PrismaClient {
    return this.prisma;
  }
}
