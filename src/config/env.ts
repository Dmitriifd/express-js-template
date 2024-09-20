import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'PORT должен быть числом',
    })
    .default('3000'),
  MONGO_URI: z.string().url().default('mongodb://localhost:27017/your_database_name'),
  USE_PRISMA: z
    .string()
    .optional()
    .transform((val) => val === 'true')
    .default('false'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Ошибка валидации переменных окружения', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
