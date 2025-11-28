import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import type { Application, Request, Response } from 'express';
import express from 'express';
import router from '@/app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to cravo!');
});

app.use(globalErrorHandler);

export default app;
