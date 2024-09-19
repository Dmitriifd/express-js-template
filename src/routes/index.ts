import { error, info, log, success } from '@/lib/chalkLogger';
import { createUser } from '@/services/userService';
import express from 'express';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
});

const router = express.Router();

router.get('/', (req, res) => {
  log(info('Запрос на главную страницу'));
  res.json({ message: 'Welcome to the REST API' });
});

router.get('/success', (req, res) => {
  log(success('Запрос успешен'));
  res.send('Успешный запрос!');
});

router.get('/error', (req, res) => {
  log(error('Произошла ошибка'));
  res.status(500).send('Ошибка сервера');
});

router.post('/user', async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const { email, name } = parsedData;
    const user = await createUser(email, name);

    log(success('User created successfully'));
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      log(error('Validation error'));
      const errorDetails = err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      }));
      res.status(400).json({ error: 'Validation error', details: errorDetails });
    } else {
      log(error('Error creating user'));
      console.error(err);
      if (err instanceof Error) {
        res.status(500).json({ error: 'Error creating user', details: err.message });
      } else {
        res.status(500).json({ error: 'Error creating user', details: 'Unknown error' });
      }
    }
  }
});

export default router;
