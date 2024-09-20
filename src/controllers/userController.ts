import { Request, Response, NextFunction } from 'express';
import { createUser } from '@/services/userService';
import { log, success, error } from '@/lib/chalkLogger';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name } = req.body;
      const user = await createUser(email, name);

      log(success('User created successfully'));
      res.status(201).json(user);
    } catch (err) {
      log(error('Error creating user'));
      console.error(err);
      next(err);
    }
  }
}

export const userController = new UserController();
