import { error, info, log, success } from '@/lib/chalkLogger';
import userRoutes from './userRoutes';
import express from 'express';
import { validateRequest } from '@/middlewares/validateRequest';
import { userSchema } from '@/schemas/userSchema';

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

router.use('/user', validateRequest(userSchema), userRoutes);

export default router;
