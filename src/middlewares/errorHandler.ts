import { AppError } from '@/utils/appError';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

const errorHandler = (err: Error, req: Request, res: Response) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
      errors: err.errors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      isOperational: err.isOperational,
    });
  }

  console.error('ERROR 💥:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default errorHandler;
