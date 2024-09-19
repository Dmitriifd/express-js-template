import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import { AppError } from './utils/appError';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.all('*', (req, res, next) => {
  next(new AppError(`😕 Cannot find ${req.originalUrl} on this server`, 404));
});

// Error handling
app.use(errorHandler);

export default app;
