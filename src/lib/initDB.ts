import { env } from '@/config/env';
import { DBAdapter, MongooseAdapter, PrismaAdapter } from './dbAdapter';

let dbAdapter: DBAdapter;

export const initDB = async (): Promise<DBAdapter> => {
  dbAdapter = env.USE_PRISMA ? new PrismaAdapter() : new MongooseAdapter();
  await dbAdapter.connect();
  return dbAdapter;
};

export const closeDB = async (): Promise<void> => {
  if (dbAdapter) {
    await dbAdapter.disconnect();
  }
};

export const getDBAdapter = (): DBAdapter => dbAdapter;
