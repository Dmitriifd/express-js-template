import { userController } from '@/controllers/userController';
import express from 'express';

const router = express.Router();

router.post('/', userController.createUser);

export default router;
