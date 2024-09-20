import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, 'Имя должно содержать как минимум 3 символа'),
  email: z.string().email('Некорректный email'),
});
