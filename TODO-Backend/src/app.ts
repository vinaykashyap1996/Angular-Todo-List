import express from 'express';
import todoRoutes from './routes/todo.routes';
import cors from 'cors';
import { errorHandler } from './middleware/errorhandler';

export const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use(express.json());

app.use('/api', todoRoutes);

app.use(errorHandler);
