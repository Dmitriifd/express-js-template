import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { log, error as errLog } from '@/lib/chalkLogger';

export const validateRequest =
  (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        log(errLog('Validation error'));

        return res.status(400).json({
          success: false,
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
